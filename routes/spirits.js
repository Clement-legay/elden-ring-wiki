const sqlQuery = require('../sqlQuerry')
const {saveImageToDisk} = require("../sqlQuerry");

app.get('/api/spirits/get', async (req,res) => {
    let page = req.query.page ? req.query.page : 0
    let num = req.query.num ? req.query.num : 100

    const result = await sqlQuery.sqlQuery('SELECT * FROM spirit')
    const data = {
        status: 'success',
        data: result.slice(page*num, page * num + num),
        page: page,
        count: result.slice(page*num, page * num + num).length,
        total: result.length
    }


    res.json(data)
})

app.post('/api/spirits/add', async (req,res) => {
    console.log('oui')
    let selected = req.body
    const result = await sqlQuery.sqlQuery("INSERT INTO `spirit` (`id`, `img`, `desc`, `effect`, `name`, `fpCost`, `hpCost`, `category`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)",[selected.image, selected.description, selected.effects, selected.name, selected.fpCost, selected.hpCost, selected.category])
    res.json(result)
})

app.put('/api/spirits/update/:id', async (req,res) => {
    let selected = req.body
    const result = await sqlQuery.sqlQuery("UPDATE `spirit` SET `img` = ?, `desc` = ?, `effect` = ?, `name` = ?, `fpCost` = ?, `hpCost` = ?, `category` = ? WHERE `spirit`.`id` = ?",[selected.image, selected.description, selected.effects, selected.name, selected.fpCost, selected.hpCost, selected.category, req.params.id])
    res.json(result)
})

app.get('/api/spirits/get/:id', async (req,res) => {
    const result = await sqlQuery.sqlQuery('SELECT * FROM spirit WHERE id = ?', [req.params.id])
    res.json(result[0])
})

app.delete('/api/weapons/delete/:id', async (req,res) => {
    const result = await sqlQuery.sqlQuery('DELETE FROM spirit WHERE id = ?', [req.params.id])
    res.json(result)
})

app.put('/api/spirits/updateAll', async (req,res) => {
    const result = await sqlQuery.sqlQuery('SELECT * FROM spirit')

    result.forEach(spirits => {
        let path = `/images/spirits/spirits_${spirits.id}.png`
        saveImageToDisk(spirits.img, "." + path)
        sqlQuery.sqlQuery('UPDATE spirit SET img = ? WHERE id = ?', [path, spirits.id])
    })

})