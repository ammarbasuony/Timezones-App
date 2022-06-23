// function check that every attribute in an object is not empty
export const isEmpty = (attributes, data) => {
  delete attributes.id;
  delete attributes.createdAt;
  delete attributes.updatedAt;

  for (const key in attributes) {
    if (!data[key]) {
      return true;
    }
  }

  return false;
};

export const isRecordExists = async (model, data) => {
  const record = await model.findOne({
    where: data,
  });

  return record;
};

export const isValidEmail = (email) => {
  return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
};
