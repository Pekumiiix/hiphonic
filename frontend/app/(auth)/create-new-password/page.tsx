import FormContainer from '../components/form-container';
import CreateNewPasswordForm from './sections/create-passqord-form';

export default function CreateNewPasswordPage() {
  return (
    <FormContainer headline='Create a new password'>
      <CreateNewPasswordForm />
    </FormContainer>
  );
}
