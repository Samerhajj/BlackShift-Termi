import React from "react";
import Row from 'react-bootstrap/Row';
import page404 from "../assets/images/page404.jpg"

// --> this page you can reach when you try to search for a page that does not exist 

const PageNotFound = () => {
    return (
    <div>
    <div className="banner banner_profile">
        <div className="wrapper">
          <div className="banner_content">
            <h1 className="pulsing-element">
              <strong>Sorry...</strong>
            </h1>
          </div>
        </div>
      </div>
        <Row>
               <div className="container d-flex justify-content-center">
                    <img className="img-fluid"  src={page404} />
               </div>
        </Row>
    </div>
    )
}
        
export default PageNotFound;