import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // Importing MaterialIcons for the icons

const Task = (props) => {
  return (
    <View style={styles.item}>
      {/* Leading section */}
      <View style={styles.itemLeading}>
        {/* Checkbox */}
        <TouchableOpacity onPress={props.onPress}>
          <View style={styles.square}>
            {props.isCompleted ? (
              <MaterialIcons name="check-box" size={24} color="#007bff" />
            ) : (
              <MaterialIcons name="check-box-outline-blank" size={24} color="#007bff" />
            )}
          </View>
        </TouchableOpacity>
        {/* Task Text */}
        <Text style={[styles.itemText, props.isCompleted ? styles.completedText : null]}>{props.text}</Text>
      </View>
      {/* Delete Button */}
      <TouchableOpacity onPress={props.onDelete}>
        <MaterialIcons name="delete" size={24} color="#888" />
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // will push the leading and trailing to opposite ends
    shadowColor: "#000000",
    shadowRadius: 14,
    shadowOpacity: 0.1,
    marginBottom: 16, // to add space between the items
  },
  itemText: {
    fontSize: 17,
    maxWidth: "80%",
  },
  square: {
    backgroundColor: "#8DDFDA",
    borderRadius: 4,
    width: 24,
    height: 24,
    opacity: 0.4,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  itemLeading: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap", // so if the text is pretty long, it'll be wrapped to the next line
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

export default Task;
