import React, {useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {Button, Card, CardItem} from 'native-base';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import {deleteTodos} from '../../redux/actions/todos/todos';
import UpdateTaskModal from './UpdateTaskModal';

const window = Dimensions.get('window');
const width = window.width * window.scale;
const height = window.height * window.scale;
const ToastSuccess = () => {
  ToastAndroid.show('Success deleted', ToastAndroid.TOP, ToastAndroid.SHORT);
};
const ShortcutMenu = (props) => {
  const dispatch = useDispatch();
  const handleDeleteTask = () => {
    dispatch(deleteTodos(props.task));
    props.showModal(false);
    ToastSuccess();
  };
  //Update task modal
  const [updateModal, setUpdateModal] = useState(false);
  return (
    <>
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        deviceWidth={width}
        deviceHeight={height}
        coverScreen={true}
        isVisible={props.isShow}
        style={styles.modal}
        backdropOpacity={0.5}
        onBackButtonPress={() => {
          props.showModal(false);
        }}
        onBackdropPress={() => {
          props.showModal(false);
        }}
        onSwipeComplete={() => {
          props.showModal(false);
        }}
        swipeDirection="down"
        // propagateSwipe
        backdropTransitionOutTiming={0}
        backdropTransitionInTiming={0}>
        <View style={styles.container}>
          <View style={{marginTop: 10}}>
            <Card style={styles.card}>
              <CardItem style={styles.cardItem}>
                <TouchableOpacity
                  onPress={() => {
                    setUpdateModal(true);
                    props.showModal(false);
                  }}
                  style={styles.updateTask}>
                  <Text style={styles.listMenu}>Update Task</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteTask()}
                  style={styles.deleteTask}>
                  <Text style={styles.listMenu}>Delete Task</Text>
                </TouchableOpacity>
              </CardItem>
            </Card>
          </View>
        </View>
      </Modal>
      <UpdateTaskModal
        isShow={updateModal}
        showModal={setUpdateModal}
        lastData={props.task}
      />
    </>
  );
};

export default ShortcutMenu;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    width: '100%',
  },
  container: {
    backgroundColor: '#ffffff',
    width: '100%',
    padding: 10,
    justifyContent: 'flex-start',
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  card: {
    overflow: 'hidden',
    borderRadius: 10,
    borderColor: '#DBE6FF',
    borderWidth: 1,
  },
  cardItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderBottomColor: '#DBE6FF',
    borderBottomWidth: 1,
  },
  listMenu: {
    marginLeft: 10,
    color: '#0442D0',
    fontSize: 16,
    fontStyle: 'normal',
    marginBottom: 10,
    textAlign: 'left',
    marginLeft: -3,
  },
  updateTask: {
    borderBottomColor: '#DBE6FF',
    borderBottomWidth: 1,
    width: '100%',
    alignItems: 'flex-start',
    marginVertical: 3,
  },
  deleteTask: {
    width: '100%',
    alignItems: 'flex-start',
    marginVertical: 3,
  },
});
