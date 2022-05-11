const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const query = require('./sqlQuerry');
const fs = require("fs");

corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}

app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(express.static('file'));

query.db.connect((err) => {
    if (err) throw err;
})


require('./routes/armors')
require('./routes/weapons')
require('./routes/spirits')
require('./routes/talismans')
require('./routes/shields')
require('./routes/items')
require('./routes/sorceries')
require('./routes/incantations')
require('./routes/ashesWar')
require('./routes/npcs')
require('./routes/mobs')
require('./routes/bosses')
require('./routes/locations')
require('./routes/regions')
require('./routes/full_set')
require('./routes/user')


app.get('/images/:file/:image', (req, res) => {
    let path = `${__dirname}/images/${req.params.file}/${req.params.image}`
    if (fs.existsSync(path)) {
        res.sendFile(path);
    }
    else {
        res.sendFile(`${__dirname}/images/default.png`);
    }
})

app.listen(3000)
