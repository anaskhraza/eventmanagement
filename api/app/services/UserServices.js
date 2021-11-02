import UserRepository from "../repository/UserRepository";
// import { rolesDTO } from "../DTO/rbacDTO";

class UserServices {
  constructor(db) {
    this.database = db;
    this.userRepository = new UserRepository(db.User);
  }

  async getAllUsers() {

    return await this.userRepository.getAllUsers();
  }

  async getUser(username) {
    return await this.userRepository.getUser(username);
  }

  async comparePassword (password, userResponse) {
    return await this.userRepository.comparePassword(password, userResponse);
  }

  async createUser(name) {
    return await this.userRepository.createUser(name);
  }
  
}

export default UserServices;
