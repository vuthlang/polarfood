import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';
import AuthSwitchLink from './AuthSwitchLink';
import { useRouter } from 'expo-router';

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginFormErrors {
  username?: string;
  password?: string;
}

interface LoginFormProps {
  formData: LoginFormData;
  errors: LoginFormErrors;
  onChange: (field: keyof LoginFormData, value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function LoginForm({
  formData,
  errors,
  onChange,
  onSubmit,
  isLoading,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleForgotPassword = () => {
    console.log("Mot de passe oublié → envoyer email");
  };

  return (
    <View className="bg-white rounded-[20px] px-[25px] pt-[30px] pb-[40px]">
      <Text className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Se connecter
      </Text>

      <FormInput
        icon="person-outline"
        placeholder="Nom d'utilisateur ou email"
        value={formData.username}
        onChangeText={v => onChange('username', v)}
        error={errors.username}
      />

      {/* Password */}
      <FormInput
        icon="lock-closed-outline"
        placeholder="Mot de passe"
        value={formData.password}
        onChangeText={v => onChange('password', v)}
        secureTextEntry={!showPassword}
        showSecure={showPassword}
        toggleSecureEntry={() => setShowPassword(!showPassword)}
        error={errors.password}
      />

      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={handleForgotPassword} className="ml-auto">
          <Text className="text-sm text-secondary font-medium">
            Mot de passe oublié ?
          </Text>
        </TouchableOpacity>
      </View>

      <SubmitButton
        title="Se connecter"
        onPress={onSubmit}
        isLoading={isLoading}
        icon="arrow-forward"
        colors={['#4ECDC4', '#44A08D']}
      />

      <AuthSwitchLink
        message="Pas encore de compte ?"
        linkText="S'inscrire"
        color="4ECDC4"
        onPress={() => router.push('/register')}
      />
    </View>
  );
}
