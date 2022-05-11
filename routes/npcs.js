const sqlQuery = require('../sqlQuerry')
const {saveImageToDisk} = require("../sqlQuerry");

app.get('/api/NPCs/get', async (req,res) => {
    let page = req.query.page ? req.query.page : 0
    let num = req.query.num ? req.query.num : 100

    const result = await sqlQuery.sqlQuery('SELECT * FROM npcs')
    const data = {
        status: 'success',
        data: result.slice(page*num, page * num + num),
        page: page,
        count: result.slice(page*num, page * num + num).length,
        total: result.length
    }

    res.json(data)
})

app.get('/api/NPCs/get/:name', async (req,res) => {
    const result = await sqlQuery.sqlQuery(`SELECT * FROM npcs WHERE name = '${req.params.name.replaceAll('+', ' ').replaceAll("'", "\\'")}'`)
    res.json(result[0])
})

app.post('/api/NPCs/add', async (req,res) => {
    console.log('oui')
    let selected = req.body
    const result = await sqlQuery.sqlQuery("INSERT INTO `NPCs` (`id`, `img`, `desc`, `quote`, `location`, `name`, `drops`) VALUES (NULL, ?, ?, ?, ?, ?, ?)",[selected.image, selected.description, selected.quote, selected.location, selected.name, JSON.stringify(selected.drops)])
    res.json(result)
})

app.put('/api/NPCs/updateAll', async (req,res) => {
    const result = await sqlQuery.sqlQuery('SELECT * FROM npcs')

    result.forEach(npcs => {
        let path = `/images/NPCs/npcs_${npcs.id}.png`
        saveImageToDisk(npcs.img, "." + path)
        sqlQuery.sqlQuery('UPDATE npcs SET img = ? WHERE id = ?', [path, npcs.id])
    })

})