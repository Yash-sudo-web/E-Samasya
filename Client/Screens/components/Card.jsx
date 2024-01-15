import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Assuming MaterialIcons are installed and imported properly

const Card = ({ title, description, imageUrl, postedBy, locationUrl,upvotes,downvotes,onUpvote,onDownvote }) => {

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.text, { fontFamily: 'Poppins-Light' }]}>{postedBy}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(locationUrl)} style={{ flexDirection: 'row' }}>
        <Image source={require('../../static/images/maps.png')} style={{ height: 20, width: 20, marginRight: 5, marginBottom: 10 }} />
        <Text style={[styles.text, { color: '#3550ca', fontFamily: 'Poppins-Medium' }]}>Location</Text>
      </TouchableOpacity>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 0,
    borderColor: '#ccc',
    marginHorizontal:10,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  votes: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  text: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Medium',
    marginRight: 10,
    marginLeft: 0,
  }
});

export default Card;
