import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Roles from 'App/Enums/Roles'

export default class Role {
  // .middleware(['auth', 'role:admin'])
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    guards: string[]
  ) {
    const roleIds = guards.map((guard) => Roles[guard.toUpperCase()])
    const volunteer = await auth.authenticate()
    const validation = volunteer.isAdmin ? 1 : 0

    if (!roleIds.includes(validation)) {
      return response.forbidden({ error: `This is restricted to ${guards.join(', ')} users` })
    }

    await next()
  }
}
