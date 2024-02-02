import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Festival from 'App/Models/Festival';
import Game from 'App/Models/Game';
import GameZone from 'App/Models/GameZone';
import Slot from 'App/Models/Slot';

import Volunteer, { FoodRegimeEnum, LodgingEnum, TshirtSizeEnum } from 'App/Models/Volunteer';
import Zone from 'App/Models/Zone';
import { HmacSHA256 } from 'crypto-js';

function encryptWithHashSeed(data: string): string {
    const hash_seed = process.env.HASH_SEED;
    const hash = HmacSHA256(data, hash_seed).toString();
    return hash;
}


class Connection {
    private id = Math.floor(Math.random() * 1000)
    public token = '';
    private baseVolunteerData = {
        firstname: 'John' + this.id,
        lastname: 'Doe' + this.id,
        email: 'jhondoe' + this.id + '@gmail.com',
        address: '1 rue de la paix',
        phone: '0606060606',
        username: 'jdoe' + this.id,
        avatar_url: 'none',
        tshirt_size: TshirtSizeEnum.XS,
        nb_edition_performed: 0,
        lodging: LodgingEnum.aucun,
        food_regime: FoodRegimeEnum.carnivore,
        password: encryptWithHashSeed('password' + this.id),
    }

    constructor() {
        this.token = ''
    }

    public async register(client: any) {
        const response = await client.post('/api/auth/register').json(this.baseVolunteerData)

        if (response.status() !== 201) {
            throw new Error('Error while registering ' + response.status() + ' : ' + JSON.stringify(response.body()))
        }
    }

    public async login(client: any) {
        const response = await client.post('/api/auth/login').json({
            email: this.baseVolunteerData.email,
            password: this.baseVolunteerData.password,
        })

        if (response.status() !== 200) {
            throw new Error('Error while logging in ' + response.status() + ' : ' + JSON.stringify(response.body()))
        }

        if (!response.body().token) {
            throw new Error('Error while logging in : no token : ' + JSON.stringify(response.body()))
        }

        this.token = response.body().token
    }

    public async logout(client: any) {
        const response = await client.post('/api/auth/logout').header('Authorization', `Bearer ${this.token}`)

        if (response.status() !== 200) {
            throw new Error('Error while logging out')
        }

        this.token = ''
    }

    public async registerAndAdmin(client: any) {
        await this.register(client)
        // Set the volunteer as admin
        const volunteer = await Volunteer.findByOrFail('username', this.baseVolunteerData.username)
        volunteer.isAdmin = true
        await volunteer.save()
    }

    public get username() {
        return this.baseVolunteerData.username
    }

}

/* -------------------------------------------------------------------------- */
/*                                    TESTS                                   */
/* -------------------------------------------------------------------------- */

test.group('Test des fonction internes : Festival', (group) => {
    const festivalData = {
        title: 'TestFestival',
        startDate: new Date('2021-01-01'),
        endDate: new Date('2021-01-02'),
        description: 'TestDescription',
        address: 'TestAddress',
        posterPath: 'TestPosterPath',
    }


    group.setup(async () => {
        await Database.beginGlobalTransaction()
    })

    group.teardown(async () => {
        await Database.rollbackGlobalTransaction()
    })


    test('create new festival', async ({ assert }) => {
        const festival = await Festival.create(festivalData)

        const savedFestival = await Festival.findByOrFail('title', 'TestFestival')

        assert.equal(savedFestival.title, 'TestFestival')
    })

    test('update festival', async ({ assert }) => {
        const festivalToUpdate = await Festival.findByOrFail('title', 'TestFestival')

        festivalToUpdate.title = 'TestFestivalUpdated'
        await festivalToUpdate.save()

        const savedFestival = await Festival.findByOrFail('title', 'TestFestivalUpdated')

        assert.equal(savedFestival.title, 'TestFestivalUpdated')
    })

    test('delete festival', async ({ assert }) => {
        const festivalToDelete = await Festival.findByOrFail('title', 'TestFestivalUpdated')

        await festivalToDelete.delete()

        const savedFestival = await Festival.findBy('title', 'TestFestivalUpdated')

        assert.isNull(savedFestival)
    })

})

test.group('Test des routes : Festival', (group) => {
    const festivalData = {
        title: 'TestFestival',
        start_date: '13/01/2021',
        end_date: '14/01/2021',
        description: 'TestDescription',
        address: 'TestAddress',
        posterPath: 'TestPosterPath',
    }
    
    const connection = new Connection()

    group.setup(async () => {
        await Database.beginGlobalTransaction()
    });

    group.teardown(async () => {
        await Database.rollbackGlobalTransaction()
    });

    test('Register', async ({ client, assert }) => {
        await connection.registerAndAdmin(client)
        await connection.login(client)

        const volunteer = await Volunteer.findByOrFail('username', connection.username)

        assert.isTrue(volunteer.isAdmin)
    })


    test('create new festival', async ({ client, assert }) => {
        const response = await client.post('/api/festivals').json(festivalData).header('Authorization', `Bearer ${connection.token}`)

        if (response.status() !== 200) {
            console.log(response.error());
            console.log(response.text());

            console.log("====================================")
            console.log(connection.token);
        }

        response.assertStatus(200)
        assert.equal(response.body().title, 'TestFestival')
    })

    test('update festival', async ({ client, assert }) => {
        const festivalToUpdate = await Festival.findByOrFail('title', 'TestFestival')

        const newFestivalData = { title: 'TestFestivalUpdated' }

        const response = await client.put(`/api/festivals/${festivalToUpdate.id}`).json(newFestivalData).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(200)
        assert.equal(response.body().message, 'Festival updated !')
    })

    test('delete festival', async ({ client, assert }) => {
        const festivalToDelete = await Festival.findByOrFail('title', 'TestFestivalUpdated')

        const response = await client.delete(`/api/festivals/${festivalToDelete.id}`).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(200)
        assert.equal(response.body().message, 'Festival deleted successfully.')
    })

    test('Re-create festival', async ({ client, assert }) => {
        const response = await client.post('/api/festivals').json(festivalData).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(200)
        assert.equal(response.body().title, 'TestFestival')
    })

    test('get festival', async ({ client, assert }) => {
        const festivalToGet = await Festival.findByOrFail('title', 'TestFestival')

        const response = await client.get(`/api/festivals/${festivalToGet.id}`)

        response.assertStatus(200)
        assert.equal(response.body().title, 'TestFestival')
    })



    test('get all festivals', async ({ client, assert }) => {
        // Create a second festival
        const festivalData2 = { ...festivalData, title: 'TestFestival2' }

        const response2 = await client.post('/api/festivals').json(festivalData2).header('Authorization', `Bearer ${connection.token}`)

        response2.assertStatus(200)
        assert.equal(response2.body().title, 'TestFestival2')

        const response = await client.get('/api/festivals')

        response.assertStatus(200)
        assert.equal(response.body().length, 2)
    })


    /* -------------------------------------------------------------------------- */
    /*                            CHAMPS MAL RENSEIGNES                           */
    /* -------------------------------------------------------------------------- */

    test('create new festival without being logged in', async ({ client }) => {
        const response = await client.post('/api/festivals').json(festivalData)

        response.assertStatus(401)
    })

    test('update festival without being logged in', async ({ client }) => {
        const festivalToUpdate = await Festival.findByOrFail('title', 'TestFestival')

        const newFestivalData = { title: 'TestFestivalUpdated' }

        const response = await client.put(`/api/festivals/${festivalToUpdate.id}`).json(newFestivalData)

        response.assertStatus(401)
    })

    test('delete festival without being logged in', async ({ client }) => {
        const festivalToDelete = await Festival.findByOrFail('title', 'TestFestival')

        const response = await client.delete(`/api/festivals/${festivalToDelete.id}`)

        response.assertStatus(401)
    })

    test('get festival without being logged in', async ({ client, assert }) => {
        const festivalToGet = await Festival.findByOrFail('title', 'TestFestival')

        const response = await client.get(`/api/festivals/${festivalToGet.id}`)

        response.assertStatus(200)
        assert.equal(response.body().title, 'TestFestival')
    })

    test('get all festivals without being logged in', async ({ client, assert }) => {
        const response = await client.get('/api/festivals')

        response.assertStatus(200)
        assert.equal(response.body().length, 2)
    })


    test('create new festival without a title', async ({ client }) => {
        const festivalData = {
            start_date: '13/01/2021',
            end_date: '14/01/2021',
            description: 'TestDescription',
            address: 'TestAddress',
        }

        const response = await client.post('/api/festivals').json(festivalData).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(422)
    });

    test('create new festival without optional fields', async ({ client, assert }) => {
        const festivalData = {
            title: 'TestFestival3',
            start_date: '13/01/2021',
            end_date: '14/01/2021',
            description: 'TestDescription',
            address: 'TestAddress',
        }

        const response = await client.post('/api/festivals').json(festivalData).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(200)

        const festival = await Festival.findByOrFail('title', 'TestFestival3')

        assert.equal(festival.title, 'TestFestival3')
    });


})

test.group('Test de la création d\'un festival : New', (group) => {
    const festivalData = {
        title: 'TestFestival',
        start_date: '13/01/2021',
        end_date: '14/01/2021',
        description: 'TestDescription',
        address: 'TestAddress',
        poster_path: 'TestPosterPath',
    }

    const gamesData = [
        {
            idGame: 1,
            name: 'TestGame',
            author: 'TestAuthor',
            editor: 'TestEditor',
            description: 'TestDescription',
            minPlayer: 2,
            maxPlayer: 4,
            minAge: 8,
            duration: 30,
            toAnimate: true,
            recieved: true,
            type: 'TestType',
            mechanics: 'TestMechanics',
            theme: 'TestTheme',
            tags: 'TestTags',
            image: 'TestImage',
            logo: 'TestLogo',
            video: 'TestVideo',
            manual: 'TestManual',
        },
        {
            idGame: 2,
            name: 'TestGame2',
            author: 'TestAuthor',
            editor: 'TestEditor',
            description: 'TestDescription2',
            minPlayer: 2,
            maxPlayer: 4,
            minAge: 8,
            duration: 30,
            toAnimate: true,
            recieved: true,
            type: 'TestType2',
            mechanics: 'TestMechanics2',
            theme: 'TestTheme2',
            tags: 'TestTags2',
            image: 'TestImage2',
            logo: 'TestLogo2',
            video: 'TestVideo2',
            manual: 'TestManual2',
        },
        {
            idGame: 3,
            name: 'TestGame3',
            author: 'TestAuthor',
            editor: 'TestEditor',
            description: 'TestDescription3',
            minPlayer: 2,
            maxPlayer: 4,
            minAge: 8,
            duration: 30,
            toAnimate: true,
            recieved: true,
            type: 'TestType3',
            mechanics: 'TestMechanics3',
            theme: 'TestTheme3',
            tags: 'TestTags3',
            image: 'TestImage3',
            logo: 'TestLogo3',
            video: 'TestVideo3',
            manual: 'TestManual3',
        },
    ]

    const zonesData = [
        {
            idZone: 1,
            name: 'TestZone',
            description: 'TestDescription',
            animation: true,
            maxCapacity: 10,
        },
        {
            idZone: 2,
            name: 'TestZone2',
            description: 'TestDescription2',
            maxCapacity: 2,
            animation: false,
        },
        {
            idZone: 3,
            name: 'TestZone3',
            description: 'TestDescription3',
            maxCapacity: 5,
            animation: true,
        },
    ]

    const slotsData = [
        {
            idSlot: 1,
            startTime: '13/01/2021 10:00',
            endTime: '13/01/2021 12:00',
        },
        {
            idSlot: 2,
            startTime: '13/01/2021 14:00',
            endTime: '13/01/2021 16:00',
        },
        {
            idSlot: 3,
            startTime: '14/01/2021 18:00',
            endTime: '14/01/2021 20:00',
        },
    ]

    const gameZonesData = [
        {
            idJeu: 1,
            idZone: 1,
        },
        {
            idJeu: 1,
            idZone: 2,
        },
        {
            idJeu: 2,
            idZone: 3,
        },
        {
            idJeu: 3,
            idZone: 1,
        },

    ]

    const newFestivalData = {
        ...festivalData,
        games: gamesData,
        zones: zonesData,
        slots: slotsData,
        gameZones: gameZonesData,
    }

    const connection = new Connection()

    group.setup(async () => {
        await Database.beginGlobalTransaction()
    });

    group.teardown(async () => {
        await Database.rollbackGlobalTransaction()
    });

    test('Register', async ({ client, assert }) => {
        await connection.registerAndAdmin(client)
        await connection.login(client)

        const volunteer = await Volunteer.findByOrFail('username', connection.username)

        assert.isTrue(volunteer.isAdmin)
    })

    test('create new festival', async ({ client, assert }) => {
        const response = await client.post('/api/festivals/new').json(newFestivalData).header('Authorization', `Bearer ${connection.token}`)

        if (response.status() !== 200) {
            console.log(response.error());
            console.log(response.text());
        }

        response.assertStatus(200)
        assert.equal(response.body().message, 'Festival created !');
    });

    test('Check if festival is created', async ({ assert }) => {
        const festival = await Festival.findByOrFail('title', 'TestFestival')

        assert.equal(festival.title, 'TestFestival')
    });

    test('Check if games are created', async ({ assert }) => {
        const games = await Game.all()

        assert.equal(games.length, 3)
    });

    test('Check if zones are created', async ({ assert }) => {
        const zones = await Zone.all()
        assert.equal(zones.length, 3)
    });

    test('Check if slots are created', async ({ assert }) => {
        const slots = await Slot.all()
        assert.equal(slots.length, 3)
    });

    test('Check if gameZones are created', async ({  assert }) => {
        const gameZones = await GameZone.all()
        assert.equal(gameZones.length, 4)
    });


})
