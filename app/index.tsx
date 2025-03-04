import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { useState } from "react";
import { useGetPeopleInfiniteQuery } from "@/services/peopleApi";
import TextInput from "@/components/atoms/TextInput";
import FlashList from "@/components/molecules/FlashList";
import Character from "@/components/atoms/Character";
import Filter from "@/components/molecules/Filter";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("all");

  const { data, isFetching, fetchNextPage, refetch } =
    useGetPeopleInfiniteQuery({
      page: 1,
      search: searchQuery,
    });

  const people = data?.pages.flatMap((page) => page.results) ?? [];

  const filteredPeople = people.filter((person) => {
    return selectedGender === "all" || person.gender === selectedGender;
  });

  const handleRefetch = () => refetch();

  const handleInputChange = (text: string) => {
    setSearchQuery(text);
    refetch();
  };

  return (
    <SafeAreaView className="bg-gray-900 flex-1">
      <View className="px-4 py-2">
        <Text className="text-yellow-600 text-2xl font-bold text-center mb-4">
          Star Wars
        </Text>
        <TextInput handleChange={handleInputChange} placeholder="Search..." />
        <Filter
          options={["all", "male", "female", "n/a"]}
          onSelect={setSelectedGender}
        />
      </View>

      <View className="px-4 flex-1">
        <FlashList
          data={filteredPeople}
          onRefresh={handleRefetch}
          refreshing={isFetching}
          onEndReached={fetchNextPage}
          renderItem={({ item }) => <Character item={item} />}
        />
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
