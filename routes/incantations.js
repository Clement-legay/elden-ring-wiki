const sqlQuery = require('../sqlQuerry')
const {saveImageToDisk} = require("../sqlQuerry");

app.get('/api/incantations/get', async (req,res) => {
    let page = req.query.page ? req.query.page : 0
    let num = req.query.num ? req.query.num : 100

    const result = await sqlQuery.sqlQuery('SELECT * FROM incantations')
    const data = {
        status: 'success',
        data: result.slice(page*num, page * num + num),
        page: page,
        count: result.slice(page*num, page * num + num).length,
        total: result.length
    }

    res.json(data)
})

app.post('/api/incantations/add', async (req,res) => {
    console.log('oui')
    let selected = req.body
    const result = await sqlQuery.sqlQuery("INSERT INTO `incantations` (`id`, `img`, `desc`, `effects`, `name`, `stats`, `slots`, `type`, `cost`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)",[selected.image, selected.description, selected.effects, selected.name, JSON.stringify(selected.stats), selected.slots, selected.type, selected.cost])
    res.json(result)
})

app.put('/api/incantations/updateAll', async (req,res) => {
    const result = await sqlQuery.sqlQuery('SELECT * FROM incantations')

    result.forEach(incantation => {
        let path = `/images/incantations/incantation_${incantation.id}.png`
        saveImageToDisk(incantation.img, "." + path)
        sqlQuery.sqlQuery('UPDATE incantations SET img = ? WHERE id = ?', [path, incantation.id])
    })

})