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

/**
 * @swagger
 * /user/oauth2/google:
 *  post:
 *    description: Get JWT token from Google authentication
 *    consumes:
 *      - application/json
 *    security: []
 *    requestBody:
 *      description: Provide Google OAuth2 access token
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - access_token
 *            properties:
 *              access_token:
 *                type: string
 *    responses:
 *      200:
 *        description: Get a JWT token
 *      401:
 *        description: Unauthorized access
 *      500:
 *        description: Access token expired
 */
router
  .route('/oauth2/google')
  .post(googleOAuth2, UsersController.googleOAuth2);
router.route('/signout').get(passportJWT, UsersController.signOut);
/**
 * @swagger
 * /user/profile:
 *  get:
 *    description: Get user profile
 *    security:
 *      - jwt: []
 *    responses:
 *      200:
 *        description: list user profile
 *      401:
 *        description: Unauthrization
 */
router.route('/profile').get(passportJWT, UsersController.profile);

export default router;
