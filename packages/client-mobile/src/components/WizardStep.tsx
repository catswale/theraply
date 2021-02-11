import React from 'react';
import Svg, { Rect } from 'react-native-svg';
import { palette } from '@theraply/lib';

interface WizardStepProps {
  stepNumber: number;
  totalSteps?: number;
}

const WizardStep = ({ stepNumber, totalSteps = 3 }: WizardStepProps) => {
  const getActiveColor = (index: number) => index === stepNumber ? palette.primary.main : palette.lineColor;

  const rectWidth = 15;
  const width = (totalSteps * rectWidth) + ((totalSteps - 1) * 5);
  return (
    <Svg width={width} height="5" viewBox={`0 0 ${width} 5`} fill="none">
      {
        Array(totalSteps).fill(1).map((_, i) => (
          <Rect key={i} x={i * 20} width={rectWidth} height="5" rx="2.5" fill={getActiveColor(i + 1)} />
        ))
      }
    </Svg>
  );
};

export default WizardStep;
