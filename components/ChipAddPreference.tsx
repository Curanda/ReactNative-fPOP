import { useState } from "react";
import { Chip } from "react-native-paper";
import { TextInput } from "react-native";
export default function ChipAddPreference({
  onSetNewPreference,
}: {
  onSetNewPreference: (text: string) => void;
}) {
  const [isPressed, setIsPressed] = useState(false);
  const [inputText, setInputText] = useState("");

  return (
    <Chip
      mode="outlined"
      selectedColor="black"
      showSelectedCheck={false}
      icon="plus"
      elevated={true}
      selected={false}
      style={{ backgroundColor: !isPressed ? "#F1C051" : "white" }}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onTouchStart={() => {
        if (inputText.trim() !== "") {
          onSetNewPreference(inputText);
          setInputText("");
        }
      }}
    >
      <TextInput
        placeholder="Add a preference"
        className="text-black"
        value={inputText}
        onChangeText={(text) => {
          setInputText(text);
        }}
        returnKeyType="done"
      />
    </Chip>
  );
}
