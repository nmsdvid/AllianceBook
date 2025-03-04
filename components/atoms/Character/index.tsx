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
    <View className="bg-gray-600 mb-10">
      {imageUrl ? (
        <Image
          recyclingKey={item?.name}
          source={imageUrl}
          placeholder={{ blurhash }}
          className="w-32 h-32 rounded-full"
        />
      ) : (
        <Text>No image available</Text>
      )}
      <Text>{item.name}</Text>
    </View>
  );
};

export default Character;
