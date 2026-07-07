import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0D0D0D",
    borderRadius: 14,
    marginHorizontal: 20,
    marginTop: 20,
    overflow: "hidden",
  },
  imagenFondo: {
    width: "100%",
    height: 150,
    opacity: 0.3,
  },
  contenido: {
    padding: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  titulo: {
    color: "#E60023",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 10,
  },
  textoPrincipal: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 10,
    lineHeight: 26,
  },
  descripcion: {
    color: "#B8B8B8",
    fontSize: 14,
    lineHeight: 20,
  },
});

export default styles;
