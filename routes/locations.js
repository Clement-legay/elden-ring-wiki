const sqlQuery = require('../sqlQuerry')
const {saveImageToDisk} = require("../sqlQuerry");

app.get('/api/locations/get', async (req,res) => {
    let page = req.query.page ? req.query.page : 0
    let num = req.query.num ? req.query.num : 100

    const result = await sqlQuery.sqlQuery('SELECT * FROM locations')
    const data = {
        status: 'success',
        data: result.slice(page*num, page * num + num),
        page: page,
        count: result.slice(page*num, page * num + num).length,
        total: result.length
    }

    res.json(data)
})

app.get('/api/locations/get/:name', async (req,res) => {
    const result = await sqlQuery.sqlQuery(`SELECT * FROM locations WHERE name = '${req.params.name.replaceAll('+', ' ').replaceAll("'", "\\'")}'`)
    res.json(result[0])
})

app.post('/api/locations/add', async (req,res) => {
    let selected = req.body

    let path = `/images/locations/location_${selected.id}.png`
    await saveImageToDisk(selected.image, "." + path)
    const result = await sqlQuery.sqlQuery("INSERT INTO `locations` (`id`, `name`, `image`, `desc`, `region`, `category`) VALUES (NULL, ?, ?, ?, ?, ?)",[selected.name, path, selected.desc, selected.region + 8, selected.category])
    res.json(result)
})