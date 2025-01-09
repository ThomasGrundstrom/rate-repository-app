import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { format } from 'date-fns';

import useUserInformation from '../hooks/useUserInformation';
import theme from '../theme';
import { ItemSeparator } from './RepositoryListContainer';

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
          <Text style={styles.repositoryName}>
            {review.node.repository.fullName}
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

const MyReviews = () => {
  const { user } = useUserInformation(true);
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    user && setReviews(user.reviews.edges);
  }, [user]);

  return (
    reviews.length > 0 ? (
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={item => item.node.id}
        ItemSeparatorComponent={ItemSeparator}
      />
    ) : (
      <View style={styles.noReviewsContainer}>
        <Text style={styles.noReviewsText}>No reviews available at this time</Text>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  reviewItemContainer: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 15,
    paddingRight: 45
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
  repositoryName: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 5
  },
  noReviewsContainer: {
    borderWidth: 1,
    borderRadius: 150,
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  noReviewsText: {
    fontSize: 20,
  },
});

export default MyReviews;