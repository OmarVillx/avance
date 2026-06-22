import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { conectar, desconectar, getSocket } from "../services/socketService";

const ChatContext = createContext(null);

export function ChatProvider({ children, userId = "1", nombreUsuario = "Yo" }) {
  const [contactos, setContactos] = useState([]);
  const [conversaciones, setConversaciones] = useState({});
  const [chatActivo, setChatActivoState] = useState(null);
  const [escribiendoPor, setEscribiendoPor] = useState({});
  const [conectado, setConectado] = useState(false);

  useEffect(() => {
    const socket = conectar();

    socket.on("connect", () => {
      setConectado(true);
      socket.emit("usuario:conectar", { userId, nombre: nombreUsuario });
    });

    socket.on("disconnect", () => setConectado(false));

    socket.on("chat:listar", ({ chats }) => {
      setContactos(chats);
    });

    socket.on("mensajes:historial", ({ chatId, mensajes }) => {
      setConversaciones((prev) => ({ ...prev, [chatId]: mensajes }));
    });

    socket.on("mensaje:nuevo", (msg) => {
      setConversaciones((prev) => {
        const prevMsgs = prev[msg.chatId] || [];
        const yaExiste = prevMsgs.some((m) => m.id === msg.id);
        if (yaExiste) return prev;
        const mensajeConMio = {
          ...msg,
          mio: String(msg.remitenteId) === String(userId),
        };
        return { ...prev, [msg.chatId]: [...prevMsgs, mensajeConMio] };
      });
    });

    // ── Mensaje eliminado por reportes ────────────────────
    socket.on("mensaje:eliminado", ({ msgId, chatId, textoReemplazado }) => {
      setConversaciones((prev) => {
        const msgs = prev[chatId] || [];
        const actualizados = msgs.map((m) =>
          String(m.id) === String(msgId)
            ? { ...m, texto: textoReemplazado, eliminado: true }
            : m
        );
        return { ...prev, [chatId]: actualizados };
      });
    });

    socket.on("presencia:cambio", ({ userId: uid, estado }) => {
      setContactos((prev) =>
        prev.map((c) => (String(c.id) === String(uid) ? { ...c, estado } : c))
      );
    });

    socket.on("escribiendo", ({ chatId, nombre, escribiendo }) => {
      setEscribiendoPor((prev) => ({ ...prev, [chatId]: escribiendo ? nombre : null }));
    });

    return () => {
      desconectar();
    };
  }, [userId, nombreUsuario]);

  const setChatActivo = useCallback((chat) => {
    setChatActivoState(chat);
    if (!chat) return;
    const socket = getSocket();
    if (socket) {
      socket.emit("chat:unirse", { chatId: chat.id });
      socket.emit("mensaje:marcarVisto", { chatId: chat.id });
    }
  }, []);

  const enviarMensaje = useCallback(
    (texto) => {
      if (!chatActivo || !texto.trim()) return;
      const socket = getSocket();
      if (!socket) return;
      socket.emit("mensaje:enviar", {
        chatId: chatActivo.id,
        texto: texto.trim(),
        remitente: nombreUsuario,
      });
    },
    [chatActivo, nombreUsuario]
  );

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

  // ── Reportar mensaje ──────────────────────────────────────
  const reportarMensaje = useCallback(
    (msgId) => {
      const socket = getSocket();
      if (!socket || !chatActivo) return;
      socket.emit("mensaje:reportar", {
        msgId,
        chatId: chatActivo.id,
      });
    },
    [chatActivo]
  );

  const mensajesActuales = chatActivo
    ? conversaciones[chatActivo.id] || []
    : [];

  const quienEscribe = chatActivo ? escribiendoPor[chatActivo.id] : null;

  return (
    <ChatContext.Provider
      value={{
        contactos,
        conversaciones,
        chatActivo,
        setChatActivo,
        mensajesActuales,
        enviarMensaje,
        emitirEscribiendo,
        reportarMensaje, // ← nuevo
        conectado,
        quienEscribe,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChats() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChats debe usarse dentro de <ChatProvider>");
  return ctx;
}