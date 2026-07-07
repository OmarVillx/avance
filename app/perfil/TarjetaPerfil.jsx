import { Text, View } from "react-native";
import styles from "./cssTarjetaPerfil";

export default function TarjetaPerfil({ usuario }) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>
            {usuario.username ? usuario.username.charAt(0).toUpperCase() : ""}
          </Text>
        </View>
        <View
          style={[
            styles.statusDot,
            usuario.estado === "Ausente" && styles.statusAway,
          ]}
        />
      </View>

      <Text style={styles.username}>{usuario.username}</Text>
      <Text style={styles.carrera}>
        {usuario.carrera} • {usuario.ciclo}
      </Text>

      <View style={styles.bioContainer}>
        <Text style={styles.comillas}>“</Text>
        <Text style={styles.bio}>{usuario.bio}</Text>
      </View>
    </View>
  );
}
