import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#1f1f1f",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  cancelText: {
    color: "#8a8a8a",
    fontSize: 16,
    fontWeight: "600",
  },
  saveText: {
    color: "#e60023",
    fontSize: 16,
    fontWeight: "bold",
  },
  form: {
    padding: 20,
  },
  label: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 12,
    color: "white",
    paddingHorizontal: 15,
    height: 48,
    fontSize: 15,
    marginBottom: 20,
  },
  inputMultiline: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  infoText: {
    color: "#666",
    fontSize: 12,
    marginTop: -12,
    marginBottom: 20,
    paddingLeft: 5,
  },
});

export default styles;
