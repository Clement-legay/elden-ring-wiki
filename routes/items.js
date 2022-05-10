const sqlQuery = require('../sqlQuerry')
const {saveImageToDisk} = require("../sqlQuerry");

app.get('/api/items/get', async (req,res) => {
    let page = req.query.page ? req.query.page : 0
    let num = req.query.limit ? req.query.limit : 100

    const result = await sqlQuery.sqlQuery('SELECT * FROM items')
    const data = {
        status: 'success',
        data: result.slice(page*num, page * num + num),
        page: page,
        count: result.slice(page*num, page * num + num).length,
        total: result.length
    }

    res.json(data)
})

app.post('/api/items/add', async (req,res) => {
    console.log('oui')
    let selected = req.body
    const result = await sqlQuery.sqlQuery("INSERT INTO `items` (`id`, `effect`, `desc`, `img`, `name`, `type`, `category`) VALUES (NULL, ?, ?, ?, ?, ?, ?)",[selected.effect, selected.description, selected.image, selected.name, selected.type, selected.category])
    res.json(result)
})

app.put('/api/items/updateAll', async (req,res) => {
    const result = await sqlQuery.sqlQuery('SELECT * FROM items')

    result.forEach(items => {
        let path = `/images/items/items_${items.id}.png`
        saveImageToDisk(items.img, "." + path)
        sqlQuery.sqlQuery('UPDATE items SET img = ? WHERE id = ?', [path, items.id])
    })

})