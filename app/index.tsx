import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { useGetPeopleInfiniteQuery } from "@/services/peopleApi";

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data, isFetching, fetchNextPage, refetch } =
    useGetPeopleInfiniteQuery({
      page: 1,
      search: searchQuery,
    });

  const people = data?.pages.flatMap((page) => page.results) ?? [];

  const handleRefetch = () => refetch();

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    refetch();
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column" }}>
        <TextInput
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search characters..."
          style={{ height: 50, width: "100%", marginTop: 150 }}
        />
      </View>
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
        estimatedItemSize={45}
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
