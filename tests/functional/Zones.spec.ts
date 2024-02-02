import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Zone from 'App/Models/Zone';

import Volunteer, { FoodRegimeEnum, LodgingEnum, TshirtSizeEnum } from 'App/Models/Volunteer';
import { HmacSHA256 } from 'crypto-js';
import Festival from 'App/Models/Festival';

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

test.group('Test des fonction internes : Zone', (group) => {
    const zoneData = {
        idZone: 1,
        name : 'TestZone',
        description: 'TestDescription',
        maxCapacity: 100,
        animation: true,
        festivalId: '',
    }

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

    test('create new festival and add id', async ({ assert }) => {
        const festival = await Festival.create(festivalData)

        assert.isNotNull(festival.id)

        zoneData.festivalId = festival.id
    })

    test('create new zone', async ({ assert }) => {
        await Zone.create(zoneData)

        const savedZone = await Zone.findByOrFail('name', 'TestZone')

        assert.equal(savedZone.name, 'TestZone')
    })

    test('update zone', async ({ assert }) => {
        const zoneToUpdate = await Zone.findByOrFail('name', 'TestZone')

        zoneToUpdate.name = 'TestZoneUpdated'
        await zoneToUpdate.save()

        const savedZone = await Zone.findByOrFail('name', 'TestZoneUpdated')

        assert.equal(savedZone.name, 'TestZoneUpdated')
    })

    test('delete zone', async ({ assert }) => {
        const zoneToDelete = await Zone.findByOrFail('name', 'TestZoneUpdated')

        await zoneToDelete.delete()

        const savedZone = await Zone.findBy('name', 'TestZoneUpdated')

        assert.isNull(savedZone)
    })

})

test.group('Test des routes : Zone', (group) => {
    const zoneData = {
        idZone: 1,
        name : 'TestZone',
        description: 'TestDescription',
        maxCapacity: 100,
        animation: true,
        festivalId: '',
    }

    const festivalData = {
        title: 'TestFestival',
        startDate: new Date('2021-01-01'),
        endDate: new Date('2021-01-02'),
        description: 'TestDescription',
        address: 'TestAddress',
        posterPath: 'TestPosterPath',
    }


    const connection = new Connection()

    group.setup(async () => {
        await Database.beginGlobalTransaction()
    })    

    group.teardown(async () => {
        await Database.rollbackGlobalTransaction()
    });

    test('Register', async ({ client, assert }) => {
        await connection.registerAndAdmin(client)
        await connection.login(client)

        const volunteer = await Volunteer.findByOrFail('username', connection.username)

        assert.isTrue(volunteer.isAdmin)
    })

    test('create new festival and add id', async ({ assert }) => {
        const festival = await Festival.create(festivalData)

        assert.isNotNull(festival.id)

        zoneData.festivalId = festival.id
    })

    test('create new zone', async ({ client, assert }) => {
        const response = await client.post('/api/zones').json(zoneData).header('Authorization', `Bearer ${connection.token}`)

        if (response.status() !== 200) {
            console.log(response.error());
            console.log(response.text());

            console.log("====================================")
            console.log(connection.token);
        }

        response.assertStatus(200)
        assert.equal(response.body().name, 'TestZone')
    })

    test('update zone', async ({ client, assert }) => {
        const zoneToUpdate = await Zone.findByOrFail('name', 'TestZone')

        const newZoneData = { name: 'TestZoneUpdated' }

        const response = await client.put(`/api/zones/${zoneToUpdate.id}`).json(newZoneData).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(200)
        assert.equal(response.body().message, 'Zone updated !')
    })

    test('delete zone', async ({ client, assert }) => {
        const zoneToDelete = await Zone.findByOrFail('name', 'TestZoneUpdated')

        const response = await client.delete(`/api/zones/${zoneToDelete.id}`).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(200)
        assert.equal(response.body().message, 'Zone deleted successfully.')
    })

    test('Re-create zone', async ({ client, assert }) => {
        const response = await client.post('/api/zones').json(zoneData).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(200)
        assert.equal(response.body().name, 'TestZone')
    })

    test('get zone', async ({ client, assert }) => {
        const zoneToGet = await Zone.findByOrFail('name', 'TestZone')

        const response = await client.get(`/api/zones/${zoneToGet.id}`)

        response.assertStatus(200)
        assert.equal(response.body().name, 'TestZone')
    })



    test('get all zones', async ({ client, assert }) => {
        // Create a second zone
        const zoneData2 = { ...zoneData, name: 'TestZone2' , idZone: 2}

        const response2 = await client.post('/api/zones').json(zoneData2).header('Authorization', `Bearer ${connection.token}`)

        response2.assertStatus(200)
        assert.equal(response2.body().name, 'TestZone2')

        const response = await client.get('/api/zones')

        response.assertStatus(200)
        assert.equal(response.body().length, 2)
    })


    /* -------------------------------------------------------------------------- */
    /*                            CHAMPS MAL RENSEIGNES                           */
    /* -------------------------------------------------------------------------- */

    test('create new zone without being logged in', async ({ client }) => {
        const response = await client.post('/api/zones').json(zoneData)

        response.assertStatus(401)
    })

    test('update zone without being logged in', async ({ client }) => {
        const zoneToUpdate = await Zone.findByOrFail('name', 'TestZone')

        const newZoneData = { name: 'TestZoneUpdated' }

        const response = await client.put(`/api/zones/${zoneToUpdate.id}`).json(newZoneData)

        response.assertStatus(401)
    })

    test('delete zone without being logged in', async ({ client }) => {
        const zoneToDelete = await Zone.findByOrFail('name', 'TestZone')

        const response = await client.delete(`/api/zones/${zoneToDelete.id}`)

        response.assertStatus(401)
    })

    test('get zone without being logged in', async ({ client, assert }) => {
        const zoneToGet = await Zone.findByOrFail('name', 'TestZone')

        const response = await client.get(`/api/zones/${zoneToGet.id}`)

        response.assertStatus(200)
        assert.equal(response.body().name, 'TestZone')
    })

    test('get all zones without being logged in', async ({ client, assert }) => {
        const response = await client.get('/api/zones')

        response.assertStatus(200)
        assert.equal(response.body().length, 2)
    })


    test('create new zone without a name', async ({ client }) => {
        const zoneData2 = {
            idZone: 3,
            description: 'TestDescription',
            maxCapacity: 100,
            animation: true,
            festivalId: zoneData.festivalId,
        }

        const response = await client.post('/api/zones').json(zoneData2).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(422)
    });

    test('create new zone without optional fields', async ({ client, assert }) => {
        const zoneData3 = {
            idZone: 3,
            name : 'TestZone3',
            description: 'TestDescription',
            maxCapacity: 100,
            animation: true,
            festivalId: zoneData.festivalId,
        }

        const response = await client.post('/api/zones').json(zoneData3).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(200)

        const zone = await Zone.findByOrFail('name', 'TestZone3')

        assert.equal(zone.name, 'TestZone3')
    });

    test('create multiple zones', async ({ client, assert }) => {
        const zonesData = [
            {
                idZone: 4,
                name : 'TestZone4',
                description: 'TestDescription',
                maxCapacity: 100,
                animation: true,
                festivalId: zoneData.festivalId,
            },
            {
                idZone: 5,
                name : 'TestZone5',
                description: 'TestDescription',
                maxCapacity: 100,
                animation: true,
                festivalId: zoneData.festivalId,
            },
        ]

        const response = await client.post('/api/zones/multiple').json({ zones: zonesData }).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(200)

        const zone4 = await Zone.findByOrFail('name', 'TestZone4')
        const zone5 = await Zone.findByOrFail('name', 'TestZone5')

        assert.equal(zone4.name, 'TestZone4')
        assert.equal(zone5.name, 'TestZone5')
    });
})