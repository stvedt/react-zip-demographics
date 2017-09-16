import React, { Component } from 'react';
import DemographicDetail from './demographic_detail';
import ZipDetail from './zip_detail';
import * as compares from '../helpers/sort_compares';

class DemographicList extends Component {
  constructor(props){
    super(props);
    // console.log(props.data);
    this.originalDemographicList = props.data.meta.view.columns.slice();
    this.zipList = props.data.data;
    console.log(this.originalDemographicList);
    this.uniqueFilters = ['default','count', 'percent']
    this.state = {
      sort: 'default',
      filter: 'default',
      demographicList: this.originalDemographicList.slice(),
      zipList: this.zipList,
      sortedZipList: this.zipList.slice()
    }
  }

  changeSort = (event) => {
    let sortType = event.target.value;
    let sortedList;

    this.setState({ sort: sortType});

    switch(sortType){
      case 'alpha-asc':
        sortedList = this.state.zipList.sort(compares.alphaCompareAsc);
        break;
      case 'alpha-des':
        sortedList = this.state.zipList.sort(compares.alphaCompareDes);
        break;
    }
    this.setState({
      sortedZip: sortedList,
      zipList: sortedList
    });
  }

  changeFilter = (event) => {
    let filterType = event.target.value;
    this.setState({filter: filterType });

    if (filterType === 'default') {
      this.setState({ demographicList: this.state.sortedDemographicList });
      return;
    }

    let filteredList = this.state.sortedDemographicList.filter((demo)=>{
      let testName = demo.name.toLowerCase();
      return testName.includes(filterType);
    });

    this.setState({ demographicList: filteredList});
  }

  renderDemoDetails( demos ) {

    let filteredDemos = demos.filter(function (demo) {
        return demo.id !== -1;
    });

    return filteredDemos.map( (demo, index) => {
      return <DemographicDetail demo={demo} key={demo.id} />;
    });
  }

  renderZipDetails( zips ) {

    return zips.map( (zip, index) => {
      return <ZipDetail zipCode={zip} key={zip[1]} demographics={this.state.demographicList} />;
    });
  }

  renderFilterOptions (filters) {
    return filters.map( (filter, index) => {

      return (
          <label className="custom-control custom-radio"key={index}>
            <input className="custom-control-input" type="radio" value={filter} checked={this.state.filter === filter } onChange={this.changeFilter} />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">{filter}</span>
          </label>
      );
    });
  }

  render (){
    return (
      <div>
        <div className="row">
          <div className="col-md-12"><h1>Demographics</h1><hr/></div>
        </div>
        <div className="row filter-sort">
          <div className="col-md-4 sort">
            <div className="form-group">
                <select className="form-control" onChange={this.changeSort}>
                  <option value='alpha-asc'>Asc</option>
                  <option value='alpha-des'>Des</option>
                </select>
              </div>
            </div>
            <div className="col-md-8 filter">
              Filter by:
              { this.renderFilterOptions(this.uniqueFilters)}
            </div>
        </div>
        <div className="row hidden-sm-down">
          <div className="col-md-2"><b>{this.state.demographicList[8].name}</b></div>
          <div className="col-md-2"><b>{this.state.demographicList[9].name}</b></div>
          <div className="col-md-2"><b>{this.state.demographicList[10].name}</b></div>
          <div className="col-md-2"><b>{this.state.demographicList[11].name}</b></div>
          <div className="col-md-2"><b>{this.state.demographicList[12].name}</b></div>
          <div className="col-md-2"><b>{this.state.demographicList[13].name}</b></div>
        </div>
        <div className="listing">
          { this.renderZipDetails(this.state.zipList) }
        </div>
      </div>
    )
  }
}

export default DemographicList;
