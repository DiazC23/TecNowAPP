import { Colors, FontSizes, Layout } from '@/constants/theme';
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
      <View style={styles.headerBackground} />
      <View style={styles.profileCard}>
        <View style={styles.avatarWrapper}>
          <Text style={styles.avatarTexto}>{user?.name?.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.nombre}>{user?.name}</Text>
        <Text style={styles.username}>@{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.since}>Miembro desde {new Date(user?.created_at ?? Date.now()).toLocaleDateString()}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{user?.posts_count ?? 0}</Text>
          <Text style={styles.statLabel}>Publicaciones</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{user?.likes_count ?? 0}</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{user?.comments_count ?? 0}</Text>
          <Text style={styles.statLabel}>Comentarios</Text>
        </View>
      </View>

      <View style={styles.contentCard}>
        <Text style={styles.sectionTitle}>Mis publicaciones</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📝</Text>
          <Text style={styles.emptyTitle}>Aún no tienes publicaciones.</Text>
          <Text style={styles.emptySubtitle}>¿Comenzamos con una?</Text>
          <TouchableOpacity style={styles.createButton} activeOpacity={0.85} onPress={() => router.push('/(tabs)/crear')}>
            <Text style={styles.createButtonText}>Nueva publicación</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.botonSalir} onPress={handleLogout} activeOpacity={0.85}>
        <Text style={styles.botonSalirTexto}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  headerBackground: {
    height: 140,
    backgroundColor: Colors.light.primary,
  },
  profileCard: {
    backgroundColor: Colors.light.surface,
    marginHorizontal: Layout.spacing.md,
    marginTop: -60,
    borderRadius: Layout.radius.large,
    padding: Layout.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.light.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.light.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.light.primary,
    marginBottom: Layout.spacing.md,
  },
  avatarTexto: {
    color: Colors.light.primary,
    fontSize: 36,
    fontWeight: '900',
  },
  nombre: {
    color: Colors.light.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
    textAlign: 'center',
  },
  username: {
    color: Colors.light.secondary,
    fontSize: 14,
    marginBottom: 4,
  },
  email: {
    color: Colors.light.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
  since: {
    color: Colors.light.textSecondary,
    fontSize: 13,
    marginTop: Layout.spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Layout.spacing.lg,
    marginHorizontal: Layout.spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.light.surface,
    borderRadius: Layout.radius.large,
    padding: Layout.spacing.md,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.light.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  statNumber: {
    color: Colors.light.text,
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    color: Colors.light.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  contentCard: {
    backgroundColor: Colors.light.surface,
    marginHorizontal: Layout.spacing.md,
    marginTop: Layout.spacing.md,
    borderRadius: Layout.radius.large,
    padding: Layout.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.light.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  sectionTitle: {
    color: Colors.light.text,
    fontSize: FontSizes.subtitle,
    fontWeight: '700',
    marginBottom: Layout.spacing.md,
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    paddingVertical: Layout.spacing.lg,
  },
  emptyIcon: {
    fontSize: 32,
  },
  emptyTitle: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: '700',
  },
  emptySubtitle: {
    color: Colors.light.textSecondary,
    fontSize: 13,
  },
  createButton: {
    marginTop: Layout.spacing.md,
    backgroundColor: Colors.light.surface,
    borderRadius: Layout.radius.large,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  createButtonText: {
    color: Colors.light.primary,
    fontWeight: '700',
  },
  botonSalir: {
    backgroundColor: Colors.light.error,
    borderRadius: Layout.radius.medium,
    padding: Layout.spacing.md,
    alignItems: 'center',
    marginHorizontal: Layout.spacing.md,
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.lg,
  },
  botonSalirTexto: {
    color: Colors.light.surface,
    fontWeight: '700',
    fontSize: 15,
  },
});
