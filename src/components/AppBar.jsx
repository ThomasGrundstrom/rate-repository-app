import { StyleSheet, Pressable, ScrollView, TouchableOpacity, Text } from 'react-native';
import Constants from 'expo-constants';
import { useApolloClient } from '@apollo/client';

import AppBarTab from './AppBarTab';
import useUserInformation from '../hooks/useUserInformation';
import useAuthStorage from '../hooks/useAuthStorage';
import theme from '../theme';

const AppBar = () => {
  const { user, loading, error } = useUserInformation();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  if (loading) {
    return (
      <Pressable style={styles.container}>
        <ScrollView horizontal contentContainerStyle={styles.buttons}>
          <AppBarTab text="Repositories" to="/" />
          <Text style={{ color: 'white' }}>Loading...</Text>
        </ScrollView>
      </Pressable>
    );
  }

  if (error) {
    console.error(error);
    return (
      <Pressable style={styles.container}>
        <ScrollView horizontal contentContainerStyle={styles.buttons}>
          <AppBarTab text="Repositories" to="/" />
          <Text style={{ color: 'white' }}>Error loading data</Text>
        </ScrollView>
      </Pressable>
    );
  }

  return (
    <Pressable style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.buttons}>
        <AppBarTab text="Repositories" to="/" />
        {user ? (
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.text}>Sign Out</Text>
          </TouchableOpacity>
        ) : (
          <AppBarTab text="Sign In" to="signin" />
        )}
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
  text: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
  },
});

export default AppBar;