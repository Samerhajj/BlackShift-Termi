import { useState } from 'react';
import validator from 'validator';

const RegisterHook = (initialState) => {
   const [errors, setErrors] = useState({});

  const validate = (data) => {
    // Initialize errors object
    let newErrors = {};

    // Validate fullName
    if (!data.fullName) {
      newErrors.fullName = 'Full name is required';
    }

    // Validate phone
    if (!data.phone) {
      newErrors.phone = 'Phone is required';
    }

    // Validate email
    if (!data.email) {
      newErrors.email = 'Email is required';
    } else if (!validator.isEmail(data.email)) {
      newErrors.email = 'Email is not valid';
    }
    
    // Validate gender
    if (!data.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    // Validate password
    if (!data.password) {
      newErrors.password = 'Password is required';
    } else if (data.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Validate field
    if (!data.field) {
      newErrors.field = 'Field is required';
    }

    // Validate language
    if (!data.language) {
      newErrors.language = 'Language is required';
    }

    // Set errors
    setErrors(newErrors);

    // Return errors object
    return newErrors;
  };

  return { errors, validate };
};

export default RegisterHook;