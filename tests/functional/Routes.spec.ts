import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Volunteer, { FoodRegimeEnum, LodgingEnum, TshirtSizeEnum } from 'App/Models/Volunteer'


function encryptWithHashSeed(data: string): string {

    const hash = HmacSHA256(data, hash_seed).toString();
    return hash;
}


test.group('Routes', (group) => {
    group.setup(async () => {
        await Database.beginGlobalTransaction()
    })

    group.teardown(async () => {
        await Database.rollbackGlobalTransaction()
    })

    test('Register', async ({ assert, client }) => {
        const id = Math.floor(Math.random() * 1000)
        const volunteerData = {
            firstname: 'John' + id,
            lastname: 'Doe' + id,
            email: 'jhondoe' + id + '@gmail.com',
            address: '1 rue de la paix',
            phone: '0606060606',
            username: 'jdoe' + id,
            avatarUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Ffr%2Fphotos%2Favatar&psig=AOvVaw0w3Yy7l9JtY6Zx9W6XzZ5I&ust=1633566050566000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjB8ZCJz_MCFQAAAAAdAAAAABAD',
            tshirtSize: TshirtSizeEnum.XS,
            nbEditionPerformed: BigInt(0),
            lodging: LodgingEnum.aucun,
            foodRegime: FoodRegimeEnum.carnivore,
            isAdmin: false,
            isPresent: false,
            password: 'password'
        }

        const response 
    })

})