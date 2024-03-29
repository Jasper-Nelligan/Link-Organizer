export const Constants = {
  DEFAULT_LINK_PAIRS: [
    [0, true, "", ""],
    [1, false, "", ""],
    [2, false, "", ""],
    [3, false, "", ""],
  ],
  EMPTY_COURSE_NAME: "",
  EMPTY_LINK_PAIRS: [
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
  ],
};

export const Color = {
  RED: "red",
  GREEN: "green",
  BLUE: "blue",
  YELLOW: "yellow",
  ORANGE: "orange",
  PURPLE: "purple",
};

export const ColorHex = {
  RED: "#fe7b7b",
  GREEN: "#75d073",
  BLUE: "#74a3ff",
  YELLOW: "#ffe977",
  ORANGE: "#fbb143",
  PURPLE: "#c17ed9",
};

export const Messages = {
  PAGE_TITLE: "Course Link Organizer",
  PAGE_TITLE_PHRASE: "All your class links - One page",
  ADD_COURSE: "Add Course",
  CREATE_COURSE: "Create Course",
  FOOTER_QUESTIONS:
    "Questions, issues, or suggestions? Open an issue or start a discussion on",
  FOOTER_GITHUB: "Github",
  FOOTER_GITHUB_LINK:
    "https://github.com/Jasper-Nelligan/Link-Organizer/issues",
  SELECT_COLOR: "Color : ",
  ADD_LINK: "Add link",
  REMOVE_LINK: "Remove",
  SAVE_CHANGES: "Save changes",
  DELETE_COURSE: "Delete Course",
  COURSE: "Course",
  URL: "https://",
  LINK_NAME: "Link Name",
  ERROR_COURSE_NAME_EMPTY: "ERROR: course name cannot be empty",
  ERROR_TWO_COURSES_SAME_NAME:
    "ERROR: cannot have two courses with the same name",
  ERROR_LINK_NAME_EMPTY: "ERROR: link name cannot be empty",
  EDIT: "Edit",
};

export const TestConstants = {
  RED: "254, 123, 123",
  GREEN: "117, 208, 115",
  COURSE_NAME_1: "Course 1",
  COURSE_NAME_2: "Course 2",
  LINK_NAME_1: "Link Name 1",
  LINK_NAME_2: "Link Name 2",
  LINK_1: "Link 1",
  LINK_2: "Link 2",
  LOCAL_STORAGE_COURSE_ONE:
    '[["Course 1","red",[["Link Name 1","Link 1"],["",""],["",""],["",""]]]]',
  LOCAL_STORAGE_TWO_LINKS:
    '[["Course 2","green",[["Link Name 1","Link 1"],["Link Name 2","Link 2"],["",""],["",""]]]]',
  LOCAL_STORAGE_ALL_COLORS:
    '[["Course 1","red",[["",""],["",""],["",""],["",""]]],["Course 2","green",[["",""],["",""],["",""],["",""]]],["Course 3","blue",[["",""],["",""],["",""],["",""]]],["Course 4","yellow",[["",""],["",""],["",""],["",""]]],["Course 5","orange",[["",""],["",""],["",""],["",""]]],["Course 6","purple",[["",""],["",""],["",""],["",""]]]]',
};
