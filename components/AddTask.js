import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";

function AddTask({taskList, setTaskList}) {
  const { onPress } = props;
  const storeTask = async(newTask) => {
    try {
      await AsyncStorage.setItem('taskList', JSON.stringify(newTask));
    } catch(error) {
        console.log(error);
    }
  };

  const handleAddTask = () => {
    if (task != null) {
      const newTask = [...taskList, {text: String(task), complete: false}];
      setTaskList(newTask);
      storeTask(newTask);
      setTask(null);
      Keyboard.dismiss();
      }
  };

  const [task, setTask] = useState()

  return (
    <View style={styles.container}>
        <TextInput style={styles.textInput} placeholder="Write a task"
         onChangeText={(text) => setTask(text)} value={task}/>     
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.text}>Add</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F1F1",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#558CF6",
    fontWeight: "bold",
    fontSize: 17,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    fontSize: 17,
  },
  button: {
    alignItems: "center",
    padding: 10,
  },
});

export default AddTask;