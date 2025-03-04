import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";

export default function App() {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async () => {
    const url = "https://swapi.py4e.com/api/people";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log("json", json);
      setCharacters(json.results);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);
  return (
    <View style={styles.container}>
      <FlashList
        data={characters}
        style={{ width: 300 }}
        renderItem={({ item }) => (
          <View
            style={{ backgroundColor: "grey", height: 150 }}
            key={item.name}
          >
            <Text>{item.name}</Text>
          </View>
        )}
        estimatedItemSize={10}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
  },
});
