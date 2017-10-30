import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Player } from 'react-native-audio-streaming';

import base64 from 'base-64';

export default class App extends React.Component {
  render() {
    // 😎
    const url = base64.decode('aHR0cHM6Ly9zMy11cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9wYXRyZW9uLXBvc3RzLzEwNDI2MDM4ODgwODA3NjU3NjUwLm1wMw==');

    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>

        <Player url={url} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
