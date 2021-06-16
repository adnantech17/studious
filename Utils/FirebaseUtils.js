import { auth, firestore } from "../Configs/firebase.config";

export function firebaseTodoUpload(todos) {
    firestore.collection("todos").doc(auth.currentUser.uid).set({Todos: todos})
}