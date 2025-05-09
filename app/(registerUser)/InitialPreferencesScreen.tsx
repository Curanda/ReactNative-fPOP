import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { Chip } from "react-native-paper";
import ChipAddPreference from "@/components/ChipAddPreference";
import GradientButton from "@/components/GradientButton";
import { defaultPreferencesAtom, newUserAtom } from "@/components/GlobalStore";

export default function InitialPreferencesScreen() {
  const defaultPreferences = useAtomValue(defaultPreferencesAtom);
  const setUserDetailsAtom = useSetAtom(newUserAtom);
  const [userPreferences, setUserPreferences] = useState<string[]>([]);
  const [newPreference, setNewPreference] = useState<string>("");
  const [customPreferences, setCustomPreferences] = useState<string[]>([]);

  function handleTogglePreference(preference: string) {
    if (userPreferences.includes(preference)) {
      setUserPreferences((prevPreferences) =>
        prevPreferences.filter((p) => p !== preference)
      );
    } else {
      setUserPreferences((prevPreferences) => [...prevPreferences, preference]);
    }
  }

  const handleFinalize = () => {
    setUserDetailsAtom((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        chosenDefaultPreferences: [...userPreferences],
        userDefinedPreferences: [...customPreferences],
      };
    });
    router.navigate("/(actionTabs)/ProfileScreen");
  };

  const handleDeleteCustomPreference = (preference: string) => {
    setCustomPreferences((prev) => prev.filter((p) => p !== preference));
  };

  useEffect(() => {
    if (
      newPreference &&
      !defaultPreferences.includes(newPreference) &&
      !customPreferences.includes(newPreference)
    ) {
      setCustomPreferences((prev) => [...prev, newPreference]);
    }
  }, [newPreference]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 bg-white">
          <ScrollView className="p-10">
            <Text className="text-2xl font-bold text-black mb-4">
              Select your preferences :
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-4">
              {defaultPreferences.map((preference) => (
                <Chip
                  key={preference}
                  mode="outlined"
                  selectedColor="black"
                  showSelectedCheck={true}
                  elevated={true}
                  selected={userPreferences.includes(preference)}
                  onPress={() => handleTogglePreference(preference)}
                  style={
                    userPreferences.includes(preference)
                      ? { backgroundColor: "#88C0AC" }
                      : { backgroundColor: "#F1C051" }
                  }
                >
                  {preference}
                </Chip>
              ))}
              {customPreferences.map((preference) => (
                <Chip
                  key={preference}
                  mode="outlined"
                  selectedColor="black"
                  icon="close"
                  elevated={true}
                  onPress={() => handleDeleteCustomPreference(preference)}
                  style={{ backgroundColor: "#88C0AC" }}
                >
                  {preference}
                </Chip>
              ))}
              <ChipAddPreference onSetNewPreference={setNewPreference} />
            </View>
            <View className="flex-1 w-3/5 items-center justify-start mt-4">
              <GradientButton onPress={handleFinalize}>
                <Text className="text-3xl font-bold tracking-widest text-white">
                  Finalize
                </Text>
              </GradientButton>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
