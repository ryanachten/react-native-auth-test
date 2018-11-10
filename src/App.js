import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyDVpdqxPXkuPoYgtR3rWr6cHwS7pEgAWXc',
      authDomain: 'auth-a60f9.firebaseapp.com',
      databaseURL: 'https://auth-a60f9.firebaseio.com',
      projectId: 'auth-a60f9',
      storageBucket: 'auth-a60f9.appspot.com',
      messagingSenderId: '325489913819'
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View>
        <Header label={'Authentication'} />
        <LoginForm />
      </View>
  );
  }
}

export default App;
