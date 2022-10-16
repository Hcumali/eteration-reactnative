import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../assets'

const Header = (props) => {
  const { showBack, navigation } = props;

  const backButtonHitSlop = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  };

  if (showBack) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={backButtonHitSlop}
        >
          <Icon name="arrow-back-outline" size={30} color={colors.black} />
        </TouchableOpacity>
        <View>
          <Text style={styles.text}>Simpsons</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container2}>
      <View>
        <Text style={styles.text}>Simpsons</Text>
      </View>
    </View>
  );
}

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey3,
    height: 60,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container2: {
    backgroundColor: colors.grey3,
    height: 60,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "600",
    fontSize: 18,
    color: colors.black
  }
})