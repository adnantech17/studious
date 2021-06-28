import { auth, firestore } from "../../Configs/firebase.config";

export const firebaseFieldDataUpload = (profileData) => {
    firestore
          .collection("profile")
          .doc(auth.currentUser.uid)
          .set({
              ...profileData,
          });
}

export const firebaseAddField = (newField) => {
    firestore
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
              fieldData: [...doc.data().fieldData, newField] 
           });
      } else {
        firestore
          .collection("profile")
          .doc(auth.currentUser.uid)
          .set({
              fieldData: [newField] 
           });
        console.log("No such document!");
      }
    });
}

export const firebaseEditField = (editedField) => {
    firestore
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
              fieldData: doc.data().fieldData.map((field) => field.id == editedField.id ? editedField : field),
          });
      } else {
        console.log("No such document!");
        return null;
      }
    });
}

export const firebaseRemoveField = (deletedField) => {
    firestore
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
              fieldData: doc.data().fieldData.filter((field) => (field.id != deletedField.id)),
          });
      } else {
        console.log("No such document!");
        return null;
      }
    });
}

export const firebaseSetProfileImageUri = (profileImageUri) => {
    firestore
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

export const firebaseSyncWithProfile = (setProfileData, setRefreshing) => {
    return firestore
    .collection("profile")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setProfileData(doc.data())
        if (setRefreshing) setRefreshing(false);
      } else {
        console.log("No such document!");
        return null;
      }
    });
}

export const firebaseDownloadProfileData = () => {
    if(!auth.currentUser) return null;
    return firestore
    .collection("profile")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        console.log("No such document!");
        return null;
      }
    });
}