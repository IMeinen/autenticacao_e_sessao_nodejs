import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
/* modelo de usuário para o postgres */
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    /* criptografia da senha */
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
  /* checagem da senha */
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
