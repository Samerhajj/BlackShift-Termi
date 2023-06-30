import React,{ useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from "./RegisterPage.module.css";

const CheckBox = ({ selectedStatus, setSelectedStatus, setData }) => {
  const {t, i18n} = useTranslation(); 
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
// {t('profile.statusOptions.')
  return (
    
    <div className="form-group my-3">
    
      <h4>{t('status.status-option')}</h4>
      
      <div className="form-check" key={status[0]}>
          <input
            type="checkbox"
            className="form-check-input"
            value={status[0]}
            checked={selectedStatus.includes(status[0])}
            onChange={() => handleCheckboxChange(status[0])}
          />
          <label className="form-check-label">{t('status.Student')}</label>
      </div>
      
      <div className="form-check" key={status[1]}>
          <input
            type="checkbox"
            className="form-check-input"
            value={status[1]}
            checked={selectedStatus.includes(status[1])}
            onChange={() => handleCheckboxChange(status[1])}
          />
          <label className="form-check-label">{t('status.works_in_the_field')}</label>
      </div>
      
      <div className="form-check" key={status[2]}>
          <input
            type="checkbox"
            className="form-check-input"
            value={status[2]}
            checked={selectedStatus.includes(status[2])}
            onChange={() => handleCheckboxChange(status[2])}
          />
          <label className="form-check-label">{t('status.other')}</label>
      </div>
      
    </div>
  );
};

export default CheckBox;

            // "statusOptions":{
            //     "Student" : "Student",
            //     "Works in the field": "Works in the field",
            //     "Other": "Other" 
            // }
            
            

      // {status.map((value) => (
      //   <div className="form-check" key={value}>
      //     <input
      //       type="checkbox"
      //       className="form-check-input"
      //       value={value}
      //       checked={selectedStatus.includes(value)}
      //       onChange={() => handleCheckboxChange(value)}
      //     />
      //     <label className="form-check-label">{value}</label>
      //   </div>
      // ))}
      