// =============================================================
// context/ChatContext.jsx
//
// Provee a chat.jsx los datos que necesita (contactos, mensajes,
// funciones de envío) sin que chat.jsx sepa si vienen del mock
// o de la BD. El frontend existente no se toca.
//
// Uso en _layout.jsx o en la pantalla raíz:
//   import { ChatProvider } from "../context/ChatContext";
//   <ChatProvider userId="1"><Stack /></ChatProvider>
// =============================================================

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { conectar, desconectar, getSocket } from "../services/socketService";

const ChatContext = createContext(null);

export function ChatProvider({ children, userId = "1", nombreUsuario = "Yo" }) {
  const [contactos, setContactos] = useState([]);
  const [conversaciones, setConversaciones] = useState({});
  const [chatActivo, setChatActivoState] = useState(null);
  const [escribiendoPor, setEscribiendoPor] = useState({});
  const [conectado, setConectado] = useState(false);

  // ── Iniciar socket al montar ──────────────────────────────
  useEffect(() => {
    const socket = conectar();

    socket.on("connect", () => {
      setConectado(true);
      // Identificarse con el servidor
      socket.emit("usuario:conectar", { userId, nombre: nombreUsuario });
    });

    socket.on("disconnect", () => setConectado(false));

    // Recibe la lista de chats del servidor al conectar
    socket.on("chat:listar", ({ chats }) => {
      setContactos(chats);
    });

    // Recibe el historial de mensajes al abrir un chat
    socket.on("mensajes:historial", ({ chatId, mensajes }) => {
      setConversaciones((prev) => ({ ...prev, [chatId]: mensajes }));
    });

    // Recibe un mensaje nuevo en tiempo real
    socket.on("mensaje:nuevo", (msg) => {
      setConversaciones((prev) => {
        const prevMsgs = prev[msg.chatId] || [];
        const yaExiste = prevMsgs.some((m) => m.id === msg.id);
        if (yaExiste) return prev;

    // Marca el mensaje como mío si el remitente es el usuario actual
        const mensajeConMio = {
          ...msg,
          mio: String(msg.remitenteId) === String(userId),
        };
        return { ...prev, [msg.chatId]: [...prevMsgs, mensajeConMio] };
  });
});

    // Cambio de presencia de otro usuario
    socket.on("presencia:cambio", ({ userId: uid, estado }) => {
      setContactos((prev) =>
        prev.map((c) => (String(c.id) === String(uid) ? { ...c, estado } : c))
      );
    });

    // Indicador "está escribiendo"
    socket.on("escribiendo", ({ chatId, nombre, escribiendo }) => {
      setEscribiendoPor((prev) => ({ ...prev, [chatId]: escribiendo ? nombre : null }));
    });

    return () => {
      desconectar();
    };
  }, [userId, nombreUsuario]);

  // ── Cambiar de chat activo ────────────────────────────────
  const setChatActivo = useCallback((chat) => {
    setChatActivoState(chat);
    if (!chat) return;
    const socket = getSocket();
    if (socket) {
      socket.emit("chat:unirse", { chatId: chat.id });
      socket.emit("mensaje:marcarVisto", { chatId: chat.id });
    }
  }, []);

  // ── Enviar mensaje ────────────────────────────────────────
const enviarMensaje = useCallback(
  (texto) => {
    if (!chatActivo || !texto.trim()) return;
    const socket = getSocket();
    if (!socket) return;

    // ❌ Elimina todo el bloque del "agregado optimista" (msgLocal)
    // Solo emite al servidor y deja que "mensaje:nuevo" lo agregue
    socket.emit("mensaje:enviar", {
      chatId: chatActivo.id,
      texto: texto.trim(),
      remitente: nombreUsuario,
    });
  },
  [chatActivo, nombreUsuario]
);

  // ── Emitir "está escribiendo" ─────────────────────────────
  const emitirEscribiendo = useCallback(
    (activo) => {
      const socket = getSocket();
      if (!socket || !chatActivo) return;
      socket.emit(activo ? "escribiendo:inicio" : "escribiendo:fin", {
        chatId: chatActivo.id,
      });
    },
    [chatActivo]
  );

  // ── Mensajes del chat activo ──────────────────────────────
  const mensajesActuales = chatActivo
    ? conversaciones[chatActivo.id] || []
    : [];

  const quienEscribe = chatActivo ? escribiendoPor[chatActivo.id] : null;

  return (
    <ChatContext.Provider
      value={{
        // ── Datos que chat.jsx ya espera ──────────────────
        contactos,
        conversaciones,
        chatActivo,
        setChatActivo,
        mensajesActuales,
        // ── Acciones ─────────────────────────────────────
        enviarMensaje,
        emitirEscribiendo,
        // ── Estado extra ─────────────────────────────────
        conectado,
        quienEscribe,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

/** Hook para consumir el contexto del chat */
export function useChats() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChats debe usarse dentro de <ChatProvider>");
  return ctx;
}
