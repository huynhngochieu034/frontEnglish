import React, { Component } from 'react';
import { dataVocabulary } from '../config/config';
import Table from '../table/table';
import Header from '../headers/header';
class Vocabulary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "Vocabulary",
      vocabularyArr: []
    }
  }

  componentDidMount() {
      this.setState({ vocabularyArr: dataVocabulary });
  }

  render() {
      let {title, vocabularyArr} = this.state;
    return (
      <div className="vocabulary">
        <div className="container-fluid">
        <Header></Header>
          <Table 
              title={title}
              vocabularyArr={vocabularyArr}
          ></Table>
          </div>
      </div>
    );
  }
}

export default Vocabulary;