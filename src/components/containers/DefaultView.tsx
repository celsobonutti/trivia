import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type DefaultViewProps = {
  style?: StyleProp<ViewStyle>;
};

export const DefaultView: FunctionComponent<DefaultViewProps> = ({
  children,
  style
}) => {
  const { colors } = useTheme();

  const styles = makeStyle(colors);

  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};

const makeStyle = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1
    }
  });
