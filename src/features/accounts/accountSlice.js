const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
  export default function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
      case "account/deposit":
        return {
          ...state,
          balance: state.balance + action.payload,
        };
      case "account/withdraw":
        return {
          ...state,
          balance: state.balance - action.payload,
        };
      case "account/requestLoan":
        if (state.loan > 0) return "you already have an outstanding loan";
        return {
          ...state,
          loan: action.payload.amount,
          loanPurpose: action.payload.purpose,
          balance: state.balance + action.payload.amount,
        };
  
      case "account/payloan":
        if (state.loan > state.balance)
          return `your balance is ${state.balance} you do not have enough balance to pay up your loan of ${state.loan}`;
        return {
          ...state,
          balance: state.balance - state.loan,
          loan: 0,
          loanPurpose: "",
        };
  
      default:
        return state;
    }
  }

  function deposit(amount) {
    return {
      type: "account/deposit",
      payload: amount,
    };
  }
  function withdraw(amount) {
    return {
      type: "account/withdraw",
      payload: amount,
    };
  }
  function requestLoan(amount, purpose) {
    return {
      type: "account/requestLoan",
      payload: { amount, purpose },
    };
  }
  
  function payLoan() {
    return {
      type: "account/payloan",
    };
  }

  export {requestLoan, payLoan, withdraw, deposit}
  