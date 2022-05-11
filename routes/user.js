const sqlQuery = require('../sqlQuerry')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.post('/api/user/login', async (req, res) => {
    const {mail, password} = req.body

    const user = await sqlQuery.sqlQuery(`SELECT * FROM users WHERE email = '${mail}'`)
    if (user.length > 0) {
        const hash = user[0].password
        if (await bcrypt.compare(password, hash)) {
            const payload = {
                id: user[0].id,
                email: user[0].email,
                admin: user[0].admin
            }
            jwt.sign(payload, "PARADIGME", {expiresIn: '30d'}, (err, token) => {
                if (err) {
                    res.json({status: 'error', message: 'Internal error'})
                } else {
                    res.json({status: 'success', token: token})
                }
            })
        } else {
            res.json({status: 'error', message: 'Password is wrong'})
        }
    } else {
        res.json({status: 'error', message: 'User not found'})
    }
})

app.post('/api/user/register', async (req, res) => {
    const mail = req.body.mail
    const password = await bcrypt.hash(req.body.password, 10)

    const user = await sqlQuery.sqlQuery(`SELECT * FROM users WHERE email = '${mail}'`)
    if (user.length > 0) {
        res.json({status: 'error', message: 'Email is already used'})
    } else {
        await sqlQuery.sqlQuery(`INSERT INTO users (email, password) VALUES ('${mail}', '${await password}')`)
        res.json({status: 'success', message: 'User created'})
    }
})

app.post('/api/user/checkToken', async (req, res) => {
    const token = req.body.token
    jwt.verify(token, "PARADIGME", {expiresIn: '30d'}, (err, decoded) => {
        if (err) {
            res.json({status: 'error', result: decoded})
        } else {
            res.json({status: 'success', message: decoded})
        }
    })
})