import { configureStore } from "@reduxjs/toolkit";

//Aca

import dataReducers from "../features/data/dataSlice.js";

const store = configureStore({
    reducer: {
        data: dataReducers,
    }
})

export default store;