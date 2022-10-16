import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { Screen } from '../../components'
import { colors } from '../../assets'

const Detail = (props) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    setItem(props.route.params.item)
  }, [])
  
  return (
    <Screen showHeader showBack {...props}>
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={{uri: item?.avatar}}
            resizeMode={"contain"}
          />
        </View>
        <View style={styles.infoView}>
          <Text style={styles.name}>{item?.name}</Text>
          <Text style={styles.job}>{item?.job}</Text>
        </View>
        <ScrollView 
          style={styles.descriptionView}
          contentContainerStyle={{    
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <Text style={styles.description}>{item?.description}</Text>
        </ScrollView>
      </View>
    </Screen>
  )
}

export default Detail

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  imageView: {
    marginTop: 30,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 250,
    height: 225
  },
  infoView: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  name: {
    fontSize: 21,
    fontWeight: "600",
    padding: 8
  },
  job: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.black
  },
  descriptionView: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.grey1,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40
  },
  description: {
    fontSize: 16,
    marginTop: "6%",
    paddingHorizontal: "6%",
    fontWeight: "500",
    color: colors.black,
    textAlign: "justify"
  }
})