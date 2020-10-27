import passport from 'passport';
import passportJwt, {
  ExtractJwt,
  VerifiedCallback,
} from 'passport-jwt';
const JwtStrategy = passportJwt.Strategy;
import GooglePlusTokenStrategy from 'passport-google-plus-token';
import User, { IUser } from './models/user';
import { Request } from 'express';

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: 'SuperSecretJWT',
    },
    async (payload: any, done: VerifiedCallback) => {
      try {
        const user: IUser | null = await User.findById(payload.sub);
        if (!user) {
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

enum AuthenticationMethod {
  GOOGLE = 'google',
}

passport.use(
  'googleToken',
  new GooglePlusTokenStrategy(
    {
      clientID:
        '1095678003481-73p73e2k71189h3plkdejmqa8mroqr1g.apps.googleusercontent.com',
      clientSecret: 'PAWHDNZlmXvQe4vh5GDmLAjz',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
    },
    async (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: VerifiedCallback
    ) => {
      try {
        const existingUser: IUser | null = await User.findOne({
          'google.id': profile.id,
        });
        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser: IUser = new User({
          method: AuthenticationMethod.GOOGLE,
          google: {
            id: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
            thumbImage:
              profile.photos && profile.photos.length !== 0
                ? profile.photos[0].value
                : undefined,
          },
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);
