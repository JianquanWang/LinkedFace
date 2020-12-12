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
import { StyleSheet, Text, TouchableOpacity, View, PanResponder, Dimensions, Image, Platform, PermissionsAndroid} from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraRoll from "@react-native-community/cameraroll";

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
async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission, {
    title: "My App Storage Permission",
    message: 'My App needs access to your storage ' +
    'so you can save your photos',
    },
  );
  return status === 'granted';
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
    const options = {
      title: 'Select image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);
    
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
        console.log('launchImageLibrary', this.state.source);
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
      console.log(data.uri);
      if(Platform.OS === 'android' && !(await hasAndroidPermission())) {
        return;
      }
      CameraRoll.save(data.uri, 'photo');
      const source = {uri: data.uri}
      this.setState({source: source});
      this.props.navigation.navigate('ImageDisplayScreen', {source: this.state.source});
      
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
    console.log('ImageDisplayScreen', JSON.stringify(source));
    return (
      <View style={styles.container}>
          <Image source={source}
                 style={{width:400, height:400, alignSelf: 'center'}}
                 onLoad={() => this.forceUpdate()}
                 resizeMode='stretch'/>

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
    CameraRoll.save(this.source.uri, 'photo');
    let params = {
      userId:'abc12345',
      path: source.uri
    }
    uploadImage('face/detect.do', params)
    .then(res=>{
      if(res.header.statusCode == 'success'){
        result = res.body.result;
      }else{
        console.log(res.header.msgArray[0].desc);
      }
    }).catch(err={})
    // this.props.navigation.navigate('');
  }
}


/*
Fetch photo to server
*/
let common_url = "http://localhost:8080/";  // server address
let token = '';   // user token

function uploadImage(url, params){
  return new Promise(function (resolve, reject){
    let formData = new FormData();
    for(var key in params){
      formData.append(key, params[key]);
    }
    
    let file = {uri: params.path, type: 'application/octet-stream', name:'image.jpg'};
    formData.append("file", file);
    fetch(common_url +url,{
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data;charset=utf-8',
        'x-access-token':token,
      },
      body: formData,
    }).then((response)=>response.json())
    .then((responseData)=>{
      console.log('uploadImage', responseData);
      resolve(responseData);
    })
    .catch((err)=>{
      console.log('err', err);
      reject(err);
    });
  });
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