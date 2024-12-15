import User from './models/userModel';
import TODO from './models/todoModel';

// Define associations
User.hasMany(TODO, {
  foreignKey: 'userId',
  as: 'todos',
});

TODO.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

export { User, TODO };