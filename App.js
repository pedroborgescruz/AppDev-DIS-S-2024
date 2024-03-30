import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from "./components/Tasks.js";
import AddTask from "./components/AddTask.js";
import RemoveTask from "./components/RemoveTask.js/index.js";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const[isLoaded, setIsLoaded] = useState(false);

  const handlePressEvent = async (index) => {

    let newTask = [...taskList];
    newTask[index].complete = !newTask[index].complete;
    const task = newTask[index];
    newTask = newTask.slice(0, index).concat(newTask.slice(index + 1));
    task.complete ?  newTask = [...newTask, task] : newTask = [task, ...newTask]; 
    setTaskList(newTask);
    try {
      await AsyncStorage.setItem('taskList', JSON.stringify(newTask));
    } catch(error){
      console.log(error);
    }
  }

  const loadTask = async() => {
    try {
      const data = await AsyncStorage.getItem('taskList');
      if(data != null) {
        setTaskList(JSON.parse(data));
      }
      setIsLoaded(true);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {loadTask()}, []);

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
        {isLoaded ? 
        <ScrollView>
        {taskList.map((task, index) => (
          <View key={index} style={styles.individualWrapper}>
          <Task text={task.text} complete={task.complete} onPress={() => handlePressEvent(index)}/>
          <RemoveTask index={index} taskList={taskList} setTaskList={setTaskList} />
          </View>
        ))}

      </ScrollView>
      :
      <ActivityIndicator></ActivityIndicator>}
        </View>
      </View>

      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.addTaskContainer}>

        <AddTask taskList={taskList} setTaskList={setTaskList}/>

      </KeyboardAvoidingView>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F1F1",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: "bold",
  },
  items: {
    marginTop: 32,
  },
  addTaskContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
  },
});