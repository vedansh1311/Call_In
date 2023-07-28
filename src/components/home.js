
import { useNavigate } from "react-router-dom"

export default function Home(){

    const token = localStorage.getItem('token')
  

    const navigate = useNavigate()

    fetch('http://localhost:5000/user',{
        method:'GET',
        headers:{
           'Authorization':`Bearer ${token}`
            },
    }).then(res=>res.json())
    .then(data=>console.log(data.user))
    .catch(err=>console.error(err))

//     const connectButton = document.getElementById("connect-button");
// const animationContainer = document.querySelector(".animation-container");

// connectButton.addEventListener("click", () => {
//   connectButton.style.display = "none";
//   animationContainer.style.display = "block";
//   setTimeout(() => {
//     animationContainer.style.display = "none";
//     connectButton.style.display = "block";
//   }, 3000);
// });

function handleConnect(event){

navigate('/connect')

}

    


    const stylef = {
        backgroundImage:"url('https://img.freepik.com/free-vector/abstract-orange-background-with-lines-halftone-effect_1017-32107.jpg?size=626&ext=jpg')"
    }

   return(
    <section className="vh-100 bg-image"
    style={stylef}>
    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    {/* <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-13 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{borderRadius: '15px'}}>
                  <div className="card-body p-" > */}
                  <button id="connect-button" onClick={handleConnect} style={{position:"relative",left:"45%"} }>Connect</button>
{/* <div class="animation-container">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div> */}

                    
                    {/* </div>
                    </div>
                    </div>
                    </div> */}

</div>
    </section>
   )


}