import FormContainer from "../components/form-container";
import ResetPasswordForm from "./sections/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <FormContainer
      headline="Reset your password"
      description="Enter the email address associated with your account and we will send you a link to reset your password."
    >
      <ResetPasswordForm />
    </FormContainer>
  );
}
