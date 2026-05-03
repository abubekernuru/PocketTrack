import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/es/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './user/user.slice.js';
import themeReducer from './theme/themeSlice.js';

const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);