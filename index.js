pp.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const exphbs = require('express-handlebars');

const app = express();

// Set up Handlebars.js as the template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.get('/', (req, res) => {
    res.render('index', { title: 'My App', message: 'Hello, world!' });
  });