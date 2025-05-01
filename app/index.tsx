import React from "react";
import Gradient from "@/assets/Icons/Gradient";
import DocumentData from "@/assets/Icons/DocumentData";
import LightBulbPerson from "@/assets/Icons/LightbulbPerson";
import Rocket from "@/assets/Icons/Rocket";
import Logo from "@/assets/Icons/Logo";
import { Box } from "@/components/ui/box";
import { ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { useAtomValue } from "jotai";
import { isLoggedInAtom } from "@/components/GlobalStore";
import PhoneValidationScreen from "./(signIn)/PhoneValidationScreen";
import ActionScreen from "./(actionTabs)/ActionScreen";
import { useRouter, Redirect } from "expo-router";

export default function Home() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  if (!isLoggedIn) {
    return <Redirect href="/(signIn)/PhoneValidationScreen" />;
  } else {
    return <Redirect href="/(actionTabs)/ActionScreen" />;
  }
}
