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

    const startDate: string = this.getFestivalDateFormat(festival, 'startDate')
    const endDate: string = this.getFestivalDateFormat(festival, 'endDate')

    const data = {
      id: festival.id,
      title: festival.title,
      address: festival.address,
      description: festival.description,
      posterPath: festival.posterPath,
      startDate: startDate,
      endDate: endDate,
    }

    return response.ok(data)
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
    let festival = await this.getCurrentDuringFestival()
    if (!festival) festival = await this.getNextCurrentFestival()
    if (!festival) return response.notFound({ message: 'Current festival not found !' })

    const startDate: string = this.getFestivalDateFormat(festival, 'startDate')
    const endDate: string = this.getFestivalDateFormat(festival, 'endDate')

    const data = {
      id: festival.id,
      title: festival.title,
      address: festival.address,
      description: festival.description,
      posterPath: festival.posterPath,
      startDate: startDate,
      endDate: endDate,
    }
    return response.ok(data)
  }

  public async updateCurrent({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(UpdateFestivalValidator)
      let festival = await this.getCurrentDuringFestival()
      if (!festival) festival = await this.getNextCurrentFestival()
      if (!festival) return response.notFound({ message: 'Current festival not found for update !' })

      await festival.merge(payload).save()

      return response.status(200).json({ message: 'Current festival updated !' })
    } catch (e) {
      return response.badRequest(e.messages)
    }
  }

  private async getCurrentDuringFestival() {
    const currentDate = new Date()
    const festival = await Festival.query()
      .where('start_date', '<=', currentDate)
      .andWhere('end_date', '>=', currentDate)
      .first()
    return festival
  }

  private async getNextCurrentFestival() {
    const currentDate = new Date()
    const festival = await Festival.query()
      .where('start_date', '>=', currentDate)
      .andWhere('end_date', '>=', currentDate)
      .first()
    return festival
  }

  private getFestivalDateFormat(festival: Festival, typeOfDate: string) {
    switch (typeOfDate) {
      case 'startDate': {
        return (
          festival.startDate.getDate().toString().padStart(2, '0') +
          '/' +
          (festival.startDate.getMonth() + 1).toString().padStart(2, '0') +
          '/' +
          festival.startDate.getFullYear()
        )
      }
      case 'endDate': {
        return (
          festival.endDate.getDate().toString().padStart(2, '0') +
          '/' +
          (festival.endDate.getMonth() + 1).toString().padStart(2, '0') +
          '/' +
          festival.endDate.getFullYear()
        )
      }
      default: {
        return ''
      }
    }
  }

  public async new({ request, response }: HttpContextContract) {
    



    
    return response.badRequest("Not implemented yet")
  }
}
