import React from "react";
import { useSelector } from "react-redux";

export function FilteredDataDisplay() {
  const selectedCoin = useSelector((state) => state.crypto.selectedCoin);
  const selectedDevise = useSelector((state) => state.crypto.selectedDevise);
  const tickers = useSelector((state) => state.crypto.tickers);

  const tickerKey = `${selectedCoin}${selectedDevise}`;
  const price = tickers[tickerKey.toUpperCase()]?.price;

  return (
    <div>
      <h2>Prix Affiché</h2>
      {price ? (
        <p>{`${selectedCoin.toUpperCase()} en ${selectedDevise.toUpperCase()} : ${price}`}</p>
      ) : (
        <p>Aucun prix disponible pour cette sélection.</p>
      )}
    </div>
  );
}
