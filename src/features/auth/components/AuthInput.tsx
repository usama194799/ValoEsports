import React from 'react';
import { TextInputProps as RNTextInputProps } from 'react-native';
import TextInput from '../../../components/TextInput';

export interface AuthInputProps extends RNTextInputProps {
  label: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  isPassword?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  isPassword,
  ...props
}) => {
  return (
    <TextInput
      label={label}
      error={error}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      onRightIconPress={onRightIconPress}
      isPassword={isPassword}
      {...props}
    />
  );
};

export default React.memo(AuthInput);
