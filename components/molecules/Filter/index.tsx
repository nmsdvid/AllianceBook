import { useState } from "react";
import { View, Pressable, Text } from "react-native";

type FilterProps = {
  options: string[];
  onSelect: (option: string) => void;
};

const Filter: React.FC<FilterProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    if (onSelect) onSelect(option);
  };

  return (
    <View className="flex-row flex-wrap gap-2 mb-4">
      {options.map((option) => (
        <Pressable
          key={option}
          onPress={() => handleSelect(option)}
          className={`px-4 py-2 rounded-lg border border-yellow-900 ${
            selectedOption === option ? "bg-yellow-600" : "border-yellow-900"
          }`}
        >
          <Text
            className={`capitalize font-semibold ${
              selectedOption === option ? "text-gray-900" : "text-yellow-600"
            }`}
          >
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Filter;
