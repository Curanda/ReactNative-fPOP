import { View, Text } from "react-native";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDownIcon } from "./ui/icon";
import { ShadowView } from "./ShadowView";

type SelectDropDownProps = {
  options: string[];
  value: string;
  label: string;
};

export default function SelectDropDown({
  options,
  value,
  label,
}: SelectDropDownProps) {
  const [selectedValue, setSelectedValue] = useState(value);

  const randomId = function (length = 6) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  };

  return (
    <View className="flex w-full flex-col items-start justify-center bg-white gap-4 mb-12">
      <View className="flex w-full items-start justify-start bg-white">
        <Text>What's your {label} :</Text>
      </View>
      <ShadowView className="flex-1">
        <Select onValueChange={(value) => setSelectedValue(value)}>
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Select option" />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {options.map((option) => (
                <SelectItem
                  key={
                    option === "Prefer not to say" || "Other"
                      ? randomId()
                      : option
                  }
                  label={option}
                  value={option}
                />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      </ShadowView>
    </View>
  );
}
