import { Image, Text, View } from "react-native";
import styles from "./cssEstadoActual";

export default function EstadoActual() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/tech_bg.png")}
        style={styles.imagenFondo}
      />
      <View style={styles.contenido}>
        <Text style={styles.titulo}>ESTADO ACTUAL</Text>
        <Text style={styles.textoPrincipal}>
          Terminando proyecto de Expo Go 😭🔥
        </Text>
        <Text style={styles.descripcion}>
          Nuevo semestre, nuevos retos.{"\n"}Enfocado y sin parar 💪
        </Text>
      </View>
    </View>
  );
}
