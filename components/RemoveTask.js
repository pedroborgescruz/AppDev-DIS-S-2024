import { TouchableOpacity, Pressable, StyleSheet} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function RemoveTask({taskList, setTaskList, index}) {
    const eventHandler = async () => {
        const newTask = taskList.slice(0, index).concat(taskList.slice(index + 1))
        setTaskList(newTask);
        try{
            await AsyncStorage.setItem('taskList', JSON.stringify(newTask));
        } catch(error){
            console.log(error);
        }
    }
    return (<TouchableOpacity style={styles.square} onPress={eventHandler}></TouchableOpacity>)
}

const styles = StyleSheet.create({
    square: {
        width: 18,
        aspectRatio: 6,
        borderRadius: 4,
        marginTop: 43,
        marginLeft: 20,
        backgroundColor: '#888',
        justifyContent: 'right',
    },
})

export default RemoveTask;