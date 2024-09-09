import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors'

import healthCheckRouter from './src/routes/healthCheck.js'
import authRouter from './src/routes/authRoutes.js'
import categoryRouter from './src/routes/categoryRoutes.js'
import themeRouter from './src/routes/themeRoutes.js'
import contentRouter from './src/routes/contentRoutes.js'
import AuthService from './src/services/AuthService.js';
import rateLimitConfig from './src/config/rateLimitConfig.js';
import swaggerConfig from './src/config/swaggerConfig.js';
const PORT = process.env.PORT ?? 3000
const app = express();

// Middlewares
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    console.log('Production mode: Security and performance prioritized...');
} else {
    app.use(morgan('dev'));
    console.log('Development mode: debugging tools activated...');
}
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(rateLimitConfig)
swaggerConfig(app)


//route handling

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/api/v1/healthcheck', healthCheckRouter);
app.use('/api/v1/auth', authRouter)

app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/themes', themeRouter)
app.use('/api/v1/contents', contentRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Resource not found' })
})
// Error proccessing general Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.stack : {},  // In Dev we include the stack trace
    });
});

//server launch, db connect, create admin...
const bootstrap = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Mongo DB connected')
        await AuthService.createAdmingIfNotExists()
        app.listen(PORT, () => {
            console.log(`Server running http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}
bootstrap()