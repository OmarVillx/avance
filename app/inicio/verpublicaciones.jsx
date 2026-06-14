import { useRouter } from "expo-router";
import { FlatList, Image, SafeAreaView, Text, View } from "react-native";
import styles from "./cssverpublicaciones";

export default function VerPublicaciones() {
  const router = useRouter();
  const posts = [
    {
      id: "1",
      usuario: "CodeMaster",
      texto: "Nuevo setup para programar de noche 🌙",
      imagen:
        "https://i.pinimg.com/originals/e4/6c/85/e46c8582d3282316c53543632162564f.jpg",
      hora: "Hace 10 min",
    },
    {
      id: "2",
      usuario: "GamerUTP",
      texto: "¿Alguien para rangear en Valorant?",
      imagen: null,
      hora: "Hace 30 min",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Feed en Vivo</Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.user}>{item.usuario}</Text>
              <Text style={styles.time}>{item.hora}</Text>
            </View>
            <Text style={styles.text}>{item.texto}</Text>
            {item.imagen && (
              <Image source={{ uri: item.imagen }} style={styles.image} />
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}
