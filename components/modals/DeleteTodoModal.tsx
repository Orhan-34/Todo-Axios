import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface DeleteTodoModalProps {
  visible: boolean;
  todoTitle: string;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteTodoModal = ({
  visible,
  todoTitle,
  onClose,
  onDelete,
}: DeleteTodoModalProps) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{todoTitle}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.deleteButton]}
              onPress={onDelete}
            >
              <Text style={styles.buttonText}>Sil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#00B83A" 

  },
  deleteButton: {
    backgroundColor: "#FF4444", // Red
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default DeleteTodoModal;
