import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Principal from './components/Principal';
import Task from './components/Task';
import NewTask from './components/NewTask';
import TaskStopwatch from './components/TaskStopwatch';

const Routes = new createStackNavigator({
    LoginScreen: {
        screen: Login,
        navigationOptions: () => ({
            header: null
        }),
    },
    SignUpScreen: {
        screen: SignUp,
    },
    PrincipalScreen: {
        screen: Principal,
        navigationOptions: () => ({
            header: null
        }),
    },
    TaskScreen: {
        screen: Task,
    },
    NewTaskScreen:{
        screen: NewTask,
    },
    TaskStopwatchScreen:{
        screen: TaskStopwatch,
    }
});

export default createAppContainer(Routes);