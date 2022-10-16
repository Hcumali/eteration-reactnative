import AsyncStorage from '@react-native-async-storage/async-storage';

export const getMyObject = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@data')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
        console.log("error while getMyObject: ", e);
    }
}

export const setObjectValue = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@data', jsonValue)
    } catch(e) {
        console.log("error while setObjectValue: ", e);
    }
}

export const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('@data')
  } catch(e) {
    console.log("error while removeValue: ", e);
  }
}

