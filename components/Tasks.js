import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Task = (props) => {
  return (
    <View style={styles.item}>
      {/* // Added item leading section so that we can add a button on the trailing edge later on */}
      <View style={styles.itemLeading}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 16,
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
  },
  item: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // will push the leading and trailling to opposite ends
    shadowColor: "#000000",
    shadowRadius: 14,
    shadowOpacity: 0.1,
    marginBottom: 16, // to add space between the items
  },
  itemLeading: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap", // so if the text is pretty long, it'll be wrapped to the next line
  },
});

export default Task;