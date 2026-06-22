import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useChat } from "../../hooks/useChat";
import styles from "./csschat";

const InitialAvatar = ({ nombre, sizeStyle, textStyle }) => (
  <View style={[styles.initialAvatarContainer, sizeStyle]}>
    <Text style={[styles.initialAvatarText, textStyle]}>
      {nombre ? nombre.charAt(0).toUpperCase() : ""}
    </Text>
  </View>
);

export default function Chat() {
  const router = useRouter();
  const scrollRef = useRef(null);

  const {
    contactos,
    chatSeleccionado,
    setChatSeleccionado,
    mensajesActuales,
    enviarMensaje,
    emitirEscribiendo,
    quienEscribe,
    reportarMensaje,
  } = useChat();

  const [textoInput, setTextoInput] = useState("");
  const [mostrarChat, setMostrarChat] = useState(false);
  const [msgMenuAbierto, setMsgMenuAbierto] = useState(null); // id del msg con menu abierto

  const amigos = contactos.filter((item) => item.tipo === "amigo");
  const grupos  = contactos.filter((item) => item.tipo === "grupo");

  const handleSeleccionarContacto = (item) => {
    setChatSeleccionado(item);
    setMostrarChat(true);
  };

  const handleVolver = () => {
    setMostrarChat(false);
    setMsgMenuAbierto(null);
  };

  const handleEnviar = () => {
    if (!textoInput.trim()) return;
    enviarMensaje(textoInput.trim());
    setTextoInput("");
    emitirEscribiendo(false);
  };

  const handleReportar = (msg) => {
    Alert.alert(
      "Reportar mensaje",
      `¿Quieres reportar este mensaje?\n\n"${msg.texto}"`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Reportar",
          style: "destructive",
          onPress: () => {
            reportarMensaje(msg.id);
            setMsgMenuAbierto(null);
            Alert.alert("✅ Reportado", "Tu reporte fue enviado.");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/inicio/inicio")}>
          <Text style={styles.logo}>
            UTP+ <Text style={styles.logoBlanco}>Movil</Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <Ionicons name="search-outline" size={28} color="white" />
          <Ionicons name="add-circle-outline" size={29} color="white" />
        </View>
      </View>

      {/* VISTA: Lista de contactos */}
      {!mostrarChat && (
        <ScrollView style={{ flex: 1, paddingHorizontal: 8 }}>
          <Text style={[styles.sectionTitle, { marginLeft: 8, marginTop: 10, marginBottom: 10 }]}>AMIGOS</Text>
          {amigos.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.contactItem, { paddingHorizontal: 12, marginBottom: 4 }]}
              onPress={() => handleSeleccionarContacto(item)}
            >
              <View style={{ position: "relative", marginRight: 14 }}>
                <InitialAvatar nombre={item.nombre} />
                <View style={[styles.statusDot, item.estado === "Ausente" && styles.statusAway]} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactName}>{item.nombre}</Text>
                <Text style={styles.contactStatus}>• {item.estado}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#555" />
            </TouchableOpacity>
          ))}

          <Text style={[styles.sectionTitle, { marginLeft: 8, marginTop: 20, marginBottom: 10 }]}>GRUPOS</Text>
          {grupos.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.contactItem, { paddingHorizontal: 12, marginBottom: 4 }]}
              onPress={() => handleSeleccionarContacto(item)}
            >
              <View style={{ marginRight: 14 }}>
                <InitialAvatar nombre={item.nombre} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactName}>{item.nombre}</Text>
                <Text style={styles.contactStatus}>Servidor UTP+</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#555" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* VISTA: Panel del chat */}
      {mostrarChat && chatSeleccionado && (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          {/* Header del chat */}
          <View style={styles.chatHeader}>
            <TouchableOpacity onPress={handleVolver} style={{ marginRight: 8 }}>
              <Ionicons name="chevron-back-outline" size={30} color="white" />
            </TouchableOpacity>
            <InitialAvatar
              nombre={chatSeleccionado.nombre}
              sizeStyle={styles.initialAvatarHeader}
              textStyle={styles.initialAvatarHeaderText}
            />
            <View style={styles.chatHeaderInfo}>
              <Text style={styles.chatName}>{chatSeleccionado.nombre}</Text>
              <Text style={styles.chatStatus}>
                {chatSeleccionado.tipo === "grupo" ? "Chat grupal" : chatSeleccionado.estado}
              </Text>
            </View>
            <Ionicons name="information-circle-outline" size={30} color="white" />
          </View>

          {/* Mensajes */}
          <ScrollView
            ref={scrollRef}
            style={styles.messages}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
            onLayout={() => scrollRef.current?.scrollToEnd({ animated: true })}
          >
            <View style={styles.dayBox}>
              <Text style={styles.dayText}>Hoy</Text>
            </View>

            {mensajesActuales.map((msg) => (
              <View
                key={msg.id}
                style={[styles.messageRow, msg.mio ? styles.messageRight : styles.messageLeft]}
              >
                {!msg.mio && (
                  <InitialAvatar
                    nombre={msg.remitente || chatSeleccionado.nombre}
                    sizeStyle={styles.initialAvatarMessage}
                    textStyle={styles.initialAvatarMessageText}
                  />
                )}

                <View style={{ maxWidth: "75%" }}>
                  {/* Burbuja del mensaje — long press abre el menú */}
                  <TouchableOpacity
                    onLongPress={() => setMsgMenuAbierto(msg.id === msgMenuAbierto ? null : msg.id)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.bubble, msg.mio ? styles.myBubble : styles.otherBubble,
                      msg.eliminado && { opacity: 0.5 }
                    ]}>
                      <Text style={[styles.messageText, msg.eliminado && { fontStyle: "italic" }]}>
                        {msg.texto}
                      </Text>
                      <Text style={styles.messageTime}>
                        {msg.hora} {msg.mio ? "✓✓" : ""}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* Menú de reporte — aparece al hacer long press */}
                  {msgMenuAbierto === msg.id && !msg.eliminado && (
                    <TouchableOpacity
                      onPress={() => handleReportar(msg)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#1a1a1a",
                        borderRadius: 8,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        marginTop: 4,
                        alignSelf: msg.mio ? "flex-end" : "flex-start",
                        borderWidth: 1,
                        borderColor: "#E60023",
                      }}
                    >
                      <Ionicons name="flag-outline" size={14} color="#E60023" />
                      <Text style={{ color: "#E60023", fontSize: 12, marginLeft: 5 }}>
                        Reportar mensaje
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}

            {quienEscribe && (
              <View style={[styles.messageRow, styles.messageLeft]}>
                <View style={[styles.bubble, styles.otherBubble]}>
                  <Text style={[styles.messageText, { opacity: 0.6 }]}>
                    {quienEscribe} está escribiendo...
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Input */}
          <View style={styles.inputArea}>
            <TouchableOpacity style={styles.circleButton}>
              <Ionicons name="add-outline" size={26} color="#E60023" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Escribe un mensaje..."
              placeholderTextColor="#8A8A8A"
              value={textoInput}
              onChangeText={(t) => {
                setTextoInput(t);
                emitirEscribiendo(t.length > 0);
              }}
              onSubmitEditing={handleEnviar}
              blurOnSubmit={false}
            />
            <Ionicons name="happy-outline" size={26} color="#B8B8B8" />
            <TouchableOpacity style={{ marginLeft: 10 }} onPress={handleEnviar}>
              <Ionicons name="send" size={24} color="#E60023" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/inicio/inicio")}>
          <Ionicons name="home-outline" size={26} color="#888" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/chat/chat")}>
          <Ionicons name="chatbubble" size={26} color="#E60023" />
          <Text style={[styles.navText, styles.navTextActive]}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/notificacion/notificaciones")}>
          <View style={{ position: "relative" }}>
            <Ionicons name="notifications-outline" size={26} color="#888" />
            <View style={styles.smallBadge}>
              <Text style={styles.smallBadgeText}>3</Text>
            </View>
          </View>
          <Text style={styles.navText}>Notificaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/perfil/perfil")}>
          <Ionicons name="person-outline" size={26} color="#888" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}