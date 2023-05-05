import React, { useState } from 'react';
import { Step, Stepper } from 'react-form-stepper';

const FormStepper = ({ currentStep, setCurrentStep }) => {
  const handleClick = (step) => {
   if(currentStep===3)
   {
       return;
   }
    setCurrentStep(step);
  };

  return (
    <Stepper activeStep={currentStep} alternativeLabel>
      <Step
        label="Email and Full Name"
        onClick={() => handleClick(0)}
        completed={currentStep > 0}
      />
      <Step
        label="Details"
        onClick={() => handleClick(1)}
        completed={currentStep > 1}
      />
      <Step
        label="Password"
        onClick={() => handleClick(2)}
        completed={currentStep > 2}
      />
      <Step
        label="Finish"
        completed={currentStep === 3}
      />
    </Stepper>
  );
};
export default FormStepper;