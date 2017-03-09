import React, { Component, PropTypes } from 'react'

export default class PropertyDetails extends Component {
  
  componentDidMount() { 
    this.props.onTokenClick();  
  }

  render() {
    const { 
      onRadiusListedClick, 
      onPropertyDetailClick, 
      onTokenClick, 
      onPropertyTimelineClick, 
      isAuthenticated, 
      accessToken, 
      timeline, 
      propertyDetailInfo,
      radiusListed } = this.props;
    //debugger;
    //const TimelineItems = Object.keys(timeline).length === 0 ? <li>{}</li> : timeline.propertyEventList.map(property => <li>{property.detail.agency}</li>);
    
    return (
      <div>
      <div>
        <div className='col-sm-3'>
          <button onClick={onTokenClick} className="btn btn-primary">
            Get Token
          </button>
        </div>
        
        { isAuthenticated &&
        <div>
          <div className='col-sm-3'>
            <button onClick={onPropertyTimelineClick} className="btn btn-warning">
              Get Property Timeline
            </button>
          </div>
          <div className='col-sm-3'>
            <button onClick={onPropertyDetailClick} className="btn btn-warning">
              Get Property Detail
            </button>
          </div>
          <div className='col-sm-3'>
            <button onClick={onRadiusListedClick} className="btn btn-warning">
              Get Radius Listed
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
          
          { accessToken && Object.keys(propertyDetailInfo).length !== 0 &&
            
            <div>
              <h1>Property Detail</h1>
              <ul>
                 {console.log("propertyDetailInfo",propertyDetailInfo.property)}
                  <li>
                    <span>{propertyDetailInfo.property.address.singleLine}</span>/{propertyDetailInfo.property.propertyType}
                  </li>
                  {propertyDetailInfo.property.propertyPhotoList.map(photo => 
                    <img src={photo.thumbnailPhotoUrl}/>
                  )} 
              </ul>
            </div>
          }

          { accessToken && Object.keys(timeline).length !== 0 &&
            
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

          

          { isAuthenticated && 
            
            <div>
              <h1>Similar Properties Listed</h1>
              <ul>
                 {console.log("radiusListed",radiusListed)}
                  
                   
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