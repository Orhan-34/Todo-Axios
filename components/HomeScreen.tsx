import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import EditTodoModal from "./modals/EditTodoModal";
import { seedTodos } from "@/utils/SeedTodos";
import DeleteTodoModal from "./modals/DeleteTodoModal";

interface Todo {
  id: number;
  title: string;
}

const HomeScreen = () => {
  const [todos, setTodos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editedTodoTitle, setEditedTodoTitle] = useState<string>("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const getTodos = async () => {
    const numeral = Math.floor(Math.random() * 10);
    const url = `https://jsonplaceholder.typicode.com/todos?_limit=${numeral}`;
    try {
      const response = await axios.get(url);
      setTodos(response.data);
      //   console.log("Numeral: ", numeral);
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const updateTodos = async ({ id }: { id: number }) => {
    const url = `https://jsonplaceholder.typicode.com/todos?id=${id}`;
    try {
      const response = await axios.put(url);
      setTodos(response.data);
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const deleteTodos = async ({ id }: { id: number }) => {
    const url = `https://jsonplaceholder.typicode.com/todos?id=${id}`;
    try {
      const response = await axios.delete(url);
      setTodos(response.data);
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  useEffect(() => {
    seedTodos();
    getTodos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Todo List</Text>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={todos}
        keyExtractor={(item: Todo) => item.id.toString()}
        renderItem={({ item }: { item: Todo }) => (
          <View>
            <TouchableOpacity
              onPress={() => (
                setIsModalVisible(true),
                setEditingTodo(item),
                setEditedTodoTitle(item.title)
              )}
              onLongPress={() => {
                setEditingTodo(item);
                setIsDeleteModalVisible(true);
              }}
            >
              <Text style={styles.item}>• {item.title}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <EditTodoModal
        visible={isModalVisible}
        todoTitle={editedTodoTitle}
        onClose={() => setIsModalVisible(false)}
        onUpdate={() => {
          if (editingTodo) {
            updateTodos({ id: editingTodo.id });
            setIsModalVisible(false);
          }
        }}
        onChangeText={setEditedTodoTitle}
      />
      <DeleteTodoModal
        visible={isDeleteModalVisible}
        todoTitle={editingTodo?.title || ""}
        onClose={() => setIsDeleteModalVisible(false)}
        onDelete={() => {
          if (editingTodo) {
            deleteTodos({ id: editingTodo.id });
            setIsDeleteModalVisible(false);
          }
        }}
      />
      <TouchableOpacity style={styles.button} onPress={getTodos}>
        <Text style={{ color: "white" }}>Yeniden Yükle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    padding: 20,
    backgroundColor: "#f0f0f0",
    marginTop: 40,
  },
  list: { flex: 1, width: "100%" },
  listContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    fontSize: 16,
    marginVertical: 4,
    backgroundColor: "orange",
    opacity: 0.8,
    padding: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
  },
});

export default HomeScreen;
