import { View, Text, TextInput } from "react-native";

interface CommentInputProps {
  label?: string;
  value: string;
  onChange: (text: string) => void;
  optional?: boolean;
  maxLength?: number;
  style?: string;
}

export function CommentInput({
  label = "💭 Avis",
  value,
  onChange,
  optional = true,
  maxLength = 500,
  style, 
}: CommentInputProps) {
  return (
    <View className={style}>
      <Text className="text-lg font-semibold text-gray-800 mb-3">
        {label}{" "}
        {optional && <Text className="text-sm font-normal text-gray-600">(optionnel)</Text>}
      </Text>

      <TextInput
        className="bg-gray-100 rounded-xl p-4 text-base text-gray-800 border border-gray-200"
        placeholder="Partagez votre expérience, vos plats préférés, l'ambiance..."
        value={value}
        onChangeText={onChange}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
        maxLength={maxLength}
      />

      <Text className="text-xs text-gray-500 mt-1 text-right">
        {value.length}/{maxLength}
      </Text>
    </View>
  );
}
