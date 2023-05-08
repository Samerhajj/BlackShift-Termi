import { IconContext } from "react-icons";
import {IoGameController, IoPersonCircle, IoInformationCircleSharp, IoSearch, IoLogOut, IoLogIn, IoAddCircle} from 'react-icons/io5';
import { Link ,useNavigate} from 'react-router-dom';
import React, { useContext ,Fragment} from 'react';
import { Modal, Button ,Col,Row} from "react-bootstrap";
import './StickFooter.css'; // import the CSS file

var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
    zIndex:'5',
};

  
var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
};

function StickFooter({ children }) {
    return (
   <div>
      <div style={phantom} />
      <div style={style} className="stick-footer">
            <Row className="">
              <ul className="ul-in-stick-footer d-flex list-unstyled">
              <Col xs={3} xl={3}>
              <li className="il-in-stick-footer justify-content-center">
              <Link to="/">
                <IconContext.Provider value={{ size: "2rem" }}>
                  <IoSearch />
                </IconContext.Provider>
              </Link>
            </li>
            </Col>
               <Col xs={3} xl={3}>
                    <li className="il-in-stick-footer d-flex justify-content-center">
                      <Link to="/suggest">
                        <IconContext.Provider value={{ size: "2rem" }}>
                          <IoAddCircle />
                        </IconContext.Provider>
                       
                      </Link>
                    </li>
                </Col>
                    <Col xs={3} xl={3}>
                    <li className="il-in-stick-footer d-flex justify-content-center">
                      <Link to="/games">
                        <IconContext.Provider value={{ size: "2rem" }}>
                          <IoGameController />
                        </IconContext.Provider>
                      </Link>
                    </li>
                </Col>
                   <Col xs={3} xl={3}>
                    <li className="il-in-stick-footer d-flex justify-content-center">
                      <Link to="/profile">
                        <IconContext.Provider value={{ size: "2rem" }}>
                          <IoPersonCircle />
                        </IconContext.Provider>
                      </Link>
                    </li>
                </Col>
              </ul>
            </Row>
        </div>
    </div>
    );
}

export default StickFooter;
