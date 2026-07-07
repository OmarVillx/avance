import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./cssEditarPerfil";

export default function EditarPerfil() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [username, setUsername] = useState(params.username || "");
  const [bio, setBio] = useState(params.bio || "");

  const handleSave = async () => {
    if (!username.trim()) {
      Alert.alert("⚠️ Falta dato", "El nombre de usuario no puede estar vacío");
      return;
    }

    try {
      await AsyncStorage.setItem("custom_username", username.trim());
      await AsyncStorage.setItem("custom_bio", bio.trim());
      Alert.alert("✅ Guardado", "Perfil actualizado con éxito (Modo offline)");
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("⚠️ Error", "No se pudo guardar la información");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar perfil</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre de usuario</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Nombre de usuario"
          placeholderTextColor="#666"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Biografía</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          value={bio}
          onChangeText={setBio}
          placeholder="Escribe algo sobre ti..."
          placeholderTextColor="#666"
          multiline
          numberOfLines={4}
        />
        <Text style={styles.infoText}>
          Los cambios se guardarán localmente ya que no hay un backend conectado.
        </Text>
      </View>
    </SafeAreaView>
  );
}
