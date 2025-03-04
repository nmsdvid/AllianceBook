import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";

export default function App() {
  const getCharacters = async () => {
    const url = "https://swapi.py4e.com/api/people";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log("json", json);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!a</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
