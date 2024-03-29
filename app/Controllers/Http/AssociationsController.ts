import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Association from 'App/Models/Association'
import CreateAssociationValidator from 'App/Validators/Association/CreateAssociationValidator'
import UpdateAssociationValidator from 'App/Validators/Association/UpdateAssociationValidator'

export default class AssociationsController {
  public async index({ response }: HttpContextContract) {
    const associations = await Association.query().preload('volunteers')
    return response.ok(associations)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateAssociationValidator)
    const association: Association = await Association.create(payload)
    return response.ok(association)
  }

  public async show({ request, response }: HttpContextContract) {
    const association = await Association.findOrFail(request.params().id)
    await association.load('volunteers')
    return response.ok(association)
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(UpdateAssociationValidator)
      const association: Association = await Association.findOrFail(request.params().id)

      if (payload.volunteers) {
        await association.related('volunteers').sync(payload.volunteers)
      }

      await association.merge(payload).save()

      return response.status(200).json({ message: 'Association updated !' })
    } catch (e) {
      return response.badRequest(e.messages)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const association = await Association.findOrFail(request.params().id)
    await association.delete()

    return response.ok({ message: 'Association deleted successfully.' })
  }
}
