// =============================================================
// hooks/useChat.js
//
// Hook de acceso rápido al contexto del chat.
// Exporta exactamente las mismas variables que chat.jsx ya usa
// (contactos, conversaciones, chatSeleccionado) para que la
// migración del componente sea mínima.
// =============================================================

import { useChats } from "../context/ChatContext";

/**
 * Devuelve los datos y acciones del chat en el mismo formato
 * que chat.jsx usa actualmente con sus constantes locales.
 *
 * Antes (hardcoded en chat.jsx):
 *   const contactos = [{ id:1, nombre:"TzNakroth", ... }]
 *   const conversaciones = { 1: [...], 2: [...] }
 *   const [chatSeleccionado, setChatSeleccionado] = useState(contactos[0])
 *   const mensajesActuales = conversaciones[chatSeleccionado.id]
 *
 * Después (usando este hook):
 *   const { contactos, mensajesActuales, chatSeleccionado,
 *           setChatSeleccionado, enviarMensaje } = useChat()
 */
export function useChat() {
  const {
    contactos,
    conversaciones,
    chatActivo,
    setChatActivo,
    mensajesActuales,
    enviarMensaje,
    emitirEscribiendo,
    conectado,
    quienEscribe,
  } = useChats();

  return {
    // Nombres compatibles con lo que ya usa chat.jsx
    contactos,
    conversaciones,
    chatSeleccionado: chatActivo,
    setChatSeleccionado: setChatActivo,
    mensajesActuales,

    // Nuevas acciones
    enviarMensaje,
    emitirEscribiendo,
    conectado,
    quienEscribe,
  };
}
