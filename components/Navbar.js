
import React,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar() {

    const[cartView, setCartView] = useState(false)
    let data = useCart();
    
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken')

        navigate("/login")
    }

    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
                style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">UB Express</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>  {/* index.css - nav-link color white */}
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myOrder" >My Orders</Link>  {/* index.css - nav-link color white */}
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("authToken")) ?
                            <div className="d-flex">
                                <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/createUser">Signup</Link>
                            </div>
                            :
                            <div>

                                <div className="btn bg-white text-success mx-2 " onClick={()=>{setCartView(true)}}>
                                   My Cart {"  "}
                                   <Badge pill bg="success">{data.length}</Badge>
                                </div>

                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart/></Modal> : ""}

                                <button onClick={handleLogout} className="btn bg-white text-danger" >Logout</button></div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}