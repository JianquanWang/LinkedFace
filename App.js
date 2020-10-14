/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

'use strict';
import React, { PureComponent, Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, PanResponder, Dimensions, Image, CameraRoll} from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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

const Stack = createStackNavigator();

class App extends Component {
  render(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CameraView">
        <Stack.Screen name="CameraView" component={CameraView} options={{title:'LinkedFace'}}/>
        <Stack.Screen name="ImageDisplayScreen" component={ImageDisplayScreen} options={{title:'LinkedFace'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}


// Camera implement with react-native-camera
class CameraView extends PureComponent {
  constructor (props){
    super(props)
    this.state = {
      zoom: 0,
      flash: 'off',
      autoFocus: 'on',
      depth: 0,
      type: RNCamera.Constants.Type.back,
      whiteBalance: 'auto',
      ratio: '16:9',
      source: '',
    };
    //this.launchCamera;
  }  
  render() {
    return (
      <View style={styles.container}>
         <ZoomView
            onZoomProgress={progress => {
              this.setState({ zoom: progress });
            }}
            onZoomStart={() => {
              console.log('zoom start');
            }}
            onZoomEnd={() => {
              console.log('zoom end');
            }}
          > 

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
        </ZoomView>
      </View>
    );
  }
  // not used
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
        this.props.navigation.navigate('ImageDisplayScreen', {source: this.state.source});
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
      const options = { };
      const data = await this.camera.takePictureAsync(options);
      this.props.navigation.navigate('ImageDisplayScreen', {source: data.uri});
      console.log(data.uri);
    }
  };
}




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

class ImageDisplayScreen extends Component{
  render(){
    const params = this.props.route.params;
    const source = params ? params.source : null; 
    console.log(JSON.stringify(source));
    return (
      <View style={styles.container}>
          <Image source={{uri: JSON.stringify(source)}}
                 style={{width:400, height:512}}
                 onLoad={() => this.forceUpdate()}
                 resizeMode='cover'/>

          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent'}}>
              <TouchableOpacity onPress={this.goBack.bind(this)} style={styles.capture}>
                <Text style={{fontSize: 14}}> Cancel </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.pick.bind(this)} style={styles.capture}>
                <Text style={{fontSize: 14}}> Pick </Text>
              </TouchableOpacity>
          </View>
      </View>
    );
}
  goBack = () => {
    console.log("Cancel image");
    this.props.navigation.goBack();
  };

  pick = () => {
    console.log("Pick this image");
    // this.props.navigation.navigate('');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
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

export default App;