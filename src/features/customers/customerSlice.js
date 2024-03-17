

  const initialStateCustomer = {
    nationalID: "",
    fullName: "",
    createdAt: "",
  };

  export default function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
      case "customer/createAccount":
        return {
          ...state,
          nationalID: action.payload.nationalID,
          fullName: action.payload.fullName,
          createdAt: action.payload.createdAt,
        };
  
      case "customer/updateAccount":
        return {
          ...state,
          fullName: action.payload.fullName,
        };
  
      default:
        return state;
    }
  }

  function createCustomer(fullName, nationalID) {
    return {
      type: "account/createCustomer",
      payload: { fullName, nationalID, createdAt: new Date().toISOString() },
    };
  }
  
  function updateName(fullName) {
    return {
      type: "account/updateName",
      payload: { fullName },
    };
  }
  
  export {createCustomer, updateName}