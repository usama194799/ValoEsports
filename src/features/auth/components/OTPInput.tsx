import React, {useRef, useState} from 'react';
import {StyleSheet, View, TextInput, Pressable} from 'react-native';
import {Colors} from '../../../theme/colors';
import {Radius} from '../../../theme/radius';
import {Spacing} from '../../../theme/spacing';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({length = 6, value, onChange}) => {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.boxContainer} onPress={handlePress}>
        {Array(length)
          .fill(0)
          .map((_, index) => {
            const digit = value[index] || '';
            const isActive = isFocused && value.length === index;
            const isFilled = digit !== '';

            return (
              <View
                key={index}
                style={[
                  styles.box,
                  isActive && styles.boxActive,
                  isFilled && styles.boxFilled,
                ]}>
                <TextInput
                  style={styles.text}
                  value={digit}
                  editable={false}
                  pointerEvents="none"
                />
              </View>
            );
          })}
      </Pressable>
      
      {/* Hidden actual input */}
      <TextInput
        ref={inputRef}
        style={styles.hiddenInput}
        value={value}
        onChangeText={(text) => {
          if (text.length <= length) onChange(text);
        }}
        keyboardType="number-pad"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoFocus
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  box: {
    width: 48,
    height: 56,
    borderRadius: Radius.md,
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: Colors.neutral.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxActive: {
    borderColor: Colors.primary.main,
    backgroundColor: Colors.primary.glow,
  },
  boxFilled: {
    borderColor: Colors.neutral.border,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
});

export default React.memo(OTPInput);
