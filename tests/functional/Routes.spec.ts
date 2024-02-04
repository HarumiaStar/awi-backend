import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Volunteer, { FoodRegimeEnum, LodgingEnum, TshirtSizeEnum } from 'App/Models/Volunteer'
import { HmacSHA256 } from 'crypto-js'

function encryptWithHashSeed(data: string): string {
    const hash_seed = process.env.HASH_SEED;
    const hash = HmacSHA256(data, hash_seed).toString();
    return hash;
}

// Compare two objects of any type without taking into account the order of the keys
function compareAny(obj1: any, obj2: any): boolean {
    if (typeof obj1 !== typeof obj2) {
        return false;
    }

    if (typeof obj1 === 'object') {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }

        for (const key in obj1) {
            if (!compareAny(obj1[key], obj2[key])) {
                return false;
            }
        }

        return true;
    }

    return obj1 === obj2;
}


test.group('Routes', (group) => {
    const id = Math.floor(Math.random() * 1000)
    let token = '';
    const baseVolunteerData = {
        firstname: 'John' + id,
        lastname: 'Doe' + id,
        email: 'jhondoe' + id + '@gmail.com',
        address: '1 rue de la paix',
        phone: '0606060606',
        username: 'jdoe' + id,
        avatar_url: 'none',
        tshirt_size: TshirtSizeEnum.XS,
        nb_edition_performed: 0,
        lodging: LodgingEnum.aucun,
        food_regime: FoodRegimeEnum.carnivore,
        password: encryptWithHashSeed('password' + id),
        associations: []
    }
    group.setup(async () => {
        await Database.beginGlobalTransaction()
    })

    group.teardown(async () => {
        await Database.rollbackGlobalTransaction()
    })

    test('Register', async ({ assert, client }) => {
        const volunteerData = baseVolunteerData;

        const response = await client.post('/api/auth/register').json(volunteerData);

        if (response.status() !== 201) {
            console.log(response.error());
            console.log(response.text());
        }

        assert.equal(response.status(), 201);

        const volunteer = await Volunteer.findByOrFail('email', volunteerData.email);

        assert.equal(volunteer.firstname, volunteerData.firstname);
    })

    test('Login', async ({ assert, client }) => {
        const volunteerData = {
            email: 'jhondoe' + id + '@gmail.com',
            password: encryptWithHashSeed('password' + id),
        }

        const response = await client.post('/api/auth/login').json(volunteerData);

        if (response.status() !== 200) {
            console.log(response.error());
            console.log(response.text());
        }

        token = response.body().token;

        assert.equal(response.status(), 200);
    })

    test('Update', async ({ assert, client }) => {
        const volunteerData = {
            firstname: 'Jean' + id,
        }

        const response = await client.put('/api/volunteers/me').header('Authorization', `Bearer ${token}`).json(volunteerData);

        if (response.status() !== 200) {
            console.log(response.error());
            console.log(response.text());
        }

        assert.equal(response.status(), 200);

        const volunteer = await Volunteer.findByOrFail('email', 'jhondoe' + id + '@gmail.com');

        assert.equal(volunteer.firstname, volunteerData.firstname);
    })

    test('Get self data', async ({ assert, client }) => {
    
        const response = await client.get('/api/volunteers/me').header('Authorization', `Bearer ${token}`);

        if (response.status() !== 200) {
            console.log(response.error());
            console.log(response.text());
        }

        assert.equal(response.status(), 200);

        const volunteerData : any = baseVolunteerData;
        volunteerData.firstname = 'Jean' + id;
        volunteerData.isAdmin = false;
        delete volunteerData.password;

        if (!compareAny(response.body(), volunteerData)) {
            console.log(response.body());
            console.log(volunteerData);
        }

        assert.equal(compareAny(response.body(), volunteerData), true);
    })

    test('Logout remove token', async ({ assert, client }) => {
        const response = await client.post('/api/auth/logout').header('Authorization', `Bearer ${token}`);

        token = response.body().token;

        if (response.status() !== 200) {
            console.log(response.error());
            console.log(response.text());
        }

        assert.equal(response.status(), 200);

        const response2 = await client.get('/api/volunteers/me').header('Authorization', `Bearer ${token}`);

        if (response2.status() !== 401) {
            console.log(response2.error());
            console.log(response2.text());
        }

        assert.equal(response2.status(), 401);

        // Log back in
        const volunteerData = {
            email: 'jhondoe' + id + '@gmail.com',
            password: encryptWithHashSeed('password' + id),
        }

        const response3 = await client.post('/api/auth/login').json(volunteerData);

        if (response3.status() !== 200) {
            console.log(response3.error());
            console.log(response3.text());
        }

        token = response3.body().token;

        assert.equal(response3.status(), 200);

    })

    /* --------------------------- TEST THAT NOT WORK --------------------------- */

    test('Register with existing email', async ({ assert, client }) => {
        const volunteerData = {
            firstname: 'John' + id,
            lastname: 'Doe' + id,
            email: 'jhondoe' + id + '@gmail.com',
            address: '1 rue de la paix',
            phone: '0606060606',
            username: 'jdoe' + id,
            avatarUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Ffr%2Fphotos%2Favatar&psig=AOvVaw0w3Yy7l9JtY6Zx9W6XzZ5I&ust=1633566050566000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjB8ZCJz_MCFQAAAAAdAAAAABAD',
            tshirt_size: TshirtSizeEnum.XS,
            nb_edition_performed: 0,
            lodging: LodgingEnum.aucun,
            food_regime: FoodRegimeEnum.carnivore,
            password: encryptWithHashSeed('password' + id),
        }

        const response = await client.post('/api/auth/register').json(volunteerData);

        if (response.status() !== 422) {
            console.log(response.error());
            console.log(response.text());
        }

        assert.equal(response.status(), 422);
    })

    test('Login with wrong password', async ({ assert, client }) => {
        const volunteerData = {
            email: 'jhondoe' + id + '@gmail.com',
            password: encryptWithHashSeed('wrongpassword' + id),
        }

        const response = await client.post('/api/auth/login').json(volunteerData);

        if (response.status() !== 401) {
            console.log(response.error());
            console.log(response.text());
        }

        assert.equal(response.status(), 401);
    })

    test('Update with wrong token', async ({ assert, client }) => {
        const volunteerData = {
            firstname: 'Jean' + id,
        }

        const response = await client.put('/api/volunteers/me').header('Authorization', `Bearer ${token}wrong`).json(volunteerData);

        if (response.status() !== 401) {
            console.log(response.error());
            console.log(response.text());
        }

        assert.equal(response.status(), 401);
    })

    test('Register with incomplete data', async ({ assert, client }) => {
        const volunteerData = {
            // firstname: 'John' + id+1,
            lastname: 'Doe' + id+1,
            email: 'jhondoe' + id+1 + '@gmail.com',
            address: '1 rue de la paix',
            phone: '0606060606',
            username: 'jdoe' + id+1,
            avatarUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Ffr%2Fphotos%2Favatar&psig=AOvVaw0w3Yy7l9JtY6Zx9W6XzZ5I&ust=1633566050566000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjB8ZCJz_MCFQAAAAAdAAAAABAD',
            tshirt_size: TshirtSizeEnum.XS,
            nb_edition_performed: 0,
            lodging: LodgingEnum.aucun,
            food_regime: FoodRegimeEnum.carnivore,
            password: encryptWithHashSeed('password' + id+1),
        }

        const response = await client.post('/api/auth/register').json(volunteerData);

        if (response.status() !== 422) {
            console.log(response.error());
            console.log(response.text());
        }

        assert.equal(response.status(), 422);
    })
})