import AlternativeAuthMethod from "../components/alternative-auth-method";
import FormContainer from "../components/form-container";
import SignInForm from "./sections/sign-in-form";

export default function SignInPage() {
	return (
		<FormContainer
			headline="Sign In to your Account"
			description="Welcome back! please enter your detail"
		>
			<SignInForm />

			<AlternativeAuthMethod type="sign-in" />
		</FormContainer>
	);
}
