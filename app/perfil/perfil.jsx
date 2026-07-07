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
import { useBottomNav } from "../../hooks/useBottomNav";
import styles from "./cssperfil";

// Componentes del perfil
import DatosRegistro from "./DatosRegistro";
import EstadoActual from "./EstadoActual";
import ListaComunidades from "./ListaComunidades";
import ListaPublicaciones from "./ListaPublicaciones";
import MenuDesplegable from "./MenuDesplegable";
import PerfilHeader from "./PerfilHeader";
import TarjetaPerfil from "./TarjetaPerfil";

export default function Perfil({ isTab = false, onGoToTab }) {
  const router = useRouter();
  const { paddingBottom } = useBottomNav();
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

        // Carga local offline directa sin intentar conectar al backend
        const localUser = await AsyncStorage.getItem("custom_username");
        const localBio = await AsyncStorage.getItem("custom_bio");
        setUsuario({
          username: localUser || "Usuario Offline",
          carrera: "Estudiante UTP",
          ciclo: "10mo Ciclo",
          bio: localBio !== null ? localBio : "Modo offline activado",
          intereses: ["React Native", "JavaScript", "Expo"],
        });
      } catch (error) {
        console.error("Error cargando perfil offline:", error);
      }
    };
    cargarPerfil();
  }, []);


  const containerPaddingBottom = isTab ? 0 : paddingBottom;

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: containerPaddingBottom }]}>
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
      {!isTab && (
        <View style={[styles.bottomNav, { paddingBottom }]}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/inicio/inicio")}
          >
            <Ionicons name="home-outline" size={26} color="#888" />
            <Text style={styles.navText}>Inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/chat/chat")}
          >
            <Ionicons name="chatbubble-outline" size={26} color="#888" />
            <Text style={styles.navText}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/notificacion/notificaciones")}
          >
            <View style={{ position: "relative" }}>
              <Ionicons name="notifications-outline" size={26} color="#888" />
              <View style={styles.smallBadge}>
                <Text style={styles.smallBadgeText}>3</Text>
              </View>
            </View>
            <Text style={styles.navText}>Notificaciones</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="person" size={26} color="#E60023" />
            <Text style={[styles.navText, styles.navTextActive]}>Perfil</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
