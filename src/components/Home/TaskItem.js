import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import ShortcutMenu from './ShortcutMenu';

export default function TaskItem({item, index}) {
  const timeToDecimal = (time) => {
    let arrTime = time.includes(':') ? time.split(':') : time.split('.');
    let timeDec = parseInt((arrTime[1] / 6) * 10, 10);
    return parseFloat(
      parseInt(arrTime[0], 10) + '.' + (timeDec < 10 ? '0' : '') + timeDec,
    );
  };

  //For progress color indicator
  const statusTask = (dates, hour) => {
    let afterDates =
      new Date().toLocaleDateString('ID') >
      new Date(dates).toLocaleDateString('ID');
    let sameDates =
      new Date().toLocaleDateString('ID') ==
      new Date(dates).toLocaleDateString('ID');
    let afterEndHour =
      timeToDecimal(new Date().toLocaleTimeString('ID').substring(0, 5)) >
      timeToDecimal(hour.split('-')[1]);
    let afterStartHour =
      timeToDecimal(new Date().toLocaleTimeString('ID').substring(0, 5)) >=
      timeToDecimal(hour.split('-')[0]);

    if (afterDates || (sameDates && afterEndHour)) {
      return 'done';
    } else if (sameDates && afterStartHour) {
      return 'doing';
    } else {
      return 'willdo';
    }
  };

  //Interval for timerline
  const [taskProgress, setProgress] = useState('');
  useEffect(() => {
    let intervalId = setInterval(() => {
      let newProgress = statusTask(item.timestamp, item.hour);
      setProgress(newProgress);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [item]);
  let startTime = timeToDecimal(item.hour.split('-')[0]);
  let interval =
    timeToDecimal(item.hour.split('-')[1]) -
    timeToDecimal(item.hour.split('-')[0]);

  //Modal shorcutmenu
  const [shortcutMenu, setShortcutmenu] = useState(false);
  return (
    <>
      <View
        style={[
          styles.taskContainer,
          {
            top: startTime * 100,
            zIndex: 10 + index,
            left: index % 2 == 0 ? 0 : 15,
          },
        ]}>
        <View
          style={[
            styles.taskDetail,
            {
              height: 100 * interval,
              backgroundColor:
                taskProgress === 'done'
                  ? '#DBE6FF'
                  : taskProgress === 'doing'
                  ? '#FFF2E5'
                  : '#F5F796',
            },
          ]}>
          <Text
            style={[
              styles.taskTitleText,
              {
                color:
                  taskProgress === 'done'
                    ? '#0442D0'
                    : taskProgress === 'doing'
                    ? '#FF9124'
                    : '#B4B724',
              },
            ]}>
            {item.task}
          </Text>
          <Text
            style={[
              styles.taskHourText,
              {
                color:
                  taskProgress === 'done'
                    ? '#0442D0'
                    : taskProgress === 'doing'
                    ? '#FF9124'
                    : '#B4B724',
              },
            ]}>
            {item.hour}
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', top: 10, right: 5}}
            onPress={() => setShortcutmenu(true)}>
            <Icon
              name="dots-three-vertical"
              size={13}
              color={
                taskProgress === 'done'
                  ? '#0442D0'
                  : taskProgress === 'doing'
                  ? '#FF9124'
                  : '#B4B724'
              }
              type="entypo"
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.taskStatus,
            {
              backgroundColor: taskProgress === 'done' ? '#FEEAEB' : '#F0F3F8',
            },
          ]}>
          <Icon
            name="check"
            size={10}
            color={taskProgress === 'done' ? '#FB3453' : '#D3D5DB'}
            type="feather"
          />
          <Text
            style={[
              styles.completeText,
              {
                color: taskProgress === 'done' ? '#FB3453' : '#D3D5DB',
              },
            ]}>
            Complete
          </Text>
        </View>
      </View>
      <ShortcutMenu
        showModal={setShortcutmenu}
        isShow={shortcutMenu}
        task={item}
      />
    </>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    justifyContent: 'flex-start',
  },
  taskDetail: {
    height: 400,
    width: '60%',
    backgroundColor: '#F5F796',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 7,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#FBFCFF',
  },
  taskTitleText: {
    color: '#0442D0', // #FF9124
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    marginBottom: 5,
    paddingRight: 10,
    fontFamily: 'Roboto',
  },
  taskHourText: {
    color: '#0442D0', // #FF9124
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '300',
    fontFamily: 'Roboto',
  },
  taskStatus: {
    width: '30%',
    backgroundColor: '#FEEAEB', //#F0F3F8
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    height: 25,
  },
  completeText: {
    color: '#FB3453', // #D3D5DB
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    marginLeft: 3,
    fontFamily: 'Roboto',
  },
});
