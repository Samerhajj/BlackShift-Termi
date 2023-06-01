import axios from "axios";
import {allsuggestedterms,approveTerm,deleteTerm,AllChangeLanguageLogs,AllSearchGameLogs,top10Route,deleteTermFromSearchRoute} from "./ApiRoutes";
{
// return all the suggested terms from the clients
// const getAllSuggestedTerms = async (termId,role) => {
//     try{
//         //  const role = localStorage.getItem(role);//new
//          const res = await axios.get(allsuggestedterms);
//          console.log("=>>>>>>");
//          console.log(res.data);
//          return {body: res.data, success: true};
//     }
//     catch(err){
//         console.log(err);
//         return {success: false, message: err.message};
//     }
// };
}
const getAllSuggestedTerms = async (role) => {
  try {
    const res = await axios.get(allsuggestedterms, {
      params: {
        role: role,
      },
    });
    console.log("=>>>>>>");
    console.log(res.data);
    return { body: res.data, success: true };
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
};// this request we are use it inorder to fetch the suggestions of the users
{
// approve suggested term from the use
// const addSelectedTerm = async (data,role)=>{
//     try{
//         const res = await axios.put(approveTerm,data);
//         console.log(res);
//         return {body: res, success: true};
//     }
//     catch(err){
//         console.log(err);
//         return {success: false, message: err.message};
//     }
// }
}
const addSelectedTerm = async (data, role) => {
  try {
    const requestData = { ...data, role }; // Include the "role" parameter in the request payload
    const res = await axios.put(approveTerm, requestData);
    console.log(res);
    return { body: res, success: true };
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
};// this Api request in order to add new term to the DB
{
// discard suggested term from the user
// const deleteSelectedTerm = async (data) =>{
//     try{
//         const res = await axios.delete(deleteTerm, {data : {suggestId: data['_id']}});
//         return {body: {info: res.data,del_ID:data['_id']}, success: true};
//     }
//     catch(err){
//         console.log(err);
//         return {success: false, message: err.message};
//     }
// }
}
const deleteSelectedTerm = async (data, role) => {
  try {
    const res = await axios.delete(deleteTerm, {
      data: {
        suggestId: data["_id"],
        role: role, // Include the "role" parameter in the request payload
      },
    });
    return {
      body: { info: res.data, del_ID: data["_id"] },
      success: true,
    };
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
};// delete a term 
{
// const top10 = async (role) =>{
//     try{
//         const res = await axios.get(top10Route);
//         return {body: res, success: true};
//     }
//     catch(err){
//         console.log(err);
//         return {success: false, message: err.message};
//     }
// };// return the top 10 terms has the most search count in the admin panle
}
const top10 = async (role) => {
  try {
    const res = await axios.get(
      top10Route,
      {
        params: {
          role: role, // Include the "role" parameter as a query parameter
        },
      }
    );
    return { body: res, success: true };
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
}; // this function return the top 10 terms


// delete incorrect terms from the search.
// const deleteTermFromSearch = async(data) =>{
//     try{
//         console.log(data);
//         // const res = await axios.delete(process.env.React_App_BaseURL + "user" + "/" + "deleteterm", {data});
//         const res = await axios.delete(deleteTermFromSearchRoute, {data : {TermID: data}});

//         return {body: res, success: true};
//     }
//     catch(err){
//         console.log(err);
//         return {success: false, message: err.message};
//     }
// }
const deleteTermFromSearch = async (data, role) => {
  try {
    console.log(data);
    const res = await axios.delete(deleteTermFromSearchRoute, {
      data: {
        TermID: data,
        role: role, // Include the "role" parameter in the request payload
      },
    });
    return { body: res, success: true };
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
};


// return to the admin all the change languages activity (activitySchema)
{
// const fetchAllLogs = async ()=>{
//     try{
//         const res = await axios.get(AllChangeLanguageLogs);
//         return {body: res.data, success: true};

//     }catch(err){
//         console.log(err);
//         return {success: false, message: err.message};
       
//     }
// };
}
const fetchAllLogs = async (role) => {
  try {
    const res = await axios.get(AllChangeLanguageLogs, {
      params: {
        role: role, // Include the "role" parameter as a query parameter
      },
    });
    return { body: res.data, success: true };
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
};
{
// return to the admin all the search game log (activitySchema2)
// const fetchAllSearchGameLogs = async (role)=>{
//     try{
//         const res = await axios.get(AllSearchGameLogs);
//         return {body: res.data, success: true};
//     }catch(err){
//         console.log(err);
//         return {success: false, message: err.message};
       
//     }
// };
}
const fetchAllSearchGameLogs = async (role) => {
  try {
    const res = await axios.get(AllSearchGameLogs, {
      params: {
        role: role, // Include the "role" parameter as a query parameter
      },
    });
    return { body: res.data, success: true };
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
};


export default {getAllSuggestedTerms,
                deleteSelectedTerm,
                top10,
                addSelectedTerm,
                fetchAllLogs,
                fetchAllSearchGameLogs,
                deleteTermFromSearch
};
