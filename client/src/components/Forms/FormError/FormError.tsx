import React from "react";
import { Typography } from "antd";

interface FormErrorProps {
  message?: string;
}

const { Text } = Typography;

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  return <>{message ? <Text type="danger">{message}</Text> : null}</>;
};

export default FormError;
