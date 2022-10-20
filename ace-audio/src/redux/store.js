import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducers";
import rootSaga from "./rootSaga";
import storage from "redux-persist/lib/storage";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const bindMiddleware = (middleware) => {
  if (!IS_PRODUCTION) {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  
  return applyMiddleware(...middleware);
};

const persistConfig = {
  key: "dashboard",
  storage: storage,
  whitelist: ["dashboard"], // which reducer want to store
};
const pReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};

const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware];

const store = createStore(
  pReducer,
  initialState,
  bindMiddleware([...middleWares])
);
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { persistor, store };
