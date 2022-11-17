import { Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../App";
import Content from "./Content";
function Main() {
  const { width, profiles } = useContext(ProjectContext);
  const [colCount, setColCount] = useState(1);

  
  const checkWidth = () => {
    switch (true) {
      case width < 600:
        setColCount(1);
        break;
      case width < 768:
        setColCount(2);
        break;
      case width < 1200:
        setColCount(3);
        break;
      default:
        setColCount(4);
        break;
    }
  };

  useEffect(() => {
    checkWidth();
  }, [[], width]);
  return (
    <>
      <Row gutter={[20, 20]} style={{ margin: "10px" }}>
        {profiles &&
          profiles.map((user) => {
            return (
              <Col span={`${24 / colCount}`}>
                <Content user={user} key={user.id} />
              </Col>
            );
          })}
      </Row>
    </>
  );
}

export default Main;
