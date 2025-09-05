import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Option = {
  id: string;
  label: string;
  icon?: string;
};

interface SingleSelectProps {
  label: string;
  options: Option[];
  selected: string | null;
  onChange: (id: string) => void;
}

export function SingleSelect({ label, options, selected, onChange }: SingleSelectProps) {
  return (
    <View className="my-3">
      <Text className="text-lg font-semibold text-gray-800 mb-3">{label}</Text>
      <View className="flex-row flex-wrap">
        {options.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <TouchableOpacity
              key={opt.id}
              onPress={() => onChange(opt.id)}
              className={`flex-row items-center m-1 px-4 py-2 rounded-full border 
                ${isSelected ? "bg-primary border-primary" : "bg-gray-100 border-gray-200"}`}
            >
              {opt.icon && (
                <Ionicons
                  name={opt.icon as any}
                  size={16}
                  color="#666"
                />
              )}
              <Text
                className={`ml-2 text-sm font-medium text-gray-700"
                  }`}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
