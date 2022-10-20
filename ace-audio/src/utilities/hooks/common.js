import { v4 as uuidv4 } from "uuid";

// findMousePositionRelativeToElement
export const findMousePositionRelativeToElement = (e) => {
  const xClick = e.clientX - e.currentTarget.offsetLeft;
  const yClick = e.clientY - e.currentTarget.offsetTop;
  return { xClick, yClick };
};

// findByIdAndUpdate
export const findByIdAndUpdate = (state, id, newValue) => {
  let newState = state;
  for (let i in newState) {
    if (newState[i].id === id) {
      newState[i].body = newValue;
    }
  }
  return newState;
};

export const findIndexInData = (data, property, value) => {
  let objectIndex = -1;
  let objectData = {};
  data.some(function (item, i) {
    if (item[property] === value) {
      objectIndex = i;
      objectData = item;
      return true;
    }
  });
  return [objectIndex, objectData];
};

// insertByIndexInArray
export const insertByIndexInArray = (arr, index, newItem) => {
  const ID = uuidv4();
  const new_obj = changeObjectProperty(newItem, "id", ID);
  return [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    new_obj,
    // part of the array after the specified index
    ...arr.slice(index),
  ];
};

// addNewObjectToArray
export const addNewObjectToArray = (arr, index, newItem) => {
  return [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index),
  ];
};

// findByIdAndUpdateTreeTile
export const findByIdAndUpdateTreeTile = (state, id, newValue) => {
  let newState = state;
  for (let i in newState) {
    if (newState[i].id === id) {
      newState[i].title = newValue;
    }
  }
  return newState;
};
// findByIdAndUpdateTreeURL
export const findByIdAndUpdateTreeURL = (state, id, newValue) => {
  let newState = state;
  for (let i in newState) {
    if (newState[i].id === id) {
      newState[i].linkURL = newValue;
    }
  }
  return newState;
};

export const changeObjectProperty = (
  newObject,
  propertyName,
  propertyValue
) => {
  const new_obj = { ...newObject, [`${propertyName}`]: propertyValue };
  return new_obj;
};
