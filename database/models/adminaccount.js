const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AdminAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  AdminAccount.init({
    userName: DataTypes.STRING,
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'AdminAccount',
  });
  return AdminAccount;
};
