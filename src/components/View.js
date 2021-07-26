import axios from "axios";
import React, {Component} from "react";
import RecordsList from './RecordsList';

export default class View extends Component{
    constructor(props){
        super(props);
        this.state = {ruser: [], suretyData:[]};
    }

    componentDidMount(){
        axios.get('http://localhost/ugc/view.php')
        .then(response=>{
            this.setState({ ruser: response.data})
        })
        
        .catch(function(error){
            console.log(error);
        })
    }

    usersList(){
        return this.state.ruser.map(function(object,i){
           return <RecordsList obj={object} key={i} />;
        });
    }


    render(){
        return(
            <div>
                <br/>
                <h3 align="center" style={{fontStyle:"oblique", fontFamily:"serif", fontSize:"22px"}}>List of Bond Agreements</h3>
                <table className="table table-striped table-bordered table-hover " >
                    <thead style={{ textAlign:"center",backgroundColor:"#9dc7f2", fontFamily:"monospace", whiteSpace:"nowrap", fontSize:"16px"}}>
                        <tr>
                            <th style={{whiteSpace:"normal", minWidth:"15px"}}>Agreement Number</th>
                            <th>Title</th>
                            <th>Initials</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Telephone</th>
                            <th>UPF</th>
                            <th>Designation</th>
                            <th>University</th>
                            <th>Faculty</th>
                            <th>Department</th>
                            <th>Date of Agreement</th>
                            <th>Country of Study</th>
                            <th>Address of Study</th>
                            <th style={{whiteSpace:"normal", minWidth:"15px"}}>Obligator Period(F/P) years</th>
                            <th style={{whiteSpace:"normal", minWidth:"15px"}}>Obligator Period(N/P) years</th>
                            <th>Bond Value Rs.</th>
                            <th>Status</th>
                            <th style={{whiteSpace:"normal", width:"35px"}}>Last Updated Date</th>
                            <th colspam="2">Progress Report Details</th>
                            <th colspam="2">Surety Details</th>
                            <th colspam="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.usersList()}
                    </tbody>
                </table>
            </div>
        )
    }
}