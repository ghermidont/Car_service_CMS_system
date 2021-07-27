import React from "react";
import { Button, Row, Col } from 'antd';
import {Link} from "react-router-dom";

const CMSUserMainPage = () => {
    const style = { background: 'darkgrey', color: "black", borderRadius:"5px", width: '500px', height: "100px"};

  return (
      <>
          <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
            HOME PAGE
          </h4>
         <center>
             <Row gutter={[16, 24]} colon>
                  <Col className="gutter-row" span={12}>
                      <Button style={style} type="primary">REGISTER CLIENTS</Button>
                  </Col>
                  <Col className="gutter-row" span={12}>
                      <Button style={style} type="primary">Primary Button</Button>
                  </Col>
                  <Col className="gutter-row" span={12}>
                      <Button style={style} type="primary">Primary Button</Button>
                  </Col>
                  <Col className="gutter-row" span={12}>
                      <Button style={style} type="primary">Primary Button</Button>
                  </Col>
                  <Col className="gutter-row" span={12}>
                      <Link to="/login">
                            <Button style={style} type="primary">REGISTER CLIENTS</Button>
                      </Link>
                  </Col>
                 <Col className="gutter-row" span={12}>
                     <Button style={style} type="primary">CARS ARCHIVE</Button>
                 </Col>
            </Row>
         </center>
      </>

  );
};

export default CMSUserMainPage;
