import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#111827",
        }}
      >
        <ActivityIndicator size="large" color="#60a5fa" />
      </View>
    );
  }

  return user ? (
    <Redirect href="/(tabs)/feed" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}
