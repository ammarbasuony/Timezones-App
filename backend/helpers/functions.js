// function check that every attribute in an object is not empty
export const isEmpty = (attributes, data) => {
  delete attributes.createdAt;
  delete attributes.updatedAt;

  for (const key in attributes) {
    if (!data[key]) {
      return true;
    }
  }

  return false;
};

console.log(isEmpty({}));
console.log(isEmpty({ a: 1 }));
console.log(isEmpty({ a: 1, b: "" }));
