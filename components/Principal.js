import React from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import Task from './Task';
import Nav from './Nav';
import AddTaskButton from './AddTaskButton';

class Principal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [
        { name: "Skptricks", time: "trodrigu@cuc.edu.co" },
        { name: "Sumit", time: "trodrigu@cuc.edu.co" },
        { name: "Amit", time: "trodrigu@cuc.edu.co" },
        { name: "React", time: "trodrigu@cuc.edu.co" },
        { name: "React Native", time: "trodrigu@cuc.edu.co" },
        { name: "Java", time: "trodrigu@cuc.edu.co" },
        { name: "Javascript", time: "trodrigu@cuc.edu.co" },
      ]
    };
  }

  render() {

    const nav = this.props.navigation;

    return (
      <View style={styles.container}>
        <Nav navigation={nav} />
        <ScrollView style={styles.tasks}>
          {this.state.data.map((item, key) => (
            <Task key={key} navigation={nav} name={item.name} time={item.time} />
          ))}
        </ScrollView>
        <AddTaskButton navigation={nav}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    flex: 1,
    flexDirection: 'column',
  },
  tasks:{
    marginBottom: 60,
  }
})

export default Principal;