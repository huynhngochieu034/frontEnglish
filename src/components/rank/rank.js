import React, { Component } from 'react';
import Header from '../headers/header';
import AuthService from '../service/AuthService ';
import './rank.css';
class Rank extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: [{score:0, user:{username:""}}]
        }
    }

    componentDidMount() {
        AuthService.getAllScores().then(res => {
            this.setState({ result: res.data });
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        let {result} = this.state;
        let arr = [];
        result.map(function (item, i) {
           return arr.push(
                <tr key={i}>
                <td style={{ color: "blue" }}><img style={{ width: "50px", height: "30px" }} src={require('../../images/queen.jpg')} alt="" />{item.user.name}</td>
                <td style={{ color: "red" }}>{item.score}</td>
                </tr>
            )
        })

        return (
            <div className="rank">
                <div className="container-fluid">
                    <Header></Header>
                    <div className="row justify-content-center">
                        <div className="col-sm-4">
                        </div>
                        <div className="col-sm-4 border border-secondary" style={{ marginTop: "5px" }}>
                            <h2 className="row justify-content-center" style={{ background: "rgb(227, 229, 236)", color: "green" }}>Ranked</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Scores</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {arr}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-4">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Rank;