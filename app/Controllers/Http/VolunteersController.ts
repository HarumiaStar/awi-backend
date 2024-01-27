import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Volunteer from 'App/Models/Volunteer'
import UpdateVolunteerValidator from 'App/Validators/UpdateVolunteerValidator'

export default class VolunteersController {
  public async index({}: HttpContextContract) {
    return Volunteer.all()
  }

  public async show({ request }: HttpContextContract) {
    return Volunteer.findOrFail(request.params().id)
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(UpdateVolunteerValidator)
      const volunteer = await Volunteer.findOrFail(request.params().id)

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

  public async showSelf({ auth, response}: HttpContextContract) {

    const volunteer = await auth.use('api').authenticate()

    const result = {
      firstname: volunteer.firstname,
      lastname: volunteer.lastname,
      email: volunteer.email,
      address: volunteer.address,
      phone: volunteer.phone,
      username: volunteer.username,
      avatarUrl: volunteer.avatarUrl,
      nbEditionPerformed: volunteer.nbEditionPerformed,
      tshirtSize: volunteer.tshirtSize,
      lodging: volunteer.lodging,
      foodRegime: volunteer.foodRegime,
      isAdmin: volunteer.isAdmin
    }

    return response.ok(result)
  }
 }
