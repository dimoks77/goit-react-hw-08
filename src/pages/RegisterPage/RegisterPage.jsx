import DocumentTitle from '../../components/DocumentTitle';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import css from './RegisterPage.module.css';

export default function RegisterPage() {
  return (
    <>
      <DocumentTitle>Registration</DocumentTitle>
      <RegisterForm />
    </>
  );
}
