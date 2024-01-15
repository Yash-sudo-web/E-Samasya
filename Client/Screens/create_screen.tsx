import React from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import SessionStorage from 'react-native-session-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground } from 'react-native';

interface CreateProps {
  navigation: any;
  route: any;
}

function CreateScreen({ navigation, route }: CreateProps) {
  const [image, setImage] = React.useState('https://i.imgur.com/pPmdmDV.png');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [locationURL, setLocationURL] = React.useState('');

  const pickImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };

  const postToServer = async () => {
    const token = await SessionStorage.getItem('token');
    console.log(token);
    try {
      var formData = new FormData();
      formData.append('image', {
        uri: image,
        type: 'image/jpeg', // Change the type based on the image type you are using
        name: 'photo.jpg', // Change the name as needed
      });
      formData.append('title', title);
      formData.append('description', description);
      formData.append('locURL', locationURL);
      formData.append('userId', await SessionStorage.getItem('userId'));
      const response = await axios.post(
        'https://4742-2401-4900-8094-22d1-4b1-d9b3-bed5-ddc4.ngrok-free.app/api/v1/post',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `token ${token}`,
          },
        }
      );
      console.log('Post successful:', response.data);
      navigation.navigate('HomeTab');
    } catch (error) {
      console.error('Error posting to server:', error);
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ backgroundColor: '#ffffff01' }} source={require('../static/images/backgroundopacity.png')}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 22,
              marginTop: 30,
              alignSelf: 'center',
            }}
          >
            Create a Post
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: '5%' }}>
            <TouchableOpacity onPress={() => pickImage()}>
              <Image source={{ uri: image }} style={{ width: '100%', aspectRatio: 1.3, borderRadius: 20 }} />
            </TouchableOpacity>
          </View>
          <View style={{ alignSelf: 'center', marginHorizontal: '5%' }}>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text style={{ color: '#000000', fontFamily: 'Poppins-Medium', fontSize: 18 }}>Title</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <TextInput
                value={title}
                onChangeText={(title) => setTitle(title)}
                style={{
                  backgroundColor: '#dfdfdfde',
                  borderRadius: 20,
                  width: '100%',
                  paddingLeft: 20,
                  fontFamily: 'Poppins',
                  color: '#000000',
                }}
              />
            </View>
            {/* Location URL */}
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text style={{ color: '#000000', fontFamily: 'Poppins-Medium', fontSize: 18 }}>Location URL</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <TextInput
                value={locationURL}
                onChangeText={(locationURL) => setLocationURL(locationURL)}
                style={{
                  backgroundColor: '#dfdfdfde',
                  borderRadius: 20,
                  width: '100%',
                  paddingLeft: 20,
                  fontFamily: 'Poppins',
                  color: '#000000',
                }}
              />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text style={{ color: '#000000', fontFamily: 'Poppins-Medium', fontSize: 18 }}>Description</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <TextInput
                value={description}
                onChangeText={(description) => setDescription(description)}
                style={{
                  backgroundColor: '#dfdfdfde',
                  borderRadius: 20,
                  width: '100%',
                  fontFamily: 'Poppins',
                  color: '#000000',
                  paddingLeft: 20,
                  textAlignVertical: 'top',
                  height: 100, // Adjust the height for multiline input
                }}
                multiline
              />
            </View>
            {/* ...Other fields */}
            <View style={{ flex: 1, alignItems: 'center', marginBottom: 30 }}>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: '#000000',
                  borderRadius: 20,
                  width: '80%',
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => postToServer()}
              >
                <Text style={{ color: '#ffffff', fontFamily: 'Poppins', fontSize: 18 }}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        </ImageBackground>
      </SafeAreaView>
      
    </>
  );
}

export default CreateScreen;
