
import pkg from 'passport-jwt'
import User from '../models/user.js'
import * as dotenv from 'dotenv'
dotenv.config()
const JwtStrategy=pkg.Strategy
const ExtractJwt=pkg.ExtractJwt

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
export default (passport)=>{


passport.use(new JwtStrategy(opts, function (jwt_payload, done) {

User.findById( jwt_payload._id).then((user) => {
    
    if(user) {
        return done(null, user);
    }
    return done(null, false);
});
}));
}