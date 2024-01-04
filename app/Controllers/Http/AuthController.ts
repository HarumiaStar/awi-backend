import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterVolunteerValidator from 'App/Validators/RegisterVolunteerValidator'
import Volunteer from 'App/Models/Volunteer'
import LoginVolunteerValidator from 'App/Validators/LoginVolunteerValidator'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterVolunteerValidator)
    await Volunteer.create(payload)
    return response.status(201).json({ message: 'Volunteer created' })
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginVolunteerValidator)

    try {
      // Generate token
      return await auth.use('api').attempt(email, password, {
        expiresIn: '30 mins',
      })
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return { revoked: true }
  }
}
