import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  comunidad: {
    backgroundColor: "#0D0D0D",
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    alignItems: "center",
    width: 130,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  statusDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#30D158",
    borderWidth: 2,
    borderColor: "#0D0D0D",
  },
  nombre: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 3,
    textAlign: "center",
  },
  miembros: {
    color: "#8A8A8A",
    fontSize: 11,
  },
});

export default styles;
