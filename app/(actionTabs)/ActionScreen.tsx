import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  type ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, type SwiperCardRefType } from "rn-swiper-list";
import ActionButton from "../../components/ActionButton";
import SvgCancel from "../../assets//Icons/SvgCancel";
import SvgRefresh from "../../assets/Icons/SvgRefresh";
import SvgHeart from "../../assets/Icons/SvgHeart";
import SvgSaveCard from "../../assets/Icons/SvgSaveCard";
import MovieCard from "@/components/MovieCard";
const IMAGES: ImageSourcePropType[] = [
  require("../../assets/images/dummy1.png"),
  require("../../assets/images/dummy2.png"),
  require("../../assets/images/dummy3.png"),
  require("../../assets/images/dummy4.png"),
  require("../../assets/images/dummy5.png"),
  require("../../assets/images/dummy6.png"),
];

export default function ActionScreen() {
  const ref = useRef<SwiperCardRefType>();
  const [cardIndex, setCardIndex] = useState<number | null>();
  const [movie, setMovie] = useState<ImageSourcePropType | null>(null);
  useEffect(() => {
    setCardIndex(0);
  }, []);

  const renderCard = useCallback((image: ImageSourcePropType) => {
    return (
      <View style={styles.renderCardContainer}>
        <Image
          source={image}
          style={styles.renderCardImage}
          resizeMode="cover"
        />
      </View>
    );
  }, []);
  const OverlayLabelRight = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: "green",
          },
        ]}
      />
    );
  }, []);
  const OverlayLabelLeft = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: "red",
          },
        ]}
      />
    );
  }, []);
  const OverlayLabelTop = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: "blue",
          },
        ]}
      />
    );
  }, []);

  const handleOpenMovieCard = useCallback(
    (cardIndex: number | null | undefined) => {
      console.log("handleOpenMovieCard", cardIndex);
      if (cardIndex === null || cardIndex === undefined) {
        return;
      }
      const movie = IMAGES[cardIndex];
      console.log("movie", cardIndex);
      setMovie(movie);
    },
    []
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View style={styles.container}>
        {movie && <MovieCard cardIndex={cardIndex ?? 0} movie={movie} />}
        {!movie && (
          <TouchableOpacity
            className="flex-1 w-full"
            onPress={() => {
              console.log("onPress!!!!!!!!!!!!!");
              console.log("cardIndex", cardIndex);
              handleOpenMovieCard(cardIndex);
            }}
          >
            <View style={styles.subContainer}>
              <Swiper
                ref={ref}
                cardStyle={styles.cardStyle}
                data={IMAGES}
                renderCard={renderCard}
                onIndexChange={(index) => {
                  console.log("Current Active index", index);
                  setCardIndex(index);
                }}
                onSwipeRight={(cardIndex) => {
                  console.log("cardIndex", cardIndex);
                }}
                onSwipedAll={() => {
                  console.log("onSwipedAll");
                }}
                onSwipeLeft={(cardIndex) => {
                  console.log("onSwipeLeft", cardIndex);
                }}
                onSwipeTop={(cardIndex) => {
                  console.log("onSwipeTop", cardIndex);
                }}
                OverlayLabelRight={OverlayLabelRight}
                OverlayLabelLeft={OverlayLabelLeft}
                OverlayLabelTop={OverlayLabelTop}
                onSwipeActive={() => {
                  console.log("onSwipeActive");
                }}
                onSwipeStart={() => {
                  console.log("onSwipeStart");
                }}
                onSwipeEnd={() => {
                  console.log("onSwipeEnd");
                }}
              />
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.buttonsContainer}>
          <ActionButton
            style={styles.button}
            onTap={() => {
              ref.current?.swipeBack();
            }}
          >
            <SvgRefresh
              width={32}
              height={32}
              stroke="#F1C177"
              strokeWidth={4}
            />
          </ActionButton>
          <ActionButton
            style={styles.button}
            onTap={() => {
              ref.current?.swipeLeft();
            }}
          >
            <SvgCancel width={32} height={32} />
          </ActionButton>
          <ActionButton
            style={styles.button}
            onTap={() => {
              ref.current?.swipeTop();
            }}
          >
            <SvgSaveCard width={32} height={32} fill="#26A9FF" />
          </ActionButton>
          <ActionButton
            style={styles.button}
            onTap={() => {
              ref.current?.swipeRight();
            }}
          >
            <SvgHeart width={32} height={32} fill="#23E1A1" />
          </ActionButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonsContainer: {
    flexDirection: "row",
    bottom: 30,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    height: 60,
    borderRadius: 40,
    marginHorizontal: 20,
    aspectRatio: 1,
    backgroundColor: "#ffffff",
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  cardStyle: {
    width: "95%",
    height: "75%",
    borderRadius: 15,
    marginVertical: 20,
  },
  renderCardContainer: {
    flex: 1,
    borderRadius: 15,
    height: "75%",
    width: "100%",
  },
  renderCardImage: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  overlayLabelContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});
