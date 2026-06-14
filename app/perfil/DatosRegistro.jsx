import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styles from "./cssDatosRegistro";

export default function DatosRegistro({ usuario }) {
  const datos = [
    {
      icono: "male-female-outline",
      titulo: "GÉNERO",
      valor: usuario.genero,
      color: "#E60023",
    },
    {
      icono: "heart-outline",
      titulo: "INTERESES",
      valor: (usuario.intereses || []).join(", "),
      color: "#E60023",
    },
    {
      icono: "school-outline",
      titulo: "CARRERA",
      valor: usuario.carrera,
      color: "#E60023",
    },
    {
      icono: "calendar-outline",
      titulo: "CICLO",
      valor: usuario.ciclo,
      color: "#E60023",
    },
  ];

  return (
    <View style={styles.container}>
      {datos.map((item, index) => (
        <View
          key={index}
          style={[
            styles.tarjeta,
            index < datos.length - 1 && styles.borderRight,
          ]}
        >
          <View style={styles.iconoContainer}>
            <Ionicons name={item.icono} size={22} color={item.color} />
          </View>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.valor}>{item.valor}</Text>
        </View>
      ))}
    </View>
  );
}
