import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import ListMyAtm from "../components/Agent/ListMyAtm";
import NavigationButton from "../components/NavigationButton";
const HomeAgent = () => {
  const route = useRoute();
  const { userData } = route.params;

  //console.log(userData.id);

  return (
    <View style={styles.container}>
      <Header title={"MANEY"} />
      <ListMyAtm id={userData.id} name={userData.name} />
      <View style={{ alignItems: "center" }}>
        <NavigationButton
          onPressHome={() => {}}
          onPressChat={() => {}}
          onPressProfile={() => {}}
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
