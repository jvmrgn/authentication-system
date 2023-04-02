import express from 'express';

import User from '../database/dbConnect.js'

const router = express.Router();

const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
      return res.redirect('/loginPage');
    }
    next();
  };  

router.get('/', requireAuth, async (req, res) => {
    if (!req.session.userId) {
      return res.redirect('/loginPage');
    }
  
    try {
      const user = await User.findById(req.session.userId);
        res.render('personalPage', { username: user.name });
    } catch (err) {
      console.error(err);
      return res.status(500).send('Erro interno do servidor.');
    }
  });

export default router