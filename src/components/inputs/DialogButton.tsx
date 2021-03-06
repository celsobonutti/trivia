import React from 'react';
import {
  ScrollView,
  TouchableHighlight,
  StyleProp,
  ViewStyle,
  TextStyle,
  View
} from 'react-native';
import { Modal, Portal, TextInput, RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type SelectOption = {
  value: string;
  label: string;
};

type DialogButtonProps<T extends SelectOption> = {
  onChange: (arg: string) => void;
  selectedValue: string;
  options: T[];
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  testID: string;
  accessibilityLabel: string;
  inputA11yLabel: string;
};

export const DialogButton = <T extends SelectOption>({
  label,
  onChange,
  options,
  selectedValue,
  containerStyle,
  inputStyle,
  testID,
  accessibilityLabel,
  inputA11yLabel
}: DialogButtonProps<T>) => {
  const [isVisible, setVisibility] = React.useState(false);

  const showModal = () => setVisibility(true);

  const hideModal = () => setVisibility(false);

  return (
    <>
      <Portal>
        <Modal visible={isVisible} onDismiss={hideModal}>
          <SafeAreaView>
            <ScrollView>
              <RadioButton.Group
                onValueChange={(value) => {
                  onChange(value);
                  hideModal();
                }}
                value={selectedValue}
              >
                {options.map((option) => (
                  <RadioButton.Item
                    value={option.value}
                    label={option.label}
                    key={`::option<${option.value}`}
                  />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </Portal>
      <TouchableHighlight
        style={containerStyle}
        onPress={showModal}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
      >
        <View pointerEvents="none">
          <TextInput
            mode="outlined"
            label={label}
            value={
              options.find((option) => option.value === selectedValue)?.label
            }
            style={[inputStyle]}
            accessibilityLabel={inputA11yLabel}
            accessibilityRole="button"
          />
        </View>
      </TouchableHighlight>
    </>
  );
};
