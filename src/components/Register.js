import React, {useContext,useState} from 'react'
import {MyContext} from '../contexts/MyContext'

function Register(){
    const {toggleNav,registerUser} = useContext(MyContext);
    const initialState = {
        userInfo:{
            name:'',
            email:'',
            password:'',
        },
        errorMsg:'',
        successMsg:'',
    }
    const [state,setState] = useState(initialState);

    // On Submit the Registration Form
    const submitForm = async (event) => {
        event.preventDefault();
        const data = await registerUser(state.userInfo);
        if(data.success){
            setState({
                ...initialState,
                successMsg:data.message,
            });
        }
        else{
            setState({
                ...state,
                successMsg:'',
                errorMsg:data.message
            });
        }
    }

    // On change the Input Value (name, email, password)
    const onChangeValue = (e) => {
        setState({
            ...state,
            userInfo:{
                ...state.userInfo,
                [e.target.name]:e.target.value
            }
        });
    }
    
    // Show Message on Success or Error
    let successMsg = '';
    let errorMsg = '';
    if(state.errorMsg){
        errorMsg = <div className="error-msg">{state.errorMsg}</div>;
    }
    if(state.successMsg){
        successMsg = <div className="success-msg">{state.successMsg}</div>;
    }

    return(
        <div style={{maxWidth:"900px", paddingLeft:"300px"}}>
            <h1 style={{fontFamily:"monospace", textAlign:"center"}}>Sign Up</h1>
            <form style={{fontFamily:"monospace", fontStyle:"oblique"}} onSubmit={submitForm} noValidate>
                <label>Full Name</label>
                <div className="form-group"> 
                    <input className="form-control" name="name" required type="text" value={state.userInfo.name} onChange={onChangeValue} />
                </div>
                <label>Email</label>
                <div className="form-group">
                    <input  className="form-control" name="email" required type="email" value={state.userInfo.email} onChange={onChangeValue} />
                </div>
                <label>Password (minimum 8 digits)</label>
                <div className="form-group">
                    <input className="form-control" name="password" required type="password" value={state.userInfo.password} onChange={onChangeValue} />
                </div>
                <br/>
                {errorMsg}
                {successMsg}
                <div className="_navBtn">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <div className="_navBtn">
                <button  onClick={toggleNav}>Login</button>
            </div>
        </div>
    );
}

export default Register