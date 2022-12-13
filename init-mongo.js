db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME || 'admin',
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD || 'password',
  roles: [
    {
      role: 'readWrite',
      db: process.env.MONGO_INITDB_DATABASE || 'test',
    },
  ],
});
