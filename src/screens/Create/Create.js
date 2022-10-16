import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Screen } from '../../components'
import { colors } from '../../assets'
import { setObjectValue } from "../../helpers"
import { connect } from 'react-redux'
import { addCharacter } from '../../redux/simpsons/simpsonsSlice'

const Create = (props) => {
  return (
    <Screen showHeader showBack {...props}>
        <View style={styles.container}>
            <Text>Create</Text>
        </View>
    </Screen>
  )
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%"
      },
})
  
function mapDispatchToProps(dispatch) {
    return {
        addCharacter: (object) => dispatch(addCharacter(object))
    }
}
  
export default connect(mapDispatchToProps)(Create);