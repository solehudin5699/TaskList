import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  Pressable,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import {Button} from 'native-base';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import {Icon, Input} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import {updateTodos} from '../../redux/actions/todos/todos';

const window = Dimensions.get('window');
const width = window.width * window.scale;
const height = window.height * window.scale;
const ToastSuccess = () => {
  ToastAndroid.show(
    'New task have been saved',
    ToastAndroid.TOP,
    ToastAndroid.SHORT,
  );
};
const ToastError = () => {
  ToastAndroid.show(
    'Please, complete the required field',
    ToastAndroid.TOP,
    ToastAndroid.SHORT,
  );
};
const UpdateTaskModal = (props) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState('');

  //DATEPICKER
  const [date, setDate] = useState(new Date());
  const [dates, setDates] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [typeInput, setTypeInput] = useState();

  const onChange = (event, selectedDate) => {
    console.log(event.nativeEvent.timestamp);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if (typeInput === 'dates' && event.type === 'set') {
      setDates(event.nativeEvent.timestamp);
      // console.log(currentDate.toISOString());
    } else if (typeInput === 'startTime' && event.type === 'set') {
      setStartTime(
        currentDate
          .toLocaleTimeString('ID')
          .substring(0, 5)
          .split(':')
          .join('.'),
      );
    } else if (typeInput === 'endTime' && event.type === 'set') {
      setEndTime(
        currentDate
          .toLocaleTimeString('ID')
          .substring(0, 5)
          .split(':')
          .join('.'),
      );
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  //SAVE TASK
  const handleUpdateTask = () => {
    if (!task || !dates || !startTime || !endTime) {
      ToastError();
    } else {
      let updatedTask = {
        timestamp: dates,
        hour: `${startTime}-${endTime}`,
        task,
        id: props.lastData.id,
      };
      dispatch(updateTodos(updatedTask));
      ToastSuccess();
      props.showModal(false);
      setTask('');
      setDates('');
      setStartTime('');
      setEndTime('');
    }
  };
  useEffect(() => {
    if (props.isShow) {
      setTask(props.lastData.task);
      setDates(props.lastData.timestamp);
      setStartTime(props.lastData.hour.substring(0, 5));
      setEndTime(props.lastData.hour.substring(6, 11));
    }
  }, [props.isShow]);
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
          <View style={{marginTop: 3, padding: 5}}>
            <Text style={styles.updateYourTask}>Update your task</Text>
          </View>
          <View style={{marginTop: 3, padding: 5}}>
            <Input
              style={{
                width: '100%',
                fontSize: 17,
              }}
              keyboardType="default"
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              maxLength={50}
              placeholder="Your task (maks 50 character)"
              onChangeText={(value) => {
                setTask(value);
              }}
              defaultValue={task}
              onEndEditing={() => {}}
            />

            <View style={styles.timeContainer}>
              <Pressable
                onPress={() => {
                  setTypeInput('dates');
                  showDatepicker();
                }}
                style={styles.dates}>
                <Text style={{color: '#0442D0'}}>
                  {dates ? new Date(dates).toLocaleDateString('ID') : 'Dates'}
                </Text>
              </Pressable>
              <Text style={{color: '#0442D0', flex: 0.05, textAlign: 'center'}}>
                /
              </Text>
              <Pressable
                onPress={() => {
                  setTypeInput('startTime');
                  showTimepicker();
                }}
                style={styles.startTime}>
                <Text style={{color: '#0442D0'}}>
                  {startTime ? startTime : 'Start'}
                </Text>
              </Pressable>
              <Text style={{color: '#0442D0', flex: 0.05, textAlign: 'center'}}>
                to
              </Text>
              <Pressable
                onPress={() => {
                  setTypeInput('endTime');
                  showTimepicker();
                }}
                style={styles.endTime}>
                <Text style={{color: '#0442D0'}}>
                  {endTime ? endTime : 'End'}
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              transparent
              onPress={() => {
                props.showModal(false);
              }}
              style={styles.buttonCancel}>
              <Text style={{fontSize: 15, color: '#FFFFFF'}}>Cancel</Text>
            </Button>
            <Button
              transparent
              onPress={() => {
                handleUpdateTask();
              }}
              style={styles.buttonUpdate}>
              <Text style={{fontSize: 15, color: '#FFFFFF'}}>Update Task</Text>
            </Button>
          </View>
        </View>
      </Modal>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
};

export default UpdateTaskModal;

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
    borderRadius: 3,
    bottom: 0,
    position: 'absolute',
  },
  updateYourTask: {
    fontSize: 17,
    color: '#0442D0',
    fontWeight: 'bold',
  },
  inputContainerStyle: {
    borderBottomColor: 'transparent',
    height: 35,
    paddingLeft: 5,
    color: '#0442D0',
  },
  containerStyle: {
    height: 35,
    paddingHorizontal: -5,
    borderWidth: 1,
    borderColor: '#0442D0',
    height: 35,
    borderRadius: 10,
    marginBottom: 5,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  dates: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DBE6FF',
    borderWidth: 1,
    borderColor: '#0442D0',
    borderRadius: 10,
    height: 35,
  },
  startTime: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DBE6FF',
    borderWidth: 1,
    borderColor: '#0442D0',
    borderRadius: 10,
    height: 35,
  },
  endTime: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DBE6FF',
    borderWidth: 1,
    borderColor: '#0442D0',
    borderRadius: 10,
    height: 35,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
    marginBottom: 30,
  },
  buttonCancel: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 10,
    backgroundColor: '#FB3453',
  },
  buttonUpdate: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 10,
    backgroundColor: '#0442D0',
  },
});
