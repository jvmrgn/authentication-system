import express from 'express';
import session from 'express-session';

import home from './routes/home.js'
import login from './routes/login.js'
import register from './routes/register.js'
import personalPage from './routes/personalPage.js'

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: true
}));

app.use('/', home);
app.use('/loginPage', login);
app.use('/register', register);
app.use('/personalPage', personalPage);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});