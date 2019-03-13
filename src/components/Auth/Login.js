import React, { Component } from 'react'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';


class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false
  };

  displayErrors = errors =>
    errors.map((error, i) => {
      return <p key={i}>{error.message}</p>;
    });

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
      event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({
        errors: [],
        loading: true
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
            console.log(signedInUser); 
            this.setState({
                loading: false
            });
        })
        .catch(err => {
            console.log(err);
            this.setState({
                errors: this.state.errors.concat(err),
                loading: false
            })
        })

    }
  };

  isFormValid = ( {password, email}) => email && password;

  handleInputError = (errors, input) => {
    return errors.some(error => error.message.toLowerCase().includes(input))
      ? "error"
      : "";
  };

  render() {
    const { email, password, errors, loading } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" />
            Login to devChat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                type="text"
                value={email}
                className={this.handleInputError(errors, "email")}
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
                value={password}
                className={this.handleInputError(errors, "password")}
              />

              <Button
                className={loading ? "loading" : ""}
                color="violet"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>

          {this.state.errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(this.state.errors)}
            </Message>
          )}

          <Message>
            Don't have a account?<Link to="/register">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;