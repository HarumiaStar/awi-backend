import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Volunteer, { FoodRegimeEnum, LodgingEnum, TshirtSizeEnum } from 'App/Models/Volunteer'

test.group('Database', (group) => {
  group.setup(async () => {
    await Database.beginGlobalTransaction()
    const volunteer = await Volunteer.create({
      firstname: 'John',
      lastname: 'Doe',
      email: 'jhondoe@gmail.com',
      address: '1 rue de la paix',
      phone: '0606060606',
      username: 'jdoe',
      avatarUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Ffr%2Fphotos%2Favatar&psig=AOvVaw0w3Yy7l9JtY6Zx9W6XzZ5I&ust=1633566050566000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjB8ZCJz_MCFQAAAAAdAAAAABAD',
      tshirtSize: TshirtSizeEnum.XS,
      nbEditionPerformed: BigInt(0),
      lodging: LodgingEnum.aucun,
      foodRegime: FoodRegimeEnum.carnivore,
      isAdmin: false,
      isPresent: false,
      password: 'password'
    })
    await volunteer.save()
    
  })

  group.teardown(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('create new volunteer', async ({ assert }) => {
    const id = Math.floor(Math.random() * 1000)
    const volunteer = await Volunteer.create({
      firstname: 'John'+id,
      lastname: 'Doe'+id,
      email: 'jhondoe' + id + '@gmail.com',
      address: '1 rue de la paix',
      phone: '0606060606',
      username: 'jdoe'+id,
      avatarUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Ffr%2Fphotos%2Favatar&psig=AOvVaw0w3Yy7l9JtY6Zx9W6XzZ5I&ust=1633566050566000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjB8ZCJz_MCFQAAAAAdAAAAABAD',
      tshirtSize: TshirtSizeEnum.XS,
      nbEditionPerformed: BigInt(0),
      lodging: LodgingEnum.aucun,
      foodRegime: FoodRegimeEnum.carnivore,
      isAdmin: false,
      isPresent: false,
      password: 'password'
    })
    await volunteer.save()

    const savedVolunteer = await Volunteer.findByOrFail('firstname', 'John'+id)

    assert.equal(savedVolunteer.firstname, 'John'+id)
  })

  test('update volunteer', async ({ assert }) => {
    const volunteerToUpdate = await Volunteer.findByOrFail('firstname', 'John')

    volunteerToUpdate.firstname = 'Jane'
    await volunteerToUpdate.save()

    const updatedVolunteer = await Volunteer.findByOrFail('firstname', 'Jane')

    assert.equal(updatedVolunteer.firstname, 'Jane')

    updatedVolunteer.firstname = 'John'
    await updatedVolunteer.save()

    const resetVolunteer = await Volunteer.findByOrFail('firstname', 'John')
    assert.equal(resetVolunteer.firstname, 'John')
  })


  test('delete volunteer', async ({ assert }) => {
    const volunteerToDelete = await Volunteer.findByOrFail('firstname', 'John')
    
    await volunteerToDelete.delete()

    const deletedVolunteer = await Volunteer.findBy('firstname', 'John')
    
    assert.isNull(deletedVolunteer)
  })
})

