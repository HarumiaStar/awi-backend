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
    
    const res = await Volunteer.create(modifiedPayload) // TODO : error Types of property 'address' are incompatible. Type 'string | null | undefined' is not assignable to type 'string | undefined'. Type 'null' is not assignable to type 'string | undefined'

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

  public async getHashSeed({ auth, request, response }: HttpContextContract) {
    // get from .env
    const hashSeed = process.env.HASH_SEED
    
    // Return hash seed if it exists
    if (hashSeed) {
      return response.ok({"hashSeed": hashSeed})
    }

    // return 500 if hash seed does not exist
    return response.internalServerError('Hash seed does not exist')
  }
}
