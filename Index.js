import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { connect, Provider } from "react-redux";
import store from "./Redux/store";
import { setCurrentUser, setLoading } from "./Redux/user/user.action";
import { auth, firestore } from "./Configs/firebase.config";
import SignedOutNav from "./Navigation/SignedOutNav";
import SignedInNav from "./Navigation/SignedInNav";
import { setTodos } from "./Redux/todo/todo.action";
import { firebaseNewTodoUpload } from "./Utils/FirebaseUtils";
import { setProfileData } from "./Redux/profile/profile.action";
import LottieView from "lottie-react-native";

class Index extends React.Component {
  unsubscribeFromAuth = function () {
    return;
  };

  componentDidMount() {
    this.props.setLoading(true);
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      this.props.setCurrentUser(user);
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
            if (doc.exists && doc.data().Todos) {
              console.log("Data found");
              this.props.setTodos(doc.data().Todos);
            } else {
              console.log("No such document!");
            }
          });
        await firestore
          .collection("profile")
          .doc(user.id)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setProfileData(doc.data());
            }
          });
      }
      this.props.setLoading(false);
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
          {this.props.loading && (
            <View style={styles.lottieContainer}>
              <LottieView
                style={styles.lottie}
                source={require("./assets/pics/loading.json")}
                autoPlay
              />
            </View>
          )}
        </NavigationContainer>
      </Provider>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setLoading: (loadingState) => dispatch(setLoading(loadingState)),
  setTodos: (todos) => dispatch(setTodos(todos)),
  setProfileData: (profileData) => dispatch(setProfileData(profileData)),
});

const mapStateToProps = (state) => ({
  loading: state.user.loadingState,
  user: state.user.currentUser,
  todos: state.todos.todos,
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);

const styles = StyleSheet.create({
  lottieContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: "100%",
  },
});
