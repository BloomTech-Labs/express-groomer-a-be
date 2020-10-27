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
      id: '00ultwew80Onb2vOT4x6',
      avatarUrl: faker.image.avatar(),
      email: 'llama002@maildrop.cc',
      name: 'Test002 User',
      role: 'groomer',
    },
    {
      id: '00ultx74kMUmEW8054x6',
      avatarUrl: faker.image.avatar(),
      email: 'llama003@maildrop.cc',
      name: 'Test003 User',
      role: 'groomer',
    },
    {
      id: '00ultwqjtqt4VCcS24x6',
      avatarUrl: faker.image.avatar(),
      email: 'llama004@maildrop.cc',
      name: 'Test004 User',
      role: 'groomer',
    },
    {
      id: '00ultwz1n9ORpNFc04x6',
      avatarUrl: faker.image.avatar(),
      email: 'llama005@maildrop.cc',
      name: 'Test005 User',
      role: 'customer',
    },
    {
      id: '00u13omswyZM1xVya4x7',
      avatarUrl: faker.image.avatar(),
      email: 'llama006@maildrop.cc',
      name: 'Test006 User',
      role: 'customer',
    },
    {
      id: '00u13ol5x1kmKxVJU4x7',
      avatarUrl: faker.image.avatar(),
      email: 'llama007@maildrop.cc',
      name: 'Test007 User',
      role: 'customer',
    },
    {
      id: '00u13oned0U8XP8Mb4x7',
      avatarUrl: faker.image.avatar(),
      email: 'llama008@maildrop.cc',
      name: 'Test008 User',
      role: 'customer',
    },
  ]);
};
