exports.seed = async function (knex) {
  await knex('pet_types').insert([
    {
      breed: 'Siberian Husky',
    },
    {
      breed: 'Shibu-Inu',
    },
    {
      breed: 'German Shephard',
    },
    {
      breed: 'Beagle',
    },
    {
      breed: 'Pug',
    },
    {
      breed: 'Bull-Dog',
    },
    {
      breed: 'Jack Russel Terrier',
    },
    {
      breed: 'Poodle',
    },
    {
      breed: 'Labrador Retriever',
    },
    {
      breed: 'Dachshund',
    },
    {
      breed: 'Chihuahua',
    },
    {
      breed: 'Rottweiler',
    },
    {
      breed: 'Great Dane',
    },
    {
      breed: 'Doberman',
    },
    {
      breed: 'Pomeranian',
    },
    {
      breed: 'Corgi',
    },
    {
      breed: 'Collie',
    },
    {
      breed: 'Cocker Spaniel',
    },
    {
      breed: 'Shih Tzu',
    },
    {
      breed: 'Mountain Dog',
    },
    {
      breed: 'Alaskan Malamute',
    },
    {
      breed: 'Newfoundland',
    },
    {
      breed: 'Irish Setter',
    },
    {
      breed: 'Basset Hound',
    },
    {
      breed: 'Dalmatian',
    },
    {
      breed: 'St. Bernard',
    },
    {
      breed: 'Chow Chow',
    },
    {
      breed: 'Springer Spaniel',
    },
    {
      breed: 'Pit Bull',
    },
    {
      breed: 'Shiba Inu',
    },
    {
      breed: 'Samoyed',
    },
    {
      breed: 'Pinscher',
    },
  ]);
};
