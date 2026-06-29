import React, { useState } from 'react';
import AuthInput, { AuthInputProps } from './AuthInput';

interface PasswordInputProps
  extends Omit<
    AuthInputProps,
    'rightIcon' | 'onRightIconPress' | 'secureTextEntry'
  > {}

const PasswordInput: React.FC<PasswordInputProps> = props => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <AuthInput
      {...props}
      secureTextEntry={!isVisible}
      rightIcon={isVisible ? 'eye-off-outline' : 'eye-outline'}
      onRightIconPress={() => setIsVisible(!isVisible)}
    />
  );
};

export default React.memo(PasswordInput);
