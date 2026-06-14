import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./cssperfil";

// Componentes del perfil
import DatosRegistro from "./DatosRegistro";
import EstadoActual from "./EstadoActual";
import ListaComunidades from "./ListaComunidades";
import ListaPublicaciones from "./ListaPublicaciones";
import MenuDesplegable from "./MenuDesplegable";
import PerfilHeader from "./PerfilHeader";
import TarjetaPerfil from "./TarjetaPerfil";

export default function Perfil() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [usuario, setUsuario] = useState({
    username: "Usuario",
    carrera: "Estudiante UTP",
    ciclo: "Cargando...",
    bio: "Cargando...",
    intereses: [],
  });

  // Cargar datos reales desde PostgreSQL
  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) {
          console.log("No se encontró userId, usando perfil de invitado.");
          setUsuario({
            username: "Invitado",
            carrera: "Visitante",
            ciclo: "N/A",
            bio: "Bienvenido a UTP+ Movil",
            intereses: [],
          });
          return;
        }

        const userIdClean = String(userId).trim();
        const URL_API = `http://192.168.1.7:3000/api/perfil/${userIdClean}`;
        const res = await fetch(URL_API);
        const data = await res.json();

        if (data.success) {
          setUsuario({
            ...data.perfil,
            username: data.perfil.nombre_usuario || data.perfil.username,
            bio: data.perfil.bio || "Sin biografía",
            intereses: data.perfil.intereses || [],
          });
        }
      } catch (error) {
        console.log("⚠️ Backend no activo. Usando datos offline.");
        setUsuario({
          username: "Usuario Offline",
          carrera: "Estudiante UTP",
          ciclo: "10mo Ciclo",
          bio: "Modo offline activado",
          intereses: ["React Native", "JavaScript", "Expo"],
        });
      }
    };
    cargarPerfil();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <PerfilHeader onMenuPress={() => setMenuVisible(!menuVisible)} />

      {/* MENÚ DESPLEGABLE */}
      {menuVisible && (
        <MenuDesplegable
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
          //  CERRAR SESIÓN
          onCerrarSesion={async () => {
            try {
              console.log("🔒 Cerrando sesión...");
              await AsyncStorage.removeItem("userId");
              setMenuVisible(false);
              router.replace("/login");
            } catch (error) {
              console.error("Error al cerrar sesión:", error);
            }
          }}
          // ✏️ EDITAR PERFIL
          onEditarPerfil={() => {
            setMenuVisible(false);
            router.push({
              pathname: "/perfil/EditarPerfil",
              params: {
                username: usuario.username,
                bio: usuario.bio,
                carrera: usuario.carrera,
                genero: usuario.genero,
                intereses: JSON.stringify(usuario.intereses || []),
              },
            });
          }}
        />
      )}

      {/* CONTENIDO PRINCIPAL */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <TarjetaPerfil usuario={usuario} />
        <DatosRegistro usuario={usuario} />
        <EstadoActual />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>COMUNIDADES</Text>
            <TouchableOpacity>
              <Text style={styles.verTodas}>Ver todas →</Text>
            </TouchableOpacity>
          </View>
          <ListaComunidades comunidades={usuario.comunidades || []} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>MIS PUBLICACIONES</Text>
            <TouchableOpacity>
              <Text style={styles.verTodas}>Ver todas →</Text>
            </TouchableOpacity>
          </View>
          <ListaPublicaciones publicaciones={usuario.publicaciones || []} />
        </View>

        {/* BOTÓN CERRAR SESIÓN FINAL */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={async () => {
            await AsyncStorage.removeItem("userId");
            router.replace("/login");
          }}
        >
          <Ionicons name="log-out-outline" size={20} color="#E60023" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/inicio/inicio")}
        >
          <Ionicons name="home-outline" size={28} color="#8A8A8A" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/chat/chat")}
        >
          <Ionicons name="chatbubble-outline" size={28} color="#8A8A8A" />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/notificacion/notificaciones")}
        >
          <Ionicons name="notifications-outline" size={28} color="#8A8A8A" />
          <Text style={styles.navText}>Notificaciones</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={28} color="#E60023" />
          <Text style={[styles.navText, styles.navTextActive]}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
