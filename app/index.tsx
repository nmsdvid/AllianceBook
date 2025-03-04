import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { useGetPeopleInfiniteQuery } from "@/services/peopleApi";

export default function App() {
  const { data, isFetching, fetchNextPage, refetch } =
    useGetPeopleInfiniteQuery({
      page: 1,
    });

  const people = data?.pages.flatMap((page) => page.results) ?? [];

  const handleRefetch = async () => {
    await refetch();
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={people}
        onRefresh={handleRefetch}
        refreshing={isFetching}
        onEndReached={() => !isFetching && fetchNextPage()}
        onEndReachedThreshold={0.8}
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
