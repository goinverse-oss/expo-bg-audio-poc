import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import RNSound from 'react-native-sound';

import base64 from 'base-64';

const PlayButton = ({ isPlaying, url, onPress }) => (
  <Button
    title={isPlaying ? "Pause" : "Play"}
    onPress={() => onPress(url)}
  />
);

export default class App extends React.Component {
  constructor() {
    super();

    this.togglePlayingRNAS = this.togglePlayingRNAS.bind(this);
    this.togglePlayingRNS = this.togglePlayingRNS.bind(this);

    // 😎
    this.url = base64.decode('aHR0cHM6Ly9zMy11cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9wYXRyZW9uLXBvc3RzLzEwNDI2MDM4ODgwODA3NjU3NjUwLm1wMw==');

    this.state = {
      rnas: {
        isPlaying: false,
        isPaused: false,
      },
      rns: {
        isPlaying: false,
        isPaused: false,
      },
    };
  }

  isPlaying(key) {
    return this.state[key].isPlaying;
  }

  isPaused(key) {
    return this.state[key].isPaused;
  }

  togglePlayingState(key) {
    this.setState({
      [key]: {
        isPlaying: !this.isPlaying(key),
        isPaused: this.isPlaying(key),
      },
    });
  }

  togglePlayingRNAS(url) {
    if (this.isPlaying('rnas')) {
      ReactNativeAudioStreaming.pause();
    } else if (this.isPaused('rnas')) {
      ReactNativeAudioStreaming.resume();
    } else {
      ReactNativeAudioStreaming.play(this.url, {
        showInIOSMediaCenter: true,
        showInAndroidNotifications: true,
      });
    }
    this.togglePlayingState('rnas');
  }

  togglePlayingRNS(url) {
    if (this.isPlaying('rns')) {
      this.sound.pause();
    } else if (this.isPaused('rns')) {
      this.sound.play();
    } else {
      RNSound.setCategory('Playback');
      this.sound = new RNSound(this.url, undefined, (error) => {
        if (error) {
          console.log('error: ' + error);
          throw error;
        }
        console.log('loaded sound');
        this.sound.play();
      });
    }
    this.togglePlayingState('rns');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>react-native-audio-streaming</Text>
        <PlayButton isPlaying={this.state.rnas.isPlaying} onPress={this.togglePlayingRNAS} />

        <Text>react-native-sound</Text>
        <PlayButton isPlaying={this.state.rns.isPlaying} onPress={this.togglePlayingRNS} />
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
