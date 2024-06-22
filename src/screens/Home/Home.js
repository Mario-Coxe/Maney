import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import CarouselPublicidade from "../components/Carousel";
import ListProvice from "../components/ListProvince";
import Search from "../components/Search";
import LuandaMunicpes from "../components/ListMunicipeLuanda";
import Header from "../components/Header";
import AtmClose from "../components/AtmClose";

const Home = () => {
  return (
    <View style={styles.container}>
      <Header title={"MONEY"} />
      <FlatList
        ListHeaderComponent={
          <>
            <CarouselPublicidade />
            <Search />
            <LuandaMunicpes />
            <ListProvice />
            <AtmClose />
          </>
        }
        data={[]}
        //renderItem={({ item }) => }
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flatListContent: {
    flexGrow: 1,
  },
});

export default Home;
