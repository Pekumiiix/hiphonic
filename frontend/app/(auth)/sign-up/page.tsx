import AlternativeAuthMethod from "../components/alternative-auth-method";
import SignUpForm from "./sections/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="w-full h-full flex items-center justify-start">
      <div className="max-w-[404px] flex flex-col gap-8">
        <p className="text-2xl font-bold leading-[125%] tracking-[0.2px] text-grey-900">
          Sign Up for an Account
        </p>

        <SignUpForm />

        <AlternativeAuthMethod />
      </div>
    </div>
  );
}
