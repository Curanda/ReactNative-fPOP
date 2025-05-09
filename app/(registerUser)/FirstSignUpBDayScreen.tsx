import { View, Text, TextInput, Image, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Box } from "@/components/ui/box";
import GradientButton from "../../components/GradientButton";
import InactiveGradientButton from "../../components/InactiveGradientButton";
import { ShadowView } from "../../components/ShadowView";
import { useSetAtom, useAtomValue } from "jotai";
import {
  fetchDefaultCategoriesAtom,
  nameRegex,
  newUserAtom,
} from "../../components/GlobalStore";

const nameSchema = Yup.object({
  name: Yup.string()
    .matches(nameRegex, "Name is invalid")
    .required("Name is required"),
  birthday: Yup.string().required("Birthday is required"),
});

export default function FirstSignUpBDayScreen() {
  const setUserDetails = useSetAtom(newUserAtom);
  const router = useRouter();
  const fetchDefaultCategories = useSetAtom(fetchDefaultCategoriesAtom);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  function handleSubmit(values: { name: string; birthday: string }) {
    fetchDefaultCategories();
    setUserDetails((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        name: values.name,
        birthday: values.birthday,
      };
    });
    router.push("/(registerUser)/InitialPreferencesScreen");
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Formik
        initialValues={{ name: "", birthday: "" }}
        validationSchema={nameSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <Box className="flex h-full bg-white items-center justify-start">
            <View className="flex items-center justify-start mb-0 h-12 mt-2">
              <Image
                className=""
                source={require("../../assets/images/popFireBlack.png")}
                alt="Black popFire logo"
              />
            </View>
            <View className="mt-24 flex w-4/5 h-10 flex-col items-start justify-start gap-10 bg-white">
              <View className="flex w-full items-start justify-start bg-white gap-4">
                <View className="flex w-full items-start justify-start bg-white">
                  {errors.name ? (
                    <Text className="text-red-500">{errors.name}</Text>
                  ) : (
                    <Text>What's your name :</Text>
                  )}
                </View>
                <View className="flex w-full flex-row items-center justify-between gap-5 bg-white">
                  <ShadowView className="flex-1">
                    <TextInput
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                      keyboardType="default"
                      className="text-md p-2 text-black"
                      placeholder="Enter your name"
                    />
                  </ShadowView>
                </View>
              </View>
              <View className="flex w-full items-start justify-start bg-white gap-4">
                <View className="flex w-full items-start justify-start bg-white">
                  <Text>Choose your date of birth :</Text>
                </View>
                <ShadowView className="flex w-full items-start justify-start">
                  <RNDateTimePicker
                    mode="date"
                    display="default"
                    value={
                      values.birthday ? new Date(values.birthday) : new Date()
                    }
                    onChange={(event, date) => {
                      if (date) {
                        handleChange("bday")(formatDate(date));
                      }
                    }}
                  />
                </ShadowView>
              </View>
            </View>

            {/* BUTTON */}
            <View className="mt-48 flex w-3/5 items-center justify-center">
              {isValid ? (
                <GradientButton onPress={handleSubmit}>
                  <Text className="text-3xl font-bold tracking-widest text-white">
                    Submit
                  </Text>
                </GradientButton>
              ) : (
                <InactiveGradientButton>
                  <Text className="text-3xl font-bold tracking-widest text-white">
                    Submit
                  </Text>
                </InactiveGradientButton>
              )}
            </View>
          </Box>
        )}
      </Formik>
    </SafeAreaView>
  );
}
