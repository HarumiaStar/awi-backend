import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterVolunteerValidator from 'App/Validators/RegisterVolunteerValidator'
import Volunteer from 'App/Models/Volunteer'
import LoginVolunteerValidator from 'App/Validators/LoginVolunteerValidator'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterVolunteerValidator)
    
    const modifiedPayload = {
      ...payload,
      isAdmin: false,
      isPresent: false,
    }
    
    const res = await Volunteer.create(modifiedPayload)

    if (!res.$isPersisted) {
      return response.badRequest('Failed to create volunteer')
    }

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
