import React from 'react';
import Svg, { Rect } from 'react-native-svg';

interface WizardStepProps {
  stepNumber: number;
  totalSteps?: number;
}

const WizardStep = ({ stepNumber, totalSteps = 3 }: WizardStepProps) => {
  const getActiveColor = (index: number) => index === stepNumber ? "#004AFF" : "#D1DDFA";

  return (
    <Svg width="75" height="5" viewBox="0 0 75 5" fill="none">
      {
        Array(totalSteps).fill(1).map((_, i) => (
          <Rect key={i} x={i * 20} width="15" height="5" rx="2.5" fill={getActiveColor(i + 1)} />
        ))
      }
    </Svg>
  );
};

export default WizardStep;