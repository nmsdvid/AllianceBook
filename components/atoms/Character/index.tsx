import React from "react";
import { Text, View } from "react-native";

interface ItemProps {
  item: any;
}

const Character: React.FC<ItemProps> = ({ item }) => {
  return (
    <View
      style={{
        backgroundColor: "grey",
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <Text>{item.name}</Text>
    </View>
  );
};

export default Character;
