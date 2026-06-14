import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 14,
    padding: 15,
    marginBottom: 30,
  },
  searchInput: {
    flex: 1,
    color: "white",
    fontSize: 16,
    marginLeft: 12,
  },
  sectionTitle: {
    color: "#888",
    fontSize: 16,
    marginBottom: 15,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  resultAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  resultInitial: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  resultInfo: {
    marginLeft: 15,
  },
  resultName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultType: {
    color: "#888",
    fontSize: 14,
    marginTop: 2,
  },
});

export default styles;
