import { Colors, FontSizes, Layout } from '@/constants/theme';
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe el título..."
            placeholderTextColor={Colors.dark.textDisabled}
            value={titulo}
            onChangeText={setTitulo}
          />

          <Text style={styles.label}>Contenido</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="¿Qué quieres compartir?"
            placeholderTextColor={Colors.dark.textDisabled}
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
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color={Colors.light.surface} />
            ) : (
              <Text style={styles.botonTexto}>Publicar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: Layout.spacing.md,
  },
  card: {
    backgroundColor: Colors.light.surface,
    borderRadius: Layout.radius.large,
    padding: Layout.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Layout.shadow.default,
  },
  label: {
    color: Colors.light.textSecondary,
    fontSize: FontSizes.label,
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: Colors.light.card,
    color: Colors.light.text,
    borderRadius: Layout.radius.medium,
    padding: Layout.spacing.md,
    fontSize: FontSizes.body,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  textarea: {
    minHeight: 140,
    textAlignVertical: "top",
  },
  boton: {
    backgroundColor: Colors.light.primary,
    borderRadius: Layout.radius.medium,
    padding: Layout.spacing.md,
    alignItems: "center",
    marginTop: Layout.spacing.lg,
  },
  botonTexto: {
    color: Colors.light.surface,
    fontWeight: "700",
    fontSize: FontSizes.button,
  },
  bloqueado: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  bloqueadoIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  bloqueadoTitulo: {
    color: Colors.light.error,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bloqueadoTexto: {
    color: Colors.light.textSecondary,
    textAlign: "center",
    fontSize: FontSizes.body,
  },
});
