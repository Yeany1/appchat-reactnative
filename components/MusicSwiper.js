import React from "react";
import { Page, Swiper, Box, Text } from "zmp-ui";

export default function MusicSwiper() {
  return (
    <>
      <Box
        mt={6}
        flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Swiper duration={2000} autoplay loop>
          <Swiper.Slide>
            <img
              className="slide-img"
              src={require("../assets/musics/1.jpg")}
              alt="slide-1"
              style={{ width: '100%', objectFit: "fill", borderRadius: 12 }}
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src={require("../assets/musics/2.jpg")}
              alt="slide-1"
              style={{ width: '100%', objectFit: "fill", borderRadius: 12 }}
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src={require("../assets/musics/3.jpg")}
              alt="slide-1"
              style={{ width: '100%', objectFit: "fill", borderRadius: 12 }}
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src={require("../assets/musics/4.jpg")}
              alt="slide-1"
              style={{ width: '100%', objectFit: "fill", borderRadius: 12 }}
            />
          </Swiper.Slide>
          
          
        </Swiper>
      </Box>
    </>
  );
}
