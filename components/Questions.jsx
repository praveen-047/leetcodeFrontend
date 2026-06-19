import React, { useEffect, useState } from "react";
import {
  FlatList,
  Linking,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";

export default function Questions({ selectedDate, refresh }) {
  const [tab, setTab] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);

  const today = new Date();
  const todayDate = `${today.getDate()}-${today.toLocaleString("en-US", { month: "long" }).slice(0, 3)}-${today.getFullYear()}`;

  //Fetching data from the database based on date
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://leetcode-backend-gold.vercel.app/api/tasks/${selectedDate}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setQuestions(data);
      // console.log(data);
    } catch (error) {
      console.log("get tasks error :" + error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [selectedDate, refresh, tab]);

  const markCompleted = async (taskId) => {
    try {
      const url = `https://leetcode-backend-gold.vercel.app/api/tasks/${taskId}/complete`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, options);
      // console.log("Question completed");

      await fetchData();
    } catch (error) {
      console.log("mark completed error:", error);
    }
  };

  const renderTabs = () => (
    <View style={{ marginVertical: 15 }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => setTab("pending")}
          style={{
            backgroundColor: tab === "pending" ? "#FFB116" : "#D4D4D4",
            borderRadius: 50,
            paddingVertical: 13,
            paddingHorizontal: 15,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              color: tab === "pending" ? "white" : "black",
              fontWeight: 800,
              fontSize: 15,
            }}
          >
            Pending
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTab("completed")}
          style={{
            backgroundColor: tab === "completed" ? "#FFB116" : "#D4D4D4",
            borderRadius: 50,
            paddingVertical: 13,
            paddingHorizontal: 15,
          }}
        >
          <Text
            style={{
              color: tab === "completed" ? "white" : "black",
              fontWeight: 800,
              fontSize: 15,
            }}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView></ScrollView>
    </View>
  );

  const renderQuestions = ({ item }) => (
    <View
      style={{
        backgroundColor: "#EFEFEF",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 8,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ width: "70%" }}>
        <Text style={{ color: "#AEAEAE", fontSize: 14, fontWeight: 800 }}>
          {item.questionNumber}
        </Text>
        <Pressable
          onPress={() => Linking.openURL(item.url)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 15,
              fontWeight: 800,
              marginVertical: 6,
              marginRight: 8,
            }}
          >
            {item.title}
          </Text>
          <FontAwesome name="external-link" size={15} color="#AB94FF" />
        </Pressable>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="clock-o" size={15} color="#AB94FF" />
          <Text style={{ color: "#AB94FF", paddingHorizontal: 5 }}>
            {new Date(item.createdAt).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </Text>
          <Text style={{ color: "#AB94FF" }}>15/07/26</Text>
        </View>
      </View>
      <View
        style={{
          width: "25%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 13,
            fontWeight: 600,
            color:
              item.difficulty === "Easy"
                ? "#1CBABA"
                : item.difficulty === "Medium"
                  ? "#FFB700"
                  : "#E83131",
          }}
        >
          {item.difficulty}
        </Text>
        <Text
          style={{
            color: "#AEAEAE",
            fontSize: 12,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Acceptance{"\n"} {item.acceptanceRate}%
        </Text>
        {item.status === "pending" ? (
          <TouchableOpacity
            onPress={() => markCompleted(item._id)}
            style={{
              backgroundColor: "#5FAF2E",
              borderRadius: 10,
              marginVertical: 5,
              paddingHorizontal: 10,
              paddingVertical: 6,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        ) : (
          <FontAwesome name="check" size={20} color={"#69d028"} />
        )}
      </View>
    </View>
  );

  const filterQuestions = questions.filter(
    (question) => question.status === tab,
  );

  return (
    <>
      {renderTabs()}
      {loading ? (
        <ActivityIndicator size={"large"} color={"#FFB116"} />
      ) : (
        <View style={{ flex: 1, backgroundColor: "" }}>
          <FlatList
            data={filterQuestions}
            renderItem={renderQuestions}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{}}
          />
        </View>
      )}
    </>
  );
}
