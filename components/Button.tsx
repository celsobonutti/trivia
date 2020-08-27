import React from "react";
import { TouchableOpacity, Text, Button } from "react-native";

type ButtonProps = {
  children: string;
  onPress: () => void;
};

const Button = ({ children, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
