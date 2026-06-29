import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import Button from '../../../components/Button';

interface AuthButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  label,
  variant = 'primary',
  loading = false,
  disabled,
  style,
  ...props
}) => {
  return (
    <Button
      title={label}
      variant={variant}
      loading={loading}
      disabled={disabled}
      style={style as any}
      onPress={props.onPress as any}
    />
  );
};

export default React.memo(AuthButton);
