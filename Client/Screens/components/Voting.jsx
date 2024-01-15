import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Voting({onUpvotePress,onDownvotePress,upvoteCount,downvoteCount}) {
  return (
    <View style={styles.votes}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center',marginLeft:5}}>
          <TouchableOpacity onPress={onUpvotePress}>
            <Image
              style={{height: 25, width: 25, marginRight: 5}}
              source={require('../../static/images/thumb_up.jpg')}
            />
          </TouchableOpacity>
          <Text style={[styles.text, {fontSize: 20}]}>{upvoteCount}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={onDownvotePress}>
            <Image
              style={{height: 25, width: 25, marginRight: 5}}
              source={require('../../static/images/thumb_down.jpg')}
            />
          </TouchableOpacity>
          <Text style={[styles.text, {fontSize: 20}]}>{downvoteCount}</Text>
        </View>
      </View>
    </View>
  );
}

styles = StyleSheet.create({
  votes: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Medium',
    marginRight: 10,
    marginLeft: 0,
  },
});
