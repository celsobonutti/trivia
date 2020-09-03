import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { DefaultView } from './DefaultView';

type ErrorBoundaryState = {
  hasError: boolean;
  errorMessage: string | undefined;
};

export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false, errorMessage: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      errorMessage: error.message
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <DefaultView style={styles.container}>
          <Text>{this.state.errorMessage}</Text>
        </DefaultView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    color: '#B00020',
    fontSize: 36
  }
});
