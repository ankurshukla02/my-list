'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('movies', [
      {
        id: 'movie_001',
        title: 'Inception',
        description: 'A skilled thief enters dreams to steal secrets.',
        genres: JSON.stringify(['SciFi', 'Action', 'Drama']),
        release_date: new Date('2010-07-16'),
        director: 'Christopher Nolan',
        actors: JSON.stringify(['Leonardo DiCaprio', 'Joseph Gordon-Levitt']),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'movie_002',
        title: 'Interstellar',
        description: 'Explorers travel through a wormhole to save humanity.',
        genres: JSON.stringify(['SciFi', 'Drama']),
        release_date: new Date('2014-11-07'),
        director: 'Christopher Nolan',
        actors: JSON.stringify(['Matthew McConaughey', 'Anne Hathaway']),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'movie_003',
        title: 'Avengers',
        description: 'Earth’s mightiest heroes unite to fight a common enemy.',
        genres: JSON.stringify(['Action', 'Fantasy']),
        release_date: new Date('2012-05-04'),
        director: 'Joss Whedon',
        actors: JSON.stringify(['Robert Downey Jr.', 'Chris Evans']),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'movie_004',
        title: 'Joker',
        description: 'A man descends into madness and chaos.',
        genres: JSON.stringify(['Drama', 'Crime']),
        release_date: new Date('2019-10-04'),
        director: 'Todd Phillips',
        actors: JSON.stringify(['Joaquin Phoenix']),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'movie_005',
        title: 'The Matrix',
        description: 'A hacker discovers the truth about reality.',
        genres: JSON.stringify(['SciFi', 'Action']),
        release_date: new Date('1999-03-31'),
        director: 'The Wachowskis',
        actors: JSON.stringify(['Keanu Reeves', 'Laurence Fishburne']),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies', null, {});
  },
};
