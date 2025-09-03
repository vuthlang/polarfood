import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";

interface RatingSliderInputProps {
  value: number;
  onChange: (rating: number) => void;
  max?: number;
}

export function RatingSliderInput({ value, onChange, max = 10 }: RatingSliderInputProps) {
  const getRatingColor = (rating: number) => {
    if (rating <= 3) return "#EF4444";
    if (rating <= 6) return "#F59E0B";
    if (rating <= 8) return "#10B981";
    return "#059669";
  };

  const getRatingEmoji = (rating: number) => {
    if (rating <= 2) return "😞";
    if (rating <= 4) return "😐";
    if (rating <= 6) return "🙂";
    if (rating <= 8) return "😊";
    return "🤩";
  };

  const color = getRatingColor(value);

  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-gray-800 mb-3">⭐ Note sur {max}</Text>

      <View className="bg-gray-50 rounded-xl p-4">
        <View className="flex-row items-center justify-center mb-4">
          <Text className="text-4xl mr-3">{getRatingEmoji(value)}</Text>
          <Text className="text-3xl font-bold" style={{ color }}>
            {value}/{max}
          </Text>
        </View>

        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={max}
          step={0.5}
          value={value}
          onValueChange={onChange}
          minimumTrackTintColor={color}
          maximumTrackTintColor="#E5E7EB"
          thumbTintColor={color}
        />

        <View className="flex-row justify-between mt-2">
          <Text className="text-xs text-gray-500">Décevant</Text>
          <Text className="text-xs text-gray-500">Excellent</Text>
        </View>
      </View>
    </View>
  );
}
