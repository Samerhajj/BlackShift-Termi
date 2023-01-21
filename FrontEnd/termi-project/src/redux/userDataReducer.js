// const initialState = {
//   data: {},
//   loading: false,
//   error: null
// };

// export default function userDataReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'FETCH_USER_DATA_START':
//       return {
//         ...state,
//         loading: true
//       };
//     case 'FETCH_USER_DATA_SUCCESS':
//       return {
//         ...state,
//         data: action.payload,
//         loading: false,
//         error: null
//       };
//     case 'FETCH_USER_DATA_FAIL':
//       return {
//         ...state,
//         loading: false,
//         error: action.payload
//       };
//       case 'UPDATE_USER_PROFILE':
//     return {
//       ...state,
//       data: { ...state.data, ...action.payload }
//     }
    
//     case 'CLEAR_USER_PROFILE':
//       return{
//         ...state,
//         data:{}
//       }
//     default:
//       return state;
//   };
// }