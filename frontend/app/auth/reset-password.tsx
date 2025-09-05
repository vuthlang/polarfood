import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthService } from '@/services/authService';

interface NewPasswordFormData {
  password: string;
  confirmPassword: string;
}

interface NewPasswordFormErrors {
  password?: string;
  confirmPassword?: string;
}

interface PasswordCriteria {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export default function NewPassword() {
  const [formData, setFormData] = useState<NewPasswordFormData>({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<NewPasswordFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();
  const token = params.token as string;

  const getPasswordCriteria = (password: string): PasswordCriteria => {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const validateForm = (): boolean => {
    const newErrors: NewPasswordFormErrors = {};
    const criteria = getPasswordCriteria(formData.password);

    if (!formData.password) {
      newErrors.password = 'Le nouveau mot de passe est requis';
    } else if (!Object.values(criteria).every(Boolean)) {
      newErrors.password = 'Le mot de passe ne respecte pas tous les critères';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof NewPasswordFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;
    if (!token) {
      Alert.alert('Erreur', 'Token manquant.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/auth/reset-password", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur serveur');

      setPasswordChanged(true);
    } catch (error: any) {
      Alert.alert('Erreur', error.message);
    } finally {
      setIsLoading(false);
    }
  };


  const handleGoToLogin = () => {
    router.replace('/auth/login');
  };

  const criteria = getPasswordCriteria(formData.password);

  if (passwordChanged) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <LinearGradient colors={['#F0F9FF', '#E0F2FE']} style={styles.gradient}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <View className="items-center pt-16 pb-8">
                <View className="w-24 h-24 bg-white/60 rounded-full items-center justify-center mb-6">
                  <Ionicons name="checkmark-circle" size={40} color="#10B981" />
                </View>
                <Text className="text-3xl font-bold text-slate-700 mt-4 mb-2">Mot de passe modifié !</Text>
                <Text className="text-base text-slate-600 text-center px-5">
                  Votre mot de passe a été mis à jour avec succès
                </Text>
              </View>

              <View className="bg-white rounded-t-3xl p-6 flex-1">
                <View className="items-center py-8">
                  <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-6">
                    <Ionicons name="shield-checkmark" size={40} color="#10B981" />
                  </View>

                  <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
                    Sécurité renforcée
                  </Text>

                  <Text className="text-base text-gray-600 text-center mb-8 leading-6">
                    Votre compte est maintenant protégé par votre nouveau mot de passe sécurisé.
                  </Text>

                  <View className="bg-green-50 p-4 rounded-xl mb-8 w-full">
                    <View className="flex-row items-start">
                      <Ionicons name="information-circle" size={20} color="#059669" className="mr-2 mt-0.5" />
                      <View className="flex-1">
                        <Text className="text-sm text-green-800 leading-5">
                          Pour votre sécurité, vous avez été déconnecté de tous vos autres appareils.
                        </Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={handleGoToLogin}
                    className="w-full bg-slate-700 rounded-xl py-4"
                  >
                    <View className="flex-row items-center justify-center">
                      <Text className="text-white text-lg font-bold mr-2">Se connecter</Text>
                      <Ionicons name="log-in-outline" size={20} color="#fff" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LinearGradient colors={['#F8FAFC', '#E2E8F0']} style={styles.gradient}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="items-center pt-16 pb-8">
              <Image
                source={{ uri: 'https://polarfood-awsbucket.s3.eu-north-1.amazonaws.com/logo.png' }}
                className="w-24 h-24"
                resizeMode="contain"
              />
              <Text className="text-3xl font-bold text-slate-700 mt-4 mb-2">Nouveau mot de passe</Text>
              <Text className="text-base text-slate-600 text-center px-5">
                Choisissez un mot de passe sécurisé pour votre compte
              </Text>
            </View>

            <View className="bg-white rounded-t-3xl p-6 flex-1">
              <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">Sécurisez votre compte</Text>
              <Text className="text-base text-gray-600 mb-8 text-center">
                Votre nouveau mot de passe doit respecter nos critères de sécurité
              </Text>

              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</Text>
                <View className="flex-row items-center bg-gray-100 rounded-xl px-4 h-14 border border-gray-200">
                  <Ionicons name="lock-closed-outline" size={20} color="#666" className="mr-3" />
                  <TextInput
                    className="flex-1 text-base text-gray-800"
                    placeholder="Entrez votre nouveau mot de passe"
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-2">
                    <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#666" />
                  </TouchableOpacity>
                </View>
                {errors.password && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.password}</Text>}
              </View>

              <View className="mb-6 bg-slate-50 p-4 rounded-xl">
                <Text className="text-sm font-medium text-gray-700 mb-3">Critères de sécurité :</Text>
                <View className="space-y-2">
                  <View className="flex-row items-center">
                    <Ionicons
                      name={criteria.minLength ? "checkmark-circle" : "ellipse-outline"}
                      size={16}
                      color={criteria.minLength ? "#10B981" : "#9CA3AF"}
                    />
                    <Text className={`ml-2 text-sm ${criteria.minLength ? 'text-green-700' : 'text-gray-600'}`}>
                      Au moins 8 caractères
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons
                      name={criteria.hasUppercase ? "checkmark-circle" : "ellipse-outline"}
                      size={16}
                      color={criteria.hasUppercase ? "#10B981" : "#9CA3AF"}
                    />
                    <Text className={`ml-2 text-sm ${criteria.hasUppercase ? 'text-green-700' : 'text-gray-600'}`}>
                      Une lettre majuscule
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons
                      name={criteria.hasLowercase ? "checkmark-circle" : "ellipse-outline"}
                      size={16}
                      color={criteria.hasLowercase ? "#10B981" : "#9CA3AF"}
                    />
                    <Text className={`ml-2 text-sm ${criteria.hasLowercase ? 'text-green-700' : 'text-gray-600'}`}>
                      Une lettre minuscule
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons
                      name={criteria.hasNumber ? "checkmark-circle" : "ellipse-outline"}
                      size={16}
                      color={criteria.hasNumber ? "#10B981" : "#9CA3AF"}
                    />
                    <Text className={`ml-2 text-sm ${criteria.hasNumber ? 'text-green-700' : 'text-gray-600'}`}>
                      Un chiffre
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons
                      name={criteria.hasSpecialChar ? "checkmark-circle" : "ellipse-outline"}
                      size={16}
                      color={criteria.hasSpecialChar ? "#10B981" : "#9CA3AF"}
                    />
                    <Text className={`ml-2 text-sm ${criteria.hasSpecialChar ? 'text-green-700' : 'text-gray-600'}`}>
                      Un caractère spécial (!@#$%^&*)
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</Text>
                <View className="flex-row items-center bg-gray-100 rounded-xl px-4 h-14 border border-gray-200">
                  <Ionicons name="lock-closed-outline" size={20} color="#666" className="mr-3" />
                  <TextInput
                    className="flex-1 text-base text-gray-800"
                    placeholder="Confirmez votre nouveau mot de passe"
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} className="p-2">
                    <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#666" />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</Text>}
              </View>

              <TouchableOpacity
                onPress={handleResetPassword}
                disabled={isLoading || !Object.values(criteria).every(Boolean)}
                className={`mb-6 rounded-xl py-4 ${isLoading || !Object.values(criteria).every(Boolean)
                  ? 'bg-gray-400 opacity-70'
                  : 'bg-slate-700'
                  }`}
              >
                <View className="flex-row items-center justify-center">
                  {isLoading ? (
                    <Text className="text-white text-lg font-bold">Modification en cours...</Text>
                  ) : (
                    <>
                      <Text className="text-white text-lg font-bold mr-2">Modifier le mot de passe</Text>
                      <Ionicons name="shield-checkmark" size={20} color="#fff" />
                    </>
                  )}
                </View>
              </TouchableOpacity>

              <View className="bg-slate-50 p-4 rounded-xl mb-6">
                <View className="flex-row items-start">
                  <Ionicons name="shield" size={20} color="#64748B" className="mr-3 mt-0.5" />
                  <View className="flex-1">
                    <Text className="text-sm text-slate-700 leading-5">
                      Après modification, vous serez déconnecté de tous vos autres appareils pour votre sécurité.
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row justify-center items-center">
                <Text className="text-gray-600 text-base">Retour à la </Text>
                <TouchableOpacity onPress={() => router.push('/auth/login')}>
                  <Text className="text-slate-700 text-base font-bold">connexion</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
