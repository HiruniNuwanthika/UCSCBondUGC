import axios from "axios";
import React, {Component} from "react";
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import {Redirect} from 'react-router';
import { Tabs, Tab } from "react-bootstrap";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faMinusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Edit extends Component{

    constructor(props){
        super(props);
        this.onChangeAgreementNumber = this.onChangeAgreementNumber.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeTelephone = this.onChangeTelephone.bind(this);
        this.onChangeUPF = this.onChangeUPF.bind(this);
        this.onChangeDesignation = this.onChangeDesignation.bind(this);
        this.onChangeUniversity = this.onChangeUniversity.bind(this);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.onChangeFaculty = this.onChangeFaculty.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDateAgreementSigned = this.onChangeDateAgreementSigned.bind(this);
        this.onChangeStudyCountry = this.onChangeStudyCountry.bind(this);
        this.onChangeStudyAddress = this.onChangeStudyAddress.bind(this);
        this.onChangeObligatorPeriodFP = this.onChangeObligatorPeriodFP.bind(this);
        this.onChangeObligatorPeriodNP = this.onChangeObligatorPeriodNP.bind(this);
        this.onChangeBondValue = this.onChangeBondValue.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);

        this.state = {
            agreementNumber:'',
            title:'',
            first_name :'',
            last_name : '',
            email :'',
            telephone:'',
            upf:'',
            designation:'',
            universities: [],
            faculties:[],
            departments:[],
            university:'',
            department:'',
            faculty:'',
            dateAgreementSigned:'',
            countryStudy:'',
            studyAddress:'',
            suretyData:[],
            obligatorPeriodFP:'',
            obligatorPeriodNP:'',
            bondValue:'',
            status:'',
            lastUpdatedOn:'',
            firstNameError:'',
            lastNameError:'',
            emailError:'',
            telephoneError:'',
            upfError:'',
            dateAgreementSignedError:'',
            bondValueError:'',
            progressReportData:[],
            alertMessage:'',
            redirect:false
        }
    }

    componentDidMount(){
        this.getCurrentDate();
        axios.get('http://192.168.22.130/getById.php?id='+this.props.match.params.id)
        .then(response => {
            //console.log(response.data)
            this.setState({
                agreementNumber:response.data.agreementNumber,
                title:response.data.title,
                first_name: response.data.fName,
                last_name:response.data.lName,
                email: response.data.email,
                telephone:response.data.telephone,
                upf: response.data.upf,
                designation:response.data.designation,
                university: response.data.university,
                faculty:response.data.faculty,
                department:response.data.department,
                dateAgreementSigned:response.data.dateAgreementSigned,
                studyCountry:response.data.studyCountry,
                studyAddress: response.data.studyAddress,
                obligatorPeriodFP:response.data.obligatorPeriodFP,
                obligatorPeriodNP:response.data.obligatorPeriodNP,
                bondValue:response.data.bondValue,
                //progressReportData:[{number:'', date:''}],
                status:response.data.status,
                lastUpdatedOn:this.state.lastUpdatedOn,
                universities:[
                    { name: 'University of Colombo', faculties: [ 
                        {name: 'Faculty of Arts  ', departments: ['Demography', 'Geography', 'Economics','English','History',
                        'Political Science','Iternational Relations','Sinhala','Sociology','Buddhist Studies','English Language Teaching']},
                        {name: 'Faculty of  Education', departments: ['Eductional Psycology', ' Humanities Education','Science  & Technology  Education','Social Science Education']},
                        {name: 'Faculty of Law', departments: ['Commercial Law', 'Private & Comparative  Law','Public and  International Law']},
                        {name: 'Faculty of Management and Finance', departments: ['Accounting','Business Economics','Finance','Human Resources Management','Management  & Organization Studies','Marketing','International Business','Hospitality & Leisure Management']},
                        {name: 'Faculty of Medicine', departments: ['Anatomy','Biochemistry & Molecular Biology','Clinical Medicine','Community Medicine','Forensic Medicine & Toxicology',
                    'Microbiology','Obstetrics & Gynaecology','Paediatrics','Parasitology','Pathology','Pharmacology',
                    'Physiology','Psychiatry ','Surgery','Medical Humanities','Medical Education','Allied Health Sciences','Anaesthesiology & Critical Care','Family Medicine','Medical Technology']},
                        {name:'Faculty of Science', departments:['Chemistry','Mathematics','Nuclear Science','Physics','Statistics','Plant Science','Zoology & Environment Sciences']},
                        {name:'Faculty of Technology',departments:['Technology']},
                        {name:'Sripalee Campus', departments: ['Mass Media', 'Performing Arts']}
                    ]},
                    {name:'Postgraduate Institute of Medicine', faculties:[
                        {name:'Boards of study',
                        departments:['Anaesthesiology','Basic Medical Sciences','Clinical Oncology','Community Medicine','Dermatology','Family Medicine & General Practice ',
                        'Forensic Medicine','Medical Administration', 'Medicine','Microbiology','Multi Disciplinary Study Courses','Obs & Gynaecology',
                        'Ophthalmology','Paediatrics','Pathology','Psychiatry','Radiology','Sports Medicine','Surgery','Venereology ','Orthopaedic Surgery']},
                    ]},
                    {name:'Postgraduate Institute of Indigenouns Mdeicine', faculties:[
                        {name:'Boards of study',
                        departments:['Ayurveda Medicine','Siddha Medicine','Unani Medicine']} 
                    ]},
                    {name:'Institute of Human Resource Advancement', faculties:[
                        {name:'Boards of study',
                        departments:['Extension Programs','Human Resource Education Programs']}   
                    ]},
                    {name:'Institute of Indegenous Medicine', faculties:[
                        {name:'Ayurveda Section', departments:['Deshiya Chikitsa','Moulika Siddhantha','Dravyaguna  Vignana','Nidana Chikitsa']},
                        {name:'Unani Section', departments:['Illmul Adviya','Kulliyath']}
                    ]},
                    {name:'University of Colombo School of Computing', faculties:[
                       {name:'Academic', departments:['Communication & Media Technology','Computation  & Intelligence Systems ']} 
                    ]},
                    {name:'Institute for agro-technology & rural sciences', faculties:[
                        {name:'Departments of Study', departments:['Agro-technology', 'Entrepreneurship, Agri-business and Rural Sciences', 'Food Technology']}
                    ]},
                    { name: 'University of Peradeniya', faculties: [ 
                        {name: 'Faculty of Agriculture', departments: ['Soil Science', 'Agricultural Extension', 'Agricultural Engineering','Agri. Econ & b.Mgt','Agriculturl Biology',
                        'Animal Science','Crop Science','Food Science and Tech.']},
                        {name: 'Faculty of Arts', departments: ['Economics & Stat.', 'Arabic & Islamic Civilization','Socialogy','Geograpghy','Law','Sinhala','Pali & Buddhism Std.',
                    'Political Science','History','English Language Teaching Unit','Archaeology']},
                        {name: 'Allied Health Science', departments: ['Nursing', 'Radiography','Basic Science','Physiotheraphy','Medcal Laboratory Sciences','Pharmacy']},
                        {name: 'Dental Sciences', departments: ['Basic Sciences', 'Community Dental Health','Oral & Maxillofacial Surgery','Oral Medicine & Periodontology','Oral Pathology','Prosthetic Dentistry','Restorative Dentistry']},
                        {name: 'Management', departments: ['Mgt. Studies','Marketing Mgt.','Operations Mgt.','Business Finance','Human Resource Mgt.']},
                        {name: 'Faculty of Medicine', departments: ['Anaesthesiology & Critical Care ','Anatomy','Biochemistry','Community Medicine','Forensic Medicine','Medicine',
                    'Microbiology ','Obstetrics & Gynaecology','Paediatrics','Parasitology','Pathology','Pharmacology','Physiology','Psychiatry','Surgery']},
                        {name: 'Faculty of Science', departments: ['Botany','Chemistry','Geology','Mathematics','Chemistry','Molecular Biology & Biotechnology','Physics']},
                        {name: 'Faculty of Veterinary Medicine & Animal Science', departments: ['Ver. Clinical Sciences','Basic Vet. Sciences','Farm Animal Prod. & Health','Vet. Pathobiology','Vet. Public Health & Pharmacology']},
                        {name: 'Faculty of Engineering', departments: ['Chemical & Process Engineering ','Civil Engineering','Computer  Sciences','Engineering Mathematics',
                    'Engineering Management','Mechanical Engineering','Manufacturing & Industiral Engineering ',]} 
                    ]},
                    {name:'Postgrduate Institute of Agriculture', faculties:[
                        {name:'Borad of Study', departments:['Agricultural Biology','Agricultural Economics','Agricultural Engineering','Agricultural Extension','Animal Science','Bio-Statistics']}
                    ]},
                    {name:'Postgraduate Institute of Science', faculties:[
                        {name:'Boards of Study', departments:['Biochemistry and Molecular Biology','Chemical Sciences','Earth Sciences','Environmental Science','Mathematics','Physics']}
                    ]},
                    {name:'Postgraduate Institute of Humanities and Social Sciences', faculties:[
                        {name:'Boards of Study', departments:['Social Sciences','Languages and Literature Studies','Economics and Management']}
                    ]},
                    {name:'Postgraduate Institute of Medial Sciences', faculties:[
                        {name:'Boards of Study', departments:['Clinical Sciences','Basic Medical Sciences']}
                    ]},
                    {name: 'University of Sri Jayawarenepura', faculties:[
                        {name:'Faculty of Applied Science', departments:['Botany','Chemistry','Food Science & Technology','Forestry & Environmental  Science', 'Mathematics','Physics']},
                        {name:'Faculty of Humanities & Social Sciences', departments:['Economics','English & Linguistics','Geography','History & Archaeology','Pali & Buddhist Studies','Political Science']},
                        {name:'Faculty of Management Studies & Commerce', departments:['Business Administration','Decision Sciences','Commerce','Decision Sciences','Entrepreneurship','Estate Management & Valuation','Human Resource Management']},
                        {name:'Faculty of Medical Sciences', departments:['Anatomy','Medicine','Biochemistry','Community  Medicine','Family  Medicine','Forensic Medicine','Medicine','Medical  Education & Health Sciences','Microbiology ','Obs. and Gynaecology']},
                        {name:'Faculty of Technology', departments:['Information & Communication ','Science for Technology','Civil and Environmental Technology','Materials and Mechanical Technology','Technology']},
                        {name:'Faculty of Engineering', departments:['Civil Engineering', 'Computer Engineering','Electrical and Electronic Engineering', 'Mechanical Engineering','Interdisciplinary Studies']},
                        {name:'Faculty of Allied Health Sciences', departments:['Basic Sciences', 'Medical Laboratory Sciences ','Nursing & Midwifery ','Pharmacy & Pharmaceutical Sciences']}
                    ]},
                    {name:'Postgraduate Institute of Management', faculties:[
                        {name:'Boards of Study', departments:['Business Administration','Banking and finance']}
                    ]},
                    {name: 'University of Kelaniya', faculties:[
                        {name:'Faculty of Humanities', departments:['English','Fine Arts','Hindi','Modern Languages', 'Pali and Buddhist Studies','Linguistics']},
                        {name:'Faculty of Commerce & Management Studies', departments:['Accountancy','Finance','Geography','Human Resource Management','Commerce & Financial  Management','Marketing Management']},
                        {name:'Faculty of Medicine', departments:['Anatomy','Medicine','Biochemistry and clinincal chemistry','Paediatrics','Medical Microbology','Parasitology','Family Mdecine']},
                        {name:'Faculty of Social Sciences', departments:['Archaeology','Economics','Geography','History','Mass Communication',' Library & Information Science','Philosophy','Sports Science & Physical Education ','International Studies  ','Social Statistics ']},
                        {name:'Faculty of Science', departments:['Plant & Molecular Biology','Chemistry','Industrial Management','Mathematics']},
                        {name:'Faculty of Computing & Technology', departments:['Software Engineering', 'Computer Systems Engineering']},
                    ]},
                    {name:'Postgraduate Institute of Pali and Buddhist Studies', faculties:[
                        {name:'Boards of Study', departments:['Budhdist Culture','Buddhist Literary Sources']}
                    ]},
                    {name:'Postgraduate Institute of Archaeology', faculties:[
                        {name:'Boards of Study', departments:['Environmental Archeology','Heritage Studies']}
                    ]},
                    {name:'Gampaha Wickramarachchi Aurweda Institute', faculties:[
                        {name:'Academic', departments:['Ayurveda Basic Principles','Kaumarabruthya & Stree Roga']}
                    ]},
                ]
            });
            let agmnNo = this.state.agreementNumber;

            axios.get('http://192.168.22.130/getByAgreementNo.php?agreementNumber='+agmnNo)
        .then(response => {
            let res = response.data;
            res.forEach((r) =>{
                this.setState({
                    suretyData:[...this.state.suretyData,r]  
                });
            
            })
            //console.log('surety------>')
            //console.log(this.state.suretyData);

        })

        axios.get('http://192.168.22.130/getReportDataByAgreementNo.php?agreementNumber='+agmnNo)
        .then(response => {
          // console.log(response.data==[]);
          // console.log('response.data.length======>');
          // console.log(response.data)
            let res = response.data;
            //console.log(this.state.suretyData);
                res.forEach((r) =>{
                    this.setState({
                        progressReportData:[...this.state.progressReportData,r]  
                    });
                
                })
            
        })

        })
            .catch(function(error){
                console.log(error);
            })
    }

    onChangeAgreementNumber(e){
        this.setState({
            agreementNumber: e.target.value
        })
    }

    onChangeTitle(e){
        this.setState({
            title:e.target.value
        });
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

    
    handleChangeInputReport(index,e){
        const values=[...this.state.progressReportData];
        values[index][e.target.name]= e.target.value;
        const a = values[index][e.target.value];
        this.setState({
            progressReportData: values
        });

    }


    addProgressReport(){
        this.setState({
            progressReportData: [...this.state.progressReportData, {number:'', date:''}]
        }); 
    }

    removeProgressReport(index){
        
        const values=[...this.state.progressReportData];
        const ItemCount = values.length;
        if( ItemCount!= 1){
            values.splice(index, 1);
        this.setState({
            progressReportData: values
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
            status:e.target.value
        });
    }

    getCurrentDate() {  
        var date =  new Date();
        var month = parseInt(date.getMonth()+1);
        var doubleDigitMonth = month < 10 ? '0' + month : '' + month;
       // var currDate = date.getFullYear()+"-"+parseInt(date.getMonth()+1)+"-"+date.getDate();
       var currDate = date.getFullYear()+"-"+doubleDigitMonth+"-"+("0" + date.getDate()).slice(-2);
       //console.log(currDate);
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
           // userId: this.state.userId,
            agreementNumber:this.state.agreementNumber,
            title:this.state.title,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            telephone:this.state.telephone,
            upf:this.state.upf,
            designation:this.state.designation,
            university:this.state.university,
            faculty:this.state.faculty,
            department:this.state.department,
            dateAgreementSigned:this.state.dateAgreementSigned,
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

    
        axios.all([
            axios.post('http://192.168.22.130/update.phpp?id='+this.props.match.params.id, obj1),
            axios.post('http://192.168.22.130/updateSurety.php?agreementNumber='+this.state.agreementNumber,obj2)
           ]) 
            .then(res=>{
                this.setState({alertMessage:'success', redirect:true
            })
            }).catch(error=>{
                this.setState({alertMessage:'error'})
            })

            
            if(this.state.progressReportData[0].number!=''){
                /*
                let arrNw=[]
                let arr=this.state.progressReportData;
                arr.forEach( v => arrNw.indexOf(v.number) === -1 ? arrNw.push(v.number, v.date) : null);
                console.log('arrNw------------------------>');
                console.log(arrNw);**/
                let existingReportArr=this.state.progressReportData;
                let result = existingReportArr.reduce((unique, o) => {
                    if(!unique.some(obj => obj.label === o.label && obj.value === o.value)) {
                      unique.push(o);
                    }
                    return unique;
                },[]);


                existingReportArr=result;
                console.log("existing Array");
                console.log(this.state.progressReportData);

                this.setState({
                    progressReportData:existingReportArr
                });

                const obj={
                    agreementNumber: this.state.agreementNumber,
                    progressReportData:this.state.progressReportData
                }

                axios.post('http://192.168.22.130/insertProgressReport.php',obj)
                .then(response => {
                    console.log("Inserted Successfully")
                 }) 
                .catch(function(error){
                    console.log(error);
                })
            }

    }
    }

    render(){
        const {redirect} = this.state;
      //  let fac = this.state.faculty;

        if(redirect){
            return<Redirect to='/view'/>;
        }
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
                                     value={surety.address} onChange={this.handleChangeInput.bind(this, index)}style={{width:"65%"}} />
                                    
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
                            <label>Progress Report Details</label>  
                            
                            {this.state.progressReportData.map((progressReport, index)=>(
                                <div style={{display: "flex"}} key={index}>
                                   
                                    <input type="text" name="number" placeholder="Report Number" className="form-control"
                                     value={progressReport.number} onChange={this.handleChangeInputReport.bind(this, index)} style={{width:"35%"}}/>
                                    <input type="text" name="date" placeholder="dd-mm-yyyy (Submitted Date)" className="form-control"
                                     value={progressReport.date} onChange={this.handleChangeInputReport.bind(this, index)}style={{width:"65%"}} />
                                    <FontAwesomeIcon icon={faPlusSquare} onClick={this.addProgressReport.bind(this)} size= "2x" style={{ marginRight:"3"}}/>
                                    <FontAwesomeIcon icon={faMinusSquare} onClick={this.removeProgressReport.bind(this, index)} size= "2x"/>
                                
                                </div>
                            ))}
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
                            <input type="date" readOnly  className="form-control"
                            value={this.state.lastUpdatedOn} />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Update Agreement" className="btn btn-primary"/>
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