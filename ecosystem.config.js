module.exports = {
  apps: [{
    name: "Express App",
    script: 'index.js',
    instances: "MAX",
    autorestart: true,
    watch: true,
    max_memory_restart: "1G",
    exec_mode: "cluster",
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
