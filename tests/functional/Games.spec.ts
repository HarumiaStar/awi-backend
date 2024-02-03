import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Game from 'App/Models/Game'
import Volunteer, { FoodRegimeEnum, LodgingEnum, TshirtSizeEnum } from 'App/Models/Volunteer';
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

test.group('Test des fonction internes : Game', (group) => {
    const gameData = {
        idGame: 1,
        name: 'TestName',
        author: 'TestAuthor',
        editor: 'TestEditor',
        maxPlayers: 10,
        minPlayers: 2,
        minAge: 10,
        duration: 60,
        toAnimate: true,
        recieved: true,
        type: 'TestType',
        mechanics: 'TestMechanics',
        theme: 'TestTheme',
        tags: 'TestTags',
        description: 'TestDescription',
        image: 'TestImage',
        logo: 'TestLogo',
        video: 'TestVideo',
        manual: 'TestManual',
    }


    group.setup(async () => {
        await Database.beginGlobalTransaction()
    })

    group.teardown(async () => {
        await Database.rollbackGlobalTransaction()
    })


    test('create new game', async ({ assert }) => {
        const game = await Game.create(gameData)
        await game.save()

        const savedGame = await Game.findByOrFail('name', 'TestName')

        assert.equal(savedGame.name, 'TestName')
    })

    test('update game', async ({ assert }) => {
        const gameToUpdate = await Game.findByOrFail('name', 'TestName')

        gameToUpdate.name = 'TestNameUpdated'
        await gameToUpdate.save()

        const savedGame = await Game.findByOrFail('name', 'TestNameUpdated')

        assert.equal(savedGame.name, 'TestNameUpdated')
    })

    test('delete game', async ({ assert }) => {
        const gameToDelete = await Game.findByOrFail('name', 'TestNameUpdated')

        await gameToDelete.delete()

        const savedGame = await Game.findBy('name', 'TestNameUpdated')

        assert.isNull(savedGame)
    })

    // TODO : tester quand les champs sont mal renseignés
    // TODO : tester multiple create
})

test.group('Test des routes : Game', (group) => {
    const gameData = {
        idGame: 1,
        name: 'TestName',
        author: 'TestAuthor',
        editor: 'TestEditor',
        maxPlayers: 10,
        minPlayers: 2,
        minAge: 10,
        duration: 60,
        toAnimate: true,
        recieved: true,
        type: 'TestType',
        mechanics: 'TestMechanics',
        theme: 'TestTheme',
        tags: 'TestTags',
        description: 'TestDescription',
        image: 'TestImage',
        logo: 'TestLogo',
        video: 'TestVideo',
        manual: 'TestManual',
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


    test('create new game', async ({ client, assert }) => {
        const response = await client.post('/api/games').json(gameData).header('Authorization', `Bearer ${connection.token}`)

        if (response.status() !== 200) {
            console.log(response.error());
            console.log(response.text());

            console.log("====================================")
            console.log(connection.token);
        }

        response.assertStatus(200)
        assert.equal(response.body().name, 'TestName')
    })

    test('update game', async ({ client, assert }) => {
        const gameToUpdate = await Game.findByOrFail('name', 'TestName')

        const newGameData = { name: 'TestNameUpdated' }

        const response = await client.put(`/api/games/${gameToUpdate.id}`).json(newGameData).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(200)
        assert.equal(response.body().message, 'Game updated !')
    })

    test('delete game', async ({ client, assert }) => {
        const gameToDelete = await Game.findByOrFail('name', 'TestNameUpdated')

        const response = await client.delete(`/api/games/${gameToDelete.id}`).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(200)
        assert.equal(response.body().message, 'Game deleted successfully.')
    })

    test('Re-create game', async ({ client, assert }) => {
        const response = await client.post('/api/games').json(gameData).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(200)
        assert.equal(response.body().name, 'TestName')
    })

    test('get game', async ({ client, assert }) => {
        const gameToGet = await Game.findByOrFail('name', 'TestName')

        const response = await client.get(`/api/games/${gameToGet.id}`)

        response.assertStatus(200)
        assert.equal(response.body().name, 'TestName')
    })



    test('get all games', async ({ client, assert }) => {
        // Create a second game
        const gameData2 = { ...gameData, name: 'TestName2', idGame: 2 }

        const response2 = await client.post('/api/games').json(gameData2).header('Authorization', `Bearer ${connection.token}`)

        response2.assertStatus(200)
        assert.equal(response2.body().name, 'TestName2')

        const response = await client.get('/api/games')

        response.assertStatus(200)
        assert.equal(response.body().length, 2)
    })


    // TODO : tester quand les champs sont mal renseignés

    test('create new game without being logged in', async ({ client }) => {
        const response = await client.post('/api/games').json(gameData)

        response.assertStatus(401)
    })

    test('update game without being logged in', async ({ client }) => {
        const gameToUpdate = await Game.findByOrFail('name', 'TestName')

        const newGameData = { name: 'TestNameUpdated' }

        const response = await client.put(`/api/games/${gameToUpdate.id}`).json(newGameData)

        response.assertStatus(401)
    })

    test('delete game without being logged in', async ({ client }) => {
        const gameToDelete = await Game.findByOrFail('name', 'TestName')

        const response = await client.delete(`/api/games/${gameToDelete.id}`)

        response.assertStatus(401)
    })

    test('get game without being logged in', async ({ client, assert }) => {
        const gameToGet = await Game.findByOrFail('name', 'TestName')

        const response = await client.get(`/api/games/${gameToGet.id}`)

        response.assertStatus(200)
        assert.equal(response.body().name, 'TestName')
    })

    test('get all games without being logged in', async ({ client, assert }) => {
        const response = await client.get('/api/games')

        response.assertStatus(200)
        assert.equal(response.body().length, 2)
    })


    test('create new game without a name', async ({ client }) => {
        const gameData = {
            idGame: 1,
            author: 'TestAuthor',
            editor: 'TestEditor',
            maxPlayers: 10,
            minPlayers: 2,
            minAge: 10,
            duration: 60,
            toAnimate: true,
            recieved: true,
            type: 'TestType',
            mechanics: 'TestMechanics',
            theme: 'TestTheme',
            tags: 'TestTags',
            description: 'TestDescription',
            image: 'TestImage',
            logo: 'TestLogo',
            video: 'TestVideo',
            manual: 'TestManual',
        }

        const response = await client.post('/api/games').json(gameData).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(422)
    });

    test('create new game without optional fields', async ({ client, assert }) => {
        const gameData = {
            idGame: 3,
            name: 'TestName3',
            editor: 'TestEditor',
            maxPlayers: 10,
            minPlayers: 2,
            minAge: 10,
            duration: 60,
            toAnimate: true,
            recieved: true,
            type: 'TestType',
            mechanics: 'TestMechanics',
            theme: 'TestTheme',
            tags: 'TestTags',
            description: 'TestDescription',
            image: 'TestImage',
        }

        const response = await client.post('/api/games').json(gameData).header('Authorization', `Bearer ${connection.token}`)

        response.assertStatus(200)

        const game = await Game.findByOrFail('name', 'TestName3')

        assert.equal(game.name, 'TestName3')


        assert.equal(game.author, null)
        assert.equal(game.logo, null)
    });

    // TODO : tester multiple create


    test('create multiple games', async ({ client, assert }) => {
        const gameData = [
            {
                idGame: 6,
                name: 'TestName6',
                editor: 'TestEditor',
                maxPlayers: 10,
                minPlayers: 2,
                minAge: 10,
                duration: 60,
                toAnimate: true,
                recieved: true,
                type: 'TestType',
                mechanics: 'TestMechanics',
                theme: 'TestTheme',
                tags: 'TestTags',
                description: 'TestDescription',
                image: 'TestImage',
            },
            {
                idGame: 5,
                name: 'TestName5',
                editor: 'TestEditor',
                maxPlayers: 10,
                minPlayers: 2,
                minAge: 10,
                duration: 60,
                toAnimate: true,
                recieved: true,
                type: 'TestType',
                mechanics: 'TestMechanics',
                theme: 'TestTheme',
                tags: 'TestTags',
                description: 'TestDescription',
                image: 'TestImage',
            },
            {
                idGame: 4,
                name: 'TestName4',
                editor: 'TestEditor',
                maxPlayers: 10,
                minPlayers: 2,
                minAge: 10,
                duration: 60,
                toAnimate: true,
                recieved: true,
                type: 'TestType',
                mechanics: 'TestMechanics',
                theme: 'TestTheme',
                tags: 'TestTags',
                description: 'TestDescription',
                image: 'TestImage',
            },
        ]

        const payload = { games: gameData }
    
        const response = await client.post('/api/games/multiple').json(payload).header('Authorization', `Bearer ${connection.token}`)

        if( response.status() !== 200 ) {
            console.log(response.error());
            console.log(response.text());
        }


        response.assertStatus(200)

        const game = await Game.all()

        assert.equal(game.length, 6)
    });


})