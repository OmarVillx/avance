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
    flexDirection: "row",
    backgroundColor: "#050505",
    borderTopWidth: 1,
    borderTopColor: "#1F1F1F",
    paddingTop: 12,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navText: {
    color: "#8A8A8A",
    fontSize: 10,
    marginTop: 4,
  },
  navTextActive: {
    color: "#FF4D67",
    fontWeight: "bold",
  },
  smallBadge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "#E60023",
    borderRadius: 8,
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  smallBadgeText: {
    color: "white",
    fontSize: 8,
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
