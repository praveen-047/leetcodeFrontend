import { View, Text } from 'react-native'
import React from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'

export default function Screen({children}) {
  return (
    <SafeAreaView
        style={{
            flex:1,
            paddingHorizontal:15,
            paddingTop:0,
            backgroundColor:"white"
        }}>
        {children}
    </SafeAreaView>
  )
}