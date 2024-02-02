import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Festival from 'App/Models/Festival'
import Slot from 'App/Models/Slot'
import CreateMultipleSlotValidator from 'App/Validators/Slot/CreateMultipleSlotValidator'
import { DateTime } from 'luxon'
import CreateSlotValidator from 'App/Validators/Slot/CreateSlotValidator'
import UpdateSlotValidator from 'App/Validators/Slot/UpdateSlotValidator'

function formatDate(date: DateTime) {
    let dateString = date.setLocale('en-gb').toLocaleString( { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'} );
    dateString = dateString.replace(',', '')
    return dateString
}

export default class SlotsController {
    public async index({}: HttpContextContract) {
        const slots = await Slot.all()

        const data = slots.map((slot) => {
            return {
                id: slot.id,
                // dd/MM/yyyy HH:mm
                startTime: formatDate(slot.startTime),
                endTime: formatDate(slot.endTime),
            }
        })

        return data
    }

    public async store({ request, response }: HttpContextContract) {
        const payload = await request.validate(CreateSlotValidator)
        const slot = await Slot.create(payload)

        const data = {
            id: slot.id,
            startTime: formatDate(slot.startTime),
            endTime: formatDate(slot.endTime),
        }

        return response.ok(data)
    }

    public async show({ request, response }: HttpContextContract) {
        const slot: Slot = await Slot.findOrFail(request.params().id)
        const data = {
            id: slot.id,
            // dd/MM/yyyy HH:mm
            startTime: formatDate(slot.startTime),
            endTime: formatDate(slot.endTime),
        }

        return response.ok(data)
    }

    public async update({ request, response }: HttpContextContract) {
        try {
            const payload = await request.validate(UpdateSlotValidator)
            const slot: Slot = await Slot.findOrFail(request.params().id)

            await slot.merge(payload).save()

            return response.status(200).json({ message: 'Slot updated !' })
        } catch (e) {
            return response.badRequest(e.messages)
        }
    }

    public async destroy({ request, response }: HttpContextContract) {
        const slot: Slot = await Slot.findOrFail(request.params().id)
        await slot.delete()

        return response.status(200).json({ message: 'Slot deleted !' })
    }

    public async getSlotsByFestival({ request, response }: HttpContextContract) {
        const festivalId = request.params().id
        const festival = await Festival.findOrFail(festivalId)
        const festivalStart = festival.startDate
        const festivalEnd = festival.endDate

        const slots = await Slot.query()
            .where('startTime', '>=', festivalStart)
            .andWhere('endTime', '<=', festivalEnd)
            .exec()
        
        const data = slots.map((slot) => {
            return {
                id: slot.id,
                startTime: formatDate(slot.startTime),
                endTime: formatDate(slot.endTime),
            }
        })

        return response.ok(data)
    }

    public async storeMultiple({ request, response }: HttpContextContract) {
        // Request body should be an array of slots
        const payload = (await request.validate(CreateMultipleSlotValidator)).slots;

        const slots = await Slot.createMany(payload)

        const data: {
            id: string,
            startTime: string,
            endTime: string,
        }[] = slots.map((slot) => {
            return {
                id: slot.id,
                // dd/MM/yyyy HH:mm
                startTime: formatDate(slot.startTime),
                endTime: formatDate(slot.endTime),
            }
        })

        return response.ok(data)
    }



}
