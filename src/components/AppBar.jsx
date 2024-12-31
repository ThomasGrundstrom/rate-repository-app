import { StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';

const AppBar = () => {
  return (
    <Pressable style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.buttons}>
        <AppBarTab text='Repositories' to='/' />
        <AppBarTab text='Sign In' to='signin' />
      </ScrollView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#24292e',
    width: '100%',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    padding: 10,
  },
});

export default AppBar;