import { useState } from 'react';
import validator from 'validator';
// import regexpNormalize from 'regexp-normalize';
const RegisterHook = (initialState) => {
  const [errors, setErrors] = useState({});

  const validate = (data, step) => {
    let newErrors = {};
 console.log(data);
 console.log(step);
    switch (step) {
      case 0:
        // Validate fullName
       
        if (!data.fullName) {
          newErrors.fullName = 'Full name is required';
        }
        else if (
          data.fullName.length < 5 ||
          data.fullName.length > 20 ||
          validator.isEmail(data.fullName)
        ) {
          newErrors.fullName = 'Full name must be 5-20 characters long and cannot be an email';
        }
        // else if (!regexpNormalize(data.fullName).match(/^[a-zA-Z]+$/)) {
        //   newErrors.fullName = 'Full name must only contain letters';
        // }
       
        // Validate email
        if (!data.email) {
          newErrors.email = 'Email is required';
        } else if (!validator.isEmail(data.email)) {
          newErrors.email = 'Email is not valid';
        }
        break;
      case 1:
        // Validate gender
        if (!data.gender) {
          newErrors.gender = 'Gender is required';
        }
         // Validate phone
        if (!data.phone) {
          newErrors.phone = 'Phone is required';
        }
        
        // Validate language
        if (!data.language) {
          newErrors.language = 'Language is required';
        }
       
        // Validate field
        if (!data.field) {
          newErrors.field = 'Field is required';
        }
        break;
      case 2:
         // Validate password
        if (!data.password) {
          newErrors.password = 'Password is required';
        } else if (data.password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        }
      
        break;
      default:
        break;
    }

    setErrors(newErrors);

    return newErrors;
  };

  return { errors, validate };
};

export default RegisterHook;