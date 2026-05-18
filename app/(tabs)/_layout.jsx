import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from "expo-router";
import { Text, TouchableOpacity } from 'react-native';
import { useAuth } from "../../context/AuthContext";

export default function TabsLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Redirect href="/(auth)/login" />;
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.light.primary,
          borderTopColor: Colors.light.border,
          height: 70,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: Colors.light.surface,
        tabBarInactiveTintColor: Colors.light.tabIconDefault,
        headerStyle: { backgroundColor: Colors.light.primary },
        headerTintColor: Colors.light.surface,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Inicio',
          headerRight: () => (
            <TouchableOpacity
              style={{
                backgroundColor: Colors.light.surface,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 24,
                marginRight: 12,
              }}
              onPress={() => {}}
            >
              <Text style={{ color: Colors.light.primary, fontWeight: '700' }}>Crear publicación</Text>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="crear"
        options={{
          title: "Crear",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
