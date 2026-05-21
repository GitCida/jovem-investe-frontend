import { useAuth } from "@/context/AuthContext";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  const nomeExibido = user?.email?.split("@")[0];

  return (
    <View style={styles.container}>
      <Text style={styles.saudacao}>Olá,</Text>
      <Text style={styles.nome}>{nomeExibido} 👋</Text>
      <Text style={styles.subtitulo}>Bem-vindo ao sistema da escola.</Text>

      <TouchableOpacity style={styles.botaoSair} onPress={signOut}>
        <Text style={styles.botaoTexto}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 8,
  },
  saudacao: {
    fontSize: 20,
    color: "#666",
  },
  nome: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: 16,
    color: "#888",
    marginBottom: 32,
  },
  botaoSair: {
    backgroundColor: "#dc2626",
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
