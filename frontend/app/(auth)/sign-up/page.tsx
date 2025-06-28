import AlternativeAuthMethod from "../components/alternative-auth-method";
import FormContainer from "../components/form-container";
import SignUpForm from "./sections/sign-up-form";

export default function SignUpPage() {
  return (
    <FormContainer headline="Sign Up for an Account">
      <SignUpForm />

      <AlternativeAuthMethod />
    </FormContainer>
  );
}
