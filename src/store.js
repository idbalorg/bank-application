import { combineReducers, createStore } from "redux";
import customerReducer from "./features/customers/customerSlice";
import accountReducer from "./features/accounts/accountSlice";


// creating a redux store
const rootReducer = combineReducers({
  customer: customerReducer,
  account: accountReducer,
});

const store = createStore(rootReducer);
// using action creator functions


// dispatching the actions calling the store.dispatch() function
// store.dispatch(deposit(5000));
// store.dispatch(withdraw(1200));
// store.dispatch(requestLoan(6000, "buy a Car"));
// store.dispatch(payLoan());
// console.log(store.getState());

export default store