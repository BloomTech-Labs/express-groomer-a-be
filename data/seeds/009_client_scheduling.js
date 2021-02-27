exports.seed = async function (knex) {
    await knex('scheduling').insert([
      {
        given_name: 'Iphigeneia',
        customer_id: '00ultwz1n9ORpNFc04x6',
        business_name:'Ruff Cuts',
        groom_id: '00ultx74kMUmEW8054x6',
        confirmation: null,
        date: '10-18-2021',
        startTime: '13:30:00',
        endTime: '00:00:00',
        services:JSON.stringify(['Bath']),
      },
      {
        given_name: 'Iphigeneia',
        customer_id: '00ultwz1n9ORpNFc04x6',
        business_name:'Diamond in the Ruff',
        groom_id: '00ultwqjtqt4VCcS24x6',
        confirmation: null,
        date: '04-21-2021',
        startTime: '15:00:00',
        endTime: '00:00:00',
        services:JSON.stringify(['Bath']),
      },
      {
        given_name: 'Iphigeneia',
        customer_id: '00ultwz1n9ORpNFc04x6',
        business_name:'Ruff Cuts',
        groom_id: '00ultx74kMUmEW8054x6',
        confirmation: null,
        date: '10-30-2021',
        startTime: '12:00:00',
        endTime: '00:00:00',
        services:JSON.stringify(['Bath']),
      },
    ]);
  };
  
