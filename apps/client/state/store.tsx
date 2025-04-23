"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { api as baseApi } from "@/lib/api/api";


// combine all PI reducers
const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    // ...otherReducers, // Add other reducers here if needed
});

// configure the store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

// setup listeners for RTK Query
setupListeners(store.dispatch);

// typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


// wrap with provider
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const storeRef = useRef(store);
    return <Provider store={storeRef.current}>{children}</Provider>;
  };


