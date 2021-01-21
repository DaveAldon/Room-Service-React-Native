import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { RoomServiceProvider } from "@roomservice/react";
import { RoomServiceHome } from "./components/RoomServiceHome/index";

async function AuthCheck(params) {
  const response = await fetch("http://172.16.29.51:3000/api/roomservice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      room: params.room,
      user: CreateGuid(),
    }),
  });

  if (response.status === 401) {
    throw new Error("Unauthorized!");
  }

  const body = await response.json();
  return body;
}

const App = () => {
  return (
    <RoomServiceProvider
      clientParameters={{
        auth: AuthCheck,
      }}
    >
      <SafeAreaView>
        <RoomServiceHome />
      </SafeAreaView>
    </RoomServiceProvider>
  );
};

function CreateGuid() {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

const styles = StyleSheet.create({});

export default App;
