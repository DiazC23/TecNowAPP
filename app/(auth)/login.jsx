import { Colors, FontSizes, Layout } from '@/constants/theme';
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      router.replace("/(tabs)/feed");
    } catch (e) {
      Alert.alert("Error", "Credenciales incorrectas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.background} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.card}>
          <View style={styles.brandIcon}>
            <Text style={styles.brandLetter}>T</Text>
          </View>
          <Text style={styles.titulo}>TecNow</Text>
          <Text style={styles.subtitulo}>Tecnológico Superior de Jalisco</Text>
          <Text style={styles.description}>Tu comunidad, tu voz, en tiempo real</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Correo institucional</Text>
            <TextInput
              style={styles.input}
              placeholder="tucorreo@tecmm.edu.mx"
              placeholderTextColor={Colors.dark.textDisabled}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="********"
              placeholderTextColor={Colors.dark.textDisabled}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.bottomRow}>
            <Text style={styles.helperText}>Recordarme</Text>
            <TouchableOpacity activeOpacity={0.85}>
              <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.boton}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color={Colors.dark.surface} />
            ) : (
              <Text style={styles.botonTexto}>Iniciar sesión</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.registerText}>
            ¿No tienes cuenta? <Text style={styles.registerLink}>Regístrate con tu correo institucional</Text>
          </Text>
          <Text style={styles.smallText}>Solo correos @instituto.tecmm.edu.mx · Acceso verificado por la institución</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.dark.primary,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.dark.primary,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Layout.spacing.md,
  },
  card: {
    backgroundColor: Colors.light.surface,
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.lg,
    borderWidth: 1,
    borderColor: '#dbeafe',
    ...Layout.shadow.default,
  },
  brandIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Colors.dark.surface,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: Layout.spacing.md,
  },
  brandLetter: {
    color: Colors.dark.primary,
    fontSize: 28,
    fontWeight: '800',
  },
  titulo: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    color: Colors.dark.text,
    marginBottom: Layout.spacing.xs,
  },
  subtitulo: {
    fontSize: FontSizes.subtitle,
    textAlign: 'center',
    color: Colors.dark.textSecondary,
  },
  description: {
    fontSize: FontSizes.body,
    textAlign: 'center',
    color: Colors.dark.textSecondary,
    marginBottom: Layout.spacing.lg,
  },
  fieldGroup: {
    marginBottom: Layout.spacing.md,
  },
  fieldLabel: {
    color: Colors.dark.textSecondary,
    fontSize: FontSizes.label,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.light.card,
    color: Colors.dark.text,
    borderRadius: Layout.radius.medium,
    padding: Layout.spacing.md,
    fontSize: FontSizes.body,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  helperText: {
    color: Colors.dark.textSecondary,
    fontSize: FontSizes.label,
  },
  linkText: {
    color: Colors.dark.primary,
    fontSize: FontSizes.label,
    fontWeight: '700',
  },
  boton: {
    backgroundColor: Colors.dark.primary,
    borderRadius: Layout.radius.large,
    paddingVertical: Layout.spacing.md,
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  botonTexto: {
    color: Colors.dark.surface,
    fontWeight: '700',
    fontSize: FontSizes.button,
  },
  registerText: {
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: Layout.spacing.xs,
  },
  registerLink: {
    color: Colors.dark.primary,
    fontWeight: '700',
  },
  smallText: {
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    fontSize: FontSizes.caption,
  },
});
