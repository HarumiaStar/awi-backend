import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Zone from 'App/Models/Zone'
import CreateMultipleZoneValidator from 'App/Validators/Zone/CreateMultipleZoneValidator'
import CreateZoneValidator from 'App/Validators/Zone/CreateZoneValidator'
import UpdateZoneValidator from 'App/Validators/Zone/UpdateZoneValidator'

export default class ZonesController {
    public async index({ }: HttpContextContract) {
        return Zone.all()
    }

    public async store({ request, response }: HttpContextContract) {
        const payload = await request.validate(CreateZoneValidator)
        const zone = await Zone.create(payload)

        const data = {
            id: zone.id,
            name: zone.name,
            description: zone.description,
            maxCapacity: zone.maxCapacity,
            animation: zone.animation,
            festivalId: zone.festivalId,
        }

        return response.ok(data)
    }

    public async show({ request, response }: HttpContextContract) {
        const zone: Zone = await Zone.findOrFail(request.params().id)

        const data = {
            id: zone.id,
            name: zone.name,
            description: zone.description,
            maxCapacity: zone.maxCapacity,
            animation: zone.animation,
            festivalId: zone.festivalId,
        }


        return response.ok(data)
    }

    public async update({ request, response }: HttpContextContract) {
        try {
            const payload = await request.validate(UpdateZoneValidator)
            const zone: Zone = await Zone.findOrFail(request.params().id)

            await zone.merge(payload).save()

            return response.status(200).json({ message: 'Zone updated !' })
        } catch (e) {
            return response.badRequest(e.messages)
        }
    }

    public async destroy({ request, response }: HttpContextContract) {
        const zone: Zone = await Zone.findOrFail(request.params().id)
        await zone.delete()

        return response.ok({ message: 'Zone deleted successfully.' })
    }

    public async storeMultiple({ request, response }: HttpContextContract) {
        // Request body should be an array of zones
        const payload = (await request.validate(CreateMultipleZoneValidator)).zones;

        const zones = await Zone.createMany(payload)

        const data: {
            id: string,
            name: string,
            description: string,
            maxCapacity: number,
            animation: boolean,
            festivalId: string,
        }[] = []
        zones.forEach(zone => {
            data.push({
                id: zone.id,
                name: zone.name,
                description: zone.description,
                maxCapacity: zone.maxCapacity,
                animation: zone.animation,
                festivalId: zone.festivalId,
            })
        })

        return response.ok(data)
    }
}
