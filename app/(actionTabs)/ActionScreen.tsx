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
import { useAtomValue, useSetAtom } from "jotai";
import {
  trendingMoviesAtom,
  starredMoviesAtom,
} from "@/components/GlobalStore";
import { getTrendingMoviesDirect } from "@/utilities/api-functions";
import { Movie } from "@/types/movie";

export default function ActionScreen() {
  const ref = useRef<SwiperCardRefType>();
  const [cardIndex, setCardIndex] = useState<number | null>();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const trendingMovies = useAtomValue(trendingMoviesAtom);
  const setMovies = useSetAtom(trendingMoviesAtom);
  const starredMovies = useAtomValue(starredMoviesAtom);
  const setStarredMovies = useSetAtom(starredMoviesAtom);
  const [swipes, setSwipes] = useState(0);
  const [pageId, setPageId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (isLoading) return;
      setIsLoading(true);
      const movies = await getTrendingMoviesDirect(pageId);
      setMovies([...trendingMovies, ...movies]);
      // setCardIndex(0);
      setIsLoading(false);
      console.log("trendingMovies from fetchMovies", trendingMovies.length);
    };
    fetchMovies();
  }, [pageId]);

  useEffect(() => {
    console.log("trendingMovies from useEffect swipes", trendingMovies.length);
    console.log("swipes from useEffect", swipes);
    if (swipes === trendingMovies.length - 5) {
      setPageId(pageId + 1);
    }
  }, [swipes]);

  const IMAGES: ImageSourcePropType[] = trendingMovies.map((movie) => ({
    uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  }));

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
      if (cardIndex === null || cardIndex === undefined) {
        return;
      }
      const movie = trendingMovies[cardIndex];
      setSelectedMovie(movie);
    },
    [trendingMovies]
  );

  const handleSwipeTop = (cardIndex: number) => {
    const movie = trendingMovies[cardIndex];
    setStarredMovies([...starredMovies, movie]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View style={styles.container}>
        {selectedMovie && (
          <MovieCard cardIndex={cardIndex ?? 0} movie={selectedMovie} />
        )}

        <TouchableOpacity
          className="flex-1 w-full"
          onPress={() => {
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
                console.log(
                  "trendingMovies from onIndexChange",
                  trendingMovies.length
                );
                setSwipes(index);
                setCardIndex(index);
              }}
              onSwipeRight={(cardIndex) => {
                console.log("cardIndex", cardIndex);
              }}
              onSwipedAll={() => {
                console.log("onSwipedAll");
                console.log(
                  "trendingMovies from swiped all",
                  trendingMovies.length
                );
              }}
              onSwipeLeft={(cardIndex) => {
                console.log("onSwipeLeft", cardIndex);
              }}
              onSwipeTop={(cardIndex) => {
                console.log("onSwipeTop", cardIndex);
                handleSwipeTop(cardIndex);
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

        <View style={styles.buttonsContainer}>
          <ActionButton
            style={styles.button}
            onTap={() => {
              ref.current?.swipeBack();
              setSelectedMovie(null);
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
              setSelectedMovie(null);
            }}
          >
            <SvgCancel width={32} height={32} />
          </ActionButton>
          <ActionButton
            style={styles.button}
            onTap={() => {
              ref.current?.swipeTop();
              setSelectedMovie(null);
            }}
          >
            <SvgSaveCard width={32} height={32} fill="#26A9FF" />
          </ActionButton>
          <ActionButton
            style={styles.button}
            onTap={() => {
              ref.current?.swipeRight();
              setSelectedMovie(null);
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
    bottom: 60,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "fixed",
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
