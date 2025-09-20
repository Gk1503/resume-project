import React from "react" ;
import Navbar from "../Navbar/Nav";
import BN from "../Navbar/BellowNav/Bn";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Content from "../Content1/Cont";
import Content2 from "../Content2/Cont2";
import Content3 from "../Content3/Content3";
// import Content4 from "../Content4/Content4";
function Home() {  

return(

<>
<Container>
    <Row>
        <Col md={12} className="navbar"><Navbar/></Col>
    </Row>
    <Row>
        <div className="container-fluid">
        <Col md={12}><BN/></Col>
        </div>
    </Row>
</Container>

<div>
<Content></Content>
</div>
<div>
<Content2></Content2>

</div>
<div>
<Content3></Content3>
</div>
{/* <div>
    <Content4/>
</div> */}


</>

)


}


export default Home;