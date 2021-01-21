import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from "react-native";

import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import { RoomServiceProvider } from "@roomservice/react";
import { RoomServiceHome } from "./components/index";

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
  console.log("body...", body);
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

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
});

export default App;
