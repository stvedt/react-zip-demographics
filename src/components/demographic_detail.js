import React from 'react';

const DemographicDetail = ({demo}) => {
  return (
        <div className="row">
          <div className="col-md-4">{demo.name}</div>
          <div className="col-md-4">{demo.cachedContents.average}</div>
          <div className="col-md-4">{demo.cachedContents.largest}</div>
        </div>
  )
}

export default DemographicDetail;
