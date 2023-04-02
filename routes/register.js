import express from 'express';
import bcrypt from 'bcrypt';

import User from '../database/dbConnect.js'

const router = express.Router();

router.get('/', (req, res) => {
    res.render('registerPage');
  });
  
  router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
  
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).redirect('./loginPage?msg=registrado');
  
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
  
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
  
    res.redirect('/loginPage?msg=success');
    
  });

  export default router