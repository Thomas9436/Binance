import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTickers } from "../redux/slices/cryptoSlice";
import { CryptoFilter } from "./CryptoFilter";
import { FilteredDataDisplay } from "./FilteredDataDisplay";
import { CryptoChart } from "./CryptoChart";

export function Home() {
  const dispatch = useDispatch();
  const tickers = useSelector((state) => state.crypto.tickers);

  useEffect(() => {
    const coins = {
      coinsType: ["btc", "eth", "bnb"],
      coinsDevise: ["usdt", "eur"],
    };
    const streams = coins.coinsType
      .flatMap((coin) =>
        coins.coinsDevise.map((devise) => `${coin}${devise}@ticker`)
      )
      .join("/");

    const url = `wss://stream.binance.com:9443/stream?streams=${streams}`;
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      const object = JSON.parse(event.data);
      const data = object.data; // `data` est maintenant un objet unique et non un tableau

      // Extrait les informations nécessaires directement depuis `data`
      const { s: name, c: price } = data; // 's' pour le symbole (name) et 'c' pour le prix de clôture (price)
      const timestamp = Date.now(); // Capture le timestamp actuel pour l'enregistrement

      // Dispatche les informations en tant qu'objet dans un tableau pour garder une structure cohérente avec votre logique d'application
      dispatch(setTickers([{ name, price, timestamp }]));
    };

    return () => ws.close();
  }, [dispatch]);

  return (
    <div>
      <h2>Tickers</h2>
      <CryptoFilter />
      <FilteredDataDisplay />
      {Object.entries(tickers).map(([name, ticker]) => {
        // Obtenez l'historique de prix pour la paire actuelle
        const history = ticker.history;
        const lastIndex = history.length - 1;

        // Assurez-vous d'avoir assez de données
        if (lastIndex < 1) {
          return <div key={name}>{name}: Prix indisponible</div>;
        }

        // Trouvez l'index approximatif d'il y a 10 minutes
        // Notez que cela dépend de la fréquence de vos données
        const tenMinutesAgoIndex = Math.max(lastIndex - 20, 0); // Ajustez ce -10 en fonction de la fréquence de vos données
        const currentPrice = parseFloat(history[lastIndex]?.price);
        const tenMinutesAgoPrice = parseFloat(
          history[tenMinutesAgoIndex]?.price
        );

        // Calculez le pourcentage de variation
        const variation =
          ((currentPrice - tenMinutesAgoPrice) / tenMinutesAgoPrice) * 100;

        // Formattez le pourcentage pour l'affichage
        const variationFormatted = variation.toFixed(2); // Arrondi à deux décimales

        return (
          <div key={name}>
            {name}: {history[lastIndex]?.price || "Prix indisponible"}{" "}
            <span style={{ color: variation >= 0 ? "green" : "red" }}>
              ({variationFormatted}%)
            </span>
          </div>
        );
      })}
      <br />
      <div>
        <h2>Graphique</h2>
        <CryptoChart />
      </div>
    </div>
  );
}
