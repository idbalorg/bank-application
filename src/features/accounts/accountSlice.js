import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState: initialState,
  reducers: {
    deposit(state, action){
      state.balance += action.payload
    },
    withdraw(state, action){
      state.balance -= action.payload
    },
    requestLoan:{
      prepare(amount, purpose){
        return{
          payload:{
            amount, purpose
          }
        }
      },

      reducer(state, action){

        if (state.loan > 0) return "you already have an outstanding loan";
        state.loan = action.payload.amount
        state.loanPurpose = action.payload.purpose
        state.balance += action.payload.amount
      }

    },
    payLoan(state){
      state.balance-= state.loan
      state.loan = 0
      state.loanPurpose = ""
    }
  }
})

export function deposit(amount, currency) {
    if (currency === "USD") return {
      type: "account/deposit",
      payload: amount,
    };

    return async function (dispatch, getState) {
      dispatch({type: "loading"})
      const res =  await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
      const data = await res.json()
      const convertedAmount = data.rates.USD

      dispatch ({type: "account/deposit", payload: convertedAmount})
    }
  }

export default accountSlice.reducer

export const {withdraw, requestLoan, payLoan} = accountSlice.actions


  // export default function accountReducer(state = initialStateAccount, action) {
  //   switch (action.type) {
  //     case "account/deposit":
  //       return {
  //         ...state,
  //         balance: state.balance + action.payload,
  //         isLoading: false
  //       };
  //     case "account/withdraw":
  //       return {
  //         ...state,
  //         balance: state.balance - action.payload,
  //       };
  //     case "account/requestLoan":
  //       if (state.loan > 0) return "you already have an outstanding loan";
  //       return {
  //         ...state,
  //         loan: action.payload.amount,
  //         loanPurpose: action.payload.purpose,
  //         balance: state.balance + action.payload.amount,
  //       };

  //     case "account/payloan":
  //       if (state.loan > state.balance)return `your balance is ${state.balance} you do not have enough balance to pay up your loan of ${state.loan}`;
  //       return {
  //         ...state,
  //         balance: state.balance - state.loan,
  //         loan: 0,
  //         loanPurpose: "",
  //       };

  //     case "loading":
  //       return{
  //         ...state,
  //         isLoading: false,
  //       }

  //     default:
  //       return state;
  //   }
  // }


  // export function withdraw(amount) {
  //   return {
  //     type: "account/withdraw",
  //     payload: amount,
  //   };
  // }
  // export function requestLoan(amount, purpose) {
  //   return {
  //     type: "account/requestLoan",
  //     payload: { amount, purpose },
  //   };
  // }

  // export function payLoan() {
  //   return {
  //     type: "account/payloan",
  //   };
  // }

