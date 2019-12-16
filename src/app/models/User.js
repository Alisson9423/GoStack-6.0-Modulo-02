module.exports = (sequelize, DataType) => {
  const User = sequelize.define('User', {
    name: DataType.STRING,
    email: DataType.STRING,
    avatr: DataType.STRING,
    password_hash: DataType.STRING,
    provider: DataType.BOOLEAN
  })

  return User
}
