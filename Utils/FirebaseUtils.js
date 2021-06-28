import { auth, firestore } from "../Configs/firebase.config";

export const firebaseNewTodoUpload = async (todo, setTodos) => {
  await firestore
    .collection("todos")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists && doc.data().Todos) {
        setTodos([...doc.data().Todos, todo]);
        firestore
          .collection("todos")
          .doc(auth.currentUser.uid)
          .set({ Todos: [...doc.data().Todos, todo] });
      } else {
        setTodos([todo]);
        firestore
          .collection("todos")
          .doc(auth.currentUser.uid)
          .set({ Todos: [todo] });
        console.log("No such Todo document!");
      }
    });
};

export const firebaseTodoUpdate = async (todo, setTodos) => {
  await firestore
    .collection("todos")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists && doc.data().Todos) {
        var todos = doc.data().Todos;
        todos = todos.map((item) => (todo.id === item.id ? todo : item));
        setTodos([...todos]);
        firestore
          .collection("todos")
          .doc(auth.currentUser.uid)
          .set({ Todos: todos });
      } else {
        console.log("No such document!");
        return null;
      }
    });
};

export const firebaseTodoDelete = async (todo_id, setTodos) => {
  await firestore
    .collection("todos")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists && doc.data().Todos) {
        var todos = doc.data().Todos;
        todos = todos.filter((item) => todo_id !== item.id);
        // setTodos([...todos]);
        firestore
          .collection("todos")
          .doc(auth.currentUser.uid)
          .set({ Todos: todos });
      } else {
        console.log("No such document!");
        return null;
      }
    });
};

export const firebaseTodoDownload = async (setRefreshing, setTodos) => {
  await firestore
    .collection("todos")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists && doc.data().Todos) {
        setTodos(doc.data().Todos);
        if (setRefreshing) setRefreshing(false);
        console.log("here");
      } else {
        console.log("No such document!");
        return null;
      }
    });
};
