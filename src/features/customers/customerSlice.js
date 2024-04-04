import { createSlice } from "@reduxjs/toolkit";


  const initialState = {
    nationalID: "",
    fullName: "",
    createdAt: "",
  };

  const customerSlice = createSlice({
    name: "Customer",
    initialState,
    reducers: {
      createCustomer:{
        prepare(fullName, nationalID){
          return{
            payload:{fullName, nationalID, createdAt: new Date().toISOString()}
           }
        },
        reducer(state, action){
          state.nationalID = action.payload.nationalID;
          state.fullName = action.payload.fullName;
          state.createdAt = action.payload.createdAt
        }
      },
      updateCustomer(state, action){
        state.fullName = action.payload.fullName
      }
    }
  })

  export default customerSlice.reducer
  export const {createCustomer, updateCustomer} = customerSlice.actions


  // export default function customerReducer(state = initialStateCustomer, action) {
  //   switch (action.type) {
  //     case "customer/createCustomer":
  //       return {
  //         ...state,
  //         nationalID: action.payload.nationalID,
  //         fullName: action.payload.fullName,
  //         createdAt: action.payload.createdAt,
  //       };

  //     case "customer/updateName":
  //       return {
  //         ...state,
  //         fullName: action.payload.fullName,
  //       };

  //     default:
  //       return state;
  //   }
  // }

  // function createCustomer(fullName, nationalID) {
  //   return {
  //     type: "customer/createCustomer",
  //     payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  //   };
  // }

  // function updateName(fullName) {
  //   return {
  //     type: "customer/updateName",
  //     payload: { fullName },
  //   };
  // }




  // export {createCustomer, updateName}