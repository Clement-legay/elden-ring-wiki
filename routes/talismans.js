const sqlQuery = require('../sqlQuerry')
const {saveImageToDisk} = require("../sqlQuerry");

app.get('/api/talismans/get', async (req,res) => {
    let page = req.query.page ? req.query.page : 0
    let num = req.query.num ? req.query.num : 100

    const result = await sqlQuery.sqlQuery('SELECT * FROM talismans')
    const data = {
        status: 'success',
        data: result.slice(page*num, page * num + num),
        page: page,
        count: result.slice(page*num, page * num + num).length,
        total: result.length
    }

    res.json(data)
})

app.get('/api/talismans/get/:name', async (req,res) => {
    const result = await sqlQuery.sqlQuery(`SELECT * FROM talismans WHERE name = '${req.params.name.replaceAll('+', ' ').replaceAll("'", "\\'")}'`)
    res.json(result[0])
})

app.post('/api/talismans/add', async (req,res) => {
    console.log('oui')
    let selected = req.body
    const result = await sqlQuery.sqlQuery("INSERT INTO `talismans` (`id`, `effect`, `img`, `name`, `category`, `desc`) VALUES (NULL, ?, ?, ?, ?, ?)",[selected.effect, selected.image, selected.name, selected.category, selected.description])
    res.json(result)
})

app.put('/api/talismans/updateAll', async (req,res) => {
    const result = await sqlQuery.sqlQuery('SELECT * FROM talismans')

    result.forEach(talismans => {
        let path = `/images/talismans/talismans_${talismans.id}.png`
        saveImageToDisk(talismans.img, "." + path)
        sqlQuery.sqlQuery('UPDATE talismans SET img = ? WHERE id = ?', [path, talismans.id])
    })

})