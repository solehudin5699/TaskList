import React, {useState, useEffect} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import {Button} from 'native-base';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {Icon, Input} from 'react-native-elements';
import {updateUser} from '../../redux/actions/setting/user';

const window = Dimensions.get('window');
const width = window.width * window.scale;
const height = window.height * window.scale;

const SettingModal = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const {user} = useSelector((state) => state.user);
  useEffect(() => {
    if (props.isShow) {
      setName(user.name);
    }
  }, [props.isShow]);
  const handleSave = () => {
    dispatch(updateUser(name));
    props.showModal(false);
  };
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
            <Text style={styles.questText}>What's your name ?</Text>
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
              placeholder="Your name..."
              onChangeText={(value) => {
                setName(value);
              }}
              defaultValue={name}
              onEndEditing={() => {}}
            />
          </View>
          <View style={styles.containerButton}>
            <Button
              transparent
              onPress={() => {
                handleSave();
              }}
              style={styles.buttonStyle}>
              <Text style={styles.saveText}>Save</Text>
            </Button>
          </View>
          <View style={styles.containerLabel}>
            <View style={styles.labelColor}>
              <Text style={styles.labelColorText}>Label color</Text>
            </View>
            <View style={styles.labelWilldo}>
              <Text style={styles.willdoText}>Will Do</Text>
            </View>
            <View style={styles.labelDoing}>
              <Text style={styles.doingText}>Doing</Text>
            </View>
            <View style={styles.labelDone}>
              <Text style={styles.doneText}>Done</Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SettingModal;

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
  questText: {
    fontSize: 17,
    color: '#0442D0',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
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
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 15,
    marginBottom: 30,
  },
  buttonStyle: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 10,
    backgroundColor: '#0442D0',
  },
  saveText: {fontSize: 15, color: '#FFFFFF', fontFamily: 'Roboto'},
  containerLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  labelColor: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
  },
  labelColorText: {fontSize: 15, color: '#0442D0', fontFamily: 'Roboto'},
  labelWilldo: {
    width: '24%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    borderRadius: 10,
    backgroundColor: '#F5F796',
  },
  willdoText: {fontSize: 15, color: '#B4B724', fontFamily: 'Roboto'},
  labelDoing: {
    width: '24%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    borderRadius: 10,
    backgroundColor: '#FFF2E5',
  },
  doingText: {fontSize: 15, color: '#FF9124', fontFamily: 'Roboto'},
  labelDone: {
    width: '24%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    borderRadius: 10,
    backgroundColor: '#DBE6FF',
  },
  doneText: {fontSize: 15, color: '#0442D0', fontFamily: 'Roboto'},
});
