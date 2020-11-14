import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Login.css'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            user: {
                username: "",
                password: ""
            }
        }
    }

    setValidated = (val) => {
        this.setState({
            validated: val
        })
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
            this.setValidated(true);
        } else {
            if(this.props.loggedIn !== true) {
                let loginData = {
                    "username": this.state.user.username,
                    "password": this.state.user.password
                }

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(loginData)
                };

                fetch('http://127.0.0.1:8000/user/login/', requestOptions)
                .then(response => {
                    if(response.status === 200) {
                        console.log("Success");
                        return response.json();
                    } else if(response.status === 400) {
                        alert("Неверное имя пользователя или пароль");
                    }
                })
                .then(data => {
                    if(data !== undefined) {
                        this.props.aFunctionCall(data);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }
            this.setValidated(false);
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        let newuser = this.state.user;
        let value = target.value;
        const name = target.name;
    
        newuser[name] = value;
        this.setState({
            user: newuser
        });
    }

    render() {

        const dark = {
            background: "#333",
            color: "white"
        }

        const light = {
            color: "#555",
            background: "#fff"
        }

        return (
            <Form 
                className="loginForm" 
                noValidate
                validated={this.state.validated}
                onSubmit={this.handleSubmit} 
                style={this.props.isDark === true ? dark : light}>
                <h3>Авторизация</h3>
                <Form.Row>
                    <Form.Group as={Col} md={12} controlId="validationUserName">
                    <Form.Label>Имя пользователя</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="username"
                        value={this.state.user.username}
                        onChange={this.handleInputChange}
                        placeholder="Введите имя"
                        style={this.props.isDark === true ? dark : null}
                    />
                    <Form.Control.Feedback>Неплохо!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Заполните форму!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md={12} controlId="validationLastName">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        name="password"
                        value={this.state.user.password}
                        onChange={this.handleInputChange}
                        placeholder="Введите пароль"
                        style={this.props.isDark === true ? dark : null}
                    />
                    <Form.Control.Feedback>Неплохо!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Заполните форму!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md={12}>
                        <Button type="submit" variant="primary btn-block">Войти</Button>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <div className="or mx-auto">
                        <p><span>или</span></p>
                    </div>
                </Form.Row>
                <Form.Row>
                    <p className="mx-auto">
                        Еще не с нами?
                        <Button className="ml-3" variant="primary btn-sm" onClick={this.props.changeText}>Регистрация</Button>
                    </p>
                </Form.Row>
            </Form>
        )
    }
}

export default Login;