import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import RNSound from 'react-native-sound';
RNSound.setCategory('Playback');

import base64 from 'base-64';

class PlayButton extends React.Component {
  constructor() {
    super();

    this.state = {
      isPlaying: false,
      isLoading: false,
      isPaused: false,
    };
    this.sound = null;

    this.togglePlayingRNS = this.togglePlayingRNS.bind(this);
  }

  togglePlayingState() {
    this.setState({
      isPlaying: !this.state.isPlaying,
      isPaused: this.state.isPlaying,
    });
  }

  togglePlayingRNS() {
    if (this.state.isPlaying) {
      this.sound.pause();
    } else if (this.state.isPaused) {
      this.sound.play();
    } else {
      this.setState({ isLoading: true });
      this.sound = new RNSound(this.props.url, undefined, (error) => {
        this.setState({ isLoading: false });
        if (error) {
          console.log('error: ' + error);
          throw error;
        }
        console.log('loaded sound');
        this.sound.play(() => {
          this.setState({ isPlaying: false });
          this.sound.release();
          this.sound = null;
        });
      });
    }
  }

  stopPlaying() {
    this.setState({
      isPlaying: false,
      isLoading: false,
      isPaused: false,
    });
    this.sound.stop().release();
  }

  togglePlaying() {
    const dispatch = {
      'rnas': this.togglePlayingRNAS,
      'rns': this.togglePlayingRNS,
    };
    dispatch[this.props.type]();
    this.togglePlayingState();
  }

  getTitle() {
    if (this.state.isLoading) {
      return 'Loading';
    }

    return this.state.isPlaying ? 'Pause' : 'Play';
  }

  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Button
          title={this.getTitle()}
          onPress={() => this.togglePlaying()}
        />
        <Button
          title="Stop"
          disabled={!(this.state.isPlaying || this.state.isPaused)}
          onPress={() => this.stopPlaying()}
        />
      </View>
    );
  }
}

export default class App extends React.Component {
  constructor() {
    super();

    this.urls = [
      base64.decode('aHR0cHM6Ly9zMy11cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9wYXRyZW9uLXBvc3RzLzEwNDI2MDM4ODgwODA3NjU3NjUwLm1wMw=='),
      base64.decode('aHR0cHM6Ly9zMy11cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9wYXRyZW9uLXBvc3RzL3NBcWpRZ0xZejBtc01VaHpwZnBTa1BHR0FLeFVDZ2c1SU5rdGJlYUN6MndOeG4tVDJ4LTNfWm4zQWRJN2VKRGkubXAzCg=='),
    ];
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>react-native-sound</Text>
        {
          this.urls.map(url => (
            <PlayButton key={url} url={url} type="rns" />
          ))
        }
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
