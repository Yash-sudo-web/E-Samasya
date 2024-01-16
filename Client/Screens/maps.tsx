import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1Ijoic291bWlsMTIzNDU2IiwiYSI6ImNscWNwcGd3bjA0YmQycXBqZDF0aGpqZTMifQ.T7y2LUJ3VtGQOEbtZ9YB2A');

const App = () => {
  return (
    
    <View style={styles.page}>
      <Text>Maps</Text>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map} />
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 750,
    width: 400,
  },
  map: {
    flex: 1
  }
});