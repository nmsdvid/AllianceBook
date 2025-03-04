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
      placeholderTextColor="#666"
      className="h-12 w-full px-4 rounded border border-yellow-900 mb-4 bg-gray-900 text-gray-300"
    />
  );
};

export default GenericTextInput;
