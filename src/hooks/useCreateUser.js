import { useMutation, useApolloClient } from '@apollo/client';

import { CREATE_USER } from '../graphql/mutations';

const useCreateUser = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATE_USER);

  const createUser = async (userInfo) => {
    const { data } = await mutate({
      variables: userInfo
    });
    apolloClient.resetStore();

    return { data };
  };

  return [createUser, result];
};

export default useCreateUser;