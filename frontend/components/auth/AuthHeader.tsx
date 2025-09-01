import React from "react";
import { View, Text, Image } from "react-native";

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  logoUri?: string;
}

export default function AuthHeader({
  title,
  subtitle,
  logoUri = "https://polarfood-awsbucket.s3.eu-north-1.amazonaws.com/logo.png",
}: AuthHeaderProps) {
  return (
    <View className="items-center justify-center my-8">
      <Image
        source={{ uri: logoUri }}
        resizeMode="cover"
        className="w-[90px] h-[90px] mb-2"
      />
      <Text className="text-[28px] font-bold text-white mb-[5px]">
        {title}
      </Text>
      {subtitle && <Text className="text-[16px] text-white/80 text-center px-5">{subtitle}</Text>}
    </View>
  );
}
