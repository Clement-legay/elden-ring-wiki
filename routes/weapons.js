const sqlQuery = require('../sqlQuerry')
const {saveImageToDisk} = require("../sqlQuerry");

app.get('/api/weapons/get', async (req,res) => {
    let page = req.query.page ? req.query.page : 0
    let num = req.query.num ? req.query.num : 100

    const result = await sqlQuery.sqlQuery('SELECT * FROM weapons')
    const data = {
        status: 'success',
        data: result.slice(page*num, page * num + num),
        page: page,
        count: result.slice(page*num, page * num + num).length,
        total: result.length
    }

    res.json(data)
})

app.post('/api/weapons/add', async (req,res) => {
    console.log('oui')
    let selected = req.body
    const result = await sqlQuery.sqlQuery("INSERT INTO `weapons` (`id`, `img`, `desc`, `category`, `name`, `defence`, `requiredAttr`, `scaling`, `weight`, `attack`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[selected.image, selected.description, selected.category, selected.name, JSON.stringify(selected.defence), JSON.stringify(selected.requiredAttributes), JSON.stringify(selected.scalesWith), selected.weight, JSON.stringify(selected.attack)])
    res.json(result)
})

app.put('/api/weapons/update/:id', async (req,res) => {
    let selected = req.body
    const result = await sqlQuery.sqlQuery("UPDATE `weapons` SET `img` = ?, `desc` = ?, `category` = ?, `name` = ?, `defence` = ?, `requiredAttr` = ?, `scaling` = ?, `weight` = ?, `attack` = ? WHERE `weapons`.`id` = ?",[selected.image, selected.description, selected.category, selected.name, JSON.stringify(selected.defence), JSON.stringify(selected.requiredAttributes), JSON.stringify(selected.scalesWith), selected.weight, JSON.stringify(selected.attack), selected.id])
    res.json(result)
})

app.get('/api/weapons/get/:id', async (req,res) => {
    const result = await sqlQuery.sqlQuery("SELECT * FROM `weapons` WHERE `weapons`.`id` = ?",[req.params.id])
    res.json(result[0])
})

app.delete('/api/weapons/delete/:id', async (req,res) => {
    const result = await sqlQuery.sqlQuery("DELETE FROM `weapons` WHERE `weapons`.`id` = ?",[req.params.id])
    res.json(result)
})

app.put('/api/weapons/updateAll', async (req,res) => {
    const result = await sqlQuery.sqlQuery('SELECT * FROM weapons')

    result.forEach(weapons => {
        let path = `/images/weapons/weapons_${weapons.id}.png`
        saveImageToDisk(weapons.img, "." + path)
        sqlQuery.sqlQuery('UPDATE weapons SET img = ? WHERE id = ?', [path, weapons.id])
    })

})