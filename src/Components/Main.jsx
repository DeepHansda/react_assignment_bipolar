import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Layout, Row } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useContext, useEffect, useState } from "react";
import { client, ProjectContext } from "../App";
import Content from "./Content";
function Main() {
  const { width, profiles, setProfiles } = useContext(ProjectContext);
  const [colCount, setColCount] = useState(1);
  const [query, setQuery] = useState("");

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

  const handleSearch = () => {
    client
    .get("/users")
    .then((response) => {
      setProfiles(response.data.filter((pro) =>
      query === "" ? pro : pro.name.toLowerCase().includes(query)
    ));
    })
    .catch((error) => {
      alert(error);
    });

    // setProfiles(
    //   profiles &&
    //     profiles.filter((pro) =>
    //       query === "" ? pro : pro.name.toLowerCase().includes(query)
    //     )
    // );
  };

  const handleInput = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setQuery(lowerCase);
  };
  return (
    <>
      <Layout style={{ background:"#fff"}}>
        <Header
          style={{
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            backgroundColor: "#f5f5f5",
            justifyContent:"flex-end"
          }}
        >



          <div style={{ display: "flex", alignItems: "center",width:`${width > 700 ? '400px' : '100%'}` }}>
            <Input
              placeholder="Enter Name."
              value={query}
              onChange={handleInput}
            />




            <Button
              type="primary"
              shape="round"
              icon={<SearchOutlined />}
              style={{ marginLeft: "10px" }}
              onClick={() => handleSearch()}
            />
          </div>
        </Header>





        <div style={{ marginTop: "40px" }}>
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
        </div>
      </Layout>
    </>
  );
}

export default Main;
