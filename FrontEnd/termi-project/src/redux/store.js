// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import userDataReducer from './userDataReducer';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// const persistConfig = {
//   key: 'root',
//   storage,
// }


// const persistedReducer = persistReducer(persistConfig, userDataReducer);
// const store = createStore(persistedReducer, applyMiddleware(thunk));
// const persistor = persistStore(store);

// export { store, persistor }