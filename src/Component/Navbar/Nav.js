import React from "react";
import "../Navbar/Nav.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from "../Gallery/myperfectresume.svg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faUser} from '@fortawesome/free-solid-svg-icons';



function Navbar () {


    return(
        <>
        <Container>
        
            <Row>
        
            <div className="row1">

        
        <Col md={3}className="head">
        <div>
        <img src={Logo} alt="..." className="logo" />
        </div>
        </Col>
       


       
        <Col md={6}>
        <div className="he2">
        <div className="navitem">BUILDERS</div>
        <div className="navitem">RESUMES</div>
        <div className="navitem">COVER&nbsp;LETTERS</div>
        <div className="navitem">CVs</div>
        <div className="navitem">RESOURCES</div>   
        </div>     
        </Col>
       
       <Col md={4} >
       <div className="he3">
       <div><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
       <div><FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;Login</div>
       </div>
       </Col>

        </div>
            </Row>
           
        </Container>

        
        </>


    )
}

export default Navbar;