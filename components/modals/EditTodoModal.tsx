import React from "react";
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

interface EditTodoModalProps {
  visible: boolean;
  todoTitle: string;
  onClose: () => void;
  onUpdate: () => void;
  onChangeText: (text: string) => void;
}

const EditTodoModal = ({
  visible,
  todoTitle,
  onClose,
  onUpdate,
  onChangeText,
}: EditTodoModalProps) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            value={todoTitle}
            onChangeText={onChangeText}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.updateButton]}
              onPress={onUpdate}
            >
              <Text style={styles.buttonText}>Güncelle</Text>
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
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
    backgroundColor: "#ff4444",
  },
  updateButton: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default EditTodoModal;
