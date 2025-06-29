import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { List, Divider, Card, Chip } from "react-native-paper";
import ChipAddPreference from "@/components/ChipAddPreference";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import {
  validUserAtom,
  User,
  isUserCreatedAtom,
  newUserAtom,
  starredMoviesAtom,
} from "@/components/GlobalStore";
import { ArchDivider } from "@/assets/arch-divider";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Button } from "@/components/ui/button";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import {
  defaultPreferencesAtom,
  userPreferencesAtom,
  fetchDefaultCategoriesAtom,
} from "@/components/GlobalStore";
import { useAtomValue, useSetAtom } from "jotai";
import { updateUser } from "@/utilities/api-functions";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const defaultProfilePicture =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngfind.com%2Fpngs%2Fm%2F610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png&f=1&nofb=1&ipt=d42742362f627ab50378d1c50487e256c046c11cca1ba05c36ad52cae9a59192";

export default function ProfileScreen() {
  const userData = useAtomValue(isUserCreatedAtom)
    ? useAtomValue(newUserAtom)
    : useAtomValue(validUserAtom);

  const setUserData = useAtomValue(isUserCreatedAtom)
    ? useSetAtom(newUserAtom)
    : useSetAtom(validUserAtom);
  const fetchDefaultCategories = useSetAtom(fetchDefaultCategoriesAtom);

  useEffect(() => {
    fetchDefaultCategories();
  }, []);

  const userAge =
    userData && userData.birthday
      ? new Date().getFullYear() - new Date(userData.birthday).getFullYear()
      : null;

  const [expandedPreferences, setExpandedPreferences] = useState(false);

  const handlePress = () => setExpandedPreferences(!expandedPreferences);

  if (userData && userData.profilePicture === null) {
    userData.profilePicture = defaultProfilePicture;
  }

  useEffect(() => {
    if (userData) {
      try {
        const res = updateUser(userData);
        console.log("User update result:", res);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  }, [userData]);

  // ------------------------------------------------------------ PREFERENCES

  const defaultPreferences = useAtomValue(defaultPreferencesAtom);
  const [newPreference, setNewPreference] = useState<string>("");

  function handleTogglePreference(preference: string) {
    setUserData((prev) => {
      if (!prev) return null;
      const currentPreferences = prev.chosenDefaultPreferences || [];
      const newPreferences = currentPreferences.includes(preference)
        ? currentPreferences.filter((p) => p !== preference)
        : [...currentPreferences, preference];
      return { ...prev, chosenDefaultPreferences: newPreferences };
    });
  }

  const handleDeleteCustomPreference = (preference: string) => {
    setUserData((prev) => {
      if (!prev) return null;
      const currentPrefs = prev.userDefinedPreferences || [];
      return {
        ...prev,
        userDefinedPreferences: currentPrefs.filter((p) => p !== preference),
      };
    });
  };

  useEffect(() => {
    if (newPreference && !defaultPreferences.includes(newPreference)) {
      setUserData((prev) => {
        if (!prev) return null;
        const customPrefs = prev.userDefinedPreferences || [];
        if (!customPrefs.includes(newPreference)) {
          return {
            ...prev,
            userDefinedPreferences: [...customPrefs, newPreference],
          };
        }
        return prev;
      });
    }
  }, [newPreference, defaultPreferences, setUserData]);

  // ------------------------------------------------------------ STARRED MOVIES

  const setStarredMovies = useSetAtom(starredMoviesAtom);
  // setStarredMovies(userData?.starredMovies || []);

  // ------------------------------------------------------------ EDIT PROFILE

  const [editing, setEditing] = useState<keyof User | "">("");
  const [editedValue, setEditedValue] = useState<string>("");
  const [editedBirthday, setEditedBirthday] = useState<string>("");

  const passwordDigits = () => {
    if (!userData) return "";
    let digits = "";
    for (let i = 0; i < userData.password.length; i++) {
      digits += "*";
    }
    return digits;
  };

  const submitEdit = () => {
    if (editing) {
      setUserData((prev) => {
        if (!prev) return null;
        const updated = { ...prev };
        if (editing === "name" && editedValue !== "") {
          updated.name = editedValue;
        }
        if (editing === "name" && editedBirthday !== "") {
          updated.birthday = editedBirthday;
        } else if (editing !== "name" && editedValue !== "") {
          updated[editing as keyof User] = editedValue as any;
        }
        if (editing === "profilePicture" && editedValue !== "") {
          updated.profilePicture = editedValue;
        }
        return updated;
      });
    }
    setEditing("");
    setEditedValue("");
    setEditedBirthday("");
  };

  const cancelEdit = () => {
    setEditing("");
    setEditedValue("");
    setEditedBirthday("");
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.log("A date has been picked: ", date);
    setEditedBirthday(date.toISOString().split("T")[0]);
    hideDatePicker();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView className="bg-[#D9D9D9] pb-10">
          <SafeAreaView className="bg-white">
            <VStack space="xs">
              <Center className="h-auto w-full bg-white gap-4 pt-12">
                {editing === "profilePicture" ? (
                  <VStack className="gap-4 items-center">
                    <TextInput
                      className="text-lg font-bold font-[montserrat]"
                      maxLength={500}
                      placeholder="Enter new picture URL"
                      keyboardType="url"
                      autoCapitalize="none"
                      autoComplete="url"
                      autoCorrect={true}
                      onChangeText={(text) => {
                        setEditedValue(text);
                      }}
                      value={editedValue}
                      returnKeyType="done"
                    />
                    <View className="flex-row justify-center items-center">
                      <Button
                        onTouchStart={submitEdit}
                        className="rounded-full px-[5px] ml-2 bg-white border border-black"
                      >
                        <Feather name="check" size={24} color="black" />
                      </Button>
                      <Button
                        onTouchStart={cancelEdit}
                        className="rounded-full px-[5px] mx-4 bg-white border border-black"
                      >
                        <Feather name="x" size={24} color="black" />
                      </Button>
                    </View>
                  </VStack>
                ) : (
                  <Box className="flex justify-center items-center relative">
                    <Image
                      alt="Profile Picture"
                      source={{
                        uri: userData?.profilePicture || defaultProfilePicture,
                      }}
                      className="w-32 h-32 rounded-full border border-gray-500"
                    />
                    <Button
                      onPress={() => {
                        setEditing("profilePicture");
                      }}
                      className="absolute bottom-20 -right-2 rounded-full px-[5px]"
                      variant="solid"
                    >
                      <EvilIcons name="pencil" size={24} color="white" />
                    </Button>
                  </Box>
                )}

                {editing === "name" ? (
                  <VStack className="gap-4 items-center">
                    <HStack className="gap-2 items-center">
                      <TextInput
                        className="text-lg font-bold font-[montserrat]"
                        maxLength={20}
                        placeholder={userData?.name || ""}
                        keyboardType="default"
                        autoCapitalize="words"
                        autoComplete="name"
                        autoCorrect={true}
                        onChangeText={(text) => {
                          setEditedValue(text);
                        }}
                        value={editedValue}
                        returnKeyType="done"
                      />
                    </HStack>
                    <HStack className="gap-2 items-center">
                      <TextInput
                        className="text-lg font-bold font-[montserrat]"
                        maxLength={10}
                        onTouchStart={showDatePicker}
                        placeholder={
                          userData?.birthday || editedBirthday || "YYYY-MM-DD"
                        }
                        editable={false}
                        value={editedBirthday}
                        returnKeyType="done"
                      />
                      <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        locale="sv_SE"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                      />
                    </HStack>
                    <View className="flex-row justify-center items-center">
                      <Button
                        onTouchStart={submitEdit}
                        className="rounded-full px-[5px] ml-2 bg-white border border-black"
                      >
                        <Feather name="check" size={24} color="black" />
                      </Button>
                      <Button
                        onTouchStart={cancelEdit}
                        className="rounded-full px-[5px] mx-4 bg-white border border-black"
                      >
                        <Feather name="x" size={24} color="black" />
                      </Button>
                    </View>
                  </VStack>
                ) : (
                  <HStack className="gap-4 items-center">
                    <Text className="text-2xl font-bold font-[montserrat]">
                      {userData?.name}, {userAge}
                    </Text>
                    <Button
                      onPress={() => {
                        setEditing("name");
                      }}
                      className="rounded-full px-[5px] mx-4 bg-white border border-black"
                    >
                      <EvilIcons name="pencil" size={24} color="black" />
                    </Button>
                  </HStack>
                )}
                <ArchDivider />
              </Center>
            </VStack>

            <VStack
              space="xs"
              className="flex-col justify-center items-center gap-4 pt-6 bg-[#D9D9D9]"
            >
              <Card style={{ backgroundColor: "white" }} mode="elevated">
                <Card.Content>
                  <VStack space="xs">
                    {editing === "email" ? (
                      <HStack className="gap-4 items-center justify-between py-4 pl-4">
                        <TextInput
                          className="text-md text-black font-semibold"
                          placeholder={userData?.email || ""}
                          maxLength={30}
                          keyboardType="email-address"
                          onChangeText={(text) => {
                            setEditedValue(text);
                          }}
                          value={editedValue}
                          returnKeyType="done"
                        />
                        <View className="flex-row justify-center items-center">
                          <Button
                            onTouchStart={submitEdit}
                            className="rounded-full px-[5px] ml-2 bg-white border border-black"
                          >
                            <Feather name="check" size={24} color="black" />
                          </Button>
                          <Button
                            onTouchStart={cancelEdit}
                            className="rounded-full px-[5px] mx-4 bg-white border border-black"
                          >
                            <Feather name="x" size={24} color="black" />
                          </Button>
                        </View>
                      </HStack>
                    ) : (
                      <HStack className="gap-2 items-center justify-between">
                        <List.Item
                          title="Email"
                          description={userData?.email || ""}
                        />
                        <Button
                          onPress={() => {
                            setEditing("email");
                          }}
                          className="rounded-full px-[5px] mx-4 bg-white border border-black"
                        >
                          <EvilIcons name="pencil" size={24} color="black" />
                        </Button>
                      </HStack>
                    )}
                    <Divider
                      style={{
                        height: 1,
                        width: 300,
                        backgroundColor: "black",
                      }}
                    />
                    {editing === "phone" ? (
                      <HStack className="gap-4 items-center justify-between py-4 pl-4">
                        <TextInput
                          className="text-md font-bold font-[montserrat]"
                          maxLength={15}
                          keyboardType="phone-pad"
                          placeholder={userData?.phone.replace("00", "+") || ""}
                          onChangeText={(text) => {
                            setEditedValue(text);
                          }}
                          value={editedValue}
                          returnKeyType="done"
                        />
                        <View className="flex-row justify-center items-center">
                          <Button
                            onTouchStart={submitEdit}
                            className="rounded-full px-[5px] ml-2 bg-white border border-black"
                          >
                            <Feather name="check" size={24} color="black" />
                          </Button>
                          <Button
                            onTouchStart={cancelEdit}
                            className="rounded-full px-[5px] mx-4 bg-white border border-black"
                          >
                            <Feather name="x" size={24} color="black" />
                          </Button>
                        </View>
                      </HStack>
                    ) : (
                      <HStack className="gap-2 items-center justify-between">
                        <List.Item
                          title="Phone"
                          description={userData?.phone.replace("00", "+") || ""}
                        />
                        <Button
                          onTouchStart={() => {
                            setEditing("phone");
                          }}
                          className="rounded-full px-[5px] mx-4 bg-white border border-black"
                        >
                          <EvilIcons name="pencil" size={24} color="black" />
                        </Button>
                      </HStack>
                    )}
                    <Divider
                      style={{
                        height: 1,
                        width: 300,
                        backgroundColor: "black",
                      }}
                    />
                    {editing === "password" ? (
                      <HStack className="gap-4 items-center justify-between py-4 pl-4">
                        <TextInput
                          className="text-md font-bold font-[montserrat]"
                          placeholder={userData?.password || ""}
                          passwordRules={""}
                          autoCapitalize="none"
                          spellCheck={false}
                          secureTextEntry={true}
                          onChangeText={(text) => {
                            setEditedValue(text);
                          }}
                          value={editedValue}
                          returnKeyType="done"
                        />
                        <View className="flex-row justify-center items-center">
                          <Button
                            onTouchStart={submitEdit}
                            className="rounded-full px-[5px] ml-2 bg-white border border-black"
                          >
                            <Feather name="check" size={24} color="black" />
                          </Button>
                          <Button
                            onTouchStart={cancelEdit}
                            className="rounded-full px-[5px] mx-4 bg-white border border-black"
                          >
                            <Feather name="x" size={24} color="black" />
                          </Button>
                        </View>
                      </HStack>
                    ) : (
                      <HStack className="gap-2 items-center justify-between">
                        <List.Item
                          title="Password"
                          description={passwordDigits()}
                        />
                        <Button
                          onTouchStart={() => {
                            setEditing("password");
                          }}
                          className="rounded-full px-[5px] mx-4 bg-white border border-black"
                        >
                          <EvilIcons name="pencil" size={24} color="black" />
                        </Button>
                      </HStack>
                    )}
                    <Divider
                      style={{
                        height: 1,
                        width: 300,
                        backgroundColor: "black",
                      }}
                    />
                    <List.Accordion
                      title="Preferences"
                      expanded={expandedPreferences}
                      onPress={handlePress}
                      style={{
                        backgroundColor: "white",
                      }}
                    >
                      <View className="flex-row flex-wrap gap-2 mb-4">
                        {defaultPreferences.map((preference) => (
                          <Chip
                            key={preference}
                            mode="outlined"
                            selectedColor="black"
                            showSelectedCheck={true}
                            elevated={true}
                            selected={userData?.chosenDefaultPreferences?.includes(
                              preference
                            )}
                            onPress={() => handleTogglePreference(preference)}
                            style={
                              userData?.chosenDefaultPreferences.includes(
                                preference
                              )
                                ? { backgroundColor: "#88C0AC" }
                                : { backgroundColor: "#F1C051" }
                            }
                          >
                            {preference}
                          </Chip>
                        ))}
                        {userData?.userDefinedPreferences?.map((preference) => (
                          <Chip
                            key={preference}
                            mode="outlined"
                            selectedColor="black"
                            icon="close"
                            elevated={true}
                            onPress={() =>
                              handleDeleteCustomPreference(preference)
                            }
                            style={{ backgroundColor: "#88C0AC" }}
                          >
                            {preference}
                          </Chip>
                        ))}
                        <ChipAddPreference
                          onSetNewPreference={setNewPreference}
                        />
                      </View>
                    </List.Accordion>
                  </VStack>
                </Card.Content>
              </Card>
            </VStack>
          </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
