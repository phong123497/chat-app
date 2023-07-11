import React from "react";
import { Col, Row, Button, Typography } from "antd";
import { auth, db } from "../../config/firebase";
const { Title } = Typography;

function Login() {
  const handleFbLogin = () => {};
  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            FunChat
          </Title>
          <Button style={{ width: "100%", marginBottom: 5 }}>
            Đăng nhập bằng google
          </Button>
          <Button style={{ width: "100%" }}>Đăng nhập bằng facebook</Button>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
