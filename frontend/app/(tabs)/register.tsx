import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AuthHeader from '@/components/auth/AuthHeader';
import RegisterForm from '@/components/auth/RegisterForm';

export default function Register() {
  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#FF6B6B', '#4ECDC4']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className='flex-1'
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="flex-grow px-5"
          >
            <AuthHeader
              title="PolarFood"
              subtitle="Documentez vos aventures culinaires"
            />
            <RegisterForm />
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