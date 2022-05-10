const sqlQuery = require('../sqlQuerry')
const {saveImageToDisk} = require("../sqlQuerry");

app.get('/api/ashesWar/get', async (req,res) => {
    let page = req.query.page ? req.query.page : 0
    let num = req.query.num ? req.query.num : 100

    const result = await sqlQuery.sqlQuery('SELECT * FROM asheswar')
    const data = {
        status: 'success',
        data: result.slice(page*num, page * num + num),
        page: page,
        count: result.slice(page*num, page * num + num).length,
        total: result.length
    }

    res.json(data)
})

app.post('/api/ashesWar/add', async (req,res) => {
    console.log('oui')
    let selected = req.body
    const result = await sqlQuery.sqlQuery("INSERT INTO `ashesWar` (`id`, `img`, `desc`, `affinity`, `type`, `skill`, `name`) VALUES (NULL, ?, ?, ?, ?, ?, ?)",[selected.image, selected.description, selected.affinity, selected.type, selected.skill, selected.name])
    res.json(result)
})

app.put('/api/ashesWar/updateall', async (req,res) => {
    const result = await sqlQuery.sqlQuery('SELECT * FROM asheswar')

    result.forEach(ashe => {
        let path = `/images/ashesWar/ashe_${ashe.id}.png`
        saveImageToDisk(ashe.img, "." + path)
        sqlQuery.sqlQuery('UPDATE asheswar SET img = ? WHERE id = ?', [path, ashe.id])
    })

})