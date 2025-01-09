import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_REPOSITORIES_WITH_ARGS } from '../graphql/queries';

const useRepositories = (orderingPrinciple = null, searchKeyword = '') => {
  let orderBy = null;
  let orderDirection = null;

  if (orderingPrinciple) {
    if (orderingPrinciple === 'Latest repositories') {
      orderBy = 'CREATED_AT'
      orderDirection = 'DESC'
    }
    if (orderingPrinciple === 'Highest rated repositories') {
      orderBy = 'RATING_AVERAGE'
      orderDirection = 'DESC'
    }
    if (orderingPrinciple === 'Lowest rated repositories') {
      orderBy = 'RATING_AVERAGE'
      orderDirection = 'ASC'
    }
    const { data, loading, error } = useQuery(GET_REPOSITORIES_WITH_ARGS, {
      variables: { orderBy, orderDirection, searchKeyword },
      fetchPolicy: 'cache-and-network'
    });
    return {
      repositories: data?.repositories,
      loading,
      error
    };
  }

  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  return {
    repositories: data?.repositories,
    loading,
    error
  };
};

export default useRepositories;