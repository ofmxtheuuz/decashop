import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { AuthService } from "../services/AuthService";
import { User } from '../../database/models/User';

const _as = new AuthService();
export async function verify(
  username: string, 
  password: string, 
  done: (error: any, user?: any) => void) {
    const user = await _as.findByUsername(username) 
    if(user != null) {
      const user_password = user.password
      if(user_password != null) {
        if(await _as.authenticate(password, user_password)) {
          return done(null, user)
        } else {
          return done(false);
        }
      }
    } else {
      return done(false);
    }
}

passport.serializeUser((user: any, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async function(id: any, cb) {
  const user = await _as.findById(id)
  return cb(null, user);
});