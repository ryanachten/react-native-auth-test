import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      // if user doesn't exist, attempt to create new account w/ email and password
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          // something went wrong w/ auth process, show error
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail(err) {
    this.setState({
      error: `Authentication failed - ${err}`,
      loading: false
    });
  }

  onLoginSuccess() {
    this.setState({
      loading: false,
      error: '',
      email: '',
      password: '',
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size='small' />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>;
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
          {this.renderButton()}
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
