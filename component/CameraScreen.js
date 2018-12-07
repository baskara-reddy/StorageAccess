import React, { Component } from 'react';
import {
  CameraRoll,
  StyleSheet,
  Button,
  View,
} from 'react-native';

import ViewPhotos from './ViewPhotos';

class CameraScreen extends Component {

  state = {
    showPhotoGallery: false,
    photoArray: []
  }

  getPhotosFromGallery() {
    CameraRoll.getPhotos({ first: 1000000 })
      .then(res => {
        let photoArray = res.edges;
        this.setState({ showPhotoGallery: true, photoArray: photoArray })
      })
  }

  render() {
    if (this.state.showPhotoGallery) {
      return (
        <ViewPhotos
          photoArray={this.state.photoArray} />
      )
    }
    return (
      <View style={styles.container}>
        <Button
          title='View Photos'
          onPress={() => { this.getPhotosFromGallery() }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CameraScreen;