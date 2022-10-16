import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native'
import { Screen } from '../../components'
import { SimpsonService } from '../../services'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../assets'
import { getMyObject, setObjectValue, removeValue } from "../../helpers";

const Item = ({ item, index }) => (
  <TouchableOpacity style={styles.row} onPress={() => console.log("press")}>
    <View style={styles.mainView}>
      <View style={styles.indexView}>
        <Text style={styles.index}>{index}</Text>
      </View>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={{uri: item.avatar}}
          resizeMode={"contain"}
        />
      </View>
      <View style={styles.nameView}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </View>
    <View style={styles.buttonsView}>
      <TouchableOpacity style={styles.button}>
        <Icon name="arrow-up-outline" size={30} color={colors.black} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name="arrow-down-outline" size={30} color={colors.black} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name="trash-outline" size={30} color={colors.red} />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const Home = (props) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    //setObjectValue([{"name": "osman"}, {"name": "cacık"}])
    //getMyObject().then(res => console.log("res: ", res)).catch(e => console.log("e: ", e))

    // yapılan aşağı yukarı silme ve ekleme işlemlerinde redux'ı güncelle, sonra storageyi güncelle
    // ana sayfadaki data reduxtan gelsin
    // reduxa listeden silme - yeni kayıt ekleme ve index aşağı yukarı fonksiyonlarını ekle.
    
    getMyObject()
    .then((result) => {
      if (result) {
          // gelen datayı redux'a kaydet.
      } else {
        SimpsonService.getSimpsons()
        .then((res) => {
          // gelen datayı redux'a kaydet.
          // reduxtaki datayı storageye kaydet
          setData(res)
        })
        .catch((err) => {
          console.log("err: ", err);
        });

      }
    })
    .catch((error) => {
      console.log("error: ", error)
    });

  }, [])



  const renderItem = ({ item, index }) => (
    <Item item={item} index={index + 1} />
  );

  const keyExtractor = (item, index) => index.toString() 


  const onRefresh = () => {
    setRefreshing(true);
    // storageye istek at 
    // datayı reduxa at bitir.
    setTimeout(() => {
      setRefreshing(false)
    }, 3000);
  }
  
  return (
    <Screen showHeader>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
        <TouchableOpacity style={styles.addButton}>
            <Icon name="add-circle" size={55} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </Screen>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.2
  },
  mainView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  indexView: {
    margin: 5,
    padding: 5
  },
  index: {
    fontSize: 16,
    fontWeight: "600"
  },
  imageView: {
    margin: 5,
    padding: 5
  },
  image: {
    width: 40,
    height: 50
  },
  nameView: {
    margin: 5,
    padding: 5
  },
  name: {
    fontSize: 15,
    fontWeight: "500"
  },
  buttonsView: {
    flexDirection: "row",
    marginRight: 10
  },
  button: {
    marginHorizontal: 2,
    marginVertical: 1
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    borderRadius: 50,
    bottom: 25,
    right: 25
  }
})