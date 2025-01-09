import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';

import RepositoryItem from './RepositoryItem';

export const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories }) => {
  let navigate = useNavigate();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) =>
        <TouchableOpacity onPress={() => navigate('/' + item.id)}>
          <RepositoryItem repository={item} />
        </TouchableOpacity>
      }
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export default RepositoryListContainer;