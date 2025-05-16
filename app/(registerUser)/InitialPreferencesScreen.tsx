import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Chip } from "react-native-paper";
import ChipAddPreference from "@/components/ChipAddPreference";
import GradientButton from "@/components/GradientButton";
import {
  defaultPreferencesAtom,
  isUserCreatedAtom,
  newUserAtom,
  User,
  defaultCategoriesAtom,
  isDefaultCategoriesFetchedAtom,
} from "@/components/GlobalStore";

export default function InitialPreferencesScreen() {
  const defaultPreferences = useAtomValue(defaultPreferencesAtom);
  const [userDetails, setUserDetails] = useAtom(newUserAtom);
  const [userPreferences, setUserPreferences] = useState<string[]>([]);
  const [newPreference, setNewPreference] = useState<string>("");
  const [customPreferences, setCustomPreferences] = useState<string[]>([]);
  const setIsUserCreated = useSetAtom(isUserCreatedAtom);

  function handleTogglePreference(preference: string) {
    if (userPreferences.includes(preference)) {
      setUserPreferences((prevPreferences) =>
        prevPreferences.filter((p) => p !== preference)
      );
    } else {
      setUserPreferences((prevPreferences) => [...prevPreferences, preference]);
    }
  }

  const handleFinalize = async () => {
    setUserDetails((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        chosenDefaultPreferences: [...userPreferences],
        userDefinedPreferences: [...customPreferences],
      };
    });
    const user = await postUser();
    if (user) {
      setIsUserCreated(true);
      router.navigate("/(actionTabs)/ProfileScreen");
    } else {
      Alert.alert("Error", "Failed to create user. Please try again.", [
        { text: "OK" },
      ]);
    }
  };

  async function postUser() {
    const data = {
      name: userDetails?.name,
      email: userDetails?.email,
      phone: userDetails?.phone,
      password: "test",
      birthday: userDetails?.birthday,
      firstLanguage: "english",
      chosenDefaultPreferences: [...userPreferences],
      userDefinedPreferences: [...customPreferences],
    };

    console.log("Sending user data:", JSON.stringify(data, null, 2));

    try {
      const response = await axios.post(
        "http://localhost:5013/api/User/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("User created successfully:", response.data);
      return true;
    } catch (error: any) {
      console.error("Full error object:", error);
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("Error response headers:", error.response?.headers);

      if (error.response?.data?.errors) {
        console.log("Validation errors:", error.response.data.errors);
      }

      let errorMessage = "Failed to create user.";
      if (error.response?.data) {
        try {
          const errorData =
            typeof error.response.data === "string"
              ? JSON.parse(error.response.data)
              : error.response.data;
          errorMessage = `Server error: ${JSON.stringify(errorData, null, 2)}`;
        } catch (e) {
          errorMessage = `Server error: ${error.response.data}`;
        }
      }

      Alert.alert("Error", errorMessage, [{ text: "OK" }]);
      return false;
    }
  }

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

[
  {
    id: 1234567890,
    name: "other Jose",
    email: "john@doe.com",
    phone: "001234567890",
    password: "password",
    birthday: "1990-01-01T00:00:00",
    firstLanguage: "english",
  },
];
