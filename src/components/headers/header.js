import React, { Component } from 'react';
import AuthService from '../service/AuthService ';

class Header extends Component {

    constructor(props){
        super(props);
        this.state={
            username:""
        }
    }
    logout = () =>{
        AuthService.logOut();
        window.location.href ="/";
    }

    componentDidMount(){
        let check = localStorage.getItem("userInfo");
        if (check !== null) this.setState({ username: AuthService.getUserInfo().username});
    }

    render() {
        return (
            <div className="header">
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="https://www.facebook.com/tu.ki.1029">
                                <img src={require('../../images/download.jpg')} alt="Logo" style={{width:"50px", height:"30px"}}/>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/vocabulary">Vocabulary</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/practice">Practice</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/rank">Rank</a>
                        </li>
                    </ul>

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <h5 style={{color: "white", padding:"5px"}}>Hi, {this.state.username}</h5>
                        </li>

                        <li className="nav-item">
                            <button className="btn btn-info" onClick={this.logout}>Logout</button>
                        </li>

                    </ul>

                </nav>
            </div>
        );
    }
}

export default Header;