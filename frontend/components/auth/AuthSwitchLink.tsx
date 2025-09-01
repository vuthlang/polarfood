import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface AuthSwitchLinkProps {
  message: string;
  linkText: string;
  color: string;
  onPress: () => void;
}

export default function AuthSwitchLink({ message, linkText, onPress, color }: AuthSwitchLinkProps) {
  return (
    <View className="flex-row justify-center items-center mt-2.5">
      <Text className="text-[#666] text-[16px]">
        {message}&nbsp;
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Text className="text-[16px] font-bold" style={{ color: `#${color}` }}>
          {linkText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
