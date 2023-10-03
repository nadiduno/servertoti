module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "Duninho1417,",
    DB: "postgres",
    dialect: "postgres",
    pool: {
        max: 15,
        min: 5,
        idle: 20000,
        evict: 15000,
        acquire: 30000
    }
};
