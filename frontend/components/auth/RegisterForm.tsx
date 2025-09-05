import React, { useState } from 'react';
import {
  View,
  Alert
} from 'react-native';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';
import { AuthService } from '@/services/authService';
import AuthSwitchLink from './AuthSwitchLink';
import { router } from 'expo-router';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.username.trim() || formData.username.length < 3)
      newErrors.username = 'Nom d’utilisateur invalide';
    if (!formData.email.trim()) newErrors.email = 'Email requis';
    if (!formData.password || formData.password.length < 8) newErrors.password = 'Mot de passe invalide';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm() || isLoading) return;
    setIsLoading(true)
    try {
      const { username, email, password } = formData;
      const res = await AuthService.register({ username, email, password });
      Alert.alert(
        "Inscription réussie",
        "Un email de confirmation a été envoyé à " + email,
        [
          {
            text: "OK",
            onPress: () => router.push("/auth/login")
          }
        ]
      );
    } catch (err: any) {
      Alert.alert('Erreur', err.message || 'Erreur lors de l’inscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="bg-white rounded-[20px] px-[25px] py-[30px]">
      <FormInput
        icon="person-outline"
        placeholder="Nom d'utilisateur"
        value={formData.username}
        onChangeText={v => handleInputChange('username', v)}
        error={errors.username}
      />
      <FormInput
        icon="mail-outline"
        placeholder="Email"
        value={formData.email}
        onChangeText={v => handleInputChange('email', v)}
        error={errors.email}
      />
      <FormInput
        icon="lock-closed-outline"
        placeholder="Mot de passe"
        value={formData.password}
        onChangeText={v => handleInputChange('password', v)}
        secureTextEntry={!showPassword}
        showSecure={showPassword}
        toggleSecureEntry={() => setShowPassword(!showPassword)}
        error={errors.password}
      />
      <FormInput
        icon="lock-closed-outline"
        placeholder="Confirmer le mot de passe"
        value={formData.confirmPassword}
        onChangeText={v => handleInputChange('confirmPassword', v)}
        secureTextEntry={!showConfirmPassword}
        showSecure={showConfirmPassword}
        toggleSecureEntry={() => setShowConfirmPassword(!showConfirmPassword)}
        error={errors.confirmPassword}
      />
      <SubmitButton
        title="S'inscrire"
        onPress={handleSignUp}
        isLoading={isLoading}
        icon="arrow-forward"
        colors={["#FF6B6B", "#FF8E53"]}
      />
      <AuthSwitchLink
        message="Déjà un compte ?"
        linkText="Se connecter"
        color="FF6B6B"
        onPress={() => router.push("/auth/login")}
      />
    </View>
  );
}
