import React, { Component } from 'react';

import { 
    Text, 
    View,
    Alert,
    AsyncStorage,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class ProfileScreen extends Component {

static navigationOptions = {
    title: 'Profile',
    header: null
};

constructor(props) {
    super(props);
    this.state = { 
        textUsername: '',
        textPassword: '' 
    }
}

componentDidMount() {
    
    try 
    {
        AsyncStorage.getItem('username').then((value) => {

            if (value !== null) {
                
                this.setState({
                    textUsername: value
                });

            }
        });

        } catch (error) {
          // Error retrieving data
        }
    
  }

async _pressLogoutHandler() {

    let keys = ['username', 'password'];
    await AsyncStorage.multiRemove(keys, (err) => {
    // keys k1 & k2 removed, if they existed
    // do most stuff after removal (if you want)
    });

    Alert.alert("Logout Successfully...");
    this.props.navigation.navigate('Login');
}


  render() {
    
    //var name = this.props.navigation.getParam('name', 'unknown');

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
        <Text> Hello { this.state.textUsername != null ? this.state.textUsername : 'Unknown User' } </Text>
        
        <TouchableOpacity style={styles.button} onPress={this._pressLogoutHandler.bind(this)}>
          <Text style={{ color: 'black' }}>
            Logout
          </Text>
        </TouchableOpacity>

      </View>
    );
  }

}

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: '#00B0FD',
      padding: 10,
      marginTop: 20
    }
  });