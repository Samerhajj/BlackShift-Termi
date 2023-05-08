import React, { useState } from 'react';
import { Step, Stepper } from 'react-form-stepper';
import { AiOutlineUser, AiOutlineInfoCircle, AiOutlineLock, AiOutlineCheckCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { useTranslation } from 'react-i18next';

const FormStepper = ({ currentStep, setCurrentStep }) => {
  const { t } = useTranslation();

  const handleClick = (step) => {
    if(currentStep === 3) {
      return;
    }
    setCurrentStep(step);
  };

  return (
    <IconContext.Provider value={{ size: '2em' }}>
      <Stepper activeStep={currentStep} alternativeLabel dir="ltr">
        <Step
          label={
            <div>
              {t('register.email')}
            </div>
          }
          onClick={() => handleClick(0)}
          completed={currentStep > 0}
        >
          <AiOutlineUser />
        </Step>
        <Step
          label={
            <div>
              {t('register.details')}
            </div>
          }
          onClick={() => handleClick(1)}
          completed={currentStep > 1}
        >
          <AiOutlineInfoCircle />
        </Step>
        <Step
          label={
            <div>
              {t('register.password')}
            </div>
          }
          onClick={() => handleClick(2)}
          completed={currentStep > 2}
        >
          <AiOutlineLock /> 
        </Step>
        <Step
          label={
            <div>
              {t('register.finish')}
            </div>
          }
          completed={currentStep === 3}
        >
          <AiOutlineCheckCircle /> 
        </Step>
      </Stepper>
    </IconContext.Provider>
  );
};

export default FormStepper;
