import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import hpp from 'hpp'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import {notFound, errorHandler} from './middleware/errorHandler.mjs'
import SQLconnector from './utilities/SQLconnector.mjs'
import invoicesRouter from './routers/invoicesRouter.mjs'
import usersRouter from './routers/usersRouter.mjs'
const MODE = process.env.NODE_ENV || 'production'
const PORT = process.env.EXPRESS_PORT || 5000
SQLconnector()
const server = express()
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cookieParser())
server.use(cors())
server.use(helmet())
server.use(helmet.xssFilter())
server.use(hpp())
server.use(rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
}))
server.use('/api/users', usersRouter)
server.use('/api/invoices', invoicesRouter)
server.use(notFound)
server.use(errorHandler)
server.listen(PORT, () => console.log(`Server running on localhost:${PORT} in ${MODE} mode.`))