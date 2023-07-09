import React, { useContext } from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import CustomLink from "../CustomLink";
import { ThemeContext } from "../context/ThemeProvider";
export default function Signin() {

  const theme =  useContext(ThemeContext);
  console.log(theme);
  theme.testFunction();
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-72 space-y-6">
          <Title>Sign In</Title>
          <FormInput label="Email" placeholder="john@email.com" name="email" />
          <FormInput label="Password" placeholder="********" name="password" />
          <Submit value="Sign in" />

          <div className="flex justify-between">
            <CustomLink to={"/auth/forget-password"}>
              Forget password
            </CustomLink>
            <CustomLink to={"/auth/signup"}>
              Sign Up
            </CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
}
