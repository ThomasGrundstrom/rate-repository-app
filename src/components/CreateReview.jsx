import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

const initialValues = {
  repositoryOwner: '',
  repositoryName: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  repositoryOwner: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().required('Rating is required').min(0).max(100),
  review: yup.string().optional(),
});

const CreateReview = () => {
  const [createReview] = useCreateReview();
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const { data } = await createReview(values);
      console.log(data);
      navigate('/' + data.createReview.repositoryId);
    } catch (e) {
      console.error(e);
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
          placeholder='Repository owner name'
          onChangeText={formik.handleChange('repositoryOwner')}
          value={formik.values.repositoryOwner}
          style={[
            styles.inputField,
            hasError('repositoryOwner') && { borderColor: 'red' }
          ]}
        />
        {hasError('repositoryOwner') && (
          <Text style={{ color: 'red' }}>{formik.errors.repositoryOwner}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Repository name'
          onChangeText={formik.handleChange('repositoryName')}
          value={formik.values.repositoryName}
          style={[
            styles.inputField,
            hasError('repositoryName') && { borderColor: 'red' }
          ]}
        />
        {hasError('repositoryName') && (
          <Text style={{ color: 'red' }}>{formik.errors.repositoryName}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Rating between 0 and 100'
          onChangeText={formik.handleChange('rating')}
          value={formik.values.rating}
          style={[
            styles.inputField,
            hasError('rating') && { borderColor: 'red' }
          ]}
        />
        {hasError('rating') && (
          <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Review'
          onChangeText={formik.handleChange('review')}
          value={formik.values.review}
          style={styles.inputField}
          multiline={true}
        />
      </View>
      <TouchableOpacity
        onPress={formik.handleSubmit}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Create a review</Text>
      </TouchableOpacity>
    </View>
  )
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

export default CreateReview;