import React from 'react';

const DemographicDetail = ({demo}) => {
  return (
        <div className="row">
          <div className="col-md-4">
            <span className="hidden-md-up">Name: </span>
            {demo.name}
          </div>
          <div className="col-md-4">
            <span className="hidden-md-up">Average: </span>
            {demo.cachedContents.average}
          </div>
          <div className="col-md-4">
            <span className="hidden-md-up">Largest: </span>
            {demo.cachedContents.largest}
          </div>
        </div>
  )
}

export default DemographicDetail;
