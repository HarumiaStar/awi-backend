import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Festival from 'App/Models/Festival'
import CreateFestivalValidator from 'App/Validators/Festival/CreateFestivalValidator'
import UpdateFestivalValidator from 'App/Validators/Festival/UpdateFestivalValidator'

export default class FestivalsController {
  public async index({}: HttpContextContract) {
    return Festival.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateFestivalValidator)
    const festival = await Festival.create(payload)
    return response.ok(festival)
  }

  public async show({ request, response }: HttpContextContract) {
    const festival: Festival = await Festival.findOrFail(request.params().id)
    const startDate: string =
      festival.startDate.getDay() +
      '/' +
      festival.startDate.getMonth() +
      '/' +
      festival.startDate.getFullYear()

    const endDate: string =
      festival.endDate.getDay() +
      '/' +
      festival.endDate.getMonth() +
      '/' +
      festival.endDate.getFullYear()

    const data = {
      title: festival.title,
      address: festival.address,
      description: festival.description,
      startDate: startDate,
      endDate: endDate,
    }

    return response.status(200).json(data)
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(UpdateFestivalValidator)
      const festival: Festival = await Festival.findOrFail(request.params().id)

      await festival.merge(payload).save()

      return response.status(200).json({ message: 'Festival updated !' })
    } catch (e) {
      return response.badRequest(e.messages)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const festival: Festival = await Festival.findOrFail(request.params().id)
    await festival.delete()

    return response.ok({ message: 'Festival deleted successfully.' })
  }

  public async showCurrent({ response }: HttpContextContract) {
    // TODO : Show the last / current Festival
  }

  public async updateCurrent({ request, response }: HttpContextContract) {
    // TODO : Update the last / current Festival
  }
}
