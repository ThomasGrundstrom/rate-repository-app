import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './components/RepositoryList';
import AppBar from './components/AppBar';
import SignIn from './components/SignIn';
import RepositoryItemPage from './components/RepositoryItemPage';
import CreateReview from './components/CreateReview';
import SignUp from './components/SignUp';
import MyReviews from './components/MyReviews';

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='*' element={<Navigate to="/" replace />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/:repositoryId' element={<RepositoryItemPage />} />
        <Route path='/createReview' element={<CreateReview />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/myReviews' element={<MyReviews />} />
      </Routes>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 300,
    height: 60,
    borderRadius: 0,
  },
});

export default Main;