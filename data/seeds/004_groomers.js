exports.seed = async function (knex) {
  await knex('groomer').insert([
    {
      user_id: '00ulthapbErVUwVJy4x6',
      business_name: 'Muddy Paws',
      given_name: 'Bethany',
      family_name: 'Peters',
      phone_number: '202-555-1035',
      address: '1234 Muddy Paws Lane',
      city: 'Dallas', // Salt Lake City
      state: 'TX',
      zip_code: '55555',
      country: 'United States',
      about:
        'Doggo ipsum pats extremely cuuuuuute porgo. Blop wow such tempt heckin angery woofer shibe dat tungg tho borking doggo noodle horse, heckin good boys snoot corgo floofs. Ur givin me a spook shoob boof very jealous pupper adorable doggo, doggorino doggo. Borkf very good spot shoob you are doing me the shock very good spot blop, big ol vvv pupper borkf. Very jealous pupper I am bekom fat heck floofs blop borkf, wow very biscit mlem pupperino. Long water shoob you are doin me a concern such treat you are doing me the shock ruff borking doggo, I am bekom fat mlem boof pats. Very hand that feed shibe fat boi smol borking doggo with a long snoot for pats, extremely cuuuuuute.',
    },
    {
      user_id: '00ultwew80Onb2vOT4x6',
      business_name: 'Wags to Riches',
      given_name: 'Nicholas',
      family_name: 'Duncan',
      phone_number: '226-338-9937',
      address: '4118 Hillcrest Circle',
      city: 'Dallas', // Buhl
      state: 'TX',
      zip_code: '83316',
      country: 'United States',
      about:
        'Doggo ipsum shoober borkdrive yapper long water shoob, I am bekom fat. Heckin good boys heckin angery woofer heckin good boys floofs doggo mlem, thicc long doggo ur givin me a spook fluffer doing me a frighten, heck doggorino fat boi pupperino. Adorable doggo corgo doggo much ruin diet, pupper wow such tempt. You are doin me a concern very good spot you are doin me a concern, borkdrive. wow very biscit. Length boy dat tungg tho shoob long bois ur givin me a spook, he made many woofs heckin angery woofer much ruin diet, floofs maximum borkdrive blop. Heckin angery woofer wow such tempt puggorino puggo, long water shoob. Puggo doggo many pats doggo many pats sub woofer, shoob puggo borking doggo floofs. Length boy stop it fren big ol very hand that feed shibe the neighborhood pupper thicc, boof thicc very taste wow extremely cuuuuuute.',
    },
    {
      user_id: '00ultx74kMUmEW8054x6',
      business_name: 'Ruff Cuts',
      given_name: 'Stewart',
      family_name: 'Tucker',
      phone_number: '440-606-6656',
      address: '2333 Single Street',
      city: 'Brentwood', // Waltham
      state: 'CA',
      zip_code: '02154',
      country: 'United States',
      about:
        'Doggo ipsum porgo very taste wow boofers snoot, wow very biscit big ol. Sub woofer borkdrive lotsa pats doggorino you are doing me the shock, pupper blep clouds. Much ruin diet very jealous pupper pats borking doggo puggo, such treat long doggo. Very jealous pupper super chub pupperino heckin angery woofer stop it fren pupper, clouds doge pats pupperino.',
    },
    {
      user_id: '00ultwqjtqt4VCcS24x6',
      business_name: 'Diamond in the Ruff',
      given_name: 'Brandy',
      family_name: 'Walsh',
      phone_number: '223-369-8766',
      address: '4721 Sun Valley Road',
      city: 'New York',
      state: 'NY',
      zip_code: '99336',
      country: 'United States',
      about:
        'Big ol shibe what a nice floof pupper porgo, extremely cuuuuuute sub woofer puggorino. Extremely cuuuuuute long woofer bork doge shibe, borkdrive heckin good boys you are doin me a concern. Shooberino most angery pupper I have ever seen blep h*ck such treat boof, boofers doge doing me a frighten big ol pupper dat tungg tho, heckin angery woofer most angery pupper I have ever seen doggorino shooberino. Pupper heckin wow such tempt big ol puggorino big ol, most angery pupper I have ever seen I am bekom fat very jealous pupper.',
    },
  ]);
};
