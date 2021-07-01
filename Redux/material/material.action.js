export const addCourse = (course) => ({
  type: "ADD_COURSE",
  payload: course,
});

export const setCourses = (courses) => ({
  type: "SET_COURSES",
  payload: courses,
});

export const removeCourse = (course) => ({
  type: "REMOVE_COURSE",
  payload: course,
});

export const updateCourse = (course) => ({
  type: "UPDATE_COURSE",
  payload: course,
});

export const toggleMenuBox = () => ({
  type: "TOGGLE_MAT_MENU_BOX",
});

export const toggleCourseInput = () => ({
  type: "TOGGLE_COURSE_INPUT",
});

export const selectCourse = (course) => ({
  type: "SELECT_COURSE",
  payload: course,
});

export const toggleCourseMenu = () => ({
  type: "TOGGLE_COURSE_MENU_BOX",
});

export const selectMaterial = (course_id, material) => ({
  type: "SELECT_MATERIAL",
  payload: { material: material, course_id: course_id },
});

export const addMaterial = (course_id, material) => ({
  type: "ADD_MATERIAL",
  payload: { material: material, course_id: course_id },
});

export const removeMaterial = (course_id, material) => ({
  type: "REMOVE_MATERIAL",
  payload: { material: material, course_id: course_id },
});

export const updateMaterial = (course_id, material) => ({
  type: "UPDATE_MATERIAL",
  payload: { material: material, course_id: course_id },
});

export const toggleMaterialMenu = () => ({
  type: "TOGGLE_MATERIAL_MENU_BOX",
});

export const toggleFilterBox = () => ({
  type: "TOGGLE_FILTER_INPUT",
});
