import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTickers } from "../redux/slices/cryptoSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function Home() {
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
      const data = object.data;
      const { s: name, c: price } = data;
      const formattedPrice = parseFloat(price).toFixed(2);
      const timestamp = Date.now();

      dispatch(setTickers([{ name, price: formattedPrice, timestamp }]));
    };

    return () => ws.close();
  }, [dispatch]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Current Price</TableCell>
              <TableCell align="right">Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(tickers).map(([name, ticker]) => {
              const history = ticker.history;
              const lastIndex = history.length - 1;
              if (lastIndex < 1) {
                return (
                  <TableRow key={name}>
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell align="right">Prix indisponible</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                );
              }
              const tenMinutesAgoIndex = Math.max(lastIndex - 20, 0);
              const currentPrice = parseFloat(
                history[lastIndex]?.price
              ).toFixed(2);
              const tenMinutesAgoPrice = parseFloat(
                history[tenMinutesAgoIndex]?.price
              );
              const variation =
                ((currentPrice - tenMinutesAgoPrice) / tenMinutesAgoPrice) *
                100;
              const variationFormatted = variation.toFixed(2);

              return (
                <TableRow key={name}>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell align="right">
                    {currentPrice || "Prix indisponible"}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ color: variation >= 0 ? "green" : "red" }}
                  >
                    {variationFormatted}%
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
