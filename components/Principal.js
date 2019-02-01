import React from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import Task from './Task';
import Nav from './Nav';
import AddButton from './AddButton';

class Principal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    const getUserId = this.props.navigation.getParam('userId', 'NO-ID');
    this.setState({
      userId: getUserId,
    })
    try {
      let response = await fetch('http://192.168.1.68:3000/api/v1/users/' + getUserId + '/all_tasks/');
      let res = JSON.parse(response._bodyInit);
      for (let i = 0; i < res.length; i++) { 
        res[i].map((item, index) => {
          this.setState({
            data: this.state.data.concat([item])
          })
        })
      }    
      
    } catch (errors) {
      //Handle error
      console.log(errors);
    }
  }

  render() {

    const nav = this.props.navigation;
    const getUserId = nav.getParam('userId', 'NO-ID');

    return (
      <View style={styles.container}>
        <Nav navigation={nav} userId={getUserId} />
        <ScrollView style={styles.tasks}>
          {this.state.data.map((item, key) => (
            <Task key={key} navigation={nav} data={[item.title, item.time, item.project_id, getUserId]} id={item.id} />
          ))}
        </ScrollView>
        <AddButton navigation={nav} userId={getUserId} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    flex: 1,
    flexDirection: 'column',
  }
})

export default Principal;