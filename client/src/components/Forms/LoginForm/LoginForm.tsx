import React from "react";
import { Input, Button, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./LoginForm.scss";
import FormBlock from "../FormBlock/FormBlock";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormError from "../FormError/FormError";
import userStorage from "../../../storage/User";
import { useNavigate, Link } from "react-router-dom";
import FiftyFifty from "../../Layouts/FiftyFifty/FiftyFifty";

const { Title } = Typography;

interface LoginFormValues {
  email?: string;
  password?: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid e-mail.").required("Email is required."),
  password: Yup.string()
    .min(10, "Password must be at least 10 characters long.")
    .required("Password field is required.")
    .matches(/[0-9]/, "Password must contain a number.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase character.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>~]/,
      "Password must contain at least one special character."
    ),
});

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const loginUser = async (values: LoginFormValues) => {
    try {
      const { email, password } = values;

      const { accessToken, refreshToken } = await userStorage.login(
        email,
        password
      );

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);

      navigate("/openings");
    } catch (error) {
      throw new Error("Failed to login.");
    }
  };

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
            <Typography>
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
