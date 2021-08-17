import React, {Component} from 'react';
import axios from "axios";
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import Popup from './Popup';
import ProgressReportPopup from './ProgressReportPopup';

class RecordsList extends Component{

    constructor(props){
        super(props);
        this.delete = this.delete.bind(this);
        this.getSuretyData=this.getSuretyData.bind(this);
        this.getReportData=this.getReportData.bind(this);

        this.state={
            redirect:false,
            showPopup: false,
            suretyData:[],
            showReportPopup: false,
            reportData:[],
            prompt:''
        }
    }
    
    getSuretyData(agreementNo){
        axios.get('http://192.168.22.130/getByAgreementNo.php?agreementNumber='+agreementNo)
        .then(response => {
            //console.log(response.data);
             let res = response.data;
             //console.log(this.state.suretyData);
             res.forEach((r) =>{
                 this.setState({
                     suretyData:[...this.state.suretyData,r]  
                 });
             
             })
             //console.log('surety------>')
             //console.log(this.state.suretyData);
 
         })
        .catch(function(error){
            console.log(error);
        })
    }


    delete(){
        axios.get('http://192.168.22.130/delete.php?id='+this.props.obj.userId)
        .then(
            this.setState({redirect:true})
        )
        .catch(err=> console.log(err))
    }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
        let aa =this.props.obj.agreementNumber;
        this.getSuretyData(aa);
        this.setState({
            suretyData: []
          });
    }

    toggleReportPopup() {
        this.setState({
          showReportPopup: !this.state.showReportPopup
        });
        let aa =this.props.obj.agreementNumber;
        this.getReportData(aa);
        this.setState({
            reportData: []
          });
    }

    getReportData(agreementNo){
        axios.get('http://192.168.22.130/getReportDataByAgreementNo.php?agreementNumber='+agreementNo)
        .then(response => {
            //console.log(response.data);
             let res = response.data;
             res.forEach((r) =>{
                 this.setState({
                     reportData:[...this.state.reportData,r]  
                 });
             
             })
             let repo=this.state.reportData;
            // console.log(repo.length);
             if (Object.entries(this.state.reportData[0]["number"]).length==0){
                 this.state.prompt='No records found on Progress Reports.';
                 this.setState({
                    reportData:[]  
                });
             }
            
 
         })
        .catch(function(error){
            console.log(error);
        })
    }


    render(){
        const {redirect} = this.state;
 
        if(redirect){
            return<Redirect to='/view'/>;
        }
        return(
            <tr style={{fontFamily:"monospace" , whiteSpace:"nowrap", fontSize:"14px", textAlign:"center"}}>
                <td>
                    {this.props.obj.agreementNumber}
                </td>
                <td>
                    {this.props.obj.title}
                </td>
                <td>
                    {this.props.obj.fName}
                </td>
                <td>
                    {this.props.obj.lName}
                </td>
                <td>
                    {this.props.obj.email}
                </td>
                <td>
                    {this.props.obj.telephone}
                </td>
                <td>
                    {this.props.obj.upf}
                </td>
                <td>
                    {this.props.obj.designation}
                </td>
                <td>
                    {this.props.obj.university}
                </td>
                <td>
                    {this.props.obj.faculty}
                </td>
                <td >
                    {this.props.obj.department}
                </td>
                <td>
                    {this.props.obj.dateAgreementSigned}
                </td>
                <td>
                    {this.props.obj.studyCountry}
                </td>
                <td style={{whiteSpace:"normal", maxWidth:"15px"}}>
                    {this.props.obj.studyAddress}
                </td>
                <td>
                    {this.props.obj.obligatorPeriodFP}
                </td>
                <td>
                    {this.props.obj.obligatorPeriodNP}
                </td>
                <td>
                    {this.props.obj.bondValue}
                </td>
                <td>
                    {this.props.obj.status}
                </td>
                <td>
                    {this.props.obj.lastUpdatedOn}
                </td>
                <td>
                <button className="btn btn-outline-info" onClick={this.toggleReportPopup.bind(this)}>Progress Report</button>
                    {this.state.showReportPopup ? 
                    <ProgressReportPopup text='Progress Report Details' arrayR={this.state.reportData} prompt={this.state.prompt}
                    closePopup={this.toggleReportPopup.bind(this)}/>
                     : null
                    }
                </td>
                <td>
                    <button className="btn btn-outline-info" onClick={this.togglePopup.bind(this)}>Surety</button>
                    {this.state.showPopup ? 
                    <Popup text='Surety Details' arrayD={this.state.suretyData}
                    closePopup={this.togglePopup.bind(this)}/>
                     : null
                    }
                </td>
                <td>
                    <Link to={"/edit/"+this.props.obj.userId} className="btn btn-primary">Edit</Link>
                </td>             
            </tr>
        )
    }
}

export default RecordsList;