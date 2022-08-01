import { configureStore } from "@reduxjs/toolkit";

//features

import userReducers from "../features/user/userSlice.js";

const store = configureStore({
    reducer: {
        user: userReducers,
    }
})

export default store;