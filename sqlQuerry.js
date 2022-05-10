const mysql = require("mysql");
const {saveImageToDisk} = require("./sqlQuerry");
const fs = require("fs");
const https = require("https");

exports.db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "eldenWiki",
        port: 3306,
    }
)

exports.sqlQuery = (query, params=false) => {
    return new Promise((resolve, reject) => {
        if (!params) {
            this.db.query(query, (error, result) => {
                if (error) reject(error);
                resolve(result)
            })
        } else {
            this.db.query(query, params, (error, result) => {
                if (error) reject(error);
                resolve(result)
            })
        }
    })
}

exports.saveImageToDisk = (url, path) => {
    if (url !== null) {
        let fullUrl = url

        console.log('yes')

        let localPath = fs.createWriteStream(path)

        let request = https.get(fullUrl, function(response) {
            response.pipe(localPath)
        })

        return path
    } else {
        return null
    }
}