import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function PerfilScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarTexto}>
          {user?.name?.charAt(0).toUpperCase()}
        </Text>
      </View>

      <Text style={styles.nombre}>{user?.name}</Text>
      <Text style={styles.username}>@{user?.username}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <View style={styles.badge}>
        <Text style={styles.badgeTexto}>
          {user?.activo ? "✅ Cuenta activa" : "🚫 Cuenta bloqueada"}
        </Text>
      </View>

      <View style={styles.rolBadge}>
        <Text style={styles.rolTexto}>{user?.rol ?? user?.global_role}</Text>
      </View>

      <TouchableOpacity style={styles.botonSalir} onPress={handleLogout}>
        <Text style={styles.botonSalirTexto}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1e40af",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarTexto: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  nombre: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  username: { color: "#60a5fa", fontSize: 14, marginTop: 4 },
  email: { color: "#6b7280", fontSize: 13, marginTop: 4, marginBottom: 16 },
  badge: {
    backgroundColor: "#1f2937",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#374151",
  },
  badgeTexto: { color: "#9ca3af", fontSize: 13 },
  rolBadge: {
    backgroundColor: "#1e40af",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 32,
  },
  rolTexto: { color: "#fff", fontSize: 13, fontWeight: "600" },
  botonSalir: {
    backgroundColor: "#991b1b",
    borderRadius: 10,
    padding: 16,
    width: "100%",
    alignItems: "center",
  },
  botonSalirTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
