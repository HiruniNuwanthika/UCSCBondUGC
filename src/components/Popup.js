import React,  {Component} from 'react';

export default class Popup extends Component {
    render() {
       // console.log(this.props.arrayD);
        let suretyArray=this.props.arrayD;
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1>{this.props.text}</h1>
            {suretyArray.map((obj, index) => {
                return(
                    <p key={'${obj.name}_{obj.address}'}>
                        {obj.name} : {obj.address}

                    </p>
                );
            }) }        
          <button onClick={this.props.closePopup} className="btn btn-primary">close</button>
          </div>
        </div>
      );
    }
  }