import { useRouter } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import styles from "./csscompartir";

export default function Compartir() {
  const router = useRouter();
  const opciones = [
    "Copiar enlace",
    "WhatsApp",
    "Instagram",
    "Facebook",
    "Twitter",
    "Otros dispositivos",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Compartir</Text>

      {opciones.map((op, index) => (
        <TouchableOpacity key={index} style={styles.option}>
          <Text style={styles.optionText}>{op}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
        <Text style={styles.closeText}>Cerrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
