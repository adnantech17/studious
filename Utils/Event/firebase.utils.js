import { auth, firestore } from "../../Configs/firebase.config";
import { deleteObsoleteEvents } from "./event.utils";

const EVENT = "event";

export const firebaseEventDataUpload = async (eventData) => {
    await firestore
          .collection(EVENT)
          .doc(auth.currentUser.uid)
          .set({
              eventData,
          });
}

export const firebaseAddEvent = async (newEvent) => {
    await firestore
    .collection(EVENT)
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        firestore
          .collection(EVENT)
          .doc(auth.currentUser.uid)
          .set({ 
              ...doc.data(),
              eventData: doc.data().eventData ? [...doc.data().eventData, newEvent] : [newEvent], 
           });
      } else {
        firestore
          .collection(EVENT)
          .doc(auth.currentUser.uid)
          .set({
              eventData: [newEvent],
           });
        console.log("No such document!");
      }
    });
}

export const firebaseEditEvent = async (editedEvent) => {
    await firestore
    .collection(EVENT)
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists && doc.data().eventData) {
        firestore
          .collection(EVENT)
          .doc(auth.currentUser.uid)
          .set({
              ...doc.data(),
              eventData: doc.data().eventData.map((event) => event.id == editedEvent.id ? editedEvent : event),
          });
      } else {
        console.log("No such document!");
      }
    });
}

export const firebaseRemoveEvent = async (deletedEvent) => {
    await firestore
    .collection(EVENT)
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists && doc.data().eventData) {
        firestore
          .collection(EVENT)
          .doc(auth.currentUser.uid)
          .set({
              ...doc.data(),
              eventData: doc.data().eventData.filter((event) => (event.id != deletedEvent.id)),
          });
      } else {
        console.log("No such document!");
        return null;
      }
    });
}

export const firebaseSyncWithEvent = async (setEventData, setRefreshing) => {
    setRefreshing(true);
    await firestore
    .collection(EVENT)
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists && doc.data().eventData) {
        firestore
          .collection(EVENT)
          .doc(auth.currentUser.uid)
          .set({
              ...doc.data(),
              eventData : deleteObsoleteEvents(doc.data().eventData)
          }).then(() => {
            firestore
            .collection(EVENT)
            .doc(auth.currentUser.uid)
            .get()
            .then((doc) => {
                if (doc.exists && doc.data().eventData) {
                    setEventData(doc.data().eventData)
                    if (setRefreshing) setRefreshing(false);
                }
            })
          });
      } else {
        console.log("No such document!");
        setEventData([]);
        if(setRefreshing) setRefreshing(false);
      }
    });
}