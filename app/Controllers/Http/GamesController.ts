import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Game from 'App/Models/Game'
import CreateGameValidator from 'App/Validators/Game/CreateGameValidator'
import CreateMultipleGameValidator from 'App/Validators/Game/CreateMultipleGameValidator'
import UpdateGameValidator from 'App/Validators/Game/UpdateGameValidator'

export default class gamesController {
  public async index({}: HttpContextContract) {
    return Game.all()
  }

    public async store({request, response}: HttpContextContract) {
        const payload = await request.validate(CreateGameValidator)
        const game = await Game.create(payload)
        
        const data = {
            id: game.id,
            name: game.name,
            author: game.author,
            editor: game.editor,
            maxPlayers: game.maxPlayers,
            minPlayers: game.minPlayers,
            minAge: game.minAge,
            duration: game.duration,
            toAnimate: game.toAnimate,
            recieved: game.recieved,
            type: game.type,
            mechanics: game.mechanics,
            theme: game.theme,
            tags: game.tags,
            description: game.description,
            image: game.image,
            logo: game.logo,
            video: game.video,
            manual: game.manual,
        }

        return response.ok(data)
    }

    public async show({request, response}: HttpContextContract) {
        const game : Game = await Game.findOrFail(request.params().id)

        const data = {
            id: game.id,
            name: game.name,
            author: game.author,
            editor: game.editor,
            maxPlayers: game.maxPlayers,
            minPlayers: game.minPlayers,
            minAge: game.minAge,
            duration: game.duration,
            toAnimate: game.toAnimate,
            recieved: game.recieved,
            type: game.type,
            mechanics: game.mechanics,
            theme: game.theme,
            tags: game.tags,
            description: game.description,
            image: game.image,
            logo: game.logo,
            video: game.video,
            manual: game.manual,
        }

        return response.ok(data)
    }

    public async update({request, response}: HttpContextContract) {
        try {
            const payload = await request.validate(UpdateGameValidator)
            const game: Game = await Game.findOrFail(request.params().id)

            await game.merge(payload).save()

            return response.status(200).json({message: 'Game updated !'})
        } catch (e) {
            return response.badRequest(e.messages)
        }
    }

    public async destroy({request, response}: HttpContextContract) {
        const game: Game = await Game.findOrFail(request.params().id)
        await game.delete()

        return response.ok({message: 'Game deleted successfully.'})
    }

    public async storeMultiple({request, response}: HttpContextContract) {
        // Request body should be an array of games
        const payload = (await request.validate(CreateMultipleGameValidator)).games;

        const games = await Game.createMany(payload)

        return response.ok(games)
    }
}

