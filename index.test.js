// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest");
const { db } = require('./db/connection');
const { Musician } = require('./models/index');
const app = require('./src/app');
const { seedMusician } = require("./seedData");

describe('./musicians endpoint', () => {
    test("requests endpoint successfully", async () => {
        const response = await request(app).get("/musicians");
        expect(response.statusCode).toBe(200);
    });

    test("returns the correct data", async () => {
        const response = await request(app).get("/musicians");
        const responseData = JSON.parse(response.text);
        expect(responseData[0].name).toBe("Mick Jagger");
        expect(responseData[1].instrument).toBe("Voice");
        expect(responseData[2].instrument).toBe("Guitar");
    });

    test("musicians/:id endpoint returns the correct musician", async () => {
        let id = 1;
        const response = await request(app).get(`/musicians/${id}`);
        const responseData = JSON.parse(response.text);
        expect(responseData.name).toBe("Mick Jagger");
        id = 2;
        const response2 = await request(app).get(`/musicians/${id}`);
        const responseData2 = JSON.parse(response2.text);
        expect(responseData2.name).toBe("Drake");
    });

    test("musicians/:id post endpoint adds a new musician", async () => {
        const newMusician = await Musician.create({
            name: "Michael Jackson",
            instrument: "Voice",
        });
        const allMusicians = await Musician.findAll();
        const addedMusician = allMusicians.find(musician => musician.id === newMusician.id);
        expect(addedMusician.name).toBe("Michael Jackson");
        expect(addedMusician.instrument).toBe("Voice");
    });

    test("musicians/:id put endpoint updates a musician", async () => {
        let id = 1;
        const musician = await Musician.findByPk(id);
        await musician.update({
            name: "Keith Richards",
            instrument: "Guiter",
        });
        expect(musician.name).toBe("Keith Richards");
        expect(musician.instrument).toBe("Guiter");
    });

    test("musicians/:id delete endpoint deletes a musician", async () => {
        let id = 1;
        const musicianToDelete = await Musician.findByPk(id);
        await musicianToDelete.destroy();
        const allMusicians = await Musician.findAll();
        expect(allMusicians).not.toContain(musicianToDelete);
    });
});

describe('./bands endpoint', () => {
    test("requests endpoint successfully", async () => {
        const response = await request(app).get("/bands");
        expect(response.statusCode).toBe(200);
    });

    test("returns the correct data", async () => {
        const response = await request(app).get("/bands");
        const responseData = JSON.parse(response.text);
        expect(responseData[0].name).toBe("The Beatles");
        expect(responseData[1].genre).toBe("Pop");
        expect(responseData[2].genre).toBe("Rock");
    });
});
