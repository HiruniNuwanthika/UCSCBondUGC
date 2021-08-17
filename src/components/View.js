import axios from "axios";
import React, {Component} from "react";
import RecordsList from './RecordsList';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class View extends Component{
    constructor(props){
        super(props);
        this.onChangeSearchTermUniName = this.onChangeSearchTermUniName.bind(this);
        this.onChangeSearchTermStatus = this.onChangeSearchTermStatus.bind(this);
        this.onChangeSearchTermLastName = this.onChangeSearchTermLastName.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.state = {
            initialUserList:[],
            ruser: [], 
            suretyData:[], 
            allStatus:[],
            searchTermUniName:'',
            searchTermLastName:'',
            searchTermStatus:''};
    }

    componentWillMount(){
        axios.get('http://192.168.22.130/view.php')
        .then(response=>{
            this.setState({
                 ruser: response.data,
                 initialUserList: response.data
             })
        })

        axios.get('http://192.168.22.130/getAllStatus.php')
        .then(response => {
                this.setState({
                    allStatus:response.data  
                });
            
            
            //console.log('surety------>')
            //console.log(this.state.suretyData);

        })
        .catch(function(error){
            console.log(error);
        })
    }

    changeFilter(){
            let userlist = this.state.initialUserList;
            this.setState({ ruser:
            userlist.filter((val) =>{

                if((this.state.searchTermUniName=="") 
                && (this.state.searchTermLastName=="") 
                && (this.state.searchTermStatus=="")){
                   // console.log('val without filter==>');
                   // console.log(val);
                    return val;
                }
                else if((val.university.toLowerCase().includes(this.state.searchTermUniName.toLowerCase())) 
                && (val.lName.toLowerCase().includes(this.state.searchTermLastName.toLowerCase()))
                && (val.status.toLowerCase()==(this.state.searchTermStatus.toLowerCase()))){
                    return val;
                }
                /*
                else if((val.university.toLowerCase().includes(this.state.searchTermUniName.toLowerCase())) 
                && (this.state.searchTermLastName=="")
                && (this.state.searchTermStatus=="")){
                    return val;
                }
                else if((val.lName.toLowerCase().includes(this.state.searchTermLastName.toLowerCase())) 
                && (this.state.searchTermUniName=="")
                && (this.state.searchTermStatus=="")){
                    //console.log('val with filter==>');
                    //console.log(val);
                    return val;
                }
                else if((val.status.toLowerCase().includes(this.state.searchTermStatus.toLowerCase())) 
                && (this.state.searchTermUniName=="")
                && (this.state.searchTermLastName=="")){
                    //console.log('val with filter==>');
                    //console.log(val);
                    return val;
                }
               /* else if((val.status.toLowerCase().includes(this.state.searchTermStatus.toLowerCase())) 
                ||  (val.lName.toLowerCase().includes(this.state.searchTermLastName.toLowerCase()))
                || (val.university.toLowerCase().includes(this.state.searchTermUniName.toLowerCase()))){
                    //console.log('val with filter==>');
                    //console.log(val);
                    return val;
                }*/
            })
        })
    }


    usersList(){
        return this.state.ruser.map(function(object,i){
           return <RecordsList obj={object} key={i} />;
        });
    }

    onChangeSearchTermUniName(e){
        this.setState({
            searchTermUniName: e.target.value
        },()=>{
            this.changeFilter();
        });
    }

    onChangeSearchTermLastName(e){
        this.setState({
            searchTermLastName: e.target.value
        },()=>{
            this.changeFilter();
        });
    }

    onChangeSearchTermStatus(e){
        this.setState({
            searchTermStatus: e.target.value
        },()=>{
            this.changeFilter();
        });
    }
    render(){
        return(
            <div>
                <br/>

                <div className="dada">
                    <div className="dada-in">
                        <FontAwesomeIcon icon={faSearch} style={{ marginRight:"3"}}/>
                        <label style={{marginRight:"15px"}}>University</label> 
                        <input type="text" value={this.state.searchTermUniName} onChange={this.onChangeSearchTermUniName}/> 
                    </div>
                    <div className="dada-in">
                        <FontAwesomeIcon icon={faSearch} style={{ marginRight:"3"}}/>
                        <label style={{marginRight:"15px"}}>Last Name</label>
                        <input type="text" value={this.state.searchTermLastName} onChange={this.onChangeSearchTermLastName}/>
                    </div>
                    
                    <div className="dada-in">
                        <FontAwesomeIcon icon={faSearch} style={{ marginRight:"3"}}/>
                        <label style={{marginRight:"15px"}}>Status</label>
                        <select className="dropdown" onChange={this.onChangeSearchTermStatus} >
                            <option>Select status</option>
                            {this.state.allStatus.map(item =>(    
                                <option key={item.id} value={item.status}>
                                    {item.status}
                                </option>
                            ))}
                            {console.log(this.state.allStatus)}
                        </select>
                    </div>
                       
                </div>

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