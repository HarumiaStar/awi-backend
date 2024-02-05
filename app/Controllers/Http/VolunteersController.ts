import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Volunteer from 'App/Models/Volunteer'
import UpdateVolunteerValidator from 'App/Validators/UpdateVolunteerValidator'

export default class VolunteersController {
  public async index({ response }: HttpContextContract) {
    const volunteers = await Volunteer.query().preload('associations')
    return response.ok(volunteers)
  }

  public async show({ request, response }: HttpContextContract) {
    const volunteer = await Volunteer.findOrFail(request.params().id)
    await volunteer.load('associations')
    return response.ok(volunteer)
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(UpdateVolunteerValidator)
      const volunteer = await Volunteer.findOrFail(request.params().id)

      if (payload.associations) {
        volunteer.related('associations').sync(payload.associations)
      }

      await volunteer.merge(payload).save()
      return response.status(200).json({ message: 'Volunteer updated !' })
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  public async destroy({ request }: HttpContextContract) {
    const volunteer = await Volunteer.findOrFail(request.params().id)
    await volunteer.delete()
  }

  public async showSelf({ auth, response }: HttpContextContract) {
    const volunteer = await auth.use('api').authenticate()

    await volunteer.load('associations')

    const result = {
      id: volunteer.id,
      firstname: volunteer.firstname,
      lastname: volunteer.lastname,
      email: volunteer.email,
      address: volunteer.address,
      phone: volunteer.phone,
      username: volunteer.username,
      avatar_url: volunteer.avatarUrl,
      nb_edition_performed: Number(volunteer.nbEditionPerformed),
      tshirt_size: volunteer.tshirtSize,
      lodging: volunteer.lodging,
      food_regime: volunteer.foodRegime,
      isAdmin: volunteer.isAdmin,
      associations: volunteer.associations,
    }

    return response.ok(result)
  }

  public async updateSelf({ request, response, auth }: HttpContextContract) {
    const volunteer = await auth.use('api').authenticate()

    const id = volunteer.id

    try {
      const payload = await request.validate(UpdateVolunteerValidator)

      if (payload.associations) {
        volunteer.related('associations').sync(payload.associations)
      }

      await volunteer.merge(payload).save()

      return response.status(200).json({ message: 'Volunteer updated !' })
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }
}
