import React from "react";
import { Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { connect, Provider } from "react-redux";
import store from "./Redux/store";
import { setCurrentUser, setLoading } from "./Redux/user/user.action";
import { auth, firestore } from "./Configs/firebase.config";
import SignedOutNav from "./Navigation/SignedOutNav";
import SignedInNav from "./Navigation/SignedInNav";
import { setCourses } from "./Redux/material/material.action";
import { setTodos } from "./Redux/todo/todo.action";

class Index extends React.Component {
  unsubscribeFromAuth = function () {
    return;
  };

  componentDidMount() {
    this.props.setLoading(true);
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      this.props.setCurrentUser(user);
      this.props.setLoading(false);
      if (user) {
        await firestore
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("Hello Firebase", doc.data());
              this.props.setCurrentUser({
                uid: user.uid,
                ...doc.data(),
              });
            } else {
              console.log("No such document!");
            }
          });
        await firestore
          .collection("todos")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("Hello Firebase", doc.data());
              this.props.setTodos(doc.data().Todos);
              console.log("TODOS DATA: ", doc.data().Todos);
              console.log("TODOS: ", this.props.todos);
            } else {
              console.log("No such document!");
            }
          });

        await firestore
          .collection("courses")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.props.setCourses(doc.data().Courses);
            } else {
              console.log("No such document!");
            }
          });
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          {!this.props.loading &&
            (this.props.user !== null ? <SignedInNav /> : <SignedOutNav />)}
          {this.props.loading && <Text>Loading</Text>}
        </NavigationContainer>
      </Provider>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setLoading: (loadingState) => dispatch(setLoading(loadingState)),
  setTodos: (todos) => dispatch(setTodos(todos)),
});

const mapStateToProps = (state) => ({
  loading: state.user.loadingState,
  user: state.user.currentUser,
  todos: state.todos.todos,
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
