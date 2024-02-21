import { configureStore } from "@reduxjs/toolkit";
import transactionData from "../feature/expenseTrackerSlice";



export const store = configureStore({
    reducer: {
        app: transactionData
    }
})