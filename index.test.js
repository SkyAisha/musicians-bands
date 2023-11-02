const { sequelize } = require("./db");
const { Band, Musician, Song } = require("./index");

describe("Band, Musician, and Song Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  test("can create a Band", async () => {
    // TODO - test creating a band
    const band = await Band.create({
      name: "Electric Echoes",
      genre: "Alternative Rock",
    });
    expect(band.name).toEqual("Electric Echoes");
    expect(band.genre).toEqual("Alternative Rock");
  });

  test("can create a Musician", async () => {
    // TODO - test creating a musician
    const musician = await Musician.create({
      name: "Jimi Hendrix",
      instrument: "Guitar",
    });
    expect(musician.name).toEqual("Jimi Hendrix");
    expect(musician.instrument).toEqual("Guitar");
  });

  test("can create a new Song", async () => {
    // TODO - test creating a song
    const song = await Song.create({
      title: "Bohemian Rhapsody",
      year: 1975,
      length: 354,
    });
    expect(song.title).toEqual("Bohemian Rhapsody");
    expect(song.year).toEqual(1975);
    expect(song.length).toEqual(354);
  });

  test("can update a Band", async () => {
    // TODO - test updating a band
    const band = await Band.create({ name: "The Beatles", genre: "Rock" });
    await band.update({ genre: "Pop" });
    expect(band.genre).toBe("Pop");
  });

  test("can update a Musician", async () => {
    // TODO - test updating a musician
    const musician = await Musician.create({
      name: "Elton John",
      instrument: "Guitar",
    });
    await musician.update({ instrument: "Piano" });
    expect(musician.instrument).toBe("Piano");
  });
  test("Can update a Song", async () => {
    const song = await Song.create({
      title: "Stay",
      year: 2015,
      length: 153,
    });
    await song.update({ year: 2021 });
    expect(song.year).toBe(2021);
  });

  test("can delete a Band", async () => {
    // TODO - test deleting a band
    const band = await Band.create({ name: "The Beatles", genre: "Rock" });
    await band.destroy();
    const destroyedItem = await Band.findByPk(band.id);
    expect(destroyedItem).toBe(null);
  });

  test("can delete a Musician", async () => {
    // TODO - test deleting a musician
    const musician = await Musician.create({
      name: "Elton John",
      instrument: "Guitar",
    });
    await musician.destroy();
    const destroyedItem = await Musician.findByPk(musician.id);
    expect(destroyedItem).toBe(null);
  });

  test("can delete a Song", async () => {
    // TODO - test deleting a musician
    const song = await Song.create({
      title: "Stay",
      year: 2015,
      length: 153,
    });
    await song.destroy();
    const destroyedItem = await Song.findByPk(song.id);
    expect(destroyedItem).toBe(null);
  });
});

describe("Association tests", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  test("can get Musicians from Bands", async () => {
    await Band.create({ name: "band1", genre: "pop" });
    await Band.create({ name: "band2", genre: "Rock" });
    await Musician.create({
      name: "Musician1",
      instrument: "Guitar",
      BandId: 1,
    });
    await Musician.create({
      name: "Musician2",
      instrument: "Drums",
      BandId: 1,
    });
    await Musician.create({
      name: "Musician3",
      instrument: "Guitar",
      BandId: 2,
    });

    const foundBands = await Band.findAll();

    for (const band of foundBands) {
      const musicians = await foundBands.getMusician();

      expect(Array.isArray(Musician));
      expect(musicians).toBe(!null);
    }
  });

  test("can associate songs with Bands", async () => {
    await Band.create({ name: "band1", genre: "pop" });
    await Band.create({ name: "band2", genre: "Rock" });
    await Song.create({ title: "song1", year: 2022, length: 234 });
    await Song.create({ title: "song2", year: 2023, length: 154 });

    const bands = await Band.findAll();
    const songs = await Song.findAll();

    if (bands.length > 0 && songs.length > 0) {
      const band = bands[0];
      const song1 = songs[0];
      const song2 = songs[1];

      await band.addSong(song1);
      await band.addSong(song2);

      const associatedSongs = await band.getSongs();
      expect(Array.isArray(associatedSongs));
      expect(associatedSongs.length).toBe(2);
    }
  });
});
