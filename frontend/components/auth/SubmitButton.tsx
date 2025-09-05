import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  ColorValue,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface SubmitButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  icon?: keyof typeof Ionicons.glyphMap;
  colors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
}

export default function SubmitButton({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  icon,
  colors = ["#FF6B6B", "#FF8E53"],
}: SubmitButtonProps) {
  return (
    <TouchableOpacity
      className="rounded-xl overflow-hidden my-2"
      onPress={onPress}
      disabled={isLoading || disabled}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={colors}
        style={styles.gradient}
        className="flex-row"
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <Text className="text-white text-[18px] font-bold mr-2">
              {title}
            </Text>
            {icon && <Ionicons name={icon} size={20} color="#fff" />}
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
});
