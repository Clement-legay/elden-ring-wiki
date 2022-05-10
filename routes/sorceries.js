const sqlQuery = require('../sqlQuerry')
const {saveImageToDisk} = require("../sqlQuerry");

app.get('/api/sorceries/get', async (req,res) => {
    let page = req.query.page ? req.query.page : 0
    let num = req.query.num ? req.query.num : 100

    const result = await sqlQuery.sqlQuery('SELECT * FROM sorceries')
    const data = {
        status: 'success',
        data: result.slice(page*num, page * num + num),
        page: page,
        count: result.slice(page*num, page * num + num).length,
        total: result.length
    }

    res.json(data)
})

app.post('/api/sorceries/add', async (req,res) => {
    console.log('oui')
    let selected = req.body
    const result = await sqlQuery.sqlQuery("INSERT INTO `sorceries` (`id`, `img`, `desc`, `effects`, `name`, `stats`, `slots`, `type`, `cost`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)",[selected.image, selected.description, selected.effects, selected.name, JSON.stringify(selected.stats), selected.slots, selected.type, selected.cost])
    res.json(result)
})

app.put('/api/sorceries/updateAll', async (req,res) => {
    const result = await sqlQuery.sqlQuery('SELECT * FROM sorceries')

    result.forEach(sorceries => {
        let path = `/images/sorceries/sorceries_${sorceries.id}.png`
        saveImageToDisk(sorceries.img, "." + path)
        sqlQuery.sqlQuery('UPDATE sorceries SET img = ? WHERE id = ?', [path, sorceries.id])
    })

})