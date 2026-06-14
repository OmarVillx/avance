import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  verTodas: {
    color: "#E60023",
    fontSize: 14,
    fontWeight: "600",
  },
  bottomNav: {
    height: 100,
    backgroundColor: "#050505",
    borderTopWidth: 1,
    borderTopColor: "#1F1F1F",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 35,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    color: "#8A8A8A",
    fontSize: 11,
    marginTop: 4,
  },
  navTextActive: {
    color: "#E60023",
    fontWeight: "bold",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    paddingVertical: 15,
    marginHorizontal: 20,
    backgroundColor: "#111",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#222",
  },
  logoutText: {
    color: "#E60023",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
export default styles;
