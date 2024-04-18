import { createSlice } from "@reduxjs/toolkit";

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    coinsType: ["btc", "eth", "bnb"],
    coinsDevise: ["usdt", "eur"],
    selectedCoin: "btc",
    selectedDevise: "usdt",
    tickers: {},
  },
  reducers: {
    setSelectedCoin: (state, action) => {
      state.selectedCoin = action.payload;
    },
    setSelectedDevise: (state, action) => {
      state.selectedDevise = action.payload;
    },
    setTickers: (state, action) => {
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000; // 24 heures en millisecondes

      action.payload.forEach(({ name, price, timestamp }) => {
        if (!state.tickers[name]) {
          state.tickers[name] = { history: [] };
        }
        // Ajoute la nouvelle mise à jour de prix à l'historique
        state.tickers[name].history.push({ price, timestamp });

        // Filtre l'historique pour ne garder que les données des dernières 24 heures
        state.tickers[name].history = state.tickers[name].history.filter(
          (entry) => now - entry.timestamp < oneDay
        );
      });
    },
  },
});

export const { setSelectedCoin, setSelectedDevise, setTickers } =
  cryptoSlice.actions;

export default cryptoSlice.reducer;
