import React,{useEffect} from "react";

const CheckBox = ({ selectedStatus, setSelectedStatus, setData }) => {
  const status = ["Student", "Works in the field", "Other"];

  const handleCheckboxChange = (value) => {
    console.log("hii")
    // Check if the value is already in the selectedStatus array
    const index = selectedStatus.indexOf(value);
    if (index !== -1) {
      // If it is, remove it
      setSelectedStatus(selectedStatus.filter((status) => status !== value));
    } else {
      // If it's not, add it
      setSelectedStatus([...selectedStatus, value]);
    }
    // // Update the data state in the parent component
    setData({ ...setData, status: selectedStatus });
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
    </div>
  );
};

export default CheckBox;
