import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { cssInterop } from "nativewind";
cssInterop(Image, { className: "style" });

interface ItemProps {
  item: {
    name: string;
    url: string;
  };
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Character: React.FC<ItemProps> = ({ item }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacterImage = async () => {
      try {
        // Super hacky way of extracting the ID from the URL, May the Force be with you.
        const characterId = item.url.split("/").slice(-2, -1)[0];
        const response = await fetch(
          `https://akabab.github.io/starwars-api/api/id/${characterId}.json`,
        );
        const data = await response.json();
        setImageUrl(data.image);
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageUrl(null);
      }
    };

    fetchCharacterImage();
  }, [item]);

  return (
    <View className="mb-10 rounded border border-yellow-900">
      <View className="flex-row p-4">
        <View>
          {imageUrl ? (
            <Image
              recyclingKey={item?.name}
              source={imageUrl}
              placeholder={{ blurhash }}
              className="w-16 h-16 rounded"
              contentFit="cover"
            />
          ) : (
            <View className="w-16 h-16 bg-gray-800 rounded items-center justify-center">
              <Text className="text-yellow-600">No image</Text>
            </View>
          )}
        </View>

        <View className="ml-5">
          <Text className="text-yellow-600 font-bold text-2xl">
            {item.name}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Character;
