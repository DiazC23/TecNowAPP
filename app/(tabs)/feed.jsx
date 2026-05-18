import { Colors, Layout } from '@/constants/theme';
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import api from "../../services/api";

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const cargarPosts = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data.data.data);
    } catch (e) {
      console.log("Error cargando posts:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    cargarPosts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    cargarPosts();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.light.primary}
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => router.push(`/post/${item.id}`)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.authorRow}>
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarLetter}>{item.user?.username?.charAt(0).toUpperCase() ?? 'T'}</Text>
                </View>
                <View>
                  <Text style={styles.username}>{item.user?.username || 'Anon'}</Text>
                  <Text style={styles.community}>{item.community ?? 'TecNow'}</Text>
                </View>
              </View>
              <Text style={styles.fecha}>
                {new Date(item.created_at).toLocaleDateString()}
              </Text>
            </View>
            <Text style={styles.titulo}>{item.title}</Text>
            {item.image_url ? (
              <Image source={{ uri: item.image_url }} style={styles.postImage} contentFit="cover" />
            ) : null}
            <Text style={styles.contenido} numberOfLines={4}>
              {item.content}
            </Text>
            <View style={styles.cardFooter}>
              <View style={styles.infoBadge}>
                <Text style={styles.infoText}>👍 {item.votes ?? 0}</Text>
              </View>
              <View style={styles.infoBadge}>
                <Text style={styles.infoText}>💬 {item.comments_count}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.vacio}>No hay posts aún.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  listContent: {
    paddingVertical: Layout.spacing.md,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
  card: {
    backgroundColor: Colors.light.surface,
    marginHorizontal: Layout.spacing.md,
    marginVertical: Layout.spacing.sm,
    borderRadius: Layout.radius.large,
    padding: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
  },
  avatarPlaceholder: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLetter: {
    color: Colors.light.surface,
    fontWeight: '800',
  },
  username: {
    color: Colors.light.text,
    fontWeight: "700",
    fontSize: 14,
  },
  community: {
    color: Colors.light.textSecondary,
    fontSize: 12,
  },
  fecha: {
    color: Colors.light.textSecondary,
    fontSize: 12,
  },
  titulo: {
    color: Colors.light.text,
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 180,
    borderRadius: Layout.radius.large,
    marginBottom: Layout.spacing.sm,
    backgroundColor: Colors.light.border,
  },
  contenido: {
    color: Colors.light.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  cardFooter: {
    marginTop: Layout.spacing.md,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: Layout.spacing.sm,
  },
  infoBadge: {
    backgroundColor: '#eef2ff',
    borderRadius: Layout.radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  infoText: {
    color: Colors.light.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  vacio: {
    color: Colors.light.textSecondary,
    textAlign: "center",
    marginTop: 40,
  },
});
