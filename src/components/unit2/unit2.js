import React, { Component } from 'react';
import { play } from '../config/practice';
import { anphabest } from '../config/anphabest';
import { SayButton } from 'react-say';
import './unit2.css';
import Header from '../headers/header';
import AuthService from '../service/AuthService ';
class Practice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: "",
            message: "",
            answerArr: [],
            resultArr: [],
            indexWin: 0,
            arrIndex: [],
            messageHelp: "",
            class: "",
            object: {score: 0}
        }
    }

    random = (length) => {
        return Math.floor(Math.random() * length);
    }

    componentDidMount() {
        AuthService.getScores()
        .then(res=>{
            this.setState({object: res.data});
            console.log(res.data);
        }).catch(error=>{
            console.log(error);
        });
        this.startGame();
    }

    checkIndex = (index, arrIndex) => {
        let check = false;
        arrIndex.forEach(element => {
            if (element === index) check = true;
        })
        return check;
    }

    startGame = () => {
        let { arrIndex } = this.state;
        let index = this.random(play.length);
        while (true) {
            if (this.checkIndex(index, arrIndex)) {
                index = this.random(play.length);
                if (arrIndex.length === play.length) {
                    let temp = (arrIndex.length - 1) * 10 + 10;
                    let str = "End, you are the best :), your score: " + temp;
                    this.setState({
                        messageHelp: str,
                        result: "",
                        message: "",
                        answerArr: [],
                        resultArr: [],
                        indexWin: 0,
                        arrIndex: [],
                        class:""
                    });
                    document.getElementById("finish").click();
                    this.startGame();
                    return;
                }
            } else break;
        }

        arrIndex.push(index);
        let arr = [];
        let arrA = [];
        for (let i = 0; i < play[index].text.length; i++) {
            arr.push("");
        }
        for (let j = 0; j < 14 - play[index].text.length; j++) {
            arrA.push(anphabest[this.random(anphabest.length - 1)]);
        }
        for (let z = 0; z < play[index].text.length; z++) {
            arrA.push(play[index].text[z]);
        }
        let result = arrA.sort();
        let obj = this.state.object;
        if(obj.score < (arrIndex.length - 1) * 10){
            obj.score = (arrIndex.length - 1) * 10;
            AuthService.pushScores(obj).then(res=>{
                console.log(res.data);
            }).catch(error=>{
                console.log(error);
            })
        }
        this.setState({ answerArr: result, resultArr: arr, indexWin: index, arrIndex: arrIndex, message: "", class:"" });
    }

    pushArr2 = (index, item) => {
        let { resultArr, answerArr } = this.state;
        let check = false;
        for (let i = 0; i < answerArr.length; i++) {
            if (answerArr[i] === "") {
                check = false;
                answerArr[i] = item;
                break;
            } else check = true;
        }
        if (!check) resultArr[index] = "";
        this.setState({ resultArr: resultArr, answerArr: answerArr, message: "", class: "" });
    }

    pushArr = (index, item) => {
        let { resultArr, answerArr } = this.state;
        let check = false;
        for (let i = 0; i < resultArr.length; i++) {
            if (resultArr[i] === "") {
                check = false;
                resultArr[i] = item;
                break;
            } else check = true;
        }
        if (!check) answerArr[index] = "";
        this.setState({ resultArr: resultArr, answerArr: answerArr, message: "", class: "" });
        if (!this.checkFull(resultArr))
            this.isWin(resultArr);

    }

    checkFull = (resultArr) => {
        let check = false;
        resultArr.forEach(element => {
            if (element === "") check = true;
        })
        return check;
    }

    isWin = (object) => {
        let { indexWin } = this.state;
        let check = "";
        object.forEach(element => {
            check += element;
        });

        if (check === play[indexWin].text) {
            this.setState({ message: "Ghê :) !",  class: "alert alert-success" })
            setTimeout(this.startGame, 2000);
        } else this.setState({ message: "Sai rồi bạn hiền :) !", class: "alert alert-danger" })
    }

    render() {
        let { indexWin, messageHelp, arrIndex } = this.state;
        return (
            <div className="practice">
                <Header></Header>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-sm-3">
                        </div>
                        <div className="col-sm-6 border border-secondary" style={{ background: "rgb(227, 229, 236)", marginTop:"5px" }}>
                            <div className="row justify-content-center">
                                <h6 style={{ color: "green" }}> Question : {(arrIndex.length)} / {play.length}</h6>
                            </div>
                            <div className="row">
                                <img src={play[indexWin].image} alt="res" />
                            </div>
                            <div className="row justify-content-center">
                                <h6 style={{ color: "black" }}>Synonyms: <label style={{ color: "blue" }}>{play[indexWin].synonyms}</label></h6>
                            </div>
                            <div className="row justify-content-center">
                                <h6 style={{ color: "black" }}>Antonyms: <label style={{ color: "blue" }}>{play[indexWin].antonyms}</label></h6>
                            </div>
                            <div className="row justify-content-center">
                                <h6 style={{ color: "black"}}>Meanings: <label style={{ color: "red" }}>{play[indexWin].means}</label></h6>
                            </div>
                            <div className="row justify-content-center">
                                <label style={{ color: "black", marginRight: "20px", fontWeight: "800" }}>Click to </label>
                                <SayButton pitch={1.1} rate={0.6} volume={.9} lang="en-US" speak={play[indexWin].speaking}>
                                    Listening
                                </SayButton>
                            </div>
                            <div className="row justify-content-center">
                                <h5 style={{ color: "black" }}>Your score : <label style={{ color: "red" }}>{(arrIndex.length - 1) * 10}</label></h5>
                            </div>
                            <div className="row test-bg justify-content-center" style={{ margin: "5px", padding: "2px" }}>
                                {this.state.resultArr.map((item, i) => <div key={i} className="fill"
                                    onClick={(e) => this.pushArr2(i, item)}>{item}</div>)}
                            </div>
                            <div className="row test-bg justify-content-center" style={{ margin: "5px", padding: "2px" }}>
                                {this.state.answerArr.map((item, i) => <div id={i} key={i} className="fill"
                                    onClick={(e) => this.pushArr(i, item)}>{item}</div>)}
                            </div>
                            <div className={this.state.class}>
                                {this.state.message}
                            </div>
                        </div>
                        <div className="col-sm-3">
                        </div>
                    </div>
                    <button id="finish" type="button" style={{ visibility: "hidden" }} className="btn btn-primary" data-toggle="modal" data-target="#_1">
                        Open modal
                </button>
                    <div className="modal" id="_1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Success!</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                    {messageHelp}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Practice;