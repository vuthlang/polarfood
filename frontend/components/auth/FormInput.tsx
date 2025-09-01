import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FormInputProps extends TextInputProps {
  icon: keyof typeof Ionicons.glyphMap;
  error?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  toggleSecureEntry?: () => void;
  showSecure?: boolean;
}

export default function FormInput({
  icon,
  error,
  value,
  onChangeText,
  secureTextEntry,
  toggleSecureEntry,
  showSecure,
  ...rest
}: FormInputProps) {
  return (
    <View className="mb-5">
      <View className="flex-row items-center bg-[#f8f9fa] rounded-xl px-[15px] h-[55px] border border-[#e9ecef]">
        <Ionicons name={icon} size={20} color="#666" className="mr-3" />
        <TextInput
          className="flex-1 text-[16px] text-[#333]"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          {...rest}
        />
        {toggleSecureEntry && (
          <TouchableOpacity onPress={toggleSecureEntry} className="p-[5px]">
            <Ionicons
              name={showSecure ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-[#FF6B6B] text-[12px] mt-1 ml-1">{error}</Text>}
    </View>
  );
}
