import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useMap } from "@roomservice/react";
import Draggable from "react-native-draggable";

enum RoomObjectEnum {
  title = "title",
  description = "description",
  position = "position",
}

const Draggables = (props: any) => {
  const { roomServiceData, map } = props;

  if (!roomServiceData.position) return <Text>Loading...</Text>;

  const { x, y } = JSON.parse(roomServiceData.position);
  // Reduces the amount of updates by a smidgen
  let limiter = {
    max: 1,
    current: 0,
  };

  return (
    <View>
      <Draggable
        x={x}
        y={y}
        renderSize={100}
        renderColor="black"
        renderText={`${x} : ${y}`}
        isCircle
        onShortPressRelease={() => alert("touched!!")}
        onDrag={(event, gestureEvent) => {
          if (limiter.current < limiter.max) {
            limiter.current++;
            return;
          }
          map?.set(RoomObjectEnum.position, JSON.stringify({ x: Math.round(gestureEvent.moveX - 40), y: Math.round(gestureEvent.moveY - 150) }));
          limiter.current = 0;
        }}
      />
    </View>
  );
};

const RoomServiceHome = () => {
  const [roomServiceData, map] = useMap("RoomServiceDraggablesRoom", "RoomServiceDraggablesData");

  let props = { roomServiceData, map };

  if (!roomServiceData)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={{ justifyContent: "center", flexDirection: "column", height: "95%" }}>
      <View style={{ height: "10%" }}>
        <View style={styles.inputView}>
          <Text>Title Data:</Text>
          <TextInput value={roomServiceData.title} onChangeText={(text) => map?.set(RoomObjectEnum.title, text)}></TextInput>
        </View>
        <View style={styles.inputView}>
          <Text>Description Data:</Text>
          <TextInput value={roomServiceData.description} onChangeText={(text) => map?.set(RoomObjectEnum.description, text)}></TextInput>
        </View>
      </View>
      <View style={{ height: "90%" }}>
        <Draggables {...props} />
      </View>
    </View>
  );
};

export { RoomServiceHome };

export const Testables = {
  RoomServiceHome: RoomServiceHome,
  Draggables: Draggables,
};

const styles = StyleSheet.create({
  inputView: { flexDirection: "row", height: "100%", backgroundColor: "#abffc1", alignItems: "center", borderRadius: 10, margin: 10, padding: 10 },
});
