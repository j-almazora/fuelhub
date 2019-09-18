
import Firebase from '../comps/Firebase';
import * as firebase from 'firebase';

const pageDefault = {
  page:1,
  addr:null,
  station:"",
  firstname: "",
  lastname:"",
  email:"",
  userID: "",
  curBalance:0,
  transactions:[],
  newTransaction:{},
  currentLocation: {},
  logo:""
}

export function currentPage(state = pageDefault, action){
  let obj = Object.assign({}, state);

  switch(action.type){
    case "CHANGE_PAGE":
      obj.page = action.curPage;
      return obj;

    case "GO_TO_MAP":
      obj.page = action.curPage;
      obj.addr = action.addr;
      obj.station = action.station;
      return obj;

    case "GET_USER":
      obj.firstname = action.userData.firstname;
      obj.email = action.userData.email;
      obj.lastname = action.userData.lastname;
      return obj;

    case "CURRENT_USER":
      obj.userID = action.user.user.uid;
      return obj;

    case "GET_TRANSACTIONS":
      obj.transactions = action.transArray.map((obj,i)=>{
        return obj;
      });
      obj.curBalance = action.balance;
      return obj;

      case "CURRENT_LOCATION":
      obj.currentLocation = action.currentLocation;
      return obj;

    case "GET_LOGO":
      obj.logo = action.logo;
        return obj;
      
    default:
      return state;
  }
}
