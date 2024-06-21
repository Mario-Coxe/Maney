import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import ListMyAtm from "../components/Agent/ListMyAtm";
import NavigationButton from "../components/NavigationButton";
import Profile from "./Profile";

const HomeAgent = () => {
  const route = useRoute();
  const { userData } = route.params;
  const navigation = useNavigation();
  //console.log(userData);

  return (
    <View style={styles.container}>
      <Header title={"Money"} />
      <ListMyAtm id={userData.id} name={userData.name} />
      <View style={{ alignItems: "center" }}>
        <NavigationButton
          onPressProfile={() => {
            navigation.navigate("Profile", { userData: userData });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
});

export default HomeAgent;
