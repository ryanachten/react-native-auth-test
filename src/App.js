import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

  state = {
    loggedIn: null
  };

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

    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loggedIn: !!user
      });
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case false:
        return <LoginForm />;
      case true:
        return (
          <View style={{ flexDirection: 'row' }}>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </View>
        );
      default:
        return (
          <View style={{ paddingTop: 40 }}>
            <Spinner size="large" />
          </View>
      );
    }
  }

  render() {
    return (
      <View>
        <Header label={'Authentication'} />
        {this.renderContent()}
      </View>
  );
  }
}

export default App;
