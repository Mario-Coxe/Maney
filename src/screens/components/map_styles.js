import { StyleSheet } from "react-native";

export const map_style = StyleSheet.create({
  markerIcon: {
    backgroundColor: "blue",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
  containerImovelInfo: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  closeBtn: {
    position: "absolute",
    top: 5,
    right: 5,
    padding: 10,
  },
});

export default map_style;
