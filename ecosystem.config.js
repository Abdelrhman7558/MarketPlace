module.exports = {
    apps: [
        {
            name: 'b2b-backend',
            script: 'npm',
            args: 'run start:dev',
            cwd: './backend',
            env: {
                NODE_ENV: 'development',
                PORT: 3001
            }
        },
        {
            name: 'b2b-frontend',
            script: 'npm',
            args: 'run dev',
            cwd: './frontend',
            env: {
                NODE_ENV: 'development',
                PORT: 3000
            }
        }
    ]
};
