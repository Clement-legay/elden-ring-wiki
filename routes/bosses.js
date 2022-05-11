const sqlQuery = require('../sqlQuerry')
const {saveImageToDisk} = require("../sqlQuerry");

app.get('/api/bosses/get', async (req,res) => {
    let page = req.query.page ? req.query.page : 0
    let num = req.query.limit ? req.query.limit : 100

    const result = await sqlQuery.sqlQuery('SELECT * FROM bosses')
    const data = {
        status: 'success',
        data: result.slice(page*num, page * num + num),
        page: page,
        count: result.slice(page*num, page * num + num).length,
        total: result.length
    }

    res.json(data)
})

app.get('/api/bosses/get/:name', async (req,res) => {
    const result = await sqlQuery.sqlQuery(`SELECT * FROM bosses WHERE name = '${req.params.name.replaceAll('+', ' ').replaceAll("'", "\\'")}'`)
    res.json(result[0])
})

app.post('/api/bosses/add', async (req,res) => {
    let selected = req.body
    const result = await sqlQuery.sqlQuery("INSERT INTO `bosses` (`id`, `img`, `desc`, `healthPoints`, `location`, `name`, `drops`, `type`, `region`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)",[selected.image, selected.description, JSON.stringify(selected.healthPoints), selected.location, selected.name, JSON.stringify(selected.drops), selected.type, selected.region])
    res.json(result)
})

app.put('/api/bosses/updateall', async (req,res) => {
    const result = await sqlQuery.sqlQuery('SELECT * FROM bosses')

    result.forEach(boss => {
        let path = `/images/bosses/boss_${boss.id}.png`
        saveImageToDisk(boss.img, "." + path)
        sqlQuery.sqlQuery('UPDATE bosses SET img = ? WHERE id = ?', [path, boss.id])
    })

})