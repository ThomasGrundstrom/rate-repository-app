import { useState } from 'react';
import { Text, View, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDebouncedCallback } from 'use-debounce';

import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../hooks/useRepositories';

const RepositoryList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [orderingPrinciple, setOrderingPrinciple] = useState('Latest repositories');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { repositories } = useRepositories(orderingPrinciple, searchKeyword);

  const orderChoices = ['Latest repositories', 'Highest rated repositories', 'Lowest rated repositories'];

  const debounced = useDebouncedCallback((value) => {
    setSearchKeyword(value);
  }, 500);

  return (
    <>
      <TextInput
        placeholder="Search..."
        onChangeText={(text) => {
          setSearchInput(text)
          debounced(text)
        }}
        value={searchInput}
        style={styles.searchInput}
      />
      <TouchableOpacity
        style={styles.dropDownButton}
        onPress={() => setModalVisible(true)}
      >
        <Text>{orderingPrinciple}</Text>
        {modalVisible ? (
          <Ionicons name="caret-up" size={15} />
        ) : (
          <Ionicons name="caret-down" size={15} />
        )}
      </TouchableOpacity>
      <RepositoryListContainer repositories={repositories} />
      <Modal visible={modalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <View style={styles.choiceButton}>
                <Text style={{ color: 'gray' }}>Select an item...</Text>
              </View>
              {orderChoices.map(choice => (
                <TouchableOpacity
                  key={choice}
                  style={[
                    styles.choiceButton,
                    orderingPrinciple === choice && { backgroundColor: 'lightgray' }
                  ]}
                  onPress={() => setOrderingPrinciple(choice)}
                >
                  <Text>{choice}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  dropDownButton: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    width: '85%',
    backgroundColor: 'white'
  },
  choiceButton : {
    height: 50,
    justifyContent: 'center',
    padding: 10,
  },
  searchInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    width: '95%',
    minHeight: 42,
    padding: 5,
    marginVertical: 5,
    backgroundColor: 'white'
  },
});

export default RepositoryList;