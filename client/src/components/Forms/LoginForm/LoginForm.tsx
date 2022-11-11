import React from "react";
import { Input, Button, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./LoginForm.scss";
import FormBlock from "../FormBlock/FormBlock";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormError from "../FormError/FormError";
import { Link } from "react-router-dom";
import FiftyFifty from "../../Layouts/FiftyFifty/FiftyFifty";
import useAuth from "../../../hooks/useAuth";

const { Title } = Typography;

interface LoginFormValues {
  email?: string;
  password?: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid e-mail.").required("Email is required."),
  password: Yup.string().required("Password field is required."),
});

interface LoginFormDispatchProps {}

const LoginForm: React.FC<LoginFormDispatchProps> = () => {
  const { login } = useAuth();

  const loginUser = async (values: LoginFormValues) =>
    login(values.email!, values.password!);

  return (
    <Formik
      validationSchema={LoginSchema}
      initialValues={{ email: "", password: "" }}
      onSubmit={loginUser}
    >
      {({ errors, values, handleChange, handleBlur }) => (
        <Form>
          <FiftyFifty>
            <FormBlock>
              <Title className="login-form__title" level={5}>
                Email
              </Title>
              <Input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="garry@kasparov.chess"
              />
              <FormError message={errors.email} />
            </FormBlock>
            <FormBlock>
              <Title level={5}>Password</Title>
              <Input.Password
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                iconRender={(visible: boolean) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                required
              />
              <FormError message={errors.password} />
            </FormBlock>
            <div className="login-form__actions">
              <Button block size="large" htmlType="submit" type="primary">
                Login
              </Button>
            </div>
            <Typography className="login-form__bottom">
              Don't have an account?{" "}
              <Button className="login-form__signup-link" type="link">
                <Link to="signup">Sign up</Link>
              </Button>
            </Typography>
          </FiftyFifty>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
