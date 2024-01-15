import React from 'react'
import {Image,View,Text,ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import CustomButton from './components/CustomButton';
import Home from './home_screen';

interface LetsProps {
  navigation: any;
  route: any;
}

function Lets({ navigation, route }: LetsProps) {
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff", justifyContent: 'flex-start', alignItems: "center" }}>
      <Image source={require('../static/images/lets.jpg')} style={{ width: '100%', height: '60%' }}/>
      <View style={{flex:1, backgroundColor:"#ffffff", width:'90%',marginTop:'15%'}}>
        <Text style={{textAlign: 'center', fontSize: 30, color: '#000000',fontFamily:'Poppins-SemiBold'}}>
          Help build the community you want to see
        </Text>
        <TouchableOpacity
          onPress={() => { navigation.navigate('Login') }}
          style={{
            backgroundColor: '#000000',
            padding: 12,
            width: 115,
            marginTop: '5%',
            marginLeft: '65%',
            marginRight: '5%',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color:'#ffffff', fontSize: 18, fontFamily:'Poppins'}}>Let's Go ➜</Text>

        </TouchableOpacity>
      </View>
      {/* </Image> / */}
    </View>

  )
}

export default Lets;
  