const sqlQuery = require('../sqlQuerry')
const {saveImageToDisk} = require("../sqlQuerry");

app.get('/api/mobs/get', async (req,res) => {
    let page = req.query.page ? req.query.page : 0
    let num = req.query.num ? req.query.num : 100

    const result = await sqlQuery.sqlQuery('SELECT * FROM mobs')
    const data = {
        status: 'success',
        data: result.slice(page*num, page * num + num),
        page: page,
        count: result.slice(page*num, page * num + num).length,
        total: result.length
    }

    res.json(data)
})

app.post('/api/mobs/add', async (req,res) => {
    console.log('oui')
    let selected = req.body
    const result = await sqlQuery.sqlQuery("INSERT INTO `mobs` (`id`, `img`, `desc`, `note`, `location`, `name`, `drops`, `category`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)",[selected.image, selected.description, selected.note, selected.location, selected.name, JSON.stringify(selected.drops), selected.category])
    res.json(result)
})

app.put('/api/mobs/updateAll', async (req,res) => {
    const result = await sqlQuery.sqlQuery('SELECT * FROM mobs')

    result.forEach(mobs => {
        let path = `/images/mobs/mobs_${mobs.id}.png`
        saveImageToDisk(mobs.img, "." + path)
        sqlQuery.sqlQuery('UPDATE mobs SET img = ? WHERE id = ?', [path, mobs.id])
    })

})