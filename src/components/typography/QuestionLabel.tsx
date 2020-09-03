import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export const QuestionLabel: FunctionComponent<{ children: string }> = ({
  children
}) => <Text style={styles.text}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 22,
    textAlign: 'justify',
    marginTop: 36
  }
});
