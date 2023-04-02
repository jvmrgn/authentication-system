import express from 'express';
import bcrypt from 'bcrypt';

import User from '../database/dbConnect.js'

const router = express.Router();

router.get('/', (req, res) => {
    const msg = req.query.msg;
    res.render('loginPage', { msg });
  });
    
  router.post('/', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).redirect('./loginPage?msg=naoencontrado');
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).redirect('./loginPage?msg=invalido');
  
    req.session.userId = user._id;
  
    res.redirect('/personalPage');
  });

export default router;
