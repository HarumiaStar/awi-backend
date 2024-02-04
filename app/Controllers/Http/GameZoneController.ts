import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GameZone from 'App/Models/GameZone'
import CreateGameZoneValidator from 'App/Validators/Game_Zone/CreateGameZoneValidator'
import CreateMultipleGameZoneValidator from 'App/Validators/Game_Zone/CreateMultipleGameZoneValidator'


export default class GameZoneController {
    public async index({ }: HttpContextContract) {
        const gameZones = await GameZone.all()

        const data = gameZones.map((gameZone) => {
            return {
                gameId: gameZone.gameId,
                zoneId: gameZone.zoneId,
            }
        })

        return data

    }

    public async store({ request, response }: HttpContextContract) {
        const payload = await request.validate(CreateGameZoneValidator)
        const gameZone = await GameZone.create(payload)

        const data = {
            gameId: gameZone.gameId,
            zoneId: gameZone.zoneId,
        }

        return response.ok(data)
    }


    public async destroy({ response, request }: HttpContextContract) {
        const gameZone = await request.validate(CreateGameZoneValidator)
        await GameZone.query().where('game_id', gameZone.gameId).where('zone_id', gameZone.zoneId).delete()

        return response.ok({ message: 'GameZone deleted successfully.' })
    }

    public async listZones({ request, response }: HttpContextContract) {
        const gameId = request.params().id
        const gameZones = await GameZone.query().where('game_id', gameId)

        const data = gameZones.map((gameZone) => {
            return gameZone.zoneId
        })

        return response.ok(data)
    }

    public async listGames({ request, response }: HttpContextContract) {
        const zoneId = request.params().id
        const gameZones = await GameZone.query().where('zone_id', zoneId)

        const data = gameZones.map((gameZone) => {
            return gameZone.gameId
        })

        return response.ok(data)
    }

    public async storeMultiple({ request, response }: HttpContextContract) {
        const payload = await request.validate(CreateMultipleGameZoneValidator)
        const gameZones = await GameZone.createMany(payload.gameZones)
        
        const data = gameZones.map((gameZone) => {
            return {
                gameId: gameZone.gameId,
                zoneId: gameZone.zoneId,
            }
        })

        return response.ok(data)
    }


}