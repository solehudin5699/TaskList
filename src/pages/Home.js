import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container, Header, Thumbnail} from 'native-base';
import TaskList from '../components/Home/TaskList';
import Calendar from '../components/Calendar/index';
import FooterHome from '../components/Home/Footer';
import {useSelector} from 'react-redux';

export default function Home() {
  const [state, setState] = useState({selectedDate: ''});
  useEffect(() => {
    setState({
      selectedDate: new Date().toLocaleDateString(),
    });
  }, []);
  const {todos} = useSelector((state) => state.todos);
  const {user} = useSelector((state) => state.user);
  return (
    <Container style={{backgroundColor: '#FBFCFF'}}>
      <Header androidStatusBarColor="#0442D0" style={styles.headerStyle}>
        <View
          style={{flex: 0.25, justifyContent: 'center', alignItems: 'center'}}>
          <Thumbnail
            source={{
              uri: `https://ui-avatars.com/api/?name=${user.name
                .split(' ')
                .join('+')}&background=FABE2C&color=ffffff`,
            }}
            style={{width: 56, height: 56, borderRadius: 56}}
          />
        </View>
        <View style={styles.greetContainer}>
          <Text style={styles.nameText}>
            Hello {user.name.split(' ')[0]} {user.name.split(' ')[1]}
          </Text>
          <Text style={styles.taskNum}>
            {
              todos.filter(
                (item) =>
                  new Date(item.timestamp).toLocaleDateString('ID') ==
                  new Date().toLocaleDateString('ID'),
              ).length
            }{' '}
            Task for Today
          </Text>
        </View>
      </Header>
      <View style={{flex: 1}}>
        <View style={{flex: 0.3}}>
          <Text style={styles.datesSelected}>
            {new Date(state.selectedDate).toDateString().substring(0, 3)},
            {new Date(state.selectedDate).toDateString().substring(3, 15)}
          </Text>
          <View>
            <Calendar
              selectedDate={state.selectedDate}
              onPressDate={(date) => {
                setState({selectedDate: date});
                // console.log(date);
              }}
              onPressGoToday={(today) => {
                setState({selectedDate: today});
                // console.log(today);
              }}
              onSwipeDown={() => {
                alert('onSwipeDown');
              }}
              markedDate={todos.map((task) =>
                new Date(task.timestamp).toISOString(),
              )}
              // weekStartsOn={1} // 0,1,2,3,4,5,6 for S M T W T F S, defaults to 0
            />
          </View>
        </View>
        <TaskList selectedDate={state.selectedDate} />
      </View>
      <FooterHome />
    </Container>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0442D0',
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    height: 108,
    flexDirection: 'row',
    width: '100%',
    padding: 0,
  },
  greetContainer: {
    flex: 0.75,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  nameText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
  taskNum: {
    color: '#FABE2C',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '900',
    marginTop: 5,
    fontFamily: 'Roboto',
  },
  datesSelected: {
    color: '#0442D0',
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 13,
    marginLeft: 15,
    fontFamily: 'Roboto',
  },
});
