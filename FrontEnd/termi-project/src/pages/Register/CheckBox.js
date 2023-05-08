import React,{ useState, useEffect } from 'react';

const CheckBox = ({ selectedStatus, setSelectedStatus, setData }) => {
  const status = ["Student", "Works in the field", "Other"];
  
  const handleCheckboxChange = (value) => {
    const updatedStatus = selectedStatus.includes(value)
      ? selectedStatus.filter((status) => status !== value)
      : [...selectedStatus, value];
    setSelectedStatus(updatedStatus);
    console.log(`Updated selectedStatus to:`, updatedStatus);
  };

  useEffect(() => {
    setData(prevData => ({ ...prevData, status: selectedStatus }));
    console.log(`Updated data to:`, { ...setData, status: selectedStatus });
  }, [selectedStatus]);

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

            // "statusOptions":{
            //     "Student" : "Student",
            //     "Works in the field": "Works in the field",
            //     "Other": "Other" 
            // }