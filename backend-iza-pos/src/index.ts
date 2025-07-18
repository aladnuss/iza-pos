import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import userRoutes from './routes/userRoutes'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`)
})
