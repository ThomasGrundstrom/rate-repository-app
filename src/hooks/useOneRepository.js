import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

const useOneRepository = ({ repositoryId }) => {
  const { data, loading, error } = useQuery(GET_REPOSITORY_BY_ID, {
    variables: { repositoryId },
    fetchPolicy: 'cache-and-network'
  });

  return {
    repository: data?.repository,
    loading,
    error
  };
};

export default useOneRepository;