export const isEmpty = (attributes, data) => {
  const modelAttributes = { ...attributes };
  delete modelAttributes.id;
  delete modelAttributes.createdAt;
  delete modelAttributes.updatedAt;

  for (const key in modelAttributes) {
    if (data[key] === undefined || data[key] === null || data[key] === "") {
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

export const isValidRole = (role) => {
  const roles = [0, 1, 2];
  return roles.includes(role);
}