import React, { Component } from 'react';
import AuthService from '../service/AuthService ';
import './style.css';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            message: "",
            class: ""
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        AuthService.refreshAPI();
        let check = localStorage.getItem("userInfo");
        if (check !== null) window.location.href = "/vocabulary";
    }

    handleLogin = (e) => {
        let { username, password } = this.state;
        e.preventDefault();
        const credentials = { username: this.state.username, password: this.state.password };
        if (username.length < 3) {
            this.setState({ message: "Username has at least 3 characters", class: "alert alert-danger" });
            return;
        }
        if (password.length < 6) {
            this.setState({ message: "Password has at least 6 characters", class: "alert alert-danger"});
            return;
        }
        AuthService.handleLogin(credentials).then(res => {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            this.props.history.push('/vocabulary');
        }).catch(err => {
            console.log(err);
            this.setState({ message: "Wrong username and password", class: "alert alert-danger"});
        })
    }

    render() {
        return (
            <div className="login">
                <section id="cover" className="min-vh-100">
                    <div id="cover-caption">
                        <div className="container">
                            <div className="row text-white">
                                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                                    <h1 className="py-2 text-truncate">English App</h1>
                                    <div className="px-2">
                                        <form className="justify-content-center">
                                            <div className="form-group">
                                                <label className="sr-only">Name</label>
                                                <input onChange={this.onChange} type="text" className="form-control" name="username" placeholder="Enter username" />
                                            </div>
                                            <div className="form-group">
                                                <label className="sr-only">Email</label>
                                                <input onChange={this.onChange} type="password" className="form-control" name="password" placeholder="Enter password" />
                                            </div>
                                            <button className="btn btn-primary btn-lg" onClick={this.handleLogin}>
                                                Login
                                            </button>
                                            
                                            <div className={this.state.class}>
                                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                                               {this.state.message}
                                            </div>
                                            <p>Don't have an account?<a className="nav-link" href="/register">Register</a></p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Login;