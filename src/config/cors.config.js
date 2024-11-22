const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    exposedHeaders: ['Authorization', 'Content-Length', 'X-Foo'],
    credentials: true,
    maxAge: 86400,
    optionsSuccessStatus: 204,
}

module.exports = corsOptions
