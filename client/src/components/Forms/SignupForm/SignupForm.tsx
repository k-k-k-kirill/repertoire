import React from "react";
import "./SignupForm.scss";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Typography, Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import FormBlock from "../FormBlock/FormBlock";
import FormError from "../FormError/FormError";
import FiftyFifty from "../../Layouts/FiftyFifty/FiftyFifty";
import userStorage from "../../../storage/User";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const { Title } = Typography;

interface SignupFormValues {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignupSchema = Yup.object().shape({
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
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match."
  ),
});

const SignupForm: React.FC = () => {
  const { signup } = useAuth();

  const signUpUser = async (values: SignupFormValues) =>
    signup(values.email!, values.password!);

  return (
    <Formik
      validationSchema={SignupSchema}
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      onSubmit={signUpUser}
    >
      {({ errors, values, handleChange, handleBlur }) => (
        <Form>
          <FiftyFifty>
            <FormBlock>
              <Title className="signup-form__title" level={2}>
                Create an account
              </Title>
            </FormBlock>
            <FormBlock>
              <Title level={5}>Email</Title>
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
            <FormBlock>
              <Title level={5}>Confirm password</Title>
              <Input.Password
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                iconRender={(visible: boolean) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                required
              />
              <FormError message={errors.confirmPassword} />
            </FormBlock>
            <div className="signup-form__actions">
              <Button block size="large" htmlType="submit" type="primary">
                Create account
              </Button>
            </div>
          </FiftyFifty>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
