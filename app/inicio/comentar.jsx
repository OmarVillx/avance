import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./csscomentar";

export default function Comentar() {
  const router = useRouter();

  const [comentarios, setComentarios] = useState([
    {
      id: "1",
      usuario: "CodeMaster",
      avatar: "C",
      texto: "¡Suerte en el parcial! 💪",
      hora: "2h",
    },
    {
      id: "2",
      usuario: "MichiUTP",
      avatar: "M",
      texto: "Yo también lo llevo, ¿estudian juntos?",
      hora: "1h",
    },
    {
      id: "3",
      usuario: "GamerUTP",
      avatar: "G",
      texto: "Ese profesor es imposible 😭",
      hora: "45m",
    },
  ]);

  const [nuevoComentario, setNuevoComentario] = useState("");

  const agregarComentario = () => {
    if (nuevoComentario.trim()) {
      setComentarios([
        ...comentarios,
        {
          id: Date.now().toString(),
          usuario: "TzNakroth",
          avatar: "T",
          texto: nuevoComentario,
          hora: "Ahora",
        },
      ]);
      setNuevoComentario("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Comentarios</Text>
        <View style={{ width: 28 }} />
      </View>

      <FlatList
        data={comentarios}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <TouchableOpacity
              style={styles.avatarBtn}
              onPress={() => router.push("/inicio/perfilusuario")}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.avatar}</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.content}>
              <TouchableOpacity
                onPress={() => router.push("/inicio/perfilusuario")}
              >
                <Text style={styles.user}>{item.usuario}</Text>
              </TouchableOpacity>
              <Text style={styles.text}>{item.texto}</Text>
              <Text style={styles.time}>{item.hora}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Escribe un comentario..."
          placeholderTextColor="#888"
          style={styles.input}
          value={nuevoComentario}
          onChangeText={setNuevoComentario}
          onSubmitEditing={agregarComentario}
        />
        <TouchableOpacity onPress={agregarComentario}>
          <Ionicons name="send" size={24} color="#E60023" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
