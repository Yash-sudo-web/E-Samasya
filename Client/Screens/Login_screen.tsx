import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import SessionStorage from 'react-native-session-storage';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from './components/CustomButton';
import axios from 'axios';


interface LoginProps {
  navigation: any;
  route: any;
}

function Login_screen({navigation,route}:LoginProps){
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [userId,setUserId] = useState(null)
  const handleLogin = async () => {
      try {
        const response = await axios.post('https://4742-2401-4900-8094-22d1-4b1-d9b3-bed5-ddc4.ngrok-free.app/api/v1/gettoken', {
            otp: otp,
            user: userId,
          })
          console.log(response.data)
          if (response.data.token != ""){
            SessionStorage.setItem("token",response.data.token)
            navigation.navigate("thankyou")
          }
        }
       catch (error) {
        console.log(error)
      }
  }
  const handleGetOTP = async () => {
    try {
      const response = await axios.post('https://4742-2401-4900-8094-22d1-4b1-d9b3-bed5-ddc4.ngrok-free.app/api/v1/signin', {
        phone: phoneNumber,
      });

      console.log('Phone Number sent successfully:', response.data);
      setUserId(response.data.userid)
      SessionStorage.setItem("userId",response.data.userid)
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: "white" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../static/images/hombre.gif')}
            style={{ height: 300, width: 300, marginBottom: 20 }}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 24,
            color: '#333',
            marginBottom: 30,
          }}>
          Sign into your account!
        </Text>

        <View style={{ "flexDirection": "row", alignItems: "center", borderBottomWidth: 0.5, borderBottomColor: "#666", marginBottom: 10 }}>
          <MaterialIcons name="phone" size={20} color="#666" style={{ marginRight: 5 }} />
          <TextInput
            keyboardType="number-pad"
            style={{ color: "#666", padding: 5,width:"90%" }}
            placeholder='Enter Phone Number'
            placeholderTextColor={"#666"}
            value={phoneNumber}
            onChangeText={phoneNumber => { setPhoneNumber(phoneNumber); console.log(phoneNumber) }} // Update phone number state
          />
        </View>

        <View style={{ "flexDirection": "row", alignItems: "center", borderBottomWidth: 0.5, borderBottomColor: "#666", marginBottom: 10 }}>
          <View style={{ "flexDirection": "row", alignItems: "center" }}>
            <Ionicons name="key" size={20} color="#666" style={{ marginRight: 5 }} />
            <TextInput
              keyboardType="number-pad"
              style={{ color: "#666", padding: 5,width:"82%"}}
              placeholder='Enter OTP'
              placeholderTextColor={"#666"}
              value={otp}
              onChangeText={otp => { setOtp(otp); console.log(otp) }} // Update phone number state
            />
          </View>
          <TouchableOpacity onPress={handleGetOTP}>
            <Text style={{ "color": "#40A2AF", fontWeight: "600" , marginLeft:-18, width:100}}>Get OTP</Text>
          </TouchableOpacity>
        </View>

        <CustomButton label={"Login"} onPress={handleLogin} />


        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
            marginBottom: 30,
          }}>
          <Text
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: 14,
              color: '#666',
            }}>
            Need anything? touch this
          </Text>
          <TouchableOpacity onPress={()=>{
            
          }}>
            <Text
              style={{
                fontFamily: 'Roboto-Regular',
                fontSize: 14,
                color: '#40A2AF',
                marginLeft: 5,
              }}>
              Help
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};


export default Login_screen