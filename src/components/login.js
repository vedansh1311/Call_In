import React from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { useContext } from 'react';
import { Mycontext } from '../App';

export default function Login()
{ 
 
  const {user, setUser} = useContext(Mycontext)
  const navigate = useNavigate()

  const location = useLocation()
  let{signed} = useParams()
  let user_name
  if(signed)
  {
    user_name = location.state.user_name
    user_name =user_name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  }
  
    const [field,setField] = React.useState({email:"",password:""})
    const[passMsg,setPassMsg]=React.useState({display:false,msg:"Wrong Password !"})
    const [emailMsg,setEmailMsg]=React.useState({display:false,msg:"User doesn't exist !"})
    const[field_type,setFieldType]=React.useState("")
    

   function handleChange(event){
        const temp_field_type=event.target.name
        setFieldType(temp_field_type)

        setField(old=>{
            
            let nob = {
                ...old,
            }
            nob[temp_field_type] = event.target.value
            console.log(event.target.value)
            
            return nob

        })

        
    }
   

    React.useEffect(()=>{
      console.log(field)
      
      if(field_type=="email")
      {
        const isedu= field.email.includes("@") && field.email.includes(".")
      if(field.email.replace(/\s/g, "")=="") setEmailMsg({display:true,msg:"Please Enter your college email !"})
      else if( isedu && field.email.includes("edu")){
            setEmailMsg({display:false,msg:""})
        }
        else  if(field.email.replace(/\s/g, "")=="") setEmailMsg({display:true,msg:"Please Enter your college email !"})
        else {
          setEmailMsg({display:true,msg:"Not a valid college email id !"})
        }
      }

      if(field_type=="password")
      {
        if(field.password.replace(/\s/g, "")=="") setPassMsg({display:true,msg:"Password is required!"})
        else setPassMsg({display:false})
      }

     },[field,field_type])

    function handleSubmit(event)
    {  event.preventDefault()
     const email= field.email.replace(/\s/g, "")
     const password = field.password.replace(/\s/g, "") 
     
     let correct=0
     
     if(emailMsg.display) setEmailMsg({display:true,msg:"Please enter your valid email!"})
     else if(email=="") setEmailMsg({display:true,msg:"Email is required !"})
     else{correct++
      setEmailMsg({display:false,msg:"Please enter your valid college email !"})}
     
      
    if(passMsg.display || password==""  ) setPassMsg({display:true,msg:"Password is required !"})
    else {setPassMsg({display:false})
           correct++} 
      if(correct==2){
        const button = document.getElementById('login');
     const loader = button.querySelector('.loader');
     loader.style.display = 'inline-block';

        fetch('http://localhost:5000/login',{
            method:'POST',
            headers:{
                'Content-Type':
                'application/json'
            },
            body:JSON.stringify(field)
        }).then(res=>res.json())
        .then(data=>{
            if(data.auth)
             { 
              localStorage.setItem('token',data.token)
              setUser({loggedin:true,name:data.name,gender:data.gender,uid:data._id})
              return navigate('/home')

            }
             else if(!data.user) 
            {  setEmailMsg({display:true,msg:"User doesn't exist !"})
               
            }
            else{
              setPassMsg({display:true,msg:"Wrong password !"})}
            loader.style.display = 'none'
              
            }

        )
        .catch((err)=>{console.error(err)
          loader.style.display = 'none'
        })
      }
          
    }

    const dstyle ={
      color:'red',
      fontSize:"12px",
      marginTop:"-15px",
      marginBottom:"-15px",
      display:"flex",
      listStyle:"none"
      

    }


const stylef = {
    backgroundImage:"url('https://img.freepik.com/free-vector/abstract-orange-background-with-lines-halftone-effect_1017-32107.jpg?size=626&ext=jpg')"
}

return(
    <section className="vh-100 bg-image"
    style={stylef}>
    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
      <div className="container h-70">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card" style={{borderRadius: '15px'}}>
              <div className="card-body p-5">
                {signed && <div className='banner' style={{position:"relative",left:"0",color:"green"}}><p  >{user_name},You are registered now .</p></div>}
                <h2 className="text-uppercase text-center mb-4">Login</h2>
              
                <form>
  
                <div className="form-outline mb-3">
                        <input type="email" id="form3Example3cg" className="form-control form-control-lg"  onChange={handleChange} value={field.email} name='email' placeholder='Your Email'/>
                        {/* <label className="form-label" htmlFor="form3Example3cg">Your Email</label> */}
                      </div>
                  

                  {emailMsg.display && <div style={dstyle}><li><i className="fa-solid fa-xmark"></i></li><p style={{marginLeft:"4px"}}>{emailMsg.msg}</p></div>}


                  <div className="form-outline mb-3">
                    <input type="text" id="form3Example1cg" className="form-control form-control-lg" onChange={handleChange}  value={field.password} name="password" placeholder='Password' />
                    {/* <label className="form-label" htmlFor="form3Example1cg">Your Name</label> */}
                  </div>
  
                  {passMsg.display && <div style={dstyle}><li><i className="fa-solid fa-xmark"></i></li><p style={{marginLeft:"4px"}}>{passMsg.msg}</p></div>}
                  
  
                  {/* <div className="form-check d-flex justify-content-center mb-4">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                    <label className="form-check-label" htmlFor="form2Example3g">
                      I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                    </label>
                  </div> */}
  
                  <div className="d-flex justify-content-center">
                    <button type="button"
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"  id="login"onClick={handleSubmit}>Login <div className="loader"></div></button>
                  </div>
  
                  <p className="text-center text-muted mt-2 mb-0">Don't have an account? <a href="/register"
                      className="fw-bold text-body"><u>Register here</u></a></p>
  
                </form>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>)


//     return(
//         <div>
//         <form id="login-form" onSubmit={handleSubmit}>
//              <h1>Login</h1>
//              <br/>
//             <label > Username:</label>
            
//             <input placeholder="Username" name ="username" onChange={handleChange} value={field.username}/>
//             <br/>
//             <label > Password:</label>

//             <input placeholder="Password" name ="password" onChange={handleChange} value={field.password}/>
//             <br/>
//             <button>Login</button>
//         </form>
//         <div>{msg}</div>
//         <Link to="/register">Register</Link>
//         </div>
//     )
}