/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import TouchID from 'react-native-touch-id';

import { TextField } from 'react-native-material-textfield';

import PasswordInputText from 'react-native-hide-show-password-input';

export default class LoginScreen extends Component {
  
static navigationOptions = {
    title: 'Login',
    header: null
}

constructor(props) {
    super(props);
    this.state = { 
        textUsername: '',
        textPassword: '' 
    }
}


  componentDidMount() {

    try {

        AsyncStorage.getItem('username').then((value) => {

            if (value !== null) {
    
                this.setState({
                    textUsername: value
                });
                
            }
        });


        AsyncStorage.getItem('password').then((value) => {

            if (value !== null) { 

                this.setState({
                    textPassword: value
                });

                this._pressTouchIDHandler();
            }
        });


    } catch (error) {
        // Error retrieving data
    }
    
  }


  async _pressLoginHandler() {

    if( this.state.textUsername != '' && this.state.textPassword != '' ) {

        try {

            await AsyncStorage.setItem('username', this.state.textUsername);
            await AsyncStorage.setItem('password', this.state.textPassword);

        } catch(error) {
            // Error saving data
        }

        //this.props.navigation.navigate('Profile', { name: this.state.textUsername });
        this.props.navigation.navigate('Profile');

    } else {

        Alert.alert("Username/Password is Invalid..");
    }

  }

    _pressTouchIDHandler() {

        try {
            AsyncStorage.getItem('username').then((value) => {

                if (value !== null) {


                    TouchID.isSupported()
                        .then(biometryType => {
                            if (biometryType === 'TouchID') {
                                // Touch ID is supported on iOS
                            } else if (biometryType === 'FaceID') {
                                // Face ID is supported on iOS
                            } else if (biometryType === true) {
                                // Touch ID is supported on Android

                                console.warn('Biometrics is Supported');

                                TouchID.authenticate('Demo of React Native Fingerprint Scanner')
                                    .then(success => {

                                        //Alert.alert('Authenticated Successfully');
                                        console.warn('Authenticated Successfully');
                                        this.props.navigation.navigate('Profile', { name: this.state.textUsername })

                                    })
                                    .catch(error => {

                                        Alert.alert('Authentication Failed');
                                        //console.warn('Authenticated Failed');
                                        //this.props.navigation.navigate('Profile', { name: this.state.textUsername })

                                    });

                            }
                        })
                        .catch(error => {
                            // User's device does not support Touch ID (or Face ID)
                            // This case is also triggered if users have not enabled Touch ID on their device

                            console.warn('Biometrics is not Supported');

                        });


                } else {

                    Alert.alert('Login using your credentials for first time...');
                }

            });

        } catch (error) {
            // Error retrieving data
        }

    }

  render() {

    return (

      <View style={styles.container}>
        
        <TextField
          onChangeText={(textUsername) => this.setState({textUsername})}
          value={this.state.textUsername}
          label='Username'
          autoFocus={false}
        />

        <PasswordInputText
          onChangeText={(textPassword) => this.setState({textPassword})}
          value={this.state.textPassword}
          label='Password'
        />

        <TouchableOpacity style={styles.button} onPress={this._pressLoginHandler.bind(this)}>
          <Text style={{ color: 'white' }}>
            Authenticate with Login Credentials
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={this._pressTouchIDHandler.bind(this)}>
          <Text style={{ color: 'white' }}>
            Authenticate with Touch ID
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 25
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00B0FD',
    padding: 10,
    marginTop: 20
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
});