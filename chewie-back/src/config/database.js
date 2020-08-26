module.exports = {
    dialect: 'postgres',
    host: 'postgres',
    username: 'postgres',
    password: 'docker',
    database: 'chewie',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};