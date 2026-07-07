import { useRouter } from "expo-router";
import { Alert, SafeAreaView, Text, TouchableOpacity } from "react-native";
import styles from "./cssconfiguracion";

export default function Configuracion() {
  const router = useRouter();

  const handleOption = (accion) => {
    Alert.alert("Acción", `Has seleccionado: ${accion}`);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Opciones</Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handleOption("Guardar")}
      >
        <Text style={styles.optionText}>💾 Guardar en Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handleOption("Reportar")}
      >
        <Text style={[styles.optionText, { color: "#E60023" }]}>
          🚩 Reportar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handleOption("Ver más")}
      >
        <Text style={styles.optionText}>🔍 Ver más sobre esto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
        <Text style={styles.closeText}>Cerrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
