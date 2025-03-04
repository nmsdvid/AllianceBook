import React, { useState } from "react";
import { TextInput } from "react-native";

interface TextInputProps {
  handleChange: (value: string) => void;
  placeholder?: string;
}

const GenericTextInput: React.FC<TextInputProps> = ({
  handleChange,
  placeholder = "",
}) => {
  const [value, setValue] = useState("");

  const handleTextChange = (text: string) => {
    setValue(text);
    handleChange(text);
  };

  return (
    <TextInput
      value={value}
      onChangeText={handleTextChange}
      placeholder={placeholder}
      className={` h-56 w-full px-4 rounded-lg border border-gray-300 mb-4`}
    />
  );
};

export default GenericTextInput;
