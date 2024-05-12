import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import CarouselPublicidade from "../components/Carousel";
import ListProvice from "../components/ListProvince";
import Search from "../components/Search";
import LuandaMunicpes from "../components/ListMunicipeLuanda";
import Header from "../components/Header";
import AtmClose from "../components/AtmClose";

const Home = () => {
  return (
    <View style={styles.container}>
      <Header title={"MANEY"} />
      <ScrollView>
        <CarouselPublicidade />
        <Search />
        <LuandaMunicpes />
        <ListProvice />
        <AtmClose />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
