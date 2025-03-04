import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { useState } from "react";
import { useGetPeopleInfiniteQuery } from "@/services/peopleApi";
import TextInput from "@/components/atoms/TextInput";
import FlashList from "@/components/molecules/FlashList";
import Character from "@/components/atoms/Character";
import { SafeAreaView } from "react-native-safe-area-context";

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

  return (
    <SafeAreaView className="bg-white flex-1">
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
        renderItem={({ item }) => <Character item={item} />}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
