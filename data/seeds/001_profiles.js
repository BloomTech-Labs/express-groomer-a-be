const faker = require('faker');

exports.seed = async function (knex) {
  await knex('profiles').insert([
    {
      id: '00ulthapbErVUwVJy4x6',
      avatarUrl: faker.image.avatar(),
      email: 'llama001@maildrop.cc',
      name: 'Test001 User',
      role: 'groomer',
    },
    {
      id: faker.random.alphaNumeric(20),
      avatarUrl: faker.image.avatar(),
      email: 'llama002@maildrop.cc',
      name: 'Test002 User',
      role: 'groomer',
    },
    {
      id: faker.random.alphaNumeric(20),
      avatarUrl: faker.image.avatar(),
      email: 'llama003@maildrop.cc',
      name: 'Test003 User',
      role: 'customer',
    },
    {
      id: faker.random.alphaNumeric(20),
      avatarUrl: faker.image.avatar(),
      email: 'llama004@maildrop.cc',
      name: 'Test004 User',
      role: 'customer',
    },
    {
      id: faker.random.alphaNumeric(20),
      avatarUrl: faker.image.avatar(),
      email: 'llama005@maildrop.cc',
      name: 'Test005 User',
      role: 'customer',
    },
  ]);
};
