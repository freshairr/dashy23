require('dotenv').config({path: __dirname + '/.env',debug: true })

module.exports={ port: process.env.PORT || console.log('cant find port, default is', 4000) && 4000, connectionURL: process.env.MONGOOSE_CONNECTION_URL }
