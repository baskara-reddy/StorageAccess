import React, { Component } from 'react';
import PhotoView from 'react-native-photo-view';
import {
  Image,
  View,
  StyleSheet,
  TouchableHighlight,
  Modal,
  Dimensions,
  ScrollView
} from 'react-native';

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

class ViewPhotos extends Component {

  state = {
    modalVisible: false,
    index: null,
    uri: '../assets/addPhoto.jpg'
  }

  setIndex = (key) => {
    this.setState({ index: key });
    this.setState({uri: this.props.photoArray[key].node.image.uri});
    }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  render() {
    console.log('state in render :', this.state)
    return (
      <View style={styles.modalContainer}>
        <Modal 
           animationType={"slide"} 
           transparent={false} 
           visible={this.state.modalVisible} 
           onRequestClose={() => console.log('closed')}>
           <View style={styles.container}>
             <TouchableHighlight
                style={{ opacity: 1 }}
                key={1}
                underlayColor='transparent'
                onPress={() => { this.setState({uri: '../assets/addPhoto.jpg'}); this.toggleModal(); }}
            >
            <PhotoView
              source={{uri: this.state.uri}}
              resizeMode="contain"
              backgroundColor="#999"
              style={{
                width: width,
                height: height,
                alignSelf: 'center' 
              }} />
             </TouchableHighlight>
           </View>
        </Modal>

          <View style={styles.Container}>
           <ScrollView
             contentContainerStyle={styles.scrollView}>
              {
                this.props.photoArray.map((p, i) => 
                {
                  return (
                   <TouchableHighlight
                      style={{ opacity: 1 }}
                      key={i}
                      underlayColor='transparent'
                      onPress={() => { this.setIndex(i); this.toggleModal(); }}
                   >
                      <Image
                         style={{
                          width: width / 3,
                          height: width / 3
                        }}
                        source={{ uri: p.node.image.uri }}
                      />
                    </TouchableHighlight>
                  )
                })
              }
            </ScrollView>
           </View>
         </View>
    );
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

export default ViewPhotos;