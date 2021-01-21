import React from "react";
import { View, Text, TextInput } from "react-native";
import { useMap } from "@roomservice/react";

const RoomServiceHome = () => {
  const [cafe, map] = useMap("myroom", "myform");

  if (!cafe)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View>
      <TextInput value={cafe.title} onChangeText={(text) => map?.set("title", text)}></TextInput>
      <TextInput value={cafe.description} onChangeText={(text) => map?.set("description", text)}></TextInput>
    </View>
  );
};

export { RoomServiceHome };
