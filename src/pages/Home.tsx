import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find((task) => task.title === newTaskTitle)) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ]
      );
      return
    }
    const newTaskInfos = {
      id: new Date().getTime(),
      done: false,
      title: newTaskTitle,
    };
    setTasks((previousState) => [...previousState, newTaskInfos]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks((previousState) =>
      previousState.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            done: !task.done,
          };
        }
        return task;
      })
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () =>
            setTasks((previousState) =>
              previousState.filter((task) => task.id !== id)
            ),
        },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    setTasks((previousState) =>
      previousState.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            title: taskNewTitle,
          };
        }
        return task;
      })
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        editTask={handleEditTask}
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
