import React, {useState} from 'react';
import { Image, Text, TextInput, View,Button,StyleSheet,TouchableOpacity,Picker, ScrollView } from 'react-native';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown'

const App = ()=>{

  const [temp, setTemp] = useState([]);
  const [tempCategory, settempCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const category = [
    "age", 
    "alone", 
    "amazing", 
    "anger",
    "architecture",
    "art",
    "attitude",
    "beauty",
    "best",
    "birthday",
    "business",
    "car",
    "change",
    "communications",
    "computers",
    "cool",
    "courage",
    "dad",
    "dating",
    "death",
    "design",
    "dreams",
    "education",
    "environmental",
  ]

  const handlePress = async() =>{
    setIsLoading(false);
    const res = await  axios.get(`https://api.api-ninjas.com/v1/quotes?category=${tempCategory}`, { headers: { 'X-Api-Key': 'BQll62ESs83iYt6ztWCJqg==b5ko7sq6PFW9PXSw' } })
    .then(response => {
        setTemp(response.data);
        setIsLoading(true);
     })
    .catch((error) => {
        throw new Error(error.message);
     });
  }

  return (
    <>
    <View style={style.header} >

      <Text style={style.category}>Category :</Text>
      <View style={style.selectButton}>
        <SelectDropdown
          buttonStyle={style.dropdown4BtnStyle}
          data={category}
          onSelect={(selectedItem, index) => {
            settempCategory(selectedItem, index);
          } } />

      </View>
    </View><ScrollView style={style.container}>


        {temp.map((quotes) => (
          <View key={quotes.author} style={style.quote}>
            <Text style={style.text}>"{quotes.quote}"</Text>
            <Text style={style.textAuthor}> - {quotes.author}</Text>


          </View>
        ))}


        <TouchableOpacity
          style={style.button}

          onPress={() => handlePress()}
          color="#00cec9"
        ><Text style={style.colorText}>{isLoading ? "Generated" : 'loading...'}</Text></TouchableOpacity>



      </ScrollView>
      </>
  )
}

const style = StyleSheet.create({
  header:{
    backgroundColor:'#2d3436',
    
  },
  container: {
    backgroundColor:'#2d3436',
    height:'100%',
  },
  category:{
    color:'white',
    fontSize:20,
    marginLeft:140,
    marginVertical:10,
    
  },
  quote:{
    width: '100%',
    display: 'flex',
    marginTop:'10%',
  },
  colorText:{
    color:'black',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color:'white',
    width:'90%',
    letterSpacing:3,
    marginLeft:12,
  },
  textAuthor: {
    fontSize: 16,
    fontWeight: '400',
    color:'white',
    marginLeft:12,
    marginVertical:12,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    color:'white',
    height: 40,
    width: 150,
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft:120,
    outlineColor: "#fff",
    outlineStyle: "solid",
    outlineWidth: 4,
  },
  dropdown4BtnStyle: {
    width: '50%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    color:'red',
  },
  selectButton:{
    marginLeft:125,
  }
 

})


export default App;