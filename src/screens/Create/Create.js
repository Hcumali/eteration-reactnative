import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { Screen } from '../../components'
import { colors } from '../../assets'
import { connect } from 'react-redux'
import { addCharacter } from '../../redux/simpsons/simpsonsSlice'
import uuid from 'react-native-uuid';


const isValidUrl = (urlString) => {
  var urlPattern = new RegExp('^(https?:\\/\\/)?'+
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
  '(\\#[-a-z\\d_]*)?$','i'); 
return !!urlPattern.test(urlString);
}

const Create = (props) => {
  const [fullName, setFullName] = useState("");
  const [job, setJob] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");
  const [emptyError1, setEmptyError1] = useState(false);
  const [emptyError2, setEmptyError2] = useState(false);
  const [emptyError3, setEmptyError3] = useState(false);
  const [emptyError4, setEmptyError4] = useState(false);
  const [urlError, setUrlError] = useState(false);

  const clearErrors = () => {
    return new Promise((resolve) => {
      setEmptyError1(false);
      setEmptyError2(false);
      setEmptyError3(false);
      setEmptyError4(false);
      setUrlError(false);
      resolve("ok")
    });
  }

  const checkInputs = () => {
    return new Promise((resolve, reject) => {
      if (
        fullName === "" || 
        job === "" || 
        about === "" || 
        image === "" || 
        isValidUrl(image) === false
      ) {
        if (fullName === "") {
          setEmptyError1(true);
          reject(-1)
        }
        if (job === "") {
          setEmptyError2(true);
          reject(-1)
        }
        if (about === "") {
          setEmptyError3(true);
          reject(-1)
        }
        if (image === "") {
          setEmptyError4(true);
          reject(-1)
        }
        if (isValidUrl(image) === false) {
          setUrlError(true);
          reject(-1)
        }
      } else {
        resolve(1)
      }
    });
  }

  const handleSubmit = () => {
    clearErrors()
    .then((res1) => {
      checkInputs()
      .then((res2) => {
        if (res2 === 1) {
          var data = {
            id: uuid.v4(),
            name: fullName,
            job: job,
            description: about,
            avatar: image
          }
          props.addCharacter(data);
          Alert.alert(
            "Başarılı",
            "Kayıt başarılı bir şekilde eklenmiştir. Devam etmek için tıklayınız.",
            [
              { text: "OK", onPress: () => {
                props.navigation.navigate("Home");
              } }
            ]
          );

        } else {
          return
        }
      })
      .catch((err2) => {
        console.log("err2: ", err2);
      })
    })
    .catch((err1) => {
      console.log("err1: ", err1);
    });
  }

  return (
    <Screen showHeader showBack contentStyle={styles.contentStyle} {...props}>
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text}>Full Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setFullName(text)}
            value={fullName}
          />
          {
            emptyError1 == true ? 
            <Text style={styles.errorText}>* This input can not be empty.</Text>
            : null
          }
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>Job Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setJob(text)}
            value={job}
          />
          {
            emptyError2 == true ? 
            <Text style={styles.errorText}>* This input can not be empty.</Text>
            : null
          }
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>About Him/Her</Text>
          <TextInput
            style={styles.inputAbout}
            onChangeText={(text) => setAbout(text)}
            value={about}
            multiline={true}
          />
          {
            emptyError3 == true ? 
            <Text style={styles.errorText}>* This input can not be empty.</Text>
            : null
          }
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>Image Link</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setImage(text)}
            value={image}
          />
          {
            emptyError4 == true ? 
            <Text style={styles.errorText}>* This input can not be empty.</Text>
            : null
          }
          {
            (urlError == true && emptyError4 == false) ? 
            <Text style={styles.errorText}>* The url must be valid.</Text>
            : null
          }
        </View>

        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonText}>Add Character</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  contentStyle: {
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    height: "100%",
    width: "92%"
  },
  row: {
    marginVertical: 12,
    marginBottom: 16
  },
  text: {
    color: colors.black,
    marginLeft: 2
  },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.grey1,
    marginTop: 1,
    borderRadius: 6,
    width: "100%",
    height: 40,
    borderWidth: 1,
    padding: 10,
    textAlign: "auto",
    textAlignVertical: "top"
  },
  inputAbout: {
    backgroundColor: colors.white,
    borderColor: colors.grey1,
    marginTop: 1,
    borderRadius: 6,
    width: "100%",
    height: 120,
    borderWidth: 1,
    padding: 10,
    textAlign: "auto",
    textAlignVertical: "top"
  },
  buttonView: {
    backgroundColor: colors.blue,
    padding: 12,
    borderRadius: 6
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center"
  },
  errorText: {
    marginTop: 4,
    marginLeft: 2,
    color: colors.red,
    fontSize: 15,
    fontWeight: "400"
  }
})

function mapStateToProps(state) {
  return { 
    list: state.simpsons.simpsonsList
  };
} 
  
function mapDispatchToProps(dispatch) {
  return {
    addCharacter: (object) => dispatch(addCharacter(object))
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Create);