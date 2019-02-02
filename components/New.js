import React from 'react';
import { ScrollView, View, StyleSheet, Dimensions, RefreshControl } from 'react-native';

class New extends React.Component {

  

  

  render() {

    const getUserId = nav.getParam('userId', 'NO-ID');

    return (
      <View style={styles.container}>
        <TouchableOpacity
                onPress={() => this.props.navigation.navigate('NewTaskScreen', {userId: getUserId})}
                style={styles.touch}>
                <Ionicons name="md-add" size={50} color='white' />
            </TouchableOpacity>
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

export default New;