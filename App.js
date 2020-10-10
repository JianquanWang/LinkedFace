/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 
'use strict';
import React, { PureComponent, Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, PanResponder, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';


/*
ImagePicker.showImagePicker((response) => {
  console.log('Response = ', response);

  if(response.didCancel){
    console.log('User cancelled image picker');
  } else if(response.error){
    console.log('ImagePicker Error: ', response.error);
  } else if(response.customButton){
    console.log('User tapped custom button: ', response.customButton);
  } else {
    const source = {uri: response.uri};
    // const source = {uri: 'data:image/jpeg;base64,' + response.data};
    this.setState({
      avatarSource: source,
    });
  }
});
*/




// Camera implement with react-native-camera
class CameraView extends PureComponent {
  constructor (props){
    super(props)
    this.state = {
      zoom: 0,
      flash: 'off',
      autoFocus: 'on',
      depth: 0,
      type: RNCamera.Constants.Type.front,
      whiteBalance: 'auto',
      ratio: '16:9',
      source: '',
    };
    this.launchCamera;
  }  
  render() {
    return (
      <View style={styles.container}>

        {/* <ZoomView
        onZoomProgress={progress => {
          this.setState({ zoom: progress });
        }}
        onZoomStart={() => {
          console.log('zoom start');
        }}
        onZoomEnd={() => {
          console.log('zoom end');
        }}
        > */}

        <RNCamera zoom={this.state.zoom} style={{ flex: 1 }} ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={this.state.type}
          flashMode={this.state.flash}
          autoFocus={this.state.autoFocus}
          depth={this.state.depth}
          whiteBalance={this.state.whiteBalance}
          ratio={this.state.ratio}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          />
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'transparent'}}>
        <TouchableOpacity onPress={this.launchImageLibrary.bind(this)} style={styles.capture}>
            <Text style={{fontSize: 14}}> Library </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.switchCamera.bind(this)} style={styles.capture}>
            <Text style={{fontSize: 14}}> Switch</Text>
          </TouchableOpacity>
        </View>
        {/* </ZoomView> */}
      </View>
    );
  }

  launchCamera = () => {
  ImagePicker.launchCamera((response) => {
    console.log('Response = ', response);
  
    if(response.didCancel){
      console.log('User cancelled image picker');
    } else if(response.error){
      console.log('ImagePicker Error: ', response.error);
    } else if(response.customButton){
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = {uri: response.uri};
      // const source = {uri: 'data:image/jpeg;base64,' + response.data};
      this.setState({
        source: source,
      });
    }
  });
  };

  launchImageLibrary = () => {
    ImagePicker.launchImageLibrary((response) => {
      console.log('Response = ', response);
    
      if(response.didCancel){
        console.log('User cancelled image picker');
      } else if(response.error){
        console.log('ImagePicker Error: ', response.error);
      } else if(response.customButton){
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        // const source = {uri: 'data:image/jpeg;base64,' + response.data};
        this.setState({source: source});
      } 
    });
  };

  switchCamera = () => {
   if (this.state.type === RNCamera.Constants.Type.back){
    console.log('switch from back to front');
    this.setState({type: RNCamera.Constants.Type.front});
  } else {
    console.log('switch from front to back');
    this.setState({type: RNCamera.Constants.Type.back});
  }
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // on pc
    transform: [{rotate:"-90deg"}],
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});


// ZoomView
class ZoomView extends Component {
  constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      onPanResponderMove: (e, { dy }) => {
        const { height: windowHeight } = Dimensions.get('window');
        return this.props.onZoomProgress(Math.min(Math.max((dy * -1) / windowHeight, 0), 0.5));
      },
      onMoveShouldSetPanResponder: (ev, { dx }) => {
        return dx !== 0;
      },
      onPanResponderGrant: () => {
        return this.props.onZoomStart();
      },
      onPanResponderRelease: () => {
        return this.props.onZoomEnd();
      },
    });
  }
  render() {
    return (
      <View style={{ flex: 1, width: '100%' }} {...this._panResponder.panHandlers}>
        {this.props.children}
      </View>
    );
  }
}

export default CameraView;