import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { useGetPeopleQuery } from "@/services/peopleApi";

export default function App() {
  const { data, error, isLoading } = useGetPeopleQuery({
    page: 1,
  });

  console.log(data);

  return (
    <View style={styles.container}>
      <FlashList
        data={data?.people}
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
