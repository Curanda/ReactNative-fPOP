import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView, TextInput } from "react-native";
import { Chip } from "react-native-paper";
import ChipAddPreference from "@/components/ChipAddPreference";
export default function ProfileScreen() {
  const [newPreference, setNewPreference] = useState("");

  useEffect(() => {
    console.log(newPreference);
  }, [newPreference]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white items-center justify-center">
        <ChipAddPreference onSetNewPreference={setNewPreference} />
      </View>
    </SafeAreaView>
  );
}
