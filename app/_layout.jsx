import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ChatProvider } from "../context/ChatContext";

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [userId, setUserId] = useState("1");
  const [nombreUsuario, setNombreUsuario] = useState("Yo");

  useEffect(() => {
    AsyncStorage.getItem("userId").then(id => { if (id) setUserId(id); });
    AsyncStorage.getItem("nombre_usuario").then(n => { if (n) setNombreUsuario(n); });
  }, []);

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const rutasRegistro = [
          "/login",
          "/genero",
          "/intereses",
          "/carrera",
          "/usuario",
        ];
        const esRutaRegistro = rutasRegistro.includes(pathname);

        // Descomenta esto cuando tengas el backend conectado:
        // if (!userId && !esRutaRegistro) {
        //   router.replace("/login");
        // } else if (userId && esRutaRegistro) {
        //   router.replace("/inicio/inicio");
        // }
      } catch (error) {
        console.error("Error verificando sesión:", error);
      }
    };
    verificarSesion();
  }, [pathname]);

  return (
    <SafeAreaProvider>
      <ChatProvider userId={userId} nombreUsuario={nombreUsuario}>
        <Stack screenOptions={{ headerShown: false }} />
      </ChatProvider>
    </SafeAreaProvider>
  );
}