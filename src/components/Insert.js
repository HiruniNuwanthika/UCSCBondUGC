import React, {Component} from "react";
import axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import { Tabs, Tab } from "react-bootstrap";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faMinusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { counter } from "@fortawesome/fontawesome-svg-core";

const initialState ={
            agreementNumber:'',
            title:'Mr.',
            first_name:'',
            last_name:'',
            email:'',
            telephone: '',
            upf:'',
            designation:'',
            universities: [],
            faculties:[],
            departments:[],
            university:'University of Colombo',
            department:'',
            faculty:'--Choose Faculty--',
            dateAgreementSigned:'',
            studyAddress:'',
            studyCountry:'',
            suretyData:[{name:'', address:''}],
            obligatorPeriodFP:'1',
            obligatorPeriodNP:'1',
            bondValue:'',
            status:'Active',
            lastUpdatedOn:'',
            firstNameError:'',
            lastNameError:'',
            emailError:'',
            telephoneError:'',
            upfError:'',
            dateAgreementSignedError:'',
            bondValueError:'',
            alertMessage:''
}
export default class Insert extends Component{
    constructor(props){
        super(props);
        this.onChangeAgreementNumber = this.onChangeAgreementNumber.bind(this);
        this.onChangeTitle  = this.onChangeTitle.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeTelephone = this.onChangeTelephone.bind(this);
        this.onChangeUPF = this.onChangeUPF.bind(this);
        this.onChangeDesignation = this.onChangeDesignation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUniversity = this.onChangeUniversity.bind(this);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.onChangeFaculty = this.onChangeFaculty.bind(this);
        this.onChangeDateAgreementSigned = this.onChangeDateAgreementSigned.bind(this);
        this.onChangeStudyCountry = this.onChangeStudyCountry.bind(this);
        this.onChangeStudyAddress = this.onChangeStudyAddress.bind(this);
        this.onChangeObligatorPeriodFP = this.onChangeObligatorPeriodFP.bind(this);
        this.onChangeObligatorPeriodNP = this.onChangeObligatorPeriodNP.bind(this);
        this.onChangeBondValue = this.onChangeBondValue.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.state = initialState;
    }


    componentDidMount(){
        this.getCurrentDate();
        this.setState({
            universities:[
                { name: 'University of Peradeniya', faculties: [ 
                    {name: 'Agriculture', departments: ['Soil Science', 'Agricultural Extension', 'Agricultural Engineering','Agri. Econ & b.Mgt','Agriculturl Biology',
                    'Animal Science','Crop Science','Food Science and Tech.']},
                    {name: 'Arts', departments: ['Economics & Stat.', 'Arabic & Islamic Civilization','Socialogy','Geograpghy','Law','Sinhala','Pali & Buddhism Std.',
                'Political Science','History','English Language Teaching Unit']},
                    {name: 'Allied Health Science', departments: ['Nursing', 'Radiography','Basic Science','Physiotheraphy','Medcal Laboratory Sciences','Pharmacy']},
                    {name: 'Dental Sciences', departments: ['Basic Sciences']},
                    {name: 'Management', departments: ['Mgt. Studies','Marketing Mgt.','Operations Mgt.','Business Finance','Human Resource Mgt.']},
                    {name: 'Medicine', departments: ['Anatomy','Physiology','Medicine','Surgery']},
                    {name: 'Science', departments: ['Mathematics','Stat. & Computer','Zoology','Molecular Biology & Biothech.','Chemistry']},
                    {name: 'Vet. Med. & Animal Sc.', departments: ['Ver. Clinical Sciences','Basic Vet. Sciences','Farm Animal Prod. & Health','']},
                    {name: 'Dental Sciences', departments: ['Basic Sciences']},
                    {name: 'Dental Sciences', departments: ['Basic Sciences']},
                    {name: 'Engineering', departments: ['Engineering Mathematics', 'Civil Eng.','Eng. Management','Manufacturing & Industrial Eng.','Mechanical Eng.','']} 
                ] },
				{ name: 'University of Kelaniya', faculties: [
                     {name: 'Medicine', departments: ['Disability Studies', 'Pharmacology','Psychiatry','Public Health']},
                     {name: 'Computing & Tech.', departments: ['Software Eng.','Dean office']},
                     {name: 'Commerce & Mgt. Studies', departments: ['Commerce & Fin. Mgt.', 'Marketing Mgt.','Finance', 'Accountancy','HRM']},
                     {name: 'Humanities', departments: ['Modern Languages','Hindi','DELT']},
                     {name: 'Science', departments: ['Mathematics','Industrial Mgt.','Software eng. Teaching unit', 'Stat & computer Science','Zoology & Environmental Mgt',
                    'Microbiology']},
                     {name: 'Social Science', departments: ['Geography','Political Science','Social Stat.','Economics','INTS','Sport Sce.']},
                     {name: 'Humanities', departments: ['Modern Languages','Hindi','DELT']},                    
                    ] },
				{ name: 'University of Jayawaradnapura', faculties: [
                     {name: 'Agriculture', departments: ['Agrinomy', 'Animal Science','Agricultural Chemistry','Agricultural Eng.','Agricultural Biology','Agricultural Economics']}, 
                     {name: 'Siddha Medicine', departments: ['Unit of Siddha Medicine']}, 
                     {name: 'Engineering', departments: ['Electrical & Electronic Eng.','Computer Eng.','Civil Eng.','Inter-Disciplinary Studies']},
                     {name: 'Management Studies and Commerce', departments: ['Accounting','Commerce']}, 
                     {name: 'Science', departments: ['Computer Science','Physics','Chemistry','Mathematics & Stat.','Zoology','Fisheries']},
                     {name: 'Technology', departments: ['Engineering Technology','Bio Systems Tech.']}, 
                     {name: 'Allied Health Science', departments: ['Medical Laboratory Science']},
                     {name: 'Arts', departments: ['Fine Arts','Law','Geography','Translation Studies','History']},
                     {name: 'Medicine', departments: ['Physiology','Pharmacology','Surgery','Microbiology','Biochemistry']},
                     {name: 'Library', departments: ['Library']}
                    ] }
            ]
        })
    }
 
    onChangeAgreementNumber(e){
        this.setState({
            agreementNumber: e.target.value
        })
    }

    onChangeTitle(e){
        this.setState({
            title: e.target.value
        })
    }

    onChangeFirstName(e){
            this.setState({
                first_name: e.target.value
            });
    }

    onChangeLastName(e){
        this.setState({
            last_name: e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }
    
    onChangeTelephone(e){
        this.setState({
            telephone: e.target.value
        });
    }
    
    onChangeUPF(e){
        this.setState({
            upf: e.target.value
        });
    } 

    onChangeDesignation(e){
        this.setState({
            designation: e.target.value
        });
    } 
    
    onChangeUniversity(e){
        this.setState({
            university: e.target.value
        });
        this.setState({
            faculties: this.state.universities.find(uni => uni.name ===e.target.value).faculties
        });
    } 
 
    onChangeFaculty(e){
        this.setState({
            faculty: e.target.value
        });
        const fact = this.state.universities.find(uni => uni.name === this.state.university).faculties;
        this.setState({
            departments: fact.find(fac => fac.name ===e.target.value).departments
        });

    }

    onChangeDepartment(e){
        this.setState({
            department: e.target.value
        });
    }   

    onChangeDateAgreementSigned(e){
        this.setState({
            dateAgreementSigned: e.target.value
        });
    }

    onChangeStudyAddress(e){
        this.setState({
            studyAddress: e.target.value
        });
    }

    onChangeStudyCountry(e){
        this.setState({
            studyCountry: e.target.value
        });
    }

    handleChangeInput(index,e){
        const values=[...this.state.suretyData];
        values[index][e.target.name]= e.target.value;
        //const a = values[index][e.target.name];
        this.setState({
            suretyData: values
        });
    }

    addSurety(){
        this.setState({
            suretyData: [...this.state.suretyData, {name:'', address:''}]
        }); 
    }

    removeSurety(index){
        
        const values=[...this.state.suretyData];
        const ItemCount = values.length;
        if( ItemCount!= 1){
            values.splice(index, 1);
        this.setState({
            suretyData: values
        });
        };
        
    }

    onChangeObligatorPeriodFP(e){
        this.setState({
            obligatorPeriodFP: e.target.value
        });
    }

    onChangeObligatorPeriodNP(e){
        this.setState({
            obligatorPeriodNP: e.target.value
        });
    }

    onChangeBondValue(e){
        this.setState({
            bondValue: e.target.value
        });
    }

    onChangeStatus(e){
        this.setState({
            status: e.target.value
        });
    }

    getCurrentDate() {  var date =  new Date();
        var month = parseInt(date.getMonth()+1);
        var doubleDigitMonth = month < 10 ? '0' + month : '' + month;
       // var currDate = date.getFullYear()+"-"+parseInt(date.getMonth()+1)+"-"+date.getDate();
       var currDate = date.getFullYear()+"-"+doubleDigitMonth+"-"+("0" + date.getDate()).slice(-2);
        this.setState({
            lastUpdatedOn:currDate});
    }
    
    validate = ()=>{
        let firstNameError="";
        let lastNameError="";
        let emailError="";
        let telephoneError="";
        let upfError="";
        let dateAgreementSignedError="";
        let bondValueError="";

        if(!this.state.first_name){
            firstNameError="First Name cannot be blank";
        }
        if(!this.state.last_name){
            lastNameError="Last Name cannot be blank";
        }
        if  (!this.state.email.includes('@')){
            emailError="invalid Email";
        }
        if(!Number(this.state.telephone)){
            telephoneError="Should be a number";
        }
        if(!this.state.upf){
            upfError="UPF cannot be blank";
        }
        if(!this.state.dateAgreementSigned){
            dateAgreementSignedError="Agreement signed date should not be blank";
        }
        if(!this.state.bondValue){
            bondValueError="Bond value should be a cannot be blank";
        }

        if(emailError || firstNameError || lastNameError ||telephoneError ||upfError ||dateAgreementSignedError
            ||bondValueError){
            this.setState({
                emailError:emailError,
                firstNameError:firstNameError,
                lastNameError:lastNameError,
                telephoneError: telephoneError,
                upfError: upfError,
                dateAgreementSignedError:dateAgreementSignedError,
                bondValueError:bondValueError
            });
            return false;
        }
        return true;
    }

    onSubmit(e){
        e.preventDefault();
       
        const isValid = this.validate();
        if(isValid){

        const obj1 = {
            agreementNumber: this.state.agreementNumber,
            title:this.state.title,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            telephone: this.state.telephone,
            upf: this.state.upf,
            designation: this.state.designation,
            university:this.state.university,
            department: this.state.department,
            faculty: this.state.faculty,
            dateAgreementSigned: this.state.dateAgreementSigned,
            studyCountry:this.state.studyCountry,
            studyAddress: this.state.studyAddress,
            obligatorPeriodFP:this.state.obligatorPeriodFP,
            obligatorPeriodNP:this.state.obligatorPeriodNP,
            bondValue:this.state.bondValue,
            status:this.state.status,
            lastUpdatedOn:this.state.lastUpdatedOn
        };

        const obj2={
            agreementNumber: this.state.agreementNumber,
            suretyData:this.state.suretyData
            
        };

       console.log(obj1);
       console.log(obj2);
       axios.all([
        axios.post('http://localhost/ugc/insert.php',obj1),
        axios.post('http://localhost/ugc/insertSurety.php',obj2)
       ]) 
        .then(res=>{
            this.setState({alertMessage:'success'})
        }).catch(error=>{
            this.setState({alertMessage:'error'})
        })
        this.setState({
            suretyData:[{name:'', address:''}],
        });
        
        this.setState(initialState); 
        
        this.getCurrentDate();
    }
    }
    
    render(){

        return(
            <div style={{marginTop:10, fontFamily:"monospace", fontSize:"14px"}}>
                <form onSubmit={this.onSubmit}>
                <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
                    <Tab eventKey="personal" title="Personal Details">
                    
                        <div className="form-group">
                            <label htmlFor="options">Title  </label>
                                <label style={{color:"red"}}>*</label>
                                <select id="options" className="form-control" value={this.state.title} onChange={this.onChangeTitle}>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Ms.">Ms.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Dr.">Dr.</option>
                                    <option value="Prof.">Prof.</option>
                                </select>
                        </div>

                        <div className="form-group">
                            <label>Initials </label>
                            <label style={{color:"red"}}>*</label>
                            <input type="text" className="form-control"
                            value={this.state.first_name} onChange={this.onChangeFirstName}/>
                        </div>
                        <div style={{fontSize:10, color:"red"}}>
                            {this.state.firstNameError}
                        </div>

                        <div className="form-group">
                            <label>Last Name </label>
                            <label style={{color:"red"}}>*</label>
                            <input type="text" className="form-control"
                            value={this.state.last_name} onChange={this.onChangeLastName}/>
                        </div>
                        <div style={{fontSize:10, color:"red"}}>
                            {this.state.lastNameError}
                        </div>

                        <div className="form-group">
                            <label>Email </label>
                            <label style={{color:"red"}}>*</label>
                            <input type="text" className="form-control"
                            value={this.state.email} onChange={this.onChangeEmail}/>
                        </div> 
                        <div style={{fontSize:10, color:"red"}}>
                            {this.state.emailError}
                        </div>

                        <div className="form-group">
                            <label>Telephone  </label>
                            <label style={{color:"red"}}>*</label>
                            <input type="text" className="form-control"
                            value={this.state.telephone} onChange={this.onChangeTelephone}/>
                        </div>
                        <div style={{fontSize:10, color:"red"}}>
                            {this.state.telephoneError}
                        </div> 

                        <div className="form-group">
                            <label>UPF Number  </label>
                            <label style={{color:"red"}}>*</label>
                            <input type="text" className="form-control" 
                            value={this.state.upf} onChange={this.onChangeUPF}/>
                        </div>
                        <div style={{fontSize:10, color:"red"}}>
                            {this.state.upfError}
                        </div>

                        <div className="form-group">
                            <label>Designation  </label>
                            <label style={{color:"red"}}>*</label>
                            <input type="text" className="form-control"
                            value={this.state.designation} onChange={this.onChangeDesignation}/>
                        </div>

                        <div className="form-group">
                            <label>University / Campus/ Institute  </label>
                            <label style={{color:"red"}}>*</label>
                            <select className="form-control" value={this.state.university} onChange={this.onChangeUniversity}>
                                <option>--Choose University--</option>
                                {this.state.universities.map((e,key)=> {
                                    return <option key={key}>{e.name} </option>;
                                })}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Faculty  </label>
                            <select className="form-control" value={this.state.faculty} onChange={this.onChangeFaculty}>
                                <option>--Choose Faculty--</option>
                                {this.state.faculties.map((e,key)=> {
                                    return <option key={key}>{e.name} </option>;
                                })}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Department / Division  </label>
                            <select className="form-control" value={this.state.department} onChange={this.onChangeDepartment}>
                            <option>--Choose Department--</option>
                                {this.state.departments.map((e,key)=> {
                                    return <option key={key}>{e} </option>;
                                })}
                            </select>
                        </div>


                    </Tab>
                    <Tab eventKey="agreement" title="Agreement Details">
                        <div className="form-group">
                            <label>Agreement Number </label>
                            <label style={{color:"red"}}>*</label>
                            <input type="text" className="form-control"
                            value={this.state.agreementNumber} onChange={this.onChangeAgreementNumber}/>
                        </div>

                        <div className="form-group">
                            <label>Agreement Signed Date  </label>
                            <label style={{color:"red"}}>*</label>
                            <input type="date" className="form-control"
                            value={this.state.dateAgreementSigned} onChange={this.onChangeDateAgreementSigned}/>
                        </div>
                        <div style={{fontSize:10, color:"red"}}>
                            {this.state.dateAgreementSignedError}
                        </div>

                        <div className="form-group">
                            <label>Country of Study </label>
                            <label style={{color:"red"}}>*</label>
                            <input type="text" className="form-control"
                            value={this.state.studyCountry} onChange={this.onChangeStudyCountry}/>
                        </div>

                        <div className="form-group">
                            <label>Address of Study </label>
                            <label style={{color:"red"}}>*</label>
                            <input type="text" className="form-control"
                            value={this.state.studyAddress} onChange={this.onChangeStudyAddress}/>
                        </div>

                        <div className="form-group">
                            <label>Surety Details</label>
                            <label style={{color:"red"}}>*</label>    
                            
                            {this.state.suretyData.map((surety, index)=>(
                                <div style={{display: "flex"}} key={index}>
                                   
                                    <input type="text" name="name" placeholder="Surety Name" className="form-control"
                                     value={surety.name} onChange={this.handleChangeInput.bind(this, index)} style={{width:"35%"}}/>
                                    <input type="text" name="address" placeholder="Surety Address" className="form-control"
                                     value={surety.address} onChange={this.handleChangeInput.bind(this, index)}style={{width:"60%"}} />
                                      <FontAwesomeIcon icon={faPlusSquare} onClick={this.addSurety.bind(this)} size= "2x" style={{ marginRight:"3"}}/>
                                      <FontAwesomeIcon icon={faMinusSquare} onClick={this.removeSurety.bind(this, index)} size= "2x"/>
                                    
                                </div>
                            ))}
                        </div>

                        <div className="form-group">
                        <label htmlFor="options">Obligator Period (F/P) </label>
                        <label style={{color:"red"}}>*</label>
                            <select id="options" className="form-control"
                            value={this.state.obligatorPeriodFP} onChange={this.onChangeObligatorPeriodFP}>
                                <option value ="1">1 year</option>
                                <option value ="2">2 years</option>
                                <option value ="3">3 years</option>
                                <option value ="4">4 years</option>
                                <option value ="5">5 years</option>
                                <option value ="6">6 years</option>
                                <option value ="7">7 years</option>
                                <option value ="8">8 years</option>
                                <option value ="9">9 years</option>
                                <option value ="10">10 years</option>
                            </select>
                        </div>
                        <div className="form-group">
                        <label htmlFor="options">Obligator Period (N/P) </label>
                        <label style={{color:"red"}}>*</label>
                            <select id="options" className="form-control"
                            value={this.state.obligatorPeriodNP} onChange={this.onChangeObligatorPeriodNP}>
                                <option value ="NA">NA</option>
                                <option value ="1">1 year</option>
                                <option value ="2">2 years</option>
                                <option value ="3">3 years</option>
                                <option value ="4">4 years</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Bond Value (Rs.) </label>
                            <label style={{color:"red"}}>*</label>
                            <input type="text" placeholder="0000.00" className="form-control"
                            value={this.state.bondValue} onChange={this.onChangeBondValue}/>
                        </div>
                        <div style={{fontSize:10, color:"red"}}>
                            {this.state.bondValueError}
                        </div>
                        <div className="form-group">
                            <label htmlFor="options">Status  </label>
                            <label style={{color:"red"}}>*</label>
                            <select id="options" className="form-control" value={this.state.status} onChange={this.onChangeStatus}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Completed">Completed</option>
                                <option value="Violated">Violated</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Last Updated Date </label>
                            <input  readOnly  className="form-control"
                            value={this.state.lastUpdatedOn} />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Add Agreement" className="btn btn-primary"/>
                            <hr/>
                        {this.state.alertMessage=='success' ? <SuccessAlert/>: null}
                        {this.state.alertMessage=='error' ? <ErrorAlert/>: null}
                        </div> 
                                        
                    </Tab>
                </Tabs>
            </form>               
        </div>
        )
    }
}