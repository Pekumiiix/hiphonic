import { Button } from '@/components/ui/button';
import FormContainer from '../components/form-container';

export default function VerifyEmailPage() {
  return (
    <FormContainer
      headline='Verify your Email'
      description='Thank you, check your email for instructions to reset your password'
    >
      <div className='w-fit flex gap-1'>
        <p className='text-black text-sm leading-[160%]'>Didn’t receive an email?</p>
        <Button
          variant='ghost'
          className='text-sm font-bold text-primary-600 hover:text-primary-400 transition-colors duration-200 p-0 w-fit h-fit hover:bg-transparent'
        >
          Resend
        </Button>
      </div>
    </FormContainer>
  );
}
