import { Pressable, Text, StyleSheet } from 'react-native';
import theme from '../theme';
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
  },
  button: {
    borderRadius: 10,
  },
});

const AppBarTab = ({ text, to }) => {
  return (
    <Link to={to} component={Pressable} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </Link>
  );
}

export default AppBarTab;