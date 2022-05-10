const sqlQuery = require('../sqlQuerry')

app.get('/api/regions/get', async (req,res) => {
    let page = req.query.page ? req.query.page : 0
    let num = req.query.num ? req.query.num : 100

    const result = await sqlQuery.sqlQuery('SELECT * FROM regions')
    const data = {
        status: 'success',
        data: result.slice(page*num, page * num + num),
        page: page,
        count: result.slice(page*num, page * num + num).length,
        total: result.length
    }

    res.json(data)
})

app.post('/api/regions/add', async (req,res) => {
    console.log('oui')
    let selected = req.body
    console.log(selected)
    const result = await sqlQuery.sqlQuery("INSERT INTO `regions` (`id`, `name`) VALUES (NULL, ?)",[selected.name])
    res.json(result)
})