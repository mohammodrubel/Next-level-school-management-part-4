import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { Server } from 'http'

let server: Server
async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string)
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()

process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () => {
  process.exit(1)
})
