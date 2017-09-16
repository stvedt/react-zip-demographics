import React, { Component } from 'react';
import ZipDetail from './zip_detail';
import * as compares from '../helpers/sort_compares';

class DemographicList extends Component {
  constructor(props){
    super(props);
    this.originalDemographicList = props.data.meta.view.columns.slice();
    this.zipList = props.data.data;
    this.uniqueFilters = ['default','tens', 'elevens','greater']
    this.state = {
      sort: 'alpha-asc',
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

    let filterString = "";
    let greater = false;

    switch(filterType){
      case 'default':
        this.setState({ zipList: this.zipList});
        return;
        break;
      case 'tens':
        filterString = "10"
        greater = false
        break;
      case 'elevens':
        filterString = "11"
        greater = false
        break;
        case 'greater':
          filterString = "11"
          greater = true
          break;
    }

    let filteredList = this.state.sortedZipList.filter((zip)=>{
      let testZip = String(zip[8]).substring(0,2);
      if (greater){
        return testZip > filterString;
      }
      return testZip === filterString;
    });

    this.setState({ zipList: filteredList});
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
