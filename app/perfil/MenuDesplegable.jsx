import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./cssMenuDesplegable";

// ✅ Agregamos onEditarPerfil a las props
export default function MenuDesplegable({
  visible,
  onClose,
  onCerrarSesion,
  onEditarPerfil,
}) {
  if (!visible) return null;

  // ✅ Ahora la primera opción usa onEditarPerfil en lugar de onClose
  const opciones = [
    { icono: "create-outline", texto: "Editar perfil", accion: onEditarPerfil },
    { icono: "lock-closed-outline", texto: "Privacidad", accion: onClose },
    { icono: "person-outline", texto: "Cuenta", accion: onClose },
    { icono: "bookmark-outline", texto: "Guardados", accion: onClose },
  ];

  return (
    <View style={styles.container}>
      {opciones.map((opcion, index) => (
        <TouchableOpacity
          key={index}
          style={styles.opcion}
          onPress={opcion.accion}
        >
          <Ionicons name={opcion.icono} size={20} color="#8A8A8A" />
          <Text style={styles.opcionTexto}>{opcion.texto}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.divider} />

      <TouchableOpacity style={styles.opcion} onPress={onCerrarSesion}>
        <Ionicons name="log-out-outline" size={20} color="#E60023" />
        <Text style={[styles.opcionTexto, styles.cerrarSesion]}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}
