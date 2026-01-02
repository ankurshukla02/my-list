'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tvShows = [
      {
        id: 'tv_001',
        title: 'Breaking Bad',
        description: 'A chemistry teacher turns to a life of crime.',
        genres: JSON.stringify(['Drama', 'Crime']),
        episodes: JSON.stringify([
          {
            seasonNumber: 1,
            episodeNumber: 1,
            releaseDate: '2008-01-20',
            director: 'Vince Gilligan',
            actors: ['Bryan Cranston', 'Aaron Paul'],
          },
          {
            seasonNumber: 1,
            episodeNumber: 2,
            releaseDate: '2008-01-27',
            director: 'Vince Gilligan',
            actors: ['Bryan Cranston', 'Aaron Paul'],
          },
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'tv_002',
        title: 'Stranger Things',
        description: 'Mysteries unfold in a small town.',
        genres: JSON.stringify(['SciFi', 'Horror']),
        episodes: JSON.stringify([
          {
            seasonNumber: 1,
            episodeNumber: 1,
            releaseDate: '2016-07-15',
            director: 'The Duffer Brothers',
            actors: ['Millie Bobby Brown', 'Finn Wolfhard'],
          },
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'tv_003',
        title: 'Game of Thrones',
        description: 'Noble families fight for control of the Iron Throne.',
        genres: JSON.stringify(['Fantasy', 'Drama']),
        episodes: JSON.stringify([
          {
            seasonNumber: 1,
            episodeNumber: 1,
            releaseDate: '2011-04-17',
            director: 'Tim Van Patten',
            actors: ['Sean Bean', 'Emilia Clarke'],
          },
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'tv_004',
        title: 'The Office',
        description: 'Mockumentary on office life.',
        genres: JSON.stringify(['Comedy']),
        episodes: JSON.stringify([
          {
            seasonNumber: 1,
            episodeNumber: 1,
            releaseDate: '2005-03-24',
            director: 'Ken Kwapis',
            actors: ['Steve Carell'],
          },
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'tv_005',
        title: 'Dark',
        description: 'A time-travel mystery across generations.',
        genres: JSON.stringify(['SciFi', 'Drama']),
        episodes: JSON.stringify([
          {
            seasonNumber: 1,
            episodeNumber: 1,
            releaseDate: '2017-12-01',
            director: 'Baran bo Odar',
            actors: ['Louis Hofmann'],
          },
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    for (const tvShow of tvShows) {
      const existingTvShow = await queryInterface.rawSelect('tv_shows', {
        where: { id: tvShow.id },
      }, ['id']);

      if (!existingTvShow) {
        await queryInterface.bulkInsert('tv_shows', [tvShow]);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tv_shows', null, {});
  },
};
