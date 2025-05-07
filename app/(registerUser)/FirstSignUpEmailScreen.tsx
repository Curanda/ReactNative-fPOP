import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { router } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { CountryPicker } from "react-native-country-codes-picker";
import { Box } from "@/components/ui/box";
import GradientButton from "../../components/GradientButton";
import InactiveGradientButton from "../../components/InactiveGradientButton";
import { ShadowView } from "../../components/ShadowView";
import {
  phoneNumberAtom,
  User,
  newUserAtom,
  fetchUserByIdAtom,
  emailRegex,
  phoneRegex,
} from "../../components/GlobalStore";

const emailSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, "Email is invalid")
    .required("Email is required"),

  phone: Yup.string()
    .matches(phoneRegex, "Phone number is invalid")
    .required("Phone number is required"),
});

export default function FirstSignUpEmailScreen() {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const setPhoneNumber = useSetAtom(phoneNumberAtom);
  const createNewUser = useSetAtom(newUserAtom);
  const fetchUser = useSetAtom(fetchUserByIdAtom);

  async function handleSubmit(
    values: { email: string; phone: string },
    {
      setFieldError,
    }: { setFieldError: (field: string, message: string) => void }
  ) {
    let phoneNumber = (countryCode + values.phone).replace("+", "");

    const user = await fetchUser(phoneNumber);

    if (user) {
      setFieldError("phone", "Phone number already exists");
    } else {
      setPhoneNumber(phoneNumber);
      const newUser: User = {
        id: Number(phoneNumber),
        email: values.email,
        phone: phoneNumber,
        name: "",
        birthday: "",
        password: "",
        chosenDefaultPreferences: [],
        userDefinedPreferences: [],
        starredMovies: [],
        profilePicture: "",
        gender: "",
        favoriteDirectors: [],
        favoriteActors: [],
        religion: "",
        countryOfBirth: "",
        countryOfResidence: "",
        politicalOrientation: "",
        sexualOrientation: "",
        firstLanguage: "",
        secondLanguage: "",
        favoriteAnimal: "",
      };
      createNewUser(newUser);
      router.push("/(registerUser)/FirstSignUpBDayScreen");
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Formik
        initialValues={{ email: "", phone: "" }}
        validationSchema={emailSchema}
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
                  {errors.phone ? (
                    <Text className="text-red-500">{errors.phone}</Text>
                  ) : (
                    <Text>Provide phone number :</Text>
                  )}
                </View>
                <View className="flex w-full flex-row items-center justify-between gap-5 bg-white">
                  <ShadowView className="w-1/5 p-2">
                    <TouchableOpacity
                      onPress={() => setShow(true)}
                      className=""
                      style={{}}
                    >
                      <Text className="text-md text-black">{countryCode}</Text>
                    </TouchableOpacity>
                    <CountryPicker
                      lang="en"
                      show={show}
                      pickerButtonOnPress={(item) => {
                        setCountryCode(item.dial_code);
                        setShow(false);
                      }}
                    />
                  </ShadowView>
                  <ShadowView className="flex-1">
                    <TextInput
                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      value={values.phone}
                      keyboardType="phone-pad"
                      className="text-md p-2 text-black"
                      placeholder="Enter your number"
                    />
                  </ShadowView>
                </View>
              </View>
              <View className="flex w-full items-start justify-start bg-white gap-4">
                <View className="flex w-full items-start justify-start bg-white">
                  {errors.email ? (
                    <Text className="text-red-500">{errors.email}</Text>
                  ) : (
                    <Text>Provide email address :</Text>
                  )}
                </View>
                <ShadowView className="flex w-full items-start justify-start">
                  <TextInput
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                    className="text-md p-2 text-black"
                    placeholder="Enter your email"
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
