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
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthService } from '@/services/authService';

interface ResetFormData {
  email: string;
}

interface ResetFormErrors {
  email?: string;
}

export default function ResetPassword() {
  const [formData, setFormData] = useState<ResetFormData>({ email: '' });
  const [errors, setErrors] = useState<ResetFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: ResetFormErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'L\'adresse email est requise';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ResetFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await AuthService.forgotPassword(formData.email);
      setEmailSent(true);
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  if (emailSent) {
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
                  <Ionicons name="mail-outline" size={40} color="#0369A1" />
                </View>
                <Text className="text-3xl font-bold text-slate-700 mt-4 mb-2">Email envoyé !</Text>
              </View>

              <View className="bg-white rounded-t-3xl p-6 flex-1">
                <View className="items-center py-8">
                  <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-6">
                    <Ionicons name="checkmark-circle" size={40} color="#10B981" />
                  </View>

                  <Text className="text-base text-gray-600 text-center mb-8 leading-6">
                    Nous avons envoyé un lien de réinitialisation à{'\n'}
                    <Text className="font-semibold text-gray-800">{formData.email}</Text>
                  </Text>

                  <View className="bg-blue-50 p-4 rounded-xl mb-8 w-full">
                    <View className="flex-row items-start">
                      <Ionicons name="information-circle" size={20} color="#3B82F6" className="mr-2 mt-0.5" />
                      <View className="flex-1">
                        <Text className="text-sm text-blue-800 leading-5">
                          Le lien expirera dans 15 minutes. Si vous ne voyez pas l'email, vérifiez vos spams.
                        </Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={handleBackToLogin}
                    className="w-full mb-4 bg-slate-700 rounded-xl py-4"
                  >
                    <View className="flex-row items-center justify-center">
                      <Ionicons name="arrow-back" size={20} color="#fff" />
                      <Text className="text-white text-lg font-bold ml-2">Retour à la connexion</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setEmailSent(false)}
                    className="py-3"
                  >
                    <Text className="text-slate-600 text-base">Renvoyer l'email</Text>
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
            contentContainerClassName="flex-grow px-5"
            showsVerticalScrollIndicator={false}
          >
            <View className="pt-12 pb-8">
              <View className="items-center pt-8">
                <Image
                  source={{ uri: 'https://polarfood-awsbucket.s3.eu-north-1.amazonaws.com/logo.png' }}
                  className="w-24 h-24"
                  resizeMode="contain"
                />
                <Text className="text-3xl font-bold text-slate-700 mt-4 mb-2">Mot de passe oublié ?</Text>
              </View>
            </View>

            <View className="bg-white rounded-[20px] px-[25px] py-[30px]">
              <Text className="text-base text-gray-600 mb-8 text-center">
                Entrez votre adresse email pour recevoir un lien de réinitialisation
              </Text>

              <View className="mb-6">
                <View className="flex-row items-center bg-gray-100 rounded-xl px-4 h-14 border border-gray-200">
                  <Ionicons name="mail-outline" size={20} color="#666" className="mr-3" />
                  <TextInput
                    className="flex-1 text-base text-gray-800"
                    placeholder="Votre adresse email"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                {errors.email && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.email}</Text>}
              </View>

              <TouchableOpacity
                onPress={handleResetPassword}
                disabled={isLoading}
                className={`mb-8 bg-slate-700 rounded-xl py-4 ${isLoading ? 'opacity-70' : ''}`}
              >
                <View className="flex-row items-center justify-center">
                  {isLoading ? (
                    <Text className="text-white text-lg font-bold">Envoi en cours...</Text>
                  ) : (
                    <>
                      <Text className="text-white text-lg font-bold mr-2">Envoyer le lien</Text>
                      <Ionicons name="send" size={20} color="#fff" />
                    </>
                  )}
                </View>
              </TouchableOpacity>

              <View className="bg-slate-50 p-4 rounded-xl mb-8">
                <View className="flex-row items-start">
                  <Ionicons name="shield-checkmark" size={20} color="#64748B" className="mr-3 mt-0.5" />
                  <View className="flex-1">
                    <Text className="text-sm text-slate-700 leading-5">
                      Pour votre sécurité, le lien de réinitialisation expirera automatiquement après 15 minutes.
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row justify-center items-center">
                <Text className="text-gray-600 text-base">Déjà un compte ? </Text>
                <TouchableOpacity onPress={() => router.push('/auth/login')}>
                  <Text className="text-[16px] font-bold">
                    Se connecter
                  </Text>
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