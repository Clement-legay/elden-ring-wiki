const sqlQuery = require('../sqlQuerry')
const {saveImageToDisk} = require("../sqlQuerry");

app.get('/api/armors/get', async (req,res) => {
    let page = req.query.page ? req.query.page : 0
    let num = req.query.num ? req.query.num : 100

    const result = await sqlQuery.sqlQuery('SELECT * FROM armors')
    const data = {
        status: 'success',
        data: result.slice(page*num, page * num + num),
        page: page,
        count: result.slice(page*num, page * num + num).length,
        total: result.length
    }

    res.json(data)
})

app.get('/api/armors/get/:name', async (req,res) => {
    const result = await sqlQuery.sqlQuery(`SELECT * FROM armors WHERE name = '${req.params.name.replaceAll('+', ' ').replaceAll("'", "\\'")}'`)
    res.json(result[0])
})

app.get('/api/armors/get/:id', async (req,res) => {
    const result = await sqlQuery.sqlQuery(`SELECT * FROM armors WHERE id = ${req.params.id}`)
    res.json(result[0])
})

app.delete('/api/armors/delete/:id', async (req,res) => {
    const result = await sqlQuery.sqlQuery(`DELETE FROM armors WHERE id = ${req.params.id}`)
    res.json(result)
})

app.put('/api/armors/update/:id', async (req,res) => {
    let selected = req.body
    const result = await sqlQuery.sqlQuery(`UPDATE armors SET name = '${selected.name}', weight = ${selected.weight}, category = '${selected.category}', desc = '${selected.description}', img = '${selected.img}', resistance = '${selected.resistance}', dmgNegat = '${selected.dmgNegat}' WHERE id = ${selected.id}`)
    res.json(result)
})

app.post('/api/armors/add', async (req,res) => {
    console.log('oui')
    let selected = req.body
    const result = await sqlQuery.sqlQuery("INSERT INTO `armors` (`id`, `name`, `weight`, `category`, `desc`, `img`, `resistance`, `dmgNegat`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)",[selected.name, selected.weight, selected.category, selected.description, selected.image, JSON.stringify(selected.resistance), JSON.stringify(selected.dmgNegation)])
    res.json(result)
})

app.put('/api/armors/updateall', async (req,res) => {
    const result = await sqlQuery.sqlQuery('SELECT * FROM armors')

    result.forEach(armor => {
        let path = `/images/armors/armor_${armor.id}.png`
        saveImageToDisk(armor.img, "." + path)
        sqlQuery.sqlQuery('UPDATE armors SET img = ? WHERE id = ?', [path, armor.id])
    })

})