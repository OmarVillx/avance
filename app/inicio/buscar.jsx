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
import styles from "./cssbuscar";

export default function Buscar() {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");

  const resultados = [
    { id: "1", nombre: "Memes UTP", tipo: "Grupo" },
    { id: "2", nombre: "TzNakroth", tipo: "Usuario" },
    { id: "3", nombre: "Ing. Sistemas", tipo: "Grupo" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buscar</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={24} color="#888" />
        <TextInput
          placeholder="Buscar usuarios, temas o publicaciones..."
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={busqueda}
          onChangeText={setBusqueda}
          autoFocus
        />
      </View>

      <Text style={styles.sectionTitle}>Resultados</Text>
      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <View style={styles.resultAvatar}>
              <Text style={styles.resultInitial}>{item.nombre[0]}</Text>
            </View>
            <View style={styles.resultInfo}>
              <Text style={styles.resultName}>{item.nombre}</Text>
              <Text style={styles.resultType}>{item.tipo}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
