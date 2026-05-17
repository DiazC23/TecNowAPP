import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function CrearScreen() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  // Si está bloqueado no puede crear
  if (!user?.activo) {
    return (
      <View style={styles.bloqueado}>
        <Text style={styles.bloqueadoIcon}>🚫</Text>
        <Text style={styles.bloqueadoTitulo}>Cuenta bloqueada</Text>
        <Text style={styles.bloqueadoTexto}>
          Tu cuenta está bloqueada. No puedes crear posts.
        </Text>
      </View>
    );
  }

  const handleCrear = async () => {
    if (!titulo || !contenido) {
      Alert.alert("Error", "Completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/posts", { title: titulo, content: contenido });
      Alert.alert("¡Listo!", "Post creado correctamente.");
      setTitulo("");
      setContenido("");
      router.replace("/(tabs)/feed");
    } catch (e) {
      Alert.alert("Error", "No se pudo crear el post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe el título..."
        placeholderTextColor="#6b7280"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Contenido</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="¿Qué quieres compartir?"
        placeholderTextColor="#6b7280"
        value={contenido}
        onChangeText={setContenido}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />

      <TouchableOpacity
        style={styles.boton}
        onPress={handleCrear}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botonTexto}>Publicar</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827" },
  content: { padding: 20 },
  label: { color: "#9ca3af", fontSize: 13, marginBottom: 6, marginTop: 16 },
  input: {
    backgroundColor: "#1f2937",
    color: "#fff",
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#374151",
  },
  textarea: { height: 140, textAlignVertical: "top" },
  boton: {
    backgroundColor: "#1e40af",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
  },
  botonTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  bloqueado: {
    flex: 1,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  bloqueadoIcon: { fontSize: 48, marginBottom: 16 },
  bloqueadoTitulo: {
    color: "#f87171",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bloqueadoTexto: { color: "#6b7280", textAlign: "center", fontSize: 14 },
});
