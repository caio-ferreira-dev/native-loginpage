import { Button, Text, View } from "react-native";
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Tela de Login" onPress={() => router.push('/login')} />
      <Button title="Tela de Investimentos" onPress={() => router.push('/meus_investimentos')} />
    </View>
  );
}
