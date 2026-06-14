import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./cssinicio";

export default function Inicio() {
  const router = useRouter();
  const scrollRef = useRef(null);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  const historias = [
    {
      nombre: "Memes UTP",
      imagen:
        "https://i.pinimg.com/736x/9b/7e/16/9b7e168d3d4f17f4f2f7e6f4a7f6f0f1.jpg",
    },
    {
      nombre: "Ing. Sistemas",
      imagen:
        "https://i.pinimg.com/736x/3b/e8/e8/3be8e8ec2c3a6f1f9f57c3f9d9d3f4a2.jpg",
    },
    {
      nombre: "Gamers UTP",
      imagen:
        "https://i.pinimg.com/736x/9f/77/5b/9f775b6f4d7e4f4c7d4f7f4c7d4f7f4c.jpg",
    },
  ];

  const [posts, setPosts] = useState([
    {
      id: 1,
      usuario: "TzNakroth",
      carrera: "4to ciclo • Ing. Sistemas",
      texto:
        "¿Alguien más sobreviviendo al parcial de Estructuras de datos? 😭💀",
      categoria: "Académico",
      colorCat: "#E60023",
      likes: 128,
      userVote: null,
    },
    {
      id: 2,
      usuario: "CodeMaster",
      carrera: "6to ciclo • Ing. Sistemas",
      texto: "Nuevo setup para programar de noche 🌙",
      categoria: "Tecnología",
      colorCat: "#9333EA",
      likes: 128,
      userVote: null,
    },
  ]);

  const handleVote = (postId, type) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          let newLikes = post.likes;
          let newUserVote = type;

          if (post.userVote === type) {
            // Quitar voto
            newUserVote = null;
            if (type === "up") newLikes -= 1;
          } else {
            // Cambiar o agregar voto
            if (post.userVote === "up") newLikes -= 1;
            if (type === "up") newLikes += 1;
          }
          return { ...post, likes: newLikes, userVote: newUserVote };
        }
        return post;
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={scrollToTop} style={styles.logoContainer}>
          <Text style={styles.logoRed}>UTP+</Text>
          <Text style={styles.logoWhite}>Movil</Text>
        </TouchableOpacity>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => router.push("/inicio/buscar")}>
            <Ionicons name="search-outline" size={26} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/notificacion/notificaciones")}
          >
            <View style={{ position: "relative" }}>
              <Ionicons name="notifications-outline" size={26} color="white" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTENIDO SCROLLABLE */}
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        {/* HISTORIAS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.storyScroll}
        >
          <TouchableOpacity
            style={styles.crearStory}
            onPress={() => router.push("/inicio/crearpublicacion")}
          >
            <View style={styles.storyCircle}>
              <Ionicons name="add" size={32} color="#E60023" />
            </View>
            <Text style={styles.storyText}>Crear</Text>
          </TouchableOpacity>

          {historias.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.storyContainer}
              onPress={() => router.push("/inicio/verpublicaciones")}
            >
              <View style={styles.storyCircle}>
                <Text style={styles.storyInitial}>
                  {item.nombre ? item.nombre.charAt(0).toUpperCase() : ""}
                </Text>
              </View>
              <Text style={styles.storyLabel}>{item.nombre}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* TABS / FILTROS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabs}
        >
          <TouchableOpacity style={[styles.tabItem, styles.tabActive]}>
            <Text style={styles.tabActiveText}>DESTACADOS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabText}>RECIENTES</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabText}>SIGUIENDO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabText}>GRUPOS</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* POSTS */}
        {posts.map((post) => (
          <View key={post.id} style={styles.post}>
            <View style={styles.postHeader}>
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <TouchableOpacity
                  style={[styles.avatar, { marginTop: 2 }]}
                  onPress={() => router.push("/inicio/perfilusuario")}
                >
                  <Text style={styles.avatarText}>{post.usuario[0]}</Text>
                </TouchableOpacity>
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.user}>{post.usuario}</Text>
                  <Text style={styles.info}>{post.carrera}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.time}>1h</Text>
                <TouchableOpacity
                  onPress={() => router.push("/inicio/configuracion")}
                >
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={18}
                    color="#888"
                    style={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.postText}>{post.texto}</Text>

            <View style={[styles.category, { backgroundColor: post.colorCat }]}>
              <Text style={styles.categoryText}>{post.categoria}</Text>
            </View>

            <View style={styles.actions}>
              <View style={styles.action}>
                <TouchableOpacity onPress={() => handleVote(post.id, "up")}>
                  <Ionicons
                    name={
                      post.userVote === "up" ? "arrow-up" : "arrow-up-outline"
                    }
                    size={24}
                    color={post.userVote === "up" ? "#E60023" : "#888"}
                  />
                </TouchableOpacity>

                <Text
                  style={[
                    styles.actionText,
                    post.userVote === "up" && { color: "#E60023" },
                    post.userVote === "down" && { color: "#888" },
                  ]}
                >
                  {post.likes}
                </Text>

                <TouchableOpacity onPress={() => handleVote(post.id, "down")}>
                  <Ionicons
                    name={
                      post.userVote === "down"
                        ? "arrow-down"
                        : "arrow-down-outline"
                    }
                    size={24}
                    color={post.userVote === "down" ? "#E60023" : "#888"}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.action}
                onPress={() => router.push("/inicio/comentar")}
              >
                <Ionicons name="chatbubble-outline" size={22} color="white" />
                <Text style={styles.actionText}>45</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.action}
                onPress={() => router.push("/inicio/compartir")}
              >
                <Ionicons name="share-social-outline" size={22} color="white" />
                <Text style={styles.actionText}>Compartir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* BOTTOM NAVIGATION BAR */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/inicio/inicio")}
        >
          <Ionicons name="home" size={26} color="#E60023" />
          <Text style={[styles.navText, styles.navTextActive]}>Inicio</Text>
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

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/perfil/perfil")}
        >
          <Ionicons name="person-outline" size={26} color="#888" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
