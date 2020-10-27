import JWT from 'jsonwebtoken';
import { Request, Response } from 'express';

const signToken = (user: any) => {
  return JWT.sign(
    {
      iss: 'TaskManager',
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    'SuperSecretJWT'
  );
};

export default {
  googleOAuth2: async (req: Request, res: Response) => {
    const token = signToken(req.user);
    res.cookie('access_token', token, {
      httpOnly: true,
    });
    res.status(200).json({ success: true, token });
  },
  signOut: async (req: Request, res: Response) => {
    res.clearCookie('access_token');
    res.json({ success: true });
  },
  profile: async (req: Request, res: Response) => {
    res.json({ success: true, profile: req.user });
  },
};
