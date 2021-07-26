import React, {useContext, useState} from 'react'
import {MyContext} from '../contexts/MyContext'

function Login(){

    const {toggleNav,loginUser,isLoggedIn} = useContext(MyContext);

    const initialState = {
        userInfo:{
            email:'',
            password:'',
        },
        errorMsg:'',
        successMsg:'',
    }

    const [state,setState] = useState(initialState);

    // On change input value (email & password)
    const onChangeValue = (e) => {
        setState({
            ...state,
            userInfo:{
                ...state.userInfo,
                [e.target.name]:e.target.value
            }
        });
    }

    // On Submit Login From
    const submitForm = async (event) => {
        event.preventDefault();
        const data = await loginUser(state.userInfo);
        if(data.success && data.token){
            setState({
                ...initialState,
            });
            localStorage.setItem('loginToken', data.token);
            await isLoggedIn();
        }
        else{
            setState({
                ...state,
                successMsg:'',
                errorMsg:data.message
            });
        }
    }

    // Show Message on Error or Success
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
            <h1 style={{fontFamily:"monospace",  textAlign:"center"}}>Login</h1>
            <form style={{fontFamily:"monospace", fontStyle:"oblique"}} onSubmit={submitForm} noValidate>
            <label>Email</label>
                <div  className="form-group" >
                     <input className="form-control"  name="email" type="email" required  value={state.userInfo.email} onChange={onChangeValue} />
                </div>
                <label>PassWord</label>
                <div className="form-group">
                     <input className="form-control" name="password" type="password" required  value={state.userInfo.password} onChange={onChangeValue} />
                </div>
                {errorMsg}
                {successMsg}
                <br/>
                <div className="_navBtn">
                    <button type="submit">Login</button>
                </div>
            </form>
            <div className="_navBtn">
                <button onClick={toggleNav}>Register</button>
            </div>
        </div>
    );
}

export default Login;