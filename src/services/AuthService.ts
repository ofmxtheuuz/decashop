import { Repository } from "typeorm";
import { User } from "../../database/models/User";
import { MysqlContext } from "../../database/mysql.context";
import * as bcrypt from "bcrypt"

const SALT_ROUNDS = 10

interface CreateUser {
  name: string;
  username: string;
  email: string;
}

export class AuthService {
  private readonly _r: Repository<User>
  constructor() {
    this._r = MysqlContext.getRepository(User)
  }

  async CreateUser(ifs: CreateUser, password: string): Promise<Boolean> {
    const hash = bcrypt.hashSync(password, SALT_ROUNDS)
    let user = new User()
    user.name = ifs.name
    user.username = ifs.username
    user.email = ifs.email
    user.password = hash
    await this._r.save(user)
    return true;
  }

  async authenticate(password: string, user_password: string) {
    if(bcrypt.compareSync(password, user_password)) {
      return true
    } else {
      return false
    }
  }

  async findById(id: string) {
    return await this._r.findOne({where:{id}})
  }

  async findByEmail(email: string) {
    return await this._r.findOne({where:{email}})
  }

  async findByName(name: string) {
    return await this._r.findOne({where:{name}})
  }

  async findByUsername(username: string) {
    return await this._r.findOne({where:{username}})
  }
}