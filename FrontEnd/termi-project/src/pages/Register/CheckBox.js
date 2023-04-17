
import React, { useState } from "react";


const CheckBox = ({selectedStatus,setSelectedStatus}) => {
const status = ["Student", "Works in the field", "Other"];

  const handleCheckboxChange = (value) => {
    // Check if the value is already in the selectedStatus array
    const index = selectedStatus.indexOf(value);
    if (index !== -1) {
      // If it is, remove it
      setSelectedStatus(selectedStatus.filter((status) => status !== value));
    } else {
      // If it's not, add it
      setSelectedStatus([...selectedStatus, value]);
    }
  };

  return (
    <div>
      <h3>Status:</h3>
      {status.map((value) => (
        <div key={value}>
          <input
            type="checkbox"
            value={value}
            checked={selectedStatus.includes(value)}
            onChange={() => handleCheckboxChange(value)}
          />
          <label>{value}</label>
        </div>
      ))}
      <p>Selected Status: {selectedStatus.join(", ")}</p>
      
      
    <div>
      <p>Selected Status:</p>
      {selectedStatus.map((value) => (
        <div key={value}>
          {value}
        </div>
      ))}
    </div>
      
      
    </div>
  );
};


// import React from "react"

// const CheckBox = ({status,checkedState,setCheckedState}) => {
//     //   status = ["Student","works in the field","Other"];

//   const handleOnChange = (position) => {
//     const updatedCheckedState = checkedState.map((item, index) =>
//       index === position ? !item : item
//   );
//   setCheckedState(updatedCheckedState);
  
//   }

//      return (
//     <div className="App">
//       <h3>Select status</h3>
//       <ul className="">
//         {status.map(( name , index) => {
//           return (
//             <li key={index}>
//               <div className="">
//                 <div className="">
//                   <input
//                     type="checkbox"
//                     id={`custom-checkbox-${index}`}
//                     name={name}
//                     value={name}
//                     checked={checkedState[index]}
//                     onChange={() => handleOnChange(index)}
//                   />
//                   <label>{name}</label>
//                 </div>
//               </div>
//             </li>
//           );
//         })}

//       </ul>
//     </div>
//   )
    
// }
export default CheckBox