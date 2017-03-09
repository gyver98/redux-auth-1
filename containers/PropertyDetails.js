import React, { Component, PropTypes } from 'react'

export default class PropertyDetails extends Component {
  
  render() {
    const { onPropertyDetailClick, onTokenClick, onPropertyTimelineClick, isAuthenticated, accessToken, timeline, propertyDetailInfo} = this.props;
    //debugger;
    //const TimelineItems = Object.keys(timeline).length === 0 ? <li>{}</li> : timeline.propertyEventList.map(property => <li>{property.detail.agency}</li>);
    
    return (
      <div>
      <div>
        <div className='col-sm-4'>
          <button onClick={onTokenClick} className="btn btn-primary">
            Get Token
          </button>
        </div>
        
        { isAuthenticated &&
        <div>
          <div className='col-sm-4'>
            <button onClick={onPropertyTimelineClick} className="btn btn-warning">
              Get Property Timeline
            </button>
          </div>
          <div className='col-sm-4'>
            <button onClick={onPropertyDetailClick} className="btn btn-warning">
              Get Property Detail
            </button>
          </div>
        </div>
        }
        </div>
        <div className='col-sm-12'>
          
          { accessToken &&
            <div>
              <blockquote>{accessToken}</blockquote>
            </div>
          }
          
          { isAuthenticated && Object.keys(timeline).length !== 0 &&
            
            <div>
              <h1>Property History</h1>
              <ul>
                {timeline.propertyEventList.map(property => 
                  <li key={property.date}>
                    <span>{property.date}</span>/{property.detail.agency}/{property.type}
                  </li>
                )}    
              </ul>
            </div>
          }

          { isAuthenticated && Object.keys(propertyDetailInfo).length !== 0 &&
            
            <div>
              <h1>Property Detail</h1>
              <ul>
                 {console.log("propertyDetailInfo",propertyDetailInfo.property)}
                  <li>
                    <span>{propertyDetailInfo.property.address.singleLine}</span>/{propertyDetailInfo.property.propertyType}
                  </li>
                   
              </ul>
            </div>
          }
        </div>
      </div>
    )
  }
}

PropertyDetails.propTypes = {
  onTokenClick: PropTypes.func.isRequired,
  onPropertyTimelineClick: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  accessToken: PropTypes.string,
  timeline: PropTypes.object
 }