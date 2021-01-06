import React from 'react';
import {View,Button,StyleSheet,Text,ScrollView,Alert,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


function HomeScreen({navigation}){
  return(
    <View style={styles.container}>
        <Button
          title="go to news page"
          onPress={()=>{
              GetNews();
              navigation.navigate('News');
          }}
        />
    </View>
  );
}

var dt=[];
function GetNews(){
  const url="http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c638bdcc85f74a55b2dfc15a63d3106c";

  return fetch(url)
  .then((x)=>x.json())
  .then((y)=>{dt=y.articles})
  .catch((error)=>{alert(error.toString())})
}
function NewsScreen(){
  const dataRaw=dt.map(raw=>{
    return(
      <View>
        <Text>Title:{raw.title}</Text>
        <Text>Description:{raw.description}</Text>
        <Text>Content:{raw.content}</Text>
        <Image
          style={styles.img}
          source={{uri:raw.urlToImage}}
        />
      </View>
    );
  })
  return(
    <View>
        <ScrollView>{dataRaw}</ScrollView>
    </View>
  );
}
const stack=createStackNavigator();
function App(){
  return(
    <NavigationContainer>
    <stack.Navigator>
      <stack.Screen name="Home" component={HomeScreen}/>
      <stack.Screen name="News" component={NewsScreen}/>
      
    </stack.Navigator>
  </NavigationContainer>
  );
}
export default App;

const styles=StyleSheet.create({

  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  img:{
    width:100,
    height:100
  }

});