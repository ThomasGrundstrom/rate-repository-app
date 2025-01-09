import { useMutation, useApolloClient } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({
    rating,
    repositoryName,
    repositoryOwner,
    review
  }) => {
    const ratingInt = Number(rating)
    const { data } = await mutate({
      variables: {
        rating: ratingInt,
        repository: repositoryName,
        owner: repositoryOwner,
        review
      }
    });
    apolloClient.resetStore();
    return { data }
  };

  return [createReview, result];
};

export default useCreateReview;