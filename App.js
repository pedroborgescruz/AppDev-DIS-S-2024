import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, ScrollView, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './components/Tasks'; // Updated import for the Task component
import AddTask from './components/AddTask';

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePressEvent = async (index) => {
    let newTaskList = [...taskList];
    newTaskList[index].isCompleted = !newTaskList[index].isCompleted;
    setTaskList(newTaskList);
    try {
      await AsyncStorage.setItem('taskList', JSON.stringify(newTaskList));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteEvent = async (index) => {
    let newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    setTaskList(newTaskList);
    try {
      await AsyncStorage.setItem('taskList', JSON.stringify(newTaskList));
    } catch (error) {
      console.log(error);
    }
  };

  const loadTasks = async () => {
    try {
      const data = await AsyncStorage.getItem('taskList');
      if (data !== null) {
        setTaskList(JSON.parse(data));
      }
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          {isLoaded ? (
            <ScrollView>
              {taskList.map((task, index) => (
                <View key={index} style={styles.individualWrapper}>
                <Task
                  text={task.text}
                  isCompleted={task.isCompleted}
                  onPress={() => handlePressEvent(index)}
                  onDelete={() => handleDeleteEvent(index)} // Adding onDelete prop
                />
                </View>
              ))}
            </ScrollView>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.addTaskContainer}>
        <AddTask taskList={taskList} setTaskList={setTaskList} />
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1F1',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 32,
  },
  individualWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addTaskContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
  },
  deleteButton: {
    color: 'red',
    fontSize: 16,
    marginLeft: 10,
  },
});
