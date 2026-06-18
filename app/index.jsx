import {useState} from 'react'
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import Header from '../components/Header'
import Screen from '../components/Screen'
import Dates from '../components/Dates'
import Questions from '../components/Questions'
export default function Index() {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(
    `${today.getDate()}-${today.toLocaleString("en-US", {
      month: "long",
    }).slice(0, 3)}-${today.getFullYear()}`
  );

  const[refresh,setRefresh] = useState(false)


  return (
    <Screen>
      <StatusBar style="auto" backgroundColor="black"/>
      <Header setRefresh={setRefresh} />
      <Dates
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <Questions selectedDate={selectedDate} refresh={refresh} />
    </Screen>
  );
}
