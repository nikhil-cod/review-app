import React from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import CustomLink from "../CustomLink";

export default function EmailVerification({ children, to }) {
    return     <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
    <Container>
      <form className="bg-secondary rounded p-6 w-72 space-y-6">
        <Title>Please Enter OTP To Verify Your A ccount</Title>
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
}