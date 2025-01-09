import { View, StyleSheet, Image } from 'react-native';

import Text from './Text';
import theme from '../theme';

const StatsItem = ({ text, count }) => {
  let displayCount = count
  if (displayCount > 1000) {
    displayCount = (displayCount/1000).toFixed(1) + 'k'
  }

  return (
    <View style={styles.statsItem}>
      <Text fontWeight='bold'>{displayCount}</Text>
      <Text>{text}</Text>
    </View>
  )
}

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container} testID='repositoryItem'>
      <View style={styles.ind}>
        <Image style={styles.image} source={{ uri: repository.ownerAvatarUrl }} />
        <View style={styles.nameDescription}>
          <Text fontWeight='bold'>{repository.fullName}</Text>
          <Text>{repository.description}</Text>
          <Text style={styles.language}>{repository.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <StatsItem text='Stars' count={repository.stargazersCount} />
        <StatsItem text='Forks' count={repository.forksCount} />
        <StatsItem text='Reviews' count={repository.reviewCount} />
        <StatsItem text='Rating' count={repository.ratingAverage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  nameDescription: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    gap: 10,
    width: '90%'
  },
  ind: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  language: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 5
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  statsItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
})

export default RepositoryItem