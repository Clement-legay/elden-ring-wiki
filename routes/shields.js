const sqlQuery = require('../sqlQuerry')
const {saveImageToDisk} = require("../sqlQuerry");

app.get('/api/shields/get', async (req,res) => {
    let page = req.query.page ? req.query.page : 0
    let num = req.query.num ? req.query.num : 100

    const result = await sqlQuery.sqlQuery('SELECT * FROM shields')
    const data = {
        status: 'success',
        data: result.slice(page*num, page * num + num),
        page: page,
        count: result.slice(page*num, page * num + num).length,
        total: result.length
    }

    res.json(data)
})

app.post('/api/shields/add', async (req,res) => {
    console.log('oui')
    let selected = req.body
    const result = await sqlQuery.sqlQuery("INSERT INTO `shields` (`id`, `img`, `desc`, `category`, `name`, `defence`, `requiredAttr`, `scaling`, `weight`, `attack`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[selected.image, selected.description, selected.category, selected.name, JSON.stringify(selected.defence), JSON.stringify(selected.requiredAttributes), JSON.stringify(selected.scalesWith), selected.weight, JSON.stringify(selected.attack)])
    res.json(result)
})

app.put('/api/shields/updateAll', async (req,res) => {
    const result = await sqlQuery.sqlQuery('SELECT * FROM shields')

    result.forEach(shields => {
        let path = `/images/shields/shields_${shields.id}.png`
        saveImageToDisk(shields.img, "." + path)
        sqlQuery.sqlQuery('UPDATE shields SET img = ? WHERE id = ?', [path, shields.id])
    })

})