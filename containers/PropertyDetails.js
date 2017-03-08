import React, { Component, PropTypes } from 'react'

export default class PropertyDetails extends Component {
  
  render() {
    const { onTokenClick,onPropertyTimelineClick, onQuoteClick, onSecretQuoteClick, isAuthenticated, accessToken, timeline, quote, isSecretQuote } = this.props;
    //debugger;
    //const TimelineItems = Object.keys(timeline).length === 0 ? <li>{}</li> : timeline.propertyEventList.map(property => <li>{property.detail.agency}</li>);
    
    return (
      <div>
        <div className='col-sm-3'>
          <button onClick={onTokenClick} className="btn btn-primary">
            Get Token
          </button>
        </div>
        
        { isAuthenticated &&
          <div className='col-sm-3'>
            <button onClick={onPropertyTimelineClick} className="btn btn-warning">
              Get Property Timeline
            </button>
          </div>
        }
        
        <div className='col-sm-6'>
          { accessToken &&
            <div>
              <blockquote>{accessToken}</blockquote>
            </div>
          }
          
          { isAuthenticated &&
            <div>
              <ul>
                {console.log(timeline)}    
              </ul>
            </div>
          }
        </div>
      </div>
    )
  }
}

PropertyDetails.propTypes = {
  onQuoteClick: PropTypes.func.isRequired,
  onSecretQuoteClick: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  quote: PropTypes.string,
  isSecretQuote: PropTypes.bool.isRequired
 }