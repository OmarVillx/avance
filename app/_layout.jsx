import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { ChatProvider } from "../context/ChatContext";

export default function RootLayout() {
  const pathname = usePathname();
  const [userId, setUserId] = useState("1");
  const [nombreUsuario, setNombreUsuario] = useState("Yo");

  useEffect(() => {
    AsyncStorage.getItem("userId").then(id => { if (id) setUserId(id); });
    AsyncStorage.getItem("nombre_usuario").then(n => { if (n) setNombreUsuario(n); });
  }, [pathname]);

  return (
    <ChatProvider userId={userId} nombreUsuario={nombreUsuario}>
      <Stack screenOptions={{ headerShown: false }} />
    </ChatProvider>
  );
}