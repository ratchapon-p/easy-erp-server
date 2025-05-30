import express from 'express';
import cors from 'cors'
import { connect } from '../config/dbConnect.js';
import userRoutes from '../routes/users.js';
import { connection2 } from '../config/dbConnect2.js';
import productRoutes from '../routes/products.js';
import scannerRoutes from '../routes/scanner.js';

// connect()
connection2()

const app = express();
app.use(express.json())
app.use(cors())

    
  
app.use('/api/v1/auth',userRoutes)
app.use('/api/v1/product',productRoutes)
app.use('/api/v1/scanner',scannerRoutes)

export default app;