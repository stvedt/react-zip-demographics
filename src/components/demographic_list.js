import React, { Component } from 'react';
import DemographicDetail from './demographic_detail';
import * as compares from '../helpers/sort_compares';

class DemographicList extends Component {
  constructor(props){
    super(props);

    this.originalDemographicList = props.data.columns.slice();
    this.uniqueFilters = ['default','count', 'percent']
    this.state = {
      sort: 'default',
      filter: 'default',
      demographicList: props.data.columns,
      sortedDemographicList: this.originalDemographicList.slice()
    }
  }

  changeSort = (event) => {
    let sortType = event.target.value;
    let sortedList;

    this.setState({ sort: sortType});

    switch(sortType){
      case 'default':
        this.setState({filter:'default'});
        sortedList = this.originalDemographicList.slice();
        break;
      case 'alpha-asc':
        sortedList = this.state.demographicList.sort(compares.alphaCompareAsc);
        break;
      case 'alpha-des':
        sortedList = this.state.demographicList.sort(compares.alphaCompareDes);
        break;
    }
    this.setState({
      sortedDemographicList: sortedList,
      demographicList: sortedList
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
    //this.uniqueFilters
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
                  <option value='default'>Default</option>
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
        <div className="row">
          <div className="col-md-4"><b>Demographic</b></div>
          <div className="col-md-4"><b>Average</b></div>
          <div className="col-md-4"><b>Largest</b></div>
        </div>
        <div className="listing">
          { this.renderDemoDetails(this.state.demographicList) }
        </div>
      </div>
    )
  }
}

export default DemographicList;
