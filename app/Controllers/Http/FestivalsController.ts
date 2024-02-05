import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Festival from 'App/Models/Festival'
import Game from 'App/Models/Game'
import GameZone from 'App/Models/GameZone'
import Slot from 'App/Models/Slot'
import Zone from 'App/Models/Zone'
import CreateFestivalValidator from 'App/Validators/Festival/CreateFestivalValidator'
import NewFestivalValidator from 'App/Validators/Festival/NewFestivalValidator'
import UpdateFestivalValidator from 'App/Validators/Festival/UpdateFestivalValidator'
import { DateTime } from 'luxon'

export default class FestivalsController {
  public async index({ }: HttpContextContract) {
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
    const transaction = await Database.transaction()

    const payload = await request.validate(NewFestivalValidator)

    const festivalData : {
      title: string,
      address: string,
      description: string,
      posterPath: string | undefined,
      startDate: Date,
      endDate: Date,
    } = {
      title: payload.title,
      address: payload.address,
      description: payload.description,
      posterPath: payload.poster_path,
      startDate: payload.start_date.toJSDate(),
      endDate: payload.end_date.toJSDate(),
    }

    const festival = await Festival.create(festivalData, transaction)


    const festId = festival.id;

    const gamesData = payload.games.map((jeu: any) => {
      return {
        idGame: jeu.idGame,
        name: jeu.name,
        author: jeu.author,
        editor: jeu.editor,
        maxPlayers: jeu.maxPlayers,
        minPlayers: jeu.minPlayers,
        minAge: jeu.minAge,
        duration: jeu.duration,
        toAnimate: jeu.toAnimate,
        recieved: jeu.recieved,
        type: jeu.type,
        mechanics: jeu.mechanics,
        theme: jeu.theme,
        tags: jeu.tags,
        description: jeu.description,
        image: jeu.image,
        logo: jeu.logo,
        video: jeu.video,
        manual: jeu.manual,
      }
    })
    const games = await Game.createMany(gamesData, transaction)

    const zonesData = payload.zones.map((zone: any) => {
      return {
        idZone: zone.idZone,
        name: zone.name,
        description: zone.description,
        maxCapacity: zone.maxCapacity,
        animation: zone.animation,
        festivalId: festId,
      }
    });

    const zones = await Zone.createMany(zonesData, transaction)

    const gameZonesData = payload.gameZones.map((jeu: any) => {
      const game = games.find((game) => game.idGame === jeu.idJeu)
      const zone = zones.find((zone) => zone.idZone === jeu.idZone)

      if (!game || !zone) {
        transaction.rollback()
        throw new Error('Game-zone dont exist : ' + jeu.idJeu + ' ' + jeu.idZone)
      }

      return {
        gameId: game.id,
        zoneId: zone.id,
      }
    })

    await GameZone.createMany(gameZonesData, transaction)

    const slotsData = payload.slots.map((slot: {startTime: DateTime<boolean>;endTime: DateTime<boolean>;}) => {
      return {
        startTime: slot.startTime,
        endTime: slot.endTime,
      }
    })

    await Slot.createMany(slotsData, transaction)


    await transaction.commit()
    return response.ok({ message: 'Festival created !'})
  }
}
