import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, FlatList} from 'react-native';
import TaskItem from './TaskItem';
import hourTask from './hours';
import {useSelector, useDispatch} from 'react-redux';

export default function TaskList(props) {
  const {todos} = useSelector((state) => state.todos);
  const timeToDecimal = (time) => {
    let arrTime = time.includes(':') ? time.split(':') : time.split('.');
    let timeDec = parseInt((arrTime[1] / 6) * 10, 10);
    return parseFloat(
      parseInt(arrTime[0], 10) + '.' + (timeDec < 10 ? '0' : '') + timeDec,
    );
  };
  const [timerLine, setTimerLine] = useState(1);
  const timerFunction = () => {
    let hour = new Date()
      .toLocaleTimeString('ID')
      .substring(0, 5)
      .split(':')
      .join('.');
    let newTimerLine = timeToDecimal(hour);
    setTimerLine(newTimerLine);
  };
  useEffect(() => {
    let id = setInterval(timerFunction, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{borderTopWidth: 1, borderTopColor: '#EDF0F7'}}>
        <Text style={styles.tasklistText}>Task List</Text>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <View style={{flex: 0.25}}>
            <FlatList
              data={hourTask}
              numColumns={1}
              key="hourTask"
              keyExtractor={(item) => item}
              renderItem={({item}) => (
                <>
                  <View style={{height: 100}}>
                    <Text style={styles.hourText}>{item}</Text>
                    <Text style={styles.stripText}>-</Text>
                  </View>
                </>
              )}
            />
          </View>
          <View style={{flex: 0.75}}>
            {/* Loop started */}
            {todos
              .filter(
                (task) =>
                  new Date(task.timestamp).toLocaleDateString('ID') ==
                  new Date(props.selectedDate).toLocaleDateString('ID'),
              )
              .sort(
                (a, b) =>
                  timeToDecimal(a.hour.substring(0, 5)) -
                  timeToDecimal(b.hour.substring(0, 5)),
              )
              .map((item, index) => {
                return <TaskItem key={index} item={item} index={index} />;
              })}
            {/* loop end */}
          </View>
          <View style={[styles.timerLine, {top: timerLine * 100}]}></View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    backgroundColor: '#FBFCFF',
    paddingHorizontal: 10,
  },
  tasklistText: {
    color: '#525C77',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    paddingTop: 10,
    paddingBottom: 15,
    fontFamily: 'Roboto',
  },
  hourText: {
    height: 50,
    color: '#525C77',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    fontFamily: 'Roboto',
  },
  stripText: {
    height: 50,
    color: null,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    borderTopWidth: 1,
    borderTopColor: '#525C77',
    width: 5,
  },
  timerLine: {
    borderTopWidth: 1,
    borderTopColor: '#0442D0',
    position: 'absolute',
    width: '100%',
    zIndex: 1000,
    paddingHorizontal: -10,
  },
});
