import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input } from './common';

class LoginForm extends Component {

  state = {
    email: '',
    password: '',
    error: '',
  };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '' });

    firebase.auth().signInWithEmailAndPassword(email, password)
        // successfully log the user in
      // .then((res) => {
      //
      //   // if user doesn't exist, attempt to create new account w/ email and password
      // })
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          // log new user in
          // .then((res) => {
          //
          // // something went wrong w/ auth process, show error
          // })
          .catch((err) => {
            this.setState({ error: `Authentication Failed - ${err}` });
          });
      });
  }

  render() {
    const { email, password, error } = this.state;
    const { errorTextStyle } = style;
    return (
      <Card>
        <CardSection>
          <Input
            label={'Email'}
            placeholder={'your@email.com'}
            value={email}
            onChangeText={text => this.setState({ email: text })}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label={'Password'}
            placeholder={'password'}
            value={password}
            onChangeText={text => this.setState({ password: text })}
          />
        </CardSection>

        <Text style={errorTextStyle}>{error}</Text>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>
        </CardSection>
      </Card>
    );
  }
}

const style = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
