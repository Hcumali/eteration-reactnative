import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native'
import { Screen } from '../../components'
import { SimpsonService } from '../../services'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../assets'
import { getMyObject, setObjectValue } from "../../helpers";
import { connect } from 'react-redux'
import { setList, removeCharacter, carryUp, carryDown } from '../../redux/simpsons/simpsonsSlice'

const Home = (props) => {
  const [refreshing, setRefreshing] = useState(false)
  
  useEffect(() => {
    getMyObject()
    .then((result) => {
      if (result != null && result.length > 0) {
        props.setList(result);
      } else {
        SimpsonService.getSimpsons()
        .then((res) => {
          props.setList(res);
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

  useEffect(() => {
    setObjectValue(props.list)
  }, [props.list])
  

  const Item = ({ item, index }) => (
    <TouchableOpacity style={styles.row} onPress={() => {
      props.navigation.navigate("Detail", { item })
    }}>
      <View style={styles.mainView}>
        <View style={styles.indexView}>
          <Text style={styles.index}>{index}</Text>
        </View>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={{uri: item?.avatar}}
            resizeMode={"contain"}
          />
        </View>
        <View style={styles.nameView}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>
      <View style={styles.buttonsView}>
        <TouchableOpacity onPress={() => {
          if (index != 1) {
            props.carryUp(item.id)
          }
        }} style={styles.button}>
          <Icon name="arrow-up-outline" size={30} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.carryDown(item.id)} style={styles.button}>
          <Icon name="arrow-down-outline" size={30} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.removeCharacter(item.id)} style={styles.button}>
          <Icon name="trash-outline" size={30} color={colors.red} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => (
    <Item item={item} index={index + 1} />
  );

  const keyExtractor = (item, index) => index.toString() 

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getMyObject()
      .then((result) => {
        if (result != null && result.length > 0) {
          props.setList(result);
          setRefreshing(false);
        } else {
          SimpsonService.getSimpsons()
          .then((res) => {
            props.setList(res);
            setRefreshing(false);
          })
          .catch((err) => {
            console.log("err: ", err);
          });
        }
      })
      .catch((error) => {
        console.log("error: ", error)
      });
    }, 1000);
  }
  
  return (
    <Screen showHeader {...props}>
      <View style={styles.container}>
        <FlatList
          data={props.list}
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

function mapStateToProps(state) {
  return { 
    list: state.simpsons.simpsonsList
  };
} 

function mapDispatchToProps(dispatch) {
  return {
    setList: (array) => dispatch(setList(array)),
    removeCharacter: (id) => dispatch(removeCharacter(id)),
    carryUp: (id) => dispatch(carryUp(id)),
    carryDown: (id) => dispatch(carryDown(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

