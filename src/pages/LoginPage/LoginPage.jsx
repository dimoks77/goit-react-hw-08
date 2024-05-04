import DocumentTitle from '../../components/DocumentTitle';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <>
      <DocumentTitle>Login</DocumentTitle>
      <LoginForm />
    </>
  );
}
