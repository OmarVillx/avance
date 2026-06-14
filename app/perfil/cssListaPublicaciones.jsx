import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  publicacion: {
    backgroundColor: "#0D0D0D",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
  },
  etiquetaContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 10,
  },
  etiquetaTexto: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },
  imagen: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stats: {
    flexDirection: "row",
    gap: 15,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statText: {
    color: "#8A8A8A",
    fontSize: 13,
  },
  hora: {
    color: "#555",
    fontSize: 12,
  },
});

export default styles;
