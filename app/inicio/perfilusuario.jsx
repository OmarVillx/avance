import { useRouter } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from "./cssperfilusuario";

export default function PerfilUsuario() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>T</Text>
      </View>
      <Text style={styles.name}>TzNakroth</Text>
      <Text style={styles.info}>Ing. Sistemas • 4to Ciclo</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/perfil/perfil")}
      >
        <Text style={styles.btnText}>Ver Perfil Completo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
        <Text style={styles.btnText}>Cerrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
