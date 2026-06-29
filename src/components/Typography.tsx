import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';
import {Typography as TypographyTheme} from '../theme/typography';
import {Colors} from '../theme/colors';

interface CustomTextProps extends TextProps {
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Heading: React.FC<CustomTextProps> = ({
  style,
  color = Colors.text.primary,
  align = 'left',
  ...props
}) => (
  <Text
    style={[
      styles.heading,
      {color, textAlign: align},
      style,
    ]}
    {...props}
  />
);

export const Subheading: React.FC<CustomTextProps> = ({
  style,
  color = Colors.text.secondary,
  align = 'left',
  ...props
}) => (
  <Text
    style={[
      styles.subheading,
      {color, textAlign: align},
      style,
    ]}
    {...props}
  />
);

export const Body: React.FC<CustomTextProps> = ({
  style,
  color = Colors.text.primary,
  align = 'left',
  ...props
}) => (
  <Text
    style={[
      styles.body,
      {color, textAlign: align},
      style,
    ]}
    {...props}
  />
);

export const Caption: React.FC<CustomTextProps> = ({
  style,
  color = Colors.text.secondary,
  align = 'left',
  ...props
}) => (
  <Text
    style={[
      styles.caption,
      {color, textAlign: align},
      style,
    ]}
    {...props}
  />
);

export const Label: React.FC<CustomTextProps> = ({
  style,
  color = Colors.text.secondary,
  align = 'left',
  ...props
}) => (
  <Text
    style={[
      styles.label,
      {color, textAlign: align},
      style,
    ]}
    {...props}
  />
);

const styles = StyleSheet.create({
  heading: {
    ...TypographyTheme.headingM,
  },
  subheading: {
    ...TypographyTheme.headingS,
  },
  body: {
    ...TypographyTheme.body,
  },
  caption: {
    ...TypographyTheme.caption,
  },
  label: {
    ...TypographyTheme.smallBold,
  },
});
