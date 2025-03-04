import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useGetPeopleInfiniteQuery } from "@/services/peopleApi";
import TextInput from "@/components/atoms/TextInput";
import FlashList from "@/components/molecules/FlashList";

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data, isFetching, fetchNextPage, refetch } =
    useGetPeopleInfiniteQuery({
      page: 1,
      search: searchQuery,
    });

  const people = data?.pages.flatMap((page) => page.results) ?? [];

  const handleRefetch = () => refetch();

  const handleInputChange = (text: string) => {
    setSearchQuery(text);
    refetch();
  };

  const renderItem = ({ item }: { item: any }) => (
    <View
      style={{
        backgroundColor: "grey",
        height: 150,
        justifyContent: "center",
        alignItems: "center",
      }}
      key={item.name}
    >
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column" }}>
        <TextInput
          handleChange={handleInputChange}
          placeholder="Search characters..."
        />
      </View>
      <FlashList
        data={people}
        onRefresh={handleRefetch}
        refreshing={isFetching}
        onEndReached={fetchNextPage}
        renderItem={renderItem}
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
