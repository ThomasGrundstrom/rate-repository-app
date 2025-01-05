import { useQuery } from '@apollo/client';

import { GET_USER_INFORMATION } from '../graphql/queries';

const useUserInformation = () => {
  const { data, loading, error } = useQuery(GET_USER_INFORMATION, {
    fetchPolicy: 'cache-and-network'
  });

  return {
    user: data?.me,
    loading,
    error
  }
};

export default useUserInformation;