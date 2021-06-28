import { auth, firestore } from "../../Configs/firebase.config";

export const firebaseFieldDataUpload = async (profileData) => {
    await firestore
          .collection("profile")
          .doc(auth.currentUser.uid)
          .set({
              ...profileData,
          });
}

export const firebaseAddField = async (newField) => {
    await firestore
    .collection("profile")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        firestore
          .collection("profile")
          .doc(auth.currentUser.uid)
          .set({ 
              ...doc.data(),
              fieldData: doc.data().fieldData ? [...doc.data().fieldData, newField] : [newField], 
           });
      } else {
        firestore
          .collection("profile")
          .doc(auth.currentUser.uid)
          .set({
              fieldData: [newField],
           });
        console.log("No such document!");
      }
    });
}

export const firebaseEditField = async (editedField) => {
    await firestore
    .collection("profile")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists && doc.data().fieldData) {
        firestore
          .collection("profile")
          .doc(auth.currentUser.uid)
          .set({
              ...doc.data(),
              fieldData: doc.data().fieldData.map((field) => field.id == editedField.id ? editedField : field),
          });
      } else {
        console.log("No such document!");
      }
    });
}

export const firebaseRemoveField = async (deletedField) => {
    await firestore
    .collection("profile")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists && doc.data().fieldData) {
        firestore
          .collection("profile")
          .doc(auth.currentUser.uid)
          .set({
              ...doc.data(),
              fieldData: doc.data().fieldData.filter((field) => (field.id != deletedField.id)),
          });
      } else {
        console.log("No such document!");
        return null;
      }
    });
}

export const firebaseSetProfileImageUri = async (profileImageUri) => {
    await firestore
    .collection("profile")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        firestore
          .collection("profile")
          .doc(auth.currentUser.uid)
          .set({
              ...doc.data(),
              profileImageUri: profileImageUri,
          });
      } else {
        firestore
          .collection("profile")
          .doc(auth.currentUser.uid)
          .set({
              profileImageUri: profileImageUri,
          });
        return null;
      }
    });
}

export const firebaseSyncWithProfile = async (setProfileData, setRefreshing) => {
    await firestore
    .collection("profile")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setProfileData(doc.data())
        if (setRefreshing) setRefreshing(false);
      } else {
        console.log("No such document!");
        setProfileData(null);
        if(setRefreshing) setRefreshing(false);
      }
    });
}