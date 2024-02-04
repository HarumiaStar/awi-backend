import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Slot from 'App/Models/Slot'
import Volunteer from 'App/Models/Volunteer'
import Wishe from 'App/Models/Wishe'
import Zone from 'App/Models/Zone'
import CreateWhisheValidator from 'App/Validators/Whishe/CreateWhisheValidator'
import UpdateWhisheValidator from 'App/Validators/Whishe/UpdateWhisheValidator'

export default class WishesController {
  public async index({ response }: HttpContextContract) {
    const wishes = await Wishe.query().preload('volunteer').preload('zone').preload('slot')
    return response.ok(wishes)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const me = await auth.use('api').authenticate()
    const payload = await request.validate(CreateWhisheValidator)

    if (me.id !== payload.volunteer_id || !me.isAdmin) {
      return response.forbidden({ message: 'You can only create wishes for yourself' })
    }

    const wishe: Wishe = await Wishe.create(payload)
    return response.ok(wishe)
  }

  public async show({ request, response }: HttpContextContract) {
    const wishe = await Wishe.findOrFail(request.params().id)
    await wishe.load('zone')
    await wishe.load('slot')
    await wishe.load('volunteer')
    return response.ok(wishe)
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const me = await auth.use('api').authenticate()
    try {
      const payload = await request.validate(UpdateWhisheValidator)

      if (me.id !== payload.volunteer_id || !me.isAdmin) {
        return response.forbidden({ message: 'You can only update wishes for yourself' })
      }

      const wishe: Wishe = await Wishe.findOrFail(request.params().id)

      if (payload.volunteer_id) {
        const volunteer = await Volunteer.findOrFail(payload.volunteer_id)
        await wishe.related('volunteer').associate(volunteer)
      }

      if (payload.zone_id) {
        const zone = await Zone.findOrFail(payload.zone_id)
        await wishe.related('zone').associate(zone)
      }

      if (payload.slot_id) {
        const slot = await Slot.findOrFail(payload.slot_id)
        await wishe.related('slot').associate(slot)
      }

      await wishe.merge(payload).save()

      return response.status(200).json({ message: 'Wishe updated !' })
    } catch (e) {
      return response.badRequest(e.messages)
    }
  }

  public async destroy({ request, response, auth }: HttpContextContract) {
    const me = await auth.use('api').authenticate()
    const wishe = await Wishe.findOrFail(request.params().id)

    if (me.id !== wishe.volunteerId || !me.isAdmin) {
      return response.forbidden({ message: 'You can only update wishes for yourself' })
    }

    await wishe.delete()
    return response.ok({ message: 'Wishe deleted successfully.' })
  }
}
