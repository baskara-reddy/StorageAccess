import React from 'react'
//import Image from 'react-native-scalable-image';

import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  StyleSheet,
  Button,
  CameraRoll,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native'

import Share from 'react-native-share'
import RNFetchBlob from 'react-native-fetch-blob'

let styles
const { width } = Dimensions.get('window')

class App extends React.Component {
  static navigationOptions = {
    title: 'Camera Roll App'
  }

  state = {
    modalVisible: false,
    photos: [],
    index: null,
    fullscreen: false
  }

  setIndex = (index) => {
    if (index === this.state.index) {
      index = null
    }
    //debugger;
    fullscreen = true
    this.setState({ index, fullscreen })
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All'
    })
    .then(r => this.setState({ photos: r.edges }))
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  toggleFullScreen = () => {
    this.setState({ fullscreen: !this.state.fullscreen });
  }

  navigater = () => {
    //debugger;
    const { navigate } = this.props.navigation
    navigate('ImageBrowser')
  }

  render() {
    console.log('state in render :', this.state)
    return (
      <View style={styles.container}>
        <Button
          title='View Photos'
          onPress={() => { this.toggleModal(); this.getPhotos() }}
        />
        <Button
          title='Browse Images'
          onPress={this.navigater}
        />
        <Modal 
           animationType={"slide"} 
           transparent={false} 
           visible={this.state.modalVisible} 
           onRequestClose={() => console.log('closed')}>
          <View style={styles.modalContainer}>
            <Button
              title='Close'
              onPress={() => {this.toggleModal(); this.toggleFullScreen()}}
            />
            <ScrollView
             contentContainerStyle={styles.scrollView}>
              {
                
                this.state.photos.map((p, i) => 
                {
                  return (
                   <TouchableHighlight
                      style={{opacity: 1}}
                      key={i}
                      underlayColor='transparent'
                      onPress={() => {this.setIndex(i); this.toggleFullScreen()}}
                    >
                      <Image
                         style={{
                          width: this.state.fullscreen === true ? width : width/3,
                          height: this.state.fullscreen === true ? width : width/3
                        }}
                        //resizeMode={'contain'}
                        source={{uri: p.node.image.uri}}
                      />
                    </TouchableHighlight>
                  )
                })
              }
            </ScrollView>
          </View>
        </Modal>
      </View>
    )
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#999'
  },
  modalContainer: {
    paddingTop: 20,
    //backgroundColor: '#fc0',
    flex: 1
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
})

export default App