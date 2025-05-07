import { Text, TextInput, View, Image } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import GradientButton from "../../components/GradientButton";
import { useAtomValue, useSetAtom } from "jotai";
import {
  isCodeValidAtom,
  codeAtom,
  fetchDefaultCategoriesAtom,
  defaultPreferencesAtom,
} from "../../components/GlobalStore";
import { Formik } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";
import React from "react";

const codeSchema = Yup.object({
  code: Yup.array()
    .of(Yup.string().matches(/^\d$/, "Input must be a digit \n").required())
    .length(4, "Code must be 4 digits"),
});

export default function PhoneCodeSubmitScreen() {
  function handleSubmit(values: { code: string[] }) {
    if (values.code.join("") === "1234") {
      router.navigate("/(actionTabs)/ProfileScreen");
    }
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-white">
      <Formik
        initialValues={{
          code: ["", "", "", ""],
          digit1: "",
          digit2: "",
          digit3: "",
          digit4: "",
        }}
        validationSchema={codeSchema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          setFieldValue,
        }) => (
          <>
            <View className="flex-1 items-center justify-start">
              <Image
                className="mt-24"
                source={require("../../assets/images/popFireBlack.png")}
                alt="Black popFire logo"
              />
            </View>
            <View className="w-3/4 flex-1 items-start justify-end">
              {errors.code ? (
                <Text className="text-xl text-red-500">{errors.code}</Text>
              ) : (
                <Text className="text-xl">Enter verification code :</Text>
              )}
            </View>
            <View className="flex-1 flex-row items-start justify-start gap-8 bg-white pt-6">
              <TextInput
                value={values.digit1}
                onChangeText={(text) => {
                  setFieldValue("digit1", text);
                  setFieldValue("code", [
                    text,
                    values.digit2,
                    values.digit3,
                    values.digit4,
                  ]);
                }}
                className="w-[56px] border-b-2 border-black pl-5 text-3xl text-black"
                keyboardType="phone-pad"
              />
              <TextInput
                value={values.digit2}
                onChangeText={(text) => {
                  setFieldValue("digit2", text);
                  setFieldValue("code", [
                    values.digit1,
                    text,
                    values.digit3,
                    values.digit4,
                  ]);
                }}
                className="w-[56px] border-b-2 border-black pl-5 text-3xl text-black"
                keyboardType="phone-pad"
              />
              <TextInput
                value={values.digit3}
                onChangeText={(text) => {
                  setFieldValue("digit3", text);
                  setFieldValue("code", [
                    values.digit1,
                    values.digit2,
                    text,
                    values.digit4,
                  ]);
                }}
                className="w-[56px] border-b-2 border-black pl-5 text-3xl text-black"
                keyboardType="phone-pad"
              />
              <TextInput
                value={values.digit4}
                onChangeText={(text) => {
                  setFieldValue("digit4", text);
                  setFieldValue("code", [
                    values.digit1,
                    values.digit2,
                    values.digit3,
                    text,
                  ]);
                }}
                className="w-[56px] border-b-2 border-black pl-5 text-3xl text-black"
                keyboardType="phone-pad"
              />
            </View>
            <View className="w-3/5 flex-1 items-center justify-start">
              <GradientButton onPress={handleSubmit}>
                <Text className="text-3xl font-bold tracking-widest text-white">
                  Submit
                </Text>
              </GradientButton>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
}
