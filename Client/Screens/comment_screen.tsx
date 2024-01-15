import React from 'react';
import { View, Text, Image, ImageBackground, TextInput, TouchableWithoutFeedback, ScrollView } from 'react-native';
import axios from 'axios';
import SessionStorage from 'react-native-session-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Card from './components/Card';

interface CommentProps {
  navigation: any;
  route: any;
}

function CommentScreen({ navigation, route }: CommentProps) {
  const [comment, setComment] = React.useState('');
  const userId = SessionStorage.getItem('userId');
  const token = SessionStorage.getItem('token');
  const [com, setCom] = React.useState([]);
  const [cardData, setCardData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false)
    
  const handleComment = async () => {
    try {
      await axios.post(
        'https://4742-2401-4900-8094-22d1-4b1-d9b3-bed5-ddc4.ngrok-free.app/api/v1/comment',
        { content: comment, postId: route.params.card.id, userId: userId },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };
  const patchUpvotes = (id,up) => async () => {
    
    try {
        await axios.patch(
            `https://4742-2401-4900-8094-22d1-4b1-d9b3-bed5-ddc4.ngrok-free.app/api/v1/post/${id}`,
            {
                upvotes: cardData.results[0].upvotes+1,
            },
            {
            headers: {
                Authorization: `token ${token}`,
            },
            }
        );
        setRefreshing(true);
    }
    catch (error) {
        console.log(error);
    }
    };
  const patchDownvotes = (id,downvotes) => async () => {
    try {
        await axios.patch(
            `https://4742-2401-4900-8094-22d1-4b1-d9b3-bed5-ddc4.ngrok-free.app/api/v1/post/${id}`,
            {
                downvotes: cardData.results[0].downvotes+1,
            },
            {
            headers: {
                Authorization: `token ${token}`,
            },
            }
        );
        setRefreshing(true);
    }
    catch (error) {
        console.log(error);
    }
    };

    React.useEffect(()=>{
      let refe = refreshing
      let newRefres = !refe
      navigation.addListener('focus',()=>{
          setRefreshing(newRefres)
          
          // if (userId != null && token != null) {
          // }

      })
  },[])
  

    React.useEffect(() => {
      const fetchPosts = async () => {
        try {
          const token = await SessionStorage.getItem('token');
          const response = await axios.get(`https://4742-2401-4900-8094-22d1-4b1-d9b3-bed5-ddc4.ngrok-free.app/api/v1/comment/${route.params.card.id}`,
            {
              headers: {
                Authorization: `token ${token}`,
              },
            });
          console.log(response.data);
          setCom(response.data.results);
          console.log(com);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
  
      const fetchPost = async () => {
          try {
            const token = await SessionStorage.getItem('token');
            const response = await axios.get(`https://4742-2401-4900-8094-22d1-4b1-d9b3-bed5-ddc4.ngrok-free.app/api/v1/post/${route.params.card.id}`,
              {
                headers: {
                  Authorization: `token ${token}`,
                },
              });
            console.log(response.data);
            setCardData(response.data);
            console.log(cardData);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching comments:', error);
          }
        };
    
  
      fetchPosts();
      fetchPost();
    }, [refreshing,navigation]);
  

  return (
    <>
      <ImageBackground style={{ flex: 1, "backgroundColor": "#ffffff01" }} source={require('../static/images/backgroundopacity.png')}>
        <ScrollView>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 20, width: 20, marginTop: 10, marginBottom: 10, marginLeft: 20 }}>
              <Image source={require("../static/images/left-arrow.png")} style={{ height: 20, width: 20 }} />
            </TouchableOpacity>
            <Card title={route.params.card.title} locationUrl={route.params.card.locURL} description={route.params.card.description} postedBy="Arnav" onUpvote={patchUpvotes(route.params.card.id,route.params.card.upvotes)} upvotes={route.params.card.upvotes} downvotes={route.params.card.downvotes} onDownvote={patchDownvotes(route.params.card.id,route.params.card.downvotes)} imageUrl={route.params.card.image} />
          </View>
          <View style={{ flex: 1, backgroundColor: "#ffffff", borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: 20 }}>
            <Text style={{ fontSize: 20, color: "#000000", fontFamily: 'Poppins-Regular', alignSelf: 'flex-start', marginLeft: 20, marginTop: 10 }}>
              Comments
            </Text>
            <View style={{ height: 1, backgroundColor: "#000000", width: "90%", alignSelf: "center", marginBottom: 20 }}></View>

            {com.map((comment) => (
              <View key={comment.id} style={{ flexDirection: "row", width: "90%", alignSelf: "center", marginBottom: 20, "borderBottomWidth": 1, "borderBottomColor": "#66666667" }}>
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontSize: 15, marginBottom: 5, color: "#000000", fontFamily: 'Poppins-Bold' }}>
                    {'Anonymous User'}
                  </Text>
                  <Text style={{ fontSize: 15, marginBottom: 5, color: "#000000", fontFamily: 'Poppins-Regular' }}>
                    {comment.content}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>

      <View style={{ flexDirection: "row", width: "100%", backgroundColor: "#fff", alignItems: "center", justifyContent: "center", alignSelf: "center" }}>
        <View style={{ "backgroundColor": "#f0f0f0", borderRadius: 10, marginBottom: 10, width: "90%", flexDirection: "row", alignItems: 'center' }}>
          <TextInput
            value={comment}
            onChangeText={(comment) => setComment(comment)}
            multiline={true}
            numberOfLines={4}
            placeholder="Write a comment"
            placeholderTextColor={"#666"}
            style={{ "width": "90%", color: "#000", "fontSize": 15, "fontFamily": "Poppins-Regular", "borderRadius": 20, "paddingLeft": 20, "paddingRight": 20, "paddingTop": 10, "paddingBottom": 10, "height": 50, "alignSelf": "center" }}
          />
          <TouchableWithoutFeedback onPress={handleComment}>
            <Image source={require("../static/images/send.png")} style={{ height: 25, width: 25 }} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  )
}

export default CommentScreen;
