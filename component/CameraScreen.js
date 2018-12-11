import React, { Component } from 'react';
import {
  CameraRoll,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
  PermissionsAndroid
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

  async handleLoadImages() {
    try 
    {
     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
           console.log('Storage Access Permission granted!');
           this.getPhotosFromGallery();
          } else {
             console.log('Storage Access Permissions denied :(');
           }
    } 
    catch (err) {
             console.warn(err);
          }
    }

  render() {
    if (this.state.showPhotoGallery) {
      return (
        <ViewPhotos
          photoArray={this.state.photoArray} 
        />
      );
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => { this.handleLoadImages() }}>
          <Image source={require("../assets/addPhoto.png")}/>
          <Text>Images</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#859a9b',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#999'
  }
});

export default CameraScreen;