import React from 'react'
import {Link, redirect} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Register()
{   const navigate = useNavigate()
   
     const [field,setField] = React.useState({name:"",college:"",email:"",gender:"Gender",password:"",confirmPassword:""})
    const[passMsg,setPassMsg]=React.useState({display:false,msg:"Password is not matching !"})
    const[nameMsg,setNameMsg]=React.useState({display:false,msg:"Please enter your name !"})
    const[emailMsg,setEmailMsg]=React.useState({display:false,msg:"Please enter your email !"})
    const[genderMsg,setGenderMsg]=React.useState({display:false,msg:"Please select your gender !"})
    const[collegeMsg,setCollegeMsg]=React.useState({display:false,msg:"Please select your College name !"})
    const[field_type,setFieldType]=React.useState("")
    

    const[reg,setReg]=React.useState(false)
    function handleChange(event){
        const temp_field_type = event.target.name
        setFieldType(temp_field_type)
        setField((old)=>{
            
            let nob = {
                ...old,
            }
            nob[temp_field_type] = event.target.value
            return nob

        })
      
        
               
        }

        React.useEffect(()=>{
          console.log(field)
          if(field_type=='name' )
            {
              if(field.name.replace(/\s/g, "")!="")setNameMsg({display:false,msg:""})
              else setNameMsg({display:true,msg:"Please enter your name !"})
              
            }
           
            if(field_type=='college' )
            {
              if(field.college.replace(/\s/g, "")!="")setCollegeMsg({display:false,msg:""})
              else setCollegeMsg({display:true,msg:"Please enter your College name !"})
              
            }
            if(field_type=='gender' )
            {
              if(field.gender!="Gender")setGenderMsg({display:false,msg:""})
              else setGenderMsg({display:true,msg:"Please select your gender !"})
              
            }
  
  
            if (field_type=="confirmPassword"||field_type=="password")
          {
            if((field.password!="" && field.confirmPassword!="") && field.password!=field.confirmPassword )
              {
                setPassMsg({display:true,msg:"Password is not matching"})
              }
            else if( field.password==field.confirmPassword)
            {
              setPassMsg({display:false,msg:"Password is not matching"})
  
            }
               
          }
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
  
         },[field,field_type])
            
        
    
    function handleSubmit(event)
    {  event.preventDefault()
     console.log('work')
     const name= field.name.replace(/\s/g, "")
     const college= field.college.replace(/\s/g, "")
     const email= field.email.replace(/\s/g, "")
     const gender = field.gender
     const password = field.password.replace(/\s/g, "")
     const confirmPassword = field.confirmPassword.replace(/\s/g, "")
     let correct=0;

     if(name!=""){
      correct++
      setNameMsg({display:false,msg:"Please enter your name !"})
     }
     else setNameMsg({display:true,msg:"Please enter your name !"})

     if(emailMsg.display) setEmailMsg({display:true,msg:"Please enter your valid college email !"})
     else if(email!=""){correct++
      setEmailMsg({display:false,msg:"Please enter your valid college email !"})}
     else setEmailMsg({display:true,msg:"Please enter your email !"})

     if(college!=""){correct++
      setCollegeMsg({display:false,msg:"Please enter your college !"})
    }
     else setCollegeMsg({display:true,msg:"Please enter your college !"})

     if(gender!="Gender"){correct++
      setGenderMsg ({display:false,msg:"Please select your gender"})
     }
     else setGenderMsg({display:true,msg:"Please select your gender"})

     console.log(gender)

     if(password!="" && confirmPassword!="" && password==confirmPassword){ correct++;
      setPassMsg({display:false,msg:"Please enter a password !"})}
     else if(password=="" && confirmPassword=="") setPassMsg({display:true,msg:"Please enter a password !"})
     else if(password=="") setPassMsg({display:true,msg:"Please enter that password in password section too !"})
     else if(confirmPassword=="") setPassMsg({display:true,msg:"Please confirm your password !"})

     const button = document.getElementById('register');
     const loader = button.querySelector('.loader');
     loader.style.display = 'inline-block';


      let registered=false
     if(correct==5){
      console.log("here")
     
      console.log( loader.style.display)
      
        fetch('http://localhost:5000/register',{
            method:'POST',
            headers:{
                'Content-Type':
                'application/json'
            },
            body:JSON.stringify(field)
        }).then(res=>res.json())
        .then(res=>{
          if(res.redirect) return navigate('/login/1',{state:{user_name:field.name}})
          else{
            setEmailMsg({display:true,msg:"Email already registered !"})}
          loader.style.display = 'none'

          }
        )
        .catch((err)=>{console.error(err)
          loader.style.display = 'none'

        })
        
        
      
      

      }
    }
    
    
    const stylef = {
        backgroundImage:"url('https://img.freepik.com/free-vector/abstract-orange-background-with-lines-halftone-effect_1017-32107.jpg?size=626&ext=jpg')"
    }
    const dstyle ={
      color:'red',
      fontSize:"12px",
      marginTop:"-15px",
      marginBottom:"-15px",
      display:"flex",
      listStyle:"none"
      

    }

    return(
        <section className="vh-100 bg-image"
        style={stylef}>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-13 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{borderRadius: '15px'}}>
                  <div className="card-body p-">
                    <h2 className="text-uppercase text-center mb-2">Create an account</h2>
      
                    <form>
      
                      <div className="form-outline mb-3">
                        <input type="text" id="form3Example1cg" className="form-control form-control-lg" onChange={handleChange} value={field.name} name='name' placeholder='Your Name' />
                        {/* <label className="form-label" htmlFor="form3Example1cg">Your Name</label> */}
                      </div>
                      {nameMsg.display && <div style={dstyle}><li><i class="fa-solid fa-xmark"></i></li><p style={{marginLeft:"4px"}}>{nameMsg.msg}</p></div>}

                      <div className="form-outline mb-3">
                        <input type="text" id="form3Example1cg" className="form-control form-control-lg"  onChange={handleChange} value={field.college} name='college' placeholder='Your College' />
                        {/* <label className="form-label" htmlFor="form3Example1cg">Your Name</label> */}
                      </div>
                      {collegeMsg.display && <div style={dstyle}><li><i class="fa-solid fa-xmark"></i></li><p style={{marginLeft:"4px"}}>{collegeMsg.msg}</p></div>}

                      
                      <select class=" form-outline form-select form-select-lg mb-3" id="form3Example1cg" onChange={handleChange} value={field.gender}  name='gender' defaultValue={"Gender"} aria-label="Default select example">
                         <option selected   >Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                             </select>
                      
                             { genderMsg.display &&<div style={dstyle}><li><i class="fa-solid fa-xmark"></i></li><p style={{marginLeft:"4px"}}>{genderMsg.msg}</p></div>}
                      

                      <div className="form-outline mb-3">
                        <input type="email" id="form3Example3cg" className="form-control form-control-lg"  onChange={handleChange} value={field.email} name='email' placeholder='Your Email'/>
                        {/* <label className="form-label" htmlFor="form3Example3cg">Your Email</label> */}
                      </div>

                      {emailMsg.display && <div style={dstyle}><li><i class="fa-solid fa-xmark"></i></li><p style={{marginLeft:"4px"}}>{emailMsg.msg}</p></div>}

      
                      <div className="form-outline mb-3">
                        <input type="password" id="form3Example4cg" className="form-control form-control-lg"  onChange={handleChange} value={field.password} name='password' placeholder='Password'/>
                        {/* <label className="form-label" htmlFor="form3Example4cg">Password</label> */}
                      </div>


      
                      <div className="form-outline mb-3">
                        <input type="password" id="form3Example4cdg" className="form-control form-control-lg" onChange={handleChange} value={field.confirmPassword} name='confirmPassword' placeholder='Confirm Password'/>
                        {/* <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label> */}
                      </div>
                      {passMsg.display && <div style={dstyle}><li><i class="fa-solid fa-xmark"></i></li><p style={{marginLeft:"4px"}}>{passMsg.msg}</p></div>}

      
                      {/* <div className="form-check d-flex justify-content-center mb-4">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                        <label className="form-check-label" htmlFor="form2Example3g">
                          I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                        </label>
                      </div> */}
      
                      <div className="d-flex justify-content-center">
                        <button id='register' type="button"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={handleSubmit}>Register
                           <div class="loader"></div>
                          </button>
                      </div>
      
                      <p className="text-center text-muted mt-2 mb-0">Have already an account? <a href="/login"
                          className="fw-bold text-body"><u>Login here</u></a></p>
      
                    </form>
      
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>)
        // <div>
        // <form  onSubmit={handleSubmit}>
        //      <h1>Register</h1>
        //      <br/>

        //      <label > Name:</label>

        //     <input placeholder="Name" name ="name" onChange={handleChange} value={field.name} />
        //     <br/>
        //     <label > Username:</label>
            
        //     <input placeholder="Username" name ="username" onChange={handleChange} value={field.username}/>
        //     <br/>
        //     <label > Phone:</label>

        //     <input placeholder="Phone" name ="phone" onChange={handleChange} value={field.phone}/>
        //     <br/>
        //     <label > Password:</label>

        //     <input placeholder="Password" name ="password" onChange={handleChange} value={field.password}/>
        //     <br/>
        //     <button>Register</button>
        // </form>
        // <div>{msg}</div>
        // <Link to="/login">Login</Link>
        // </div>
    // )

    // return(
    //     <div style={position="relative",top=40vh,}>
            

    //     </div>
    // )
}