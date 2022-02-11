import React, { useState, useEffect } from 'react';
import {useNavigate, Link, useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {register} from '../actions/userActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import '../CSS/Register.css'



function Register(){
    const navigate = useNavigate();
    const [firstname, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');

    const redirect = redirectInUrl ? redirectInUrl : '/';

    const userRegister = useSelector((state)=> state.userRegister);
    const {userInfo, loading, error} = userRegister;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if(password!== confirmPassword){
            alert('Two passwords didnt match')
        }else {
            dispatch(register(firstname, lastName, email, password))
        }
    }

    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
    },[ navigate, redirect,userInfo])

    return( 
              <form className='form' onSubmit={submitHandler}>
                    <h1>Register Account</h1>
                    <div>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </div>
                    <div>
                         <label htmlFor='firstname'>First Name: </label>
                         <input type='text' id='firstname' placeholder='Enter your first Name: ' 
                         onChange={e=>setFirstName(e.target.value)}/>

                    </div>

                    <div>
                        <label htmlFor='lastname'>Last Name: </label>
                        <input type='text' id='lastname' placeholder='Enter your last Name: ' 
                        onChange={e=>setLastName(e.target.value)}/>
                    </div>
                  
                    <div>
                        <label htmlFor='email'>Email : </label>
                        <input type='text' id='email' placeholder='Enter your email: ' 
                        onChange={e=>setEmail(e.target.value)}/>
                    </div>
                  
                    <div>
                        <label htmlFor='password'>Password : </label>
                        <input type='text' id='password' placeholder='Enter your password: ' 
                        onChange={e=>setPassword(e.target.value)}/>
                    </div>
                    
                    <div>
                        <label htmlFor='conpassword'>Confirm Password: </label>
                        <input type='text' id='conpassword' placeholder='Re-enter your password: ' 
                        onChange={e=>setConfirmPassword(e.target.value)}/>
                    </div>
                
                <div>
                    <button type='submit' 
                  className='primary'>Register</button>
                </div>
                  

               <div>
                  Already have an account ? {" "}
                  <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
              </div>
                </form>
                )}

export default Register;