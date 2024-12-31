import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import Text from './Text';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
})

const SignIn = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const hasError = (field) => formik.errors[field] && formik.touched[field]

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
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
          placeholder="Password"
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

      <TouchableOpacity
        onPress={formik.handleSubmit}
        style={styles.button}
      >
        <Text style={styles.signintext}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
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
  signintext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
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
    marginTop: 10,
    width: '90%',
    minHeight: 42
  }
})

export default SignIn;