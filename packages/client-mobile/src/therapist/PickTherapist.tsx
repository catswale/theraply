import React, { useState } from 'react';
import StepOne from './pick/StepOne';
import StepTwo from './pick/StepTwo';
import StepThree from './pick/StepThree';

export const PickTherapist = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <>
      {currentStep === 1 && <StepOne setCurrentStep={setCurrentStep} />}
      {currentStep === 2 && <StepTwo setCurrentStep={setCurrentStep} />}
      {currentStep === 3 && <StepThree setCurrentStep={setCurrentStep} />}
    </>
  );
};
