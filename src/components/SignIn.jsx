import { useNavigate } from 'react-router-native';

import useSignIn from '../hooks/useSignIn';
import SignInContainer from './SignInContainer';


const SignIn = () => {
  const [signIn] = useSignIn();
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log(values);
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate('/')
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignInContainer onSubmit={onSubmit} />
  );
};

export default SignIn;