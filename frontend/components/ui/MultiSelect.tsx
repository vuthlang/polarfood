import { View, Text, TouchableOpacity } from "react-native";

interface MultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  optional?: boolean;
}

export function MultiSelect({ label, options, selected, onChange, optional }: MultiSelectProps) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <View className="my-3">
      <Text className="text-lg font-semibold text-gray-800 mb-3">
        {label}{" "}
        {optional && (
          <Text className="text-sm font-normal text-gray-600">(optionnel)</Text>
        )}
      </Text>
      <View className="flex-row flex-wrap">
        {options.map((opt) => {
          const isSelected = selected.includes(opt);
          return (
            <TouchableOpacity
              key={opt}
              onPress={() => toggleOption(opt)}
              className={`m-1 px-3 py-2 rounded-full border ${isSelected ? "bg-secondary border-secondary" : "bg-gray-100 border-gray-200"
                }`}
            >
              <Text
                className={"text-sm text-gray-700"}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {selected.length > 0 && (
        <Text className="text-sm text-gray-600 mt-2">
          {selected.length} catégorie{selected.length > 1 ? "s" : ""} sélectionnée
          {selected.length > 1 ? "s" : ""}
        </Text>
      )}
    </View>
  );
}
