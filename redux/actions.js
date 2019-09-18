import Firebase from '../comps/Firebase';
import * as firebase from 'firebase';

export function ChangePage(page){
  return {
    type:"CHANGE_PAGE",
    curPage:page
  }
}

export function CurrentLocation(location){
  return {
    type:"CURRENT_LOCATION",
    currentLocation:location
  }
}

export function GoToMap(mapPage){
  return {
    type:"GO_TO_MAP",
    curPage:mapPage.page,
    addr:mapPage.addr,
    station:mapPage.station,
  }
}

export function GetUser(user) {
  return {
    type:"GET_USER",
    userData:user,
  }
}

export function CurrentUser(user) {
  return {
    type:"CURRENT_USER",
    user:user,
  }
}

export function GetTransactions(transactions, curBalance) {
  console.log(transactions);
  return {
    type:"GET_TRANSACTIONS",
    transArray:transactions,
    balance: curBalance,
  }
}

export function GetStation(station){
  return {
    type:"GET_STATIONS",
    station:station
  }
}

export function AddCredit(newTransaction, userID) {
  return (dispatch)=>{
    firebase.firestore().collection('transactions').add(newTransaction).then(()=>{
      dispatch(CalcTransactions(userID));
    })

  }
}

export function CalcTransactions(userID){

  return (dispatch)=>{

    firebase.firestore().collection('transactions').where("userID", "==",userID).get().then( (response)=> {
      var transactions= [];
      var transaction={};
      var curBalance = 0;
      response.forEach((doc)=>{
        //create transaction objects for each transaction documents in db for this

        //user
        transaction= {
          transactionId: doc.id,
          amountPurchased: doc.data().Amount_Purchased,
          datePurchased:doc.data().Date_Purchased,
          gasPrice:doc.data().Gas_Price,
          litresBought:parseFloat(doc.data().Litres_Bought).toFixed(2),
          stationName:doc.data().Station_Name,
        }

        // sum all litres bought for current balance of user
        curBalance += parseFloat(doc.data().litresBought).toFixed(2);

        // add the transaction to the array
        transactions.push(transaction);
        console.log("transaction", transaction);
        console.log("transactions array", transactions);

        //update global redux transactions array
      })
      dispatch(GetTransactions(transactions, curBalance));
    })
    .catch(error=> {
      console.log(error);
    })
  }
}

export function GetLogo(logo){
  return {
    type:"GET_LOGO",
    logo:logo
  }
}
