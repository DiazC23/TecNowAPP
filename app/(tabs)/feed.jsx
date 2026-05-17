import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
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
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#60a5fa" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#60a5fa"
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/post/${item.id}`)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.username}>@{item.user?.username}</Text>
              <Text style={styles.fecha}>
                {new Date(item.created_at).toLocaleDateString()}
              </Text>
            </View>
            <Text style={styles.titulo}>{item.title}</Text>
            <Text style={styles.contenido} numberOfLines={3}>
              {item.content}
            </Text>
            <Text style={styles.comentarios}>
              💬 {item.comments_count} comentarios
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.vacio}>No hay posts aún.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827",
  },
  card: {
    backgroundColor: "#1f2937",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  username: { color: "#60a5fa", fontWeight: "600", fontSize: 13 },
  fecha: { color: "#6b7280", fontSize: 12 },
  titulo: { color: "#fff", fontWeight: "bold", fontSize: 16, marginBottom: 6 },
  contenido: { color: "#9ca3af", fontSize: 14, lineHeight: 20 },
  comentarios: { color: "#6b7280", fontSize: 12, marginTop: 10 },
  vacio: { color: "#6b7280", textAlign: "center", marginTop: 40 },
});
