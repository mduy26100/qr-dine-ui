import React from "react";
import { Card, Typography, Row, Col, message } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";
import { useLogin } from "../../../features/management/auth";
import LoginForm from "../../../features/management/auth/components/LoginForm";

const { Title, Text } = Typography;

const LoginPage = () => {
  const { login, isLoading } = useLogin();
  const [messageApi, contextHolder] = message.useMessage();

  const handleLoginSubmit = async (values) => {
    try {
      await login(values);
    } catch (error) {
      const errorMessage =
        error?.error?.message ||
        error?.message ||
        "Login failed. Please check your credentials.";

      messageApi.open({
        type: "error",
        content: errorMessage,
        duration: 4,
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {contextHolder}

      <Row justify="center" align="middle" className="min-h-screen">
        <Col xs={22} sm={16} md={12} lg={8} xl={6}>
          <Card
            bordered={false}
            className="shadow-lg rounded-xl overflow-hidden"
            styles={{ body: { padding: "40px" } }}
          >
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4 text-blue-600">
                <QrcodeOutlined style={{ fontSize: "32px" }} />
              </div>
              <Title level={3} className="!mb-1 !text-gray-700">
                QRDine Portal
              </Title>
              <Text type="secondary">Sign in to manage your restaurant</Text>
            </div>

            <LoginForm onFinish={handleLoginSubmit} isLoading={isLoading} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
