import { auth, firestore } from "../Configs/firebase.config";

export const firebaseNewTodoUpload = async (todo, setTodos) => {
  firestore
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
        firestore
          .collection("todos")
          .doc(auth.currentUser.uid)
          .set({ Todos: [todo] });
        console.log("No such Todo document!");
      }
    });
};

export const firebaseTodoUpdate = async (todo, setTodos) => {
  firestore
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
  firestore
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
  return firestore
    .collection("todos")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists && doc.data().Todos) {
        setTodos(doc.data().Todos);
        if (setRefreshing) setRefreshing(false);
      } else {
        console.log("No such document!");
        return null;
      }
    });
};

export const firebaseCourseDownload = async (setRefreshing, setCourses) => {
  return firestore
    .collection("courses")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setCourses(doc.data().Courses);
        if (setRefreshing) setRefreshing(false);
        console.log("here");
      } else {
        console.log("No such document!");
        if (setRefreshing) setRefreshing(false);
        return null;
      }
    });
};

export const firebaseNewCourseUpload = async (course, setCourses) => {
  firestore
    .collection("courses")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.data() && doc.data().Courses) {
        setCourses([...doc.data().Courses, course]);
        firestore
          .collection("courses")
          .doc(auth.currentUser.uid)
          .set({ Courses: [...doc.data().Courses, course] });
      } else {
        firestore
          .collection("courses")
          .doc(auth.currentUser.uid)
          .set({ Courses: [course] });
        console.log("No such Course document!");
      }
    });
};

export const firebaseCourseUpdate = async (course, setCourses) => {
  firestore
    .collection("courses")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.data() && doc.data().Courses) {
        var courses = doc.data().Courses;
        courses = courses.map((item) =>
          course.id === item.id ? course : item
        );
        setCourses([...courses]);
        firestore
          .collection("courses")
          .doc(auth.currentUser.uid)
          .set({ Courses: courses });
      } else {
        console.log("No such document!");
        return null;
      }
    });
};

export const firebaseCourseDelete = async (course) => {
  firestore
    .collection("courses")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.data() && doc.data().Courses) {
        var courses = doc.data().Courses;
        courses = courses.filter((item) => course.id !== item.id);
        firestore
          .collection("courses")
          .doc(auth.currentUser.uid)
          .set({ Courses: courses });
      } else {
        console.log("No such document!");
        return null;
      }
    });
};

export const firebaseNewMaterialUpload = async (
  courseId,
  material,
  setCourses
) => {
  firestore
    .collection("courses")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.data() && doc.data().Courses) {
        var courses = doc.data().Courses;
        courses = courses.map((c) =>
          courseId === c.id
            ? { ...c, materials: [...c.materials, material] }
            : c
        );
        setCourses(courses);
        firestore
          .collection("courses")
          .doc(auth.currentUser.uid)
          .set({ Courses: courses });
      } else {
        firestore
          .collection("courses")
          .doc(auth.currentUser.uid)
          .set({ Courses: [course] });
        console.log("No such Course document!");
      }
    });
};

export const firebaseMaterialUpdate = async (
  courseId,
  material,
  setCourses
) => {
  firestore
    .collection("courses")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.data() && doc.data().Courses) {
        var courses = doc.data().Courses;
        courses = courses.map((course) =>
          course.id === courseId
            ? {
                ...course,
                materials: course.materials.map((mat) =>
                  mat.id === mat.id ? material : mat
                ),
              }
            : course
        );

        // setCourses(courses);
        console.log(courses);

        firestore
          .collection("courses")
          .doc(auth.currentUser.uid)
          .set({ Courses: courses });
      } else {
        firestore
          .collection("courses")
          .doc(auth.currentUser.uid)
          .set({ Courses: [course] });
        console.log("No such Course document!");
      }
    });
};

export const firebaseMaterialDelete = async (courseId, material) => {
  firestore
    .collection("courses")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.data() && doc.data().Courses) {
        var courses = doc.data().Courses;
        console.log("COURSES", courses);
        courses = courses.map((course) =>
          course.id === courseId
            ? {
                ...course,
                materials: course.materials.filter(
                  (mat) => material.id !== mat.id
                ),
              }
            : course
        );
        firestore
          .collection("courses")
          .doc(auth.currentUser.uid)
          .set({ Courses: courses });
      } else {
        firestore
          .collection("courses")
          .doc(auth.currentUser.uid)
          .set({ Courses: [course] });
        console.log("No such Course document!");
      }
    });
};

export const firebaseMaterialChangeCourse = async (
  courseId,
  coursePrevId,
  material,
  setCourses
) => {
  firestore
    .collection("courses")
    .doc(auth.currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.data() && doc.data().Courses) {
        var courses = doc.data().Courses;
        courses = courses.map((c) =>
          courseId === c.id
            ? { ...c, materials: [...c.materials, material] }
            : c
        );
        courses = courses.map((course) =>
          course.id === coursePrevId
            ? {
                ...course,
                materials: course.materials.filter(
                  (mat) => material.id !== mat.id
                ),
              }
            : course
        );
        setCourses(courses);
        firestore
          .collection("courses")
          .doc(auth.currentUser.uid)
          .set({ Courses: courses });
      } else {
        firestore
          .collection("courses")
          .doc(auth.currentUser.uid)
          .set({ Courses: [course] });
        console.log("No such Course document!");
      }
    });
};
