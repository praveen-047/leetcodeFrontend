import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { problemsetQuestionList } from "../assets/leetcode_questions.json";

const Header = ({setRefresh}) => {
  const [modelVisible, setVisible] = useState(false);
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState(false);

  const searchQuestion = async () => {
    const questionNumber = Number(input);

    // console.log("input:", input);
    // console.log("questionNumber:", Number(input));

    if (
      input.trim() === "" ||
      !Number.isInteger(questionNumber) ||
      questionNumber < 1 ||
      questionNumber > problemsetQuestionList.length
    ) {
      setInputError(true);
      return;
    }
    setInputError(false);
    let question = problemsetQuestionList[input - 1].title
      .toLowerCase()
      .split(" ")
      .join("-");

    let questionURL = `https://leetcode.com/problems/${question}/description/`;
    const today = new Date();
    const todayDate = `${today.getDate()}-${today.toLocaleString("en-US", { month: "long" }).slice(0, 3)}-${today.getFullYear()}`;
    // console.log(todayDate);
    
    try {
      const url = "https://leetcode-backend-gold.vercel.app/api/task";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionNumber,
          url: questionURL,
          assignedDate: todayDate,
        }),
      };
      const response = await fetch(url, options);
      // console.log("Status:", response.status);
      const data = await response.json();
      console.log("response:",data);
      setRefresh(prev=>!prev)
    } catch (error) {
      console.log("Error:", error);
    }finally{
      setVisible(false)
    }

    // Linking.openURL(`https://leetcode.com/problems/${question}/description/`)
  };

  return (
    <>
      <Modal visible={modelVisible} transparent animationType="none">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(241, 241, 241, 0.52)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 15,
              width: "80%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginBottom: 0,
              }}
            >
              <FontAwesome
                name="close"
                size={20}
                onPress={() => setVisible(false)}
              />
            </View>
            <Text
              style={{ fontSize: 14, fontWeight: 600, marginHorizontal: 9 }}
            >
              Leetcode Question (1 to 3800)
            </Text>
            <TextInput
              style={{
                color: "#898989",
                backgroundColor: "rgba(218, 218, 218, 0.8)",
                marginTop: 10,
                marginBottom: 5,
                paddingVertical: 10,
                paddingHorizontal: 10,
                fontSize: 16,
                fontWeight: 600,
                borderRadius: 10,
              }}
              placeholder="Enter number"
              onChangeText={(text) => setInput(text)}
            />
            {inputError ? (
              <Text
                style={{
                  paddingBottom: 8,
                  marginHorizontal: 9,
                  paddingTop: 5,
                  color: "#ff3939",
                  fontWeight: 600,
                }}
              >
                *Enter a valid number
              </Text>
            ) : (
              ""
            )}

            <TouchableOpacity
              onPress={searchQuestion}
              style={{
                backgroundColor: "#FFB116",
                borderRadius: 50,
                paddingVertical: 13,
                paddingHorizontal: 15,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: 15,
                  paddingLeft: 5,
                  textAlign: "center",
                }}
              >
                Add Question
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View
        style={[
          styles.view,
          {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
        ]}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/images/leetcodeLogo.png")}
            style={{ marginRight: 10, resizeMode: "contain", width: 50 }}
          />
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Leetcode</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{
              backgroundColor: "#FFB116",
              borderRadius: 50,
              display: "flex",
              flexDirection: "row",
              paddingVertical: 13,
              paddingHorizontal: 15,
            }}
          >
            <AntDesign name="plus" size={20} color={"white"} />
            <Text
              style={{
                color: "white",
                fontWeight: 600,
                fontSize: 15,
                paddingLeft: 5,
              }}
            >
              Add Task
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: "white",
  },
});

export default Header;
