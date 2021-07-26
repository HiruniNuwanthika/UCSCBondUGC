import React,  {Component} from 'react';

export default class ProgressReportPopup extends Component {
    render() {
        console.log(this.props.arrayR);
        let progressReportArray=this.props.arrayR;
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1>{this.props.text}</h1>
            <p>{this.props.prompt}</p>
            {progressReportArray.map((obj, index) => {
                return(
                    <p key={'${obj.number}_{obj.date}'}>
                        {obj.number} : {obj.date}
                    </p>
                );
            }) }  
          <div className="closeButton">
            <button onClick={this.props.closePopup} className="btn btn-primary">close</button>
          </div>      
          
          </div>
        </div>
      );
    }
  }