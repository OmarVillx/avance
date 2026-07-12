import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { useLanguageContext } from "../context/LanguageContext";
import { useThemeContext } from "../context/ThemeContext";
import createStyles, { ColorLogin } from "./csslogin";

export default function Login() {
  const router = useRouter();
  const { theme, isDark, toggleTheme } = useThemeContext();
  const { t } = useLanguageContext();
  const styles = createStyles(theme);
  const [isLoading, setIsLoading] = useState(false);
  const [showWebView, setShowWebView] = useState(false);

  // URL del SSO de UTP (exacta como la pediste)
  const SSO_URL =
    "https://sso.utp.edu.pe/auth/realms/Xpedition/protocol/openid-connect/auth" +
    "?client_id=pao-web" +
    "&redirect_uri=" +
    encodeURIComponent("https://class.utp.edu.pe/") +
    "&state=08465e1f-6f09-47e7-8b65-59cedb87752f" +
    "&response_mode=fragment" +
    "&response_type=code" +
    "&scope=openid" +
    "&nonce=b54f3b1e-4d66-4b53-92c8-d341db816888";

  const handleLoginSuccess = () => {
    setIsLoading(false);
    setShowWebView(false);

    // Pequeño delay para que el Modal de iPhone se cierre limpio antes de navegar
    setTimeout(() => {
      Alert.alert(`✅ ${t("welcomeAlert")}`, t("successLogin"));
      router.replace("/genero");
    }, 100);
  };

  const checkUrl = (url) => {
    console.log("🔍 Verificando URL:", url);
    // Si llega a la página de cursos de UTP o tiene el código de éxito
    if (
      url.includes("class.utp.edu.pe/student/courses") ||
      (url.includes("class.utp.edu.pe") && url.includes("code="))
    ) {
      handleLoginSuccess();
      return true;
    }
    return false;
  };

  const handleNavigationStateChange = (navState) => {
    checkUrl(navState.url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.trianguloDerecha} />
      <View style={styles.trianguloIzquierda} />

      <View style={styles.content}>
        <View style={styles.logoRow}>
          <View style={[styles.logoBox, styles.logoRed]}>
            <Text style={styles.logoText}>U</Text>
          </View>
          <View style={[styles.logoBox, styles.logoDark]}>
            <Text style={styles.logoText}>T</Text>
          </View>
          <View style={[styles.logoBox, styles.logoRed]}>
            <Text style={styles.logoText}>P</Text>
          </View>
          <Text style={styles.plus}>+</Text>
          <Text style={styles.movil}>Movil</Text>
        </View>

        <Text style={styles.title}>{t("welcome")}</Text>
        <Text style={styles.subtitle}>{t("subtitle")}</Text>

        <View style={styles.spacing} />

        <TouchableOpacity
          style={[styles.utpButton, isLoading && styles.buttonDisabled]}
          onPress={() => {
            setIsLoading(true);
            setShowWebView(true);
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <Text style={styles.utpText}>{t("connecting")}</Text>
          ) : (
            <>
              <Ionicons name="school" size={24} color={ColorLogin.blanco} />
              <Text style={styles.utpText}>{t("loginButton")}</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleTheme}
          style={{
            marginTop: 20,
            alignSelf: "center",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            backgroundColor: theme.colors.card,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Text
            style={{
              color: theme.colors.text,
              fontWeight: "bold",
            }}
          >
            {isDark ? "☀️ Cambiar a modo claro" : "🌙 Cambiar a modo oscuro"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.infoText}>{t("redirect")}</Text>
      </View>

      {/* Modal con WebView para el SSO */}
      <Modal visible={showWebView} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 15,
              backgroundColor: "#111",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {t("authentication")}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowWebView(false);
                setIsLoading(false);
              }}
            >
              <Text
                style={{ color: "#E60023", fontSize: 16, fontWeight: "bold" }}
              >
                {t("cancel")}
              </Text>
            </TouchableOpacity>
          </View>

          <WebView
            source={{ uri: SSO_URL }}
            onNavigationStateChange={handleNavigationStateChange}
            onShouldStartLoadWithRequest={(request) => {
              // Verificamos la URL antes de que empiece a cargar (crucial para iPhone)
              const shouldStop = checkUrl(request.url);
              return !shouldStop; // Si detectamos éxito, detenemos la carga y cerramos
            }}
            startInLoadingState={true}
            incognito={true}
            userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
