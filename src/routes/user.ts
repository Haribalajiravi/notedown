import express, { Router } from 'express';
const router: Router = express.Router();
import passport from 'passport';
import './../passport';
import UsersController from './../controller/user';
const passportJWT: any = passport.authenticate('jwt', {
  session: false,
});
const googleOAuth2: any = passport.authenticate('googleToken', {
  session: false,
});

router
  .route('/oauth2/google')
  .post(googleOAuth2, UsersController.googleOAuth2);
router.route('/signout').get(passportJWT, UsersController.signOut);
router.route('/profile').get(passportJWT, UsersController.profile);

export default router;
