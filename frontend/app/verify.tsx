import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function VerifyPage() {
  const { token } = useLocalSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!token) return setStatus('error');

    fetch(`http://localhost:3000/api/auth/verify?token=${token}`)
      .then(res => {
        if (!res.ok) throw new Error('Token invalide');
        return res.json();
      })
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, [token]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {status === 'loading' && <ActivityIndicator />}
      {status === 'success' && <Text>✅ Compte vérifié avec succès !</Text>}
      {status === 'error' && <Text>❌ Token invalide ou expiré</Text>}
    </View>
  );
}
