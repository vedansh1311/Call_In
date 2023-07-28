
import { Mycontext } from "../App";
import { useContext } from "react";


export default function Navbar() {

    const {user,setuser} = useContext(Mycontext)
    console.log(user)
    
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top mask-custom shadow-0">
      <div className="container">
        <a className="navbar-brand" href="#!">
          <span style={{ color: " #5e9693", fontSize: "50px" }}>fr</span>
          <span style={{ color: " #fff", fontSize: "50px" }}>eet</span>
        </a>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        //   aria-controls="navbarSupportedContent"
        //   aria-expanded="false"
        //   aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button> */}
        {/* <div className="collapse navbar-collapse" id="navbar"> */}
          {/* <ul className="navbar-nav me-auto"> */}
            {/* <li className="nav-item">
              <a className="nav-link" href="#!">
                Offer
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!">
                Portfolio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!">
                Reference
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!">
                Team
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!">
                Contact
              </a>
            </li>
          </ul> */}
          {!user.loggedin &&
          <ul className="navbar-nav d-flex flex-row">
            {/* <li className="nav-item me-3 me-lg-0">
              <a className="nav-link" href="#!">
                <i className="fas fa-shopping-cart"></i>
              </a>
            </li> */}
            {/* <li className="nav-item me-3 me-lg-0">
              <a className="nav-link" href="#!">
                <i className="fab fa-twitter"></i>
              </a>
            </li> */}
             <li className="nav-item me-3 me-lg-0 ">
              <a className="nav-link" href="#!" >
                About
              </a>
            </li>
            <li className="nav-item me-3 me-lg-0">
              <a className="nav-link" href="#!">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </li>
            <li className="nav-item me-3 me-lg-0">
              <a className="nav-link" href="#!">
              <i className="fa-solid fa-envelope fa-lg"></i>
              </a>
            </li>
          </ul>}

          {user.loggedin &&
          <ul className="navbar-nav d-flex flex-row">
            {/* <li className="nav-item me-3 me-lg-0">
              <a className="nav-link" href="#!">
                <i className="fas fa-shopping-cart"></i>
              </a>
            </li> */}
            {/* <li className="nav-item me-3 me-lg-0">
              <a className="nav-link" href="#!">
                <i className="fab fa-twitter"></i>
              </a>
            </li> */}
            {user.gender=="male" &&  <li className="nav-item me-3 me-lg-0">
              <a className="nav-link" href="#!">
              <i class="fa-solid fa-user-tie"></i>
              </a>
            </li>}
           
            <li className="nav-item me-3 me-lg-0 ">
              <a className="nav-link" href="#!" >
                {user.name}
              </a>
            </li>
          </ul>}
 
        </div>
        {/* </div> */}

    </nav>
  );
}
