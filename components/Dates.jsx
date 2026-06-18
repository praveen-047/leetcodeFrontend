import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function Dates({ selectedDate, setSelectedDate }) {
  const today = new Date();
  // const [now, setNow] = useState(today.getDate());

  const dates = [];

  for (let i = -4; i <= 0; i++) {
    const curDate = new Date(today);

    curDate.setDate(today.getDate() + i);

    dates.push({
      date: curDate.getDate(),
      month: curDate
        .toLocaleString("en-US", {
          month: "long",
        })
        .slice(0, 3),
      day: curDate
        .toLocaleString("en-US", {
          weekday: "long",
        })
        .slice(0, 3),

      fullDate: `${curDate.getDate()}-${curDate
        .toLocaleString("en-US", { month: "long" })
        .slice(0, 3)}-${curDate.getFullYear()}`,
    });
  }

  const renderItem = ({ item }) => {
    const value = selectedDate === item.fullDate;
    const color = value ? "white" : "black";
    return (
      <Pressable
        onPress={() => setSelectedDate(item.fullDate)}
        style={{
          backgroundColor: value ? "#FFB116" : "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingVertical: 7,
          borderRadius: value ? 15 : 0,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 14, color: color }}>
          {item.month}
        </Text>
        <Text
          style={{
            fontWeight: "900",
            fontSize: 27,
            color: color,
            paddingVertical: 1,
          }}
        >
          {item.date}
        </Text>
        <Text style={{ fontWeight: "700", fontSize: 14, color: color }}>
          {item.day}
        </Text>
      </Pressable>
    );
  };

  return (
    <View>
      <FlatList
        data={dates}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item) => item.date.toString()}
        contentContainerStyle={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 15,
        }}
      />
    </View>
  );
}
