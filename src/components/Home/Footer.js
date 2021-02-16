import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Footer} from 'native-base';
import {Icon} from 'react-native-elements';
import AddTaskModal from './AddTaskModal';
import SettingModal from './SettingModal';

export default function FooterHome(props) {
  const [taskModal, setTaskModal] = useState(false);
  const [settingModal, setSettingModal] = useState(false);

  return (
    <>
      <Footer style={styles.container}>
        <Pressable
          style={{
            width: '33.33333%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="view-agenda-outline"
            size={20}
            color={true ? '#0442D0' : '#7F8A9C'}
            type="material-community"
          />
          <Text style={styles.taskText}>Task</Text>
        </Pressable>
        <TouchableOpacity
          style={{
            width: '33.33333%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setTaskModal(true)}>
          <View style={styles.addTask}>
            <Icon
              name="plus"
              size={52}
              color="#FFFFFF"
              type="material-community"
            />
          </View>
        </TouchableOpacity>
        <Pressable
          style={{
            width: '33.33333%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setSettingModal(true)}>
          <Icon name="setting" size={20} color="#7F8A9C" type="antdesign" />
          <Text style={styles.settingText}>Setting</Text>
        </Pressable>
      </Footer>
      <AddTaskModal isShow={taskModal} showModal={setTaskModal} />
      <SettingModal isShow={settingModal} showModal={setSettingModal} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 83,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  taskText: {
    color: '#0442D0',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    fontFamily: 'Roboto',
  },
  addTask: {
    width: 52,
    height: 52,
    backgroundColor: '#0442D0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    color: '#7F8A9C',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    fontFamily: 'Roboto',
  },
});
