import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";

const { width, height } = Dimensions.get("window");


const publicidades = [
  require("../../../assets/image/advertising/bca.jpeg"),
  require("../../../assets/image/advertising/bca1.jpeg"),
  require("../../../assets/image/advertising/keve_3.jpeg"),
  require("../../../assets/image/advertising/visa.jpeg"),
];

const CarouselAdvertising = () => {
  return (
    <Carousel
      data={publicidades}
      renderItem={({ item }) => (
        <Image source={item} style={styles.publicidadeImage} />
      )}
      sliderWidth={width}
      itemWidth={width}
      loop={true}
      autoplay={true}
      autoplayDelay={2000}
      autoplayInterval={3000}
    />
  );
};

const styles = StyleSheet.create({
  publicidadeImage: {
    width: width,
    height: 400,
    resizeMode: "cover",
  },
});

export default CarouselAdvertising;
