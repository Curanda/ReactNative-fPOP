import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useColorScheme } from "@/components/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot, Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { isLoggedInAtom } from "@/components/GlobalStore";
import { Image, View, Text } from "react-native";
import "../global.css";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "gluestack",
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/montserrat.ttf"),
    ...FontAwesome.font,
  });

  const [styleLoaded, setStyleLoaded] = useState(false);
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // useLayoutEffect(() => {
  //   setStyleLoaded(true);
  // }, [styleLoaded]);

  // if (!loaded || !styleLoaded) {
  //   return null;
  // }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider>
      <GluestackUIProvider mode={colorScheme === "dark" ? "dark" : "light"}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                headerShown: false,
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
                },
                headerTitle: () =>
                  colorScheme !== "dark" ? (
                    <Image
                      className="mt-4"
                      source={require("../assets/images/popFireBlack.png")}
                      style={{ width: 120, height: 40, resizeMode: "contain" }}
                    />
                  ) : (
                    <View className="flex-row justify-center items-center mt-4">
                      <Image
                        source={require("../assets/images/popFireLogo.png")}
                        style={{
                          width: 50,
                          height: 50,
                          resizeMode: "contain",
                        }}
                      />
                      <Text className="text-3xl font-bold text-white">
                        firePOP
                      </Text>
                    </View>
                  ),
                headerTitleAlign: "center",
              }}
            >
              <Slot />
            </Stack>
          </GestureHandlerRootView>
        </ThemeProvider>
      </GluestackUIProvider>
    </PaperProvider>
  );
}
