import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Slot from 'App/Models/Slot';

import Volunteer, { FoodRegimeEnum, LodgingEnum, TshirtSizeEnum } from 'App/Models/Volunteer';
import { HmacSHA256 } from 'crypto-js';
import { DateTime } from 'luxon';

function encryptWithHashSeed(data: string): string {
    const hash_seed = process.env.HASH_SEED;
    const hash = HmacSHA256(data, hash_seed).toString();
    return hash;
}

function compareDateTime(dt1: DateTime, dt2: DateTime): boolean {
    return dt1.daysInYear === dt2.daysInYear && dt1.hour === dt2.hour && dt1.minute === dt2.minute && dt1.month === dt2.month && dt1.year === dt2.year
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

test.group('Test des fonction internes : Slot', (group) => {
    const slotData = {
        startTime: DateTime.fromFormat('13/01/2021 10:00', 'dd/MM/yyyy HH:mm'),
        endTime: DateTime.fromFormat('13/01/2021 12:00', 'dd/MM/yyyy HH:mm'),
    }


    group.setup(async () => {
        await Database.beginGlobalTransaction()
    })

    group.teardown(async () => {
        await Database.rollbackGlobalTransaction()
    })


    test('create new slot', async ({ assert }) => {
        await Slot.create(slotData)

        const savedSlot = await Slot.findByOrFail('startTime', slotData.startTime)
        assert.isTrue(compareDateTime(savedSlot.endTime, slotData.endTime))
    })

    test('update slot', async ({ assert }) => {
        const slotToUpdate = await Slot.findByOrFail('startTime', slotData.startTime)

        slotToUpdate.startTime = DateTime.fromFormat('13/01/2021 10:10', 'dd/MM/yyyy HH:mm')
        await slotToUpdate.save()

        const savedSlot = await Slot.findByOrFail('startTime', slotToUpdate.startTime)

        assert.isTrue(compareDateTime(savedSlot.endTime, slotToUpdate.endTime))
    })

    test('delete slot', async ({ assert }) => {
        const slotToDelete = await Slot.findByOrFail('startTime', DateTime.fromFormat('13/01/2021 10:10', 'dd/MM/yyyy HH:mm'))

        await slotToDelete.delete()

        const savedSlot = await Slot.findBy('startTime', slotData.startTime)

        assert.isNull(savedSlot)
    })

})

test.group('Test des routes : Slot', (group) => {
    const slotData = {
        startTime: '13/01/2021 10:00',
        endTime: '13/01/2021 12:00'
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


    test('create new slot', async ({ client, assert }) => {
        const response = await client.post('/api/slots').json(slotData).header('Authorization', `Bearer ${connection.token}`)

        if (response.status() !== 200) {
            console.log(response.error());
            console.log(response.text());
        }

        response.assertStatus(200)
        assert.isTrue(compareDateTime(
            DateTime.fromFormat(response.body().startTime, 'dd/MM/yyyy HH:mm'),
            DateTime.fromFormat(slotData.startTime, 'dd/MM/yyyy HH:mm')
        ))
    })

    test('update slot', async ({ client, assert }) => {
        const slotToUpdate = await Slot.findByOrFail("startTime", DateTime.fromFormat('13/01/2021 10:00', 'dd/MM/yyyy HH:mm') )

        const newSlotData = { startTime: '13/01/2021 10:10' }

        const response = await client.put(`/api/slots/${slotToUpdate.id}`).json(newSlotData).header('Authorization', `Bearer ${connection.token}`)

        if (response.status() !== 200) {
            console.log(response.error());
            console.log(response.text());
        }

        response.assertStatus(200)
        assert.equal(response.body().message, 'Slot updated !')
    })

    test('delete slot', async ({ client, assert }) => {
        const slotToDelete = await Slot.findByOrFail('startTime', DateTime.fromFormat('13/01/2021 10:10', 'dd/MM/yyyy HH:mm'))

        const response = await client.delete(`/api/slots/${slotToDelete.id}`).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(200)
        assert.equal(response.body().message, 'Slot deleted !')
    })

    test('Re-create slot', async ({ client, assert }) => {
        const response = await client.post('/api/slots').json(slotData).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(200)
        assert.isTrue(compareDateTime(DateTime.fromFormat(response.body().startTime, 'dd/MM/yyyy HH:mm'), DateTime.fromFormat(slotData.startTime, 'dd/MM/yyyy HH:mm')))
    })

    test('get slot', async ({ client, assert }) => {
        const slotToGet = await Slot.findByOrFail('startTime', DateTime.fromFormat(slotData.startTime, 'dd/MM/yyyy HH:mm'))

        const response = await client.get(`/api/slots/${slotToGet.id}`)

        response.assertStatus(200)
        assert.isTrue(compareDateTime(DateTime.fromFormat(response.body().startTime, 'dd/MM/yyyy HH:mm'), DateTime.fromFormat(slotData.startTime, 'dd/MM/yyyy HH:mm')))
    })



    test('get all slots', async ({ client, assert }) => {
        // Create a second slot
        const slotData2 = { ...slotData, endTime: '13/01/2021 14:00' }

        const response2 = await client.post('/api/slots').json(slotData2).header('Authorization', `Bearer ${connection.token}`)

        response2.assertStatus(200)
        assert.isTrue(compareDateTime(DateTime.fromFormat(response2.body().startTime, 'dd/MM/yyyy HH:mm'), DateTime.fromFormat(slotData2.startTime, 'dd/MM/yyyy HH:mm')))

        const response = await client.get('/api/slots')

        response.assertStatus(200)
        assert.equal(response.body().length, 2)
    })


    /* -------------------------------------------------------------------------- */
    /*                            CHAMPS MAL RENSEIGNES                           */
    /* -------------------------------------------------------------------------- */

    test('create new slot without being logged in', async ({ client }) => {
        const response = await client.post('/api/slots').json(slotData)

        response.assertStatus(401)
    })

    test('update slot without being logged in', async ({ client }) => {
        const slotToUpdate = await Slot.findByOrFail('startTime', DateTime.fromFormat(slotData.startTime, 'dd/MM/yyyy HH:mm'))

        const newSlotData = { startTime: '13/01/2021 10:10' }

        const response = await client.put(`/api/slots/${slotToUpdate.id}`).json(newSlotData)

        response.assertStatus(401)
    })

    test('delete slot without being logged in', async ({ client }) => {
        const slotToDelete = await Slot.findByOrFail('startTime', DateTime.fromFormat(slotData.startTime, 'dd/MM/yyyy HH:mm'))

        const response = await client.delete(`/api/slots/${slotToDelete.id}`)

        response.assertStatus(401)
    })

    test('get slot without being logged in', async ({ client, assert }) => {
        const slotToGet = await Slot.findByOrFail('startTime', DateTime.fromFormat(slotData.startTime, 'dd/MM/yyyy HH:mm'))

        const response = await client.get(`/api/slots/${slotToGet.id}`)

        response.assertStatus(200)
        assert.isTrue(compareDateTime(DateTime.fromFormat(response.body().startTime, 'dd/MM/yyyy HH:mm'), DateTime.fromFormat(slotData.startTime, 'dd/MM/yyyy HH:mm')))
    })

    test('get all slots without being logged in', async ({ client, assert }) => {
        const response = await client.get('/api/slots')

        response.assertStatus(200)
        assert.equal(response.body().length, 2)
    })


    test('create new slot without a title', async ({ client }) => {
        const slotData = {
            startTime: DateTime.fromFormat('13/01/2021 10:00', 'dd/MM/yyyy HH:mm'),
            endTime: DateTime.fromFormat('13/01/2021 12:00', 'dd/MM/yyyy HH:mm'),
        }

        const response = await client.post('/api/slots').json(slotData).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(422)
    });

    test('create multiple slots ', async ({ client, assert }) => {
        const slots = [
            {
                startTime: '13/01/2021 10:00',
                endTime: '13/01/2021 12:00',
            },
            {
                startTime: '13/01/2021 12:00',
                endTime: '13/01/2021 14:00',
            },
            {
                startTime: '13/01/2021 14:00',
                endTime: '13/01/2021 16:00',
            },
        ]

        const response = await client.post('/api/slots/multiple').json({ slots }).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(200)
        assert.equal(response.body().length, 3)
    });

})