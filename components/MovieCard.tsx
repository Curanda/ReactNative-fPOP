import { View, Text, ImageSourcePropType, Image } from "react-native";
// import { Card } from "@/components/ui/card";\
import { Card } from "react-native-paper";
import { Icon } from "./ui/icon";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Divider } from "react-native-paper";
import { Chip } from "react-native-paper";
interface MovieCardProps {
  cardIndex: number;
  movie: ImageSourcePropType | null;
}

export default function MovieCard({ cardIndex, movie }: MovieCardProps) {
  if (!movie) {
    return null;
  }
  return (
    <Card
      style={{
        backgroundColor: "#F5F5F5",
        marginBottom: 50,
        width: "90%",
        height: "85%",
        borderRadius: 20,
        alignContent: "space-between",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
      mode="elevated"
    >
      <Card.Cover
        style={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        source={movie}
      />
      <View className="flex-col justify-start items-start w-full pt-4 pl-4">
        <Text className="text-black text-2xl font-bold">
          Movie {cardIndex}
          {"  "}
          <Text className="text-gray-300 text-2xl font-bold">2005</Text>
        </Text>

        <View className="flex-row justify-start items-center w-full mt-2">
          <FontAwesome6 name="house" size={16} color="#D9D9D9" />
          <Text className="text-black text-sm font-normal ml-2">
            Made in USA
          </Text>
        </View>
        <View className="flex-row justify-start items-center w-full mt-1">
          <MaterialIcons name="scoreboard" size={18} color="#D9D9D9" />
          <Text className="text-black text-sm font-normal ml-2">
            Rotten Tomatoes 92%
          </Text>
        </View>
      </View>
      <Divider
        style={{
          height: 1.5,
          width: "100%",
          backgroundColor: "#D9D9D9",
          padding: 0,
          marginTop: 8,
        }}
      />
      <Card.Content>
        <Text className="text-black text-md py-2 font-normal">Synopsis</Text>
        <Text className="text-gray-600 text-sm font-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Text>
      </Card.Content>
      <Divider
        style={{
          height: 1.5,
          width: "100%",
          backgroundColor: "#D9D9D9",
          padding: 0,
          marginTop: 8,
        }}
      />
      <Card.Content>
        <Text className="text-black text-md py-2 font-normal">Names</Text>
        <View className="flex-row justify-start items-center w-full mt-2 gap-1 flex-wrap">
          <Chip
            mode="outlined"
            selectedColor="black"
            compact={true}
            style={{
              backgroundColor: "#F5F5F5",
              borderColor: "#989898",
              borderRadius: 20,
            }}
            showSelectedCheck={false}
          >
            <Text className="text-black text-sm font-normal">
              John Travolta
            </Text>
          </Chip>
          <Chip
            mode="outlined"
            selectedColor="black"
            compact={true}
            style={{
              backgroundColor: "#F5F5F5",
              borderColor: "#989898",
              borderRadius: 20,
            }}
            showSelectedCheck={false}
          >
            <Text className="text-black text-sm font-normal">
              Anne Hathaway
            </Text>
          </Chip>
          <Chip
            compact={true}
            mode="outlined"
            selectedColor="black"
            style={{
              backgroundColor: "#F5F5F5",
              borderColor: "#989898",
              borderRadius: 20,
            }}
            showSelectedCheck={false}
          >
            <Text className="text-black text-sm font-normal">Will Smith</Text>
          </Chip>
        </View>
      </Card.Content>
      <Divider
        style={{
          height: 1.5,
          width: "100%",
          backgroundColor: "#D9D9D9",
          padding: 0,
          marginTop: 8,
        }}
      />
      <Card.Content>
        <Text className="text-black text-md py-2 font-normal">Categories</Text>
        <View className="flex-row justify-start items-center w-full mt-2 gap-1 flex-wrap">
          <Chip
            mode="outlined"
            selectedColor="black"
            compact={true}
            style={{
              backgroundColor: "#F5F5F5",
              borderColor: "#989898",
              borderRadius: 20,
            }}
            showSelectedCheck={false}
          >
            <Text className="text-black text-sm font-normal">Action</Text>
          </Chip>
          <Chip
            mode="outlined"
            selectedColor="black"
            compact={true}
            style={{
              backgroundColor: "#F5F5F5",
              borderColor: "#989898",
              borderRadius: 20,
            }}
            showSelectedCheck={false}
          >
            <Text className="text-black text-sm font-normal">Drama</Text>
          </Chip>
          <Chip
            compact={true}
            mode="outlined"
            selectedColor="black"
            style={{
              backgroundColor: "#F5F5F5",
              borderColor: "#989898",
              borderRadius: 20,
            }}
            showSelectedCheck={false}
          >
            <Text className="text-black text-sm font-normal">Comedy</Text>
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );
}
