import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedCoin,
  setSelectedDevise,
} from "../redux/slices/cryptoSlice";

export function CryptoFilter() {
  const dispatch = useDispatch();
  const selectedCoin = useSelector((state) => state.crypto.selectedCoin);
  const selectedDevise = useSelector((state) => state.crypto.selectedDevise);
  const coinsType = useSelector((state) => state.crypto.coinsType);
  const coinsDevise = useSelector((state) => state.crypto.coinsDevise);

  const handleCoinChange = (e) => {
    const newSelectedCoin = e.target.value;
    dispatch(setSelectedCoin(newSelectedCoin));
    localStorage.setItem("selectedCoin", newSelectedCoin);
  };

  const handleDeviseChange = (e) => {
    const newSelectedDevise = e.target.value;
    dispatch(setSelectedDevise(newSelectedDevise));
    localStorage.setItem("selectedDevise", newSelectedDevise);
  };

  useEffect(() => {
    const savedCoin = localStorage.getItem("selectedCoin");
    const savedDevise = localStorage.getItem("selectedDevise");

    if (savedCoin) {
      dispatch(setSelectedCoin(savedCoin));
    }
    if (savedDevise) {
      dispatch(setSelectedDevise(savedDevise));
    }
  }, [dispatch]);

  return (
    <div>
      <label>
        Crypto:
        <select value={selectedCoin} onChange={handleCoinChange}>
          {coinsType.map((coin) => (
            <option key={coin} value={coin}>
              {coin.toUpperCase()}
            </option>
          ))}
        </select>
      </label>
      <label>
        Devise:
        <select value={selectedDevise} onChange={handleDeviseChange}>
          {coinsDevise.map((devise) => (
            <option key={devise} value={devise}>
              {devise.toUpperCase()}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
