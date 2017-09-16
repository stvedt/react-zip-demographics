import React from 'react';

const ZipDetail = ({zipCode, demographics}) => {
  //index of 8 is the acutal zipCode
  return (
        <div className="row">
          <div className="col-md-2">
            <span className="hidden-md-up"><b>{demographics[8].name}: </b></span>
            {zipCode[8]}
          </div>
          <div className="col-md-2">
            <span className="hidden-md-up"><b>{demographics[9].name}: </b></span>
            {zipCode[9]}
          </div>
          <div className="col-md-2">
            <span className="hidden-md-up"><b>{demographics[10].name}: </b></span>
            {zipCode[10]}
          </div>
          <div className="col-md-2">
            <span className="hidden-md-up"><b>{demographics[11].name}: </b></span>
            {zipCode[11]}
          </div>
          <div className="col-md-2">
            <span className="hidden-md-up"><b>{demographics[12].name}: </b></span>
            {zipCode[12]}
          </div>
          <div className="col-md-2">
            <span className="hidden-md-up"><b>{demographics[13].name}: </b></span>
            {zipCode[13]}
          </div>
        </div>
  )
}

export default ZipDetail;
