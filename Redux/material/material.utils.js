export const addCourseUtil = (courses, item) => {
  return [...courses, item];
};

export const removeCourseUtil = (courses, item) => {
  console.log(item);
  return courses.filter((course) => item.id !== course.id);
};

export const updateCourseUtil = (courses, item) => {
  return courses.map((course) => (course.id === item.id ? item : course));
};

export const addMaterialUtil = (courses, item) => {
  const mat = item.material;

  return courses.map((course) =>
    course.id === item.course_id
      ? { ...course, materials: [...course.materials, mat] }
      : course
  );
};

export const removeMaterialUtil = (courses, item) => {
  const mat = item.material;

  return courses.map((course) =>
    course.id === item.course_id
      ? {
          ...course,
          materials: course.materials.filter(
            (material) => material.id !== mat.id
          ),
        }
      : course
  );
};

export const updateMaterialUtil = (courses, item) => {
  const mat = item.material;

  courses.map(
    (course) =>
      course.id === item.course_id && {
        materials: course.materials.map((material) =>
          console.log(mat.id === material.id, material.id, mat.id, "HDDD")
        ),
      }
  );

  return courses.map((course) =>
    course.id === item.course_id
      ? {
          ...course,
          materials: course.materials.map((material) =>
            mat.id === material.id ? mat : material
          ),
        }
      : course
  );
};
