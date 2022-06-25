const Timezone = (db, type) => {
  return db.define("timezones", {
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: type.STRING,
      allowNull: false,
    },
    city_name: {
      type: type.STRING,
      allowNull: false,
    },
    gmt_diff: {
      type: type.INTEGER,
      allowNull: false,
    },
  });
};

export default Timezone;