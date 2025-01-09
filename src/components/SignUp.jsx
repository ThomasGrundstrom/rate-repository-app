import { Text, TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import theme from '../theme';
import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(5).max(30),
  password: yup.string().required('Password is required').min(5).max(50),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Password confirmation must match password')
    .required('Password confirmation is required').min(5).max(50),
});

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log(values);
    const username = values.username
    const password = values.password
    try {
      const { data } = await createUser({
        username: username,
        password: password
      });
      console.log(data);
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.error(e)
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const hasError = (field) => formik.errors[field] && formik.touched[field];
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Username'
          onChangeText={formik.handleChange('username')}
          value={formik.values.username}
          style={[
            styles.inputField,
            hasError('username') && { borderColor: 'red' }
          ]}
        />
        {hasError('username') && (
          <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry
          placeholder='Password'
          onChangeText={formik.handleChange('password')}
          value={formik.values.password}
          style={[
            styles.inputField,
            hasError('password') && { borderColor: 'red' }
          ]}
        />
        {hasError('password') && (
          <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry
          placeholder='Password confirmation'
          onChangeText={formik.handleChange('passwordConfirmation')}
          value={formik.values.passwordConfirmation}
          style={[
            styles.inputField,
            hasError('passwordConfirmation') && { borderColor: 'red' }
          ]}
        />
        {hasError('passwordConfirmation') && (
          <Text style={{ color: 'red' }}>{formik.errors.passwordConfirmation}</Text>
        )}
      </View>
      <TouchableOpacity
        onPress={formik.handleSubmit}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center'
  },
  inputField: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    width: '100%',
    minHeight: 42,
    padding: 5,
    marginVertical: 5
  },
  inputContainer: {
    paddingVertical: 10,
    width: '90%',
    minHeight: 42
  },
  button: {
    width: '90%',
    minHeight: 42,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 5,
    marginVertical: 15
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
});

export default SignUp;