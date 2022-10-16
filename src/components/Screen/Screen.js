import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import { colors } from '../../assets';

const Screen = (props) => {
    const {
        children,
        containerStyle,
        contentStyle,
        showHeader,
        showBack
    } = props;

  return (
    <SafeAreaProvider>
        <SafeAreaView style={[styles.container, containerStyle]}>
            <StatusBar backgroundColor={"#FFF"} barStyle="dark-content" />
            {
                showHeader &&
                <Header
                    showBack={showBack}
                    {...props}
                />
            }
            <View style={[styles.content, contentStyle]}>
                {children}
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: colors.backgroundGrey,
    },
})