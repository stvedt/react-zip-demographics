import React, { Component } from 'react';
import DemographicList from './demographic_list';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = { data: null };
  }

  fetchData(){
    console.log('start fetch');
    fetch('https://data.cityofnewyork.us/api/views/kku6-nxdu/rows.json').then((response) => {
      return response.json();
    }).then((data) => {
      let fetchedData = data.meta.view;
      this.setState({ data: fetchedData });
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    if (this.state.data) { return <DemographicList  data={this.state.data} /> }
    return <div>Loading...</div>;
  }
}
