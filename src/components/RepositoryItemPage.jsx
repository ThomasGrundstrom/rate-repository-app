import { useParams } from 'react-router-native';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Linking from 'expo-linking';
import { format } from 'date-fns';

import RepositoryItem from './RepositoryItem';
import useOneRepository from '../hooks/useOneRepository';
import theme from '../theme';
import { ItemSeparator } from './RepositoryListContainer';

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <RepositoryItem repository={repository} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(repository.url)}
        >
          <Text style={styles.buttonText}>
            Open in GitHub
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  const date = format(review.node.createdAt, 'dd.MM.yyyy')

  return (
    <View style={styles.reviewItemContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>
          {review.node.rating}
        </Text>
      </View>
      <View style={styles.reviewInfoContainer}>
        <View style={styles.reviewInfoHeader}>
          <Text style={styles.username}>
            {review.node.user.username}
          </Text>
          <Text style={{color: 'gray'}}>
            {date}
          </Text>
        </View>
        <Text>
          {review.node.text}
        </Text>
      </View>
    </View>
  );
};

const RepositoryItemPage = () => {
  let { repositoryId } = useParams();
  const { repository, loading, error } = useOneRepository({ repositoryId });

  if (loading) {
    return (
      <Text>Loading...</Text>
    );
  }

  if (error) {
    console.error(error);
    return (
      <Text>Something went wrong</Text>
    );
  }

  const reviews = repository.reviews.edges

  return (
    <SafeAreaView style={{width: '100%'}}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={item => item.node.id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: '60%',
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    borderRadius: 4
  },
  buttonContainer: {
    backgroundColor: 'white',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center'
  },
  reviewItemContainer: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 15,
  },
  rating: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  ratingContainer: {
    margin: 5,
    height: 50,
    width: 50,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewInfoContainer: {
    paddingHorizontal: 10,
    width: '90%',
  },
  reviewInfoHeader: {
    paddingVertical: 10
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 5
  },
});

export default RepositoryItemPage;