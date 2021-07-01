import { ActionSheetIOS } from "react-native";
import {
  addCourseUtil,
  addMaterialUtil,
  removeCourseUtil,
  removeMaterialUtil,
  updateCourseUtil,
  updateMaterialUtil,
} from "./material.utils";

const INITIAL_STATE = {
  courses: [
    {
      id: "id0",
      title: "CSE 1101",
      materials: [
        {
          id: "mat-0",
          title: "Recommended Book",
          description: "This book is recommended for this course",
          attachment: null,
          datetime: new Date(),
          tags: ["books", "cs", "cse"],
        },
      ],
    },
  ],
  matMenuBox: false,
  selectedCourse: null,
  selectedMaterial: { material: null, course_id: null },
  inputBox: false,
  courseMenuBox: false,
  materialMenuBox: false,
  filterBox: false,
};

const courseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_COURSES":
      return {
        ...state,
        courses: action.payload,
      };

    case "ADD_COURSE":
      return {
        ...state,
        courses: addCourseUtil(state.courses, action.payload),
      };

    case "REMOVE_COURSE":
      return {
        ...state,
        courses: removeCourseUtil(state.courses, action.payload),
      };

    case "UPDATE_COURSE":
      return {
        ...state,
        courses: updateCourseUtil(state.courses, action.payload),
      };

    case "TOGGLE_COURSE_MENU_BOX":
      return {
        ...state,
        courseMenuBox: !state.courseMenuBox,
      };

    case "TOGGLE_MATERIAL_MENU_BOX":
      return {
        ...state,
        materialMenuBox: !state.materialMenuBox,
      };

    case "ADD_MATERIAL":
      return {
        ...state,
        courses: addMaterialUtil(state.courses, action.payload),
      };

    case "REMOVE_MATERIAL":
      return {
        ...state,
        courses: removeMaterialUtil(state.courses, action.payload),
      };

    case "UPDATE_MATERIAL":
      return {
        ...state,
        courses: updateMaterialUtil(state.courses, action.payload),
      };

    case "TOGGLE_MAT_MENU_BOX":
      return {
        ...state,
        matMenuBox: !state.matMenuBox,
      };

    case "SELECT_COURSE":
      return {
        ...state,
        selectedCourse: action.payload,
      };

    case "SELECT_MATERIAL":
      return {
        ...state,
        selectedMaterial: action.payload,
      };

    case "TOGGLE_COURSE_INPUT":
      return {
        ...state,
        inputBox: !state.inputBox,
      };

    case "TOGGLE_FILTER_INPUT":
      return {
        ...state,
        filterBox: !state.filterBox,
      };

    default:
      return state;
  }
};

export default courseReducer;
