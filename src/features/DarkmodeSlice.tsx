import { createSlice } from "@reduxjs/toolkit";

interface IntialState {
  value: boolean;
}

const InitialValue: IntialState = {
  value: JSON.parse(localStorage.getItem("isDarkMode") || "false"),
};

export const DarkSlice = createSlice({
  name: "dark", //  Here name is string , so no need to explicit type here
  initialState: InitialValue,
  reducers: {
    toogleDarkMode: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toogleDarkMode } = DarkSlice.actions;
export default DarkSlice.reducer;
