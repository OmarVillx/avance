import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./cssListaComunidades";

export default function ListaComunidades({ comunidades }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {comunidades.map((comunidad) => (
        <TouchableOpacity key={comunidad.id} style={styles.comunidad}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: comunidad.icono }} style={styles.avatar} />
            <View style={styles.statusDot} />
          </View>
          <Text style={styles.nombre}>{comunidad.nombre}</Text>
          <Text style={styles.miembros}>{comunidad.miembros} miembros</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
