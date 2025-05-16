import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { ShadowView } from "../../components/ShadowView";
import { CountryPicker } from "react-native-country-codes-picker";
import { useEffect, useState } from "react";
import GradientButton from "../../components/GradientButton";
import { useSetAtom, useAtomValue } from "jotai";
import {
  isPhoneValidAtom,
  phoneNumberAtom,
  isSetCreateUserAtom,
  fetchUserByIdAtom,
  validUserAtom,
  defaultCategoriesAtom,
  isDefaultCategoriesFetchedAtom,
} from "../../components/GlobalStore";
import { Formik } from "formik";
import * as Yup from "yup";
import InactiveGradientButton from "../../components/InactiveGradientButton";
import { useRouter } from "expo-router";
import axios from "axios";

const phoneRegExp = /^(\d{3,5}[-\.\s]?\d{4})$/;

const phoneSchema = Yup.object({
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
});

export default function PhoneValidationScreen() {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const setIsPhoneValid = useSetAtom(isPhoneValidAtom);
  const setPhoneNumber = useSetAtom(phoneNumberAtom);
  const setValidUser = useSetAtom(validUserAtom);
  const router = useRouter();
  const setDefaultCategories = useSetAtom(defaultCategoriesAtom);
  const setIsDefaultCategoriesFetched = useSetAtom(
    isDefaultCategoriesFetchedAtom
  );
  useEffect(() => {
    const fetchDefaultCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5013/api/DefaultCategory"
        );
        const data = res.data;
        const categories = data.map((category: any) => category.name);
        setDefaultCategories(categories);
        setIsDefaultCategoriesFetched(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDefaultCategories();
  }, []);

  async function handleSubmit(
    values: { phone: string },
    {
      setFieldError,
    }: { setFieldError: (field: string, message: string) => void }
  ) {
    let phoneNumber = (countryCode + values.phone).replace("+", "");
    try {
      const res = await axios.get(
        `http://localhost:5013/api/User/phone/${phoneNumber}`
      );
      if (res.status === 200) {
        setIsPhoneValid(true);
        setPhoneNumber(phoneNumber.toString());
        setValidUser(res.data);
        router.push("/PhoneCodeSubmitScreen");
      } else {
        setFieldError("phone", `${res.statusText}`);
      }
    } catch (error) {
      setFieldError("phone", "Phone number does not exist");
    }
  }

  return (
    <SafeAreaView className="flex flex-1 items-center justify-start bg-white">
      <Formik
        initialValues={{ phone: "" }}
        validationSchema={phoneSchema}
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
          <View>
            <View className="flex items-center justify-start">
              <Image
                className="mt-24"
                source={require("../../assets/images/popFireBlack.png")}
                alt="Black popFire logo"
              />
            </View>
            <View className="my-24 flex w-4/5 flex-col items-start justify-start gap-4 bg-white">
              <View className="flex w-full flex-row items-center justify-between bg-white">
                {errors.phone ? (
                  <Text className="text-red-500">{errors.phone}</Text>
                ) : (
                  <Text>My number is :</Text>
                )}

                <TouchableOpacity
                  onPress={() => {
                    router.navigate("/(registerUser)/FirstSignUpEmailScreen");
                  }}
                >
                  <Text className="text-[#E68F4B] underline">
                    Register new user
                  </Text>
                </TouchableOpacity>
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
            <View className="mx-auto flex w-3/5 items-center justify-center">
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
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
