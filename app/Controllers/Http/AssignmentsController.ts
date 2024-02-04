import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Assignment from 'App/Models/Assignment'
import Wishe from 'App/Models/Wishe'
import CreateAssignmentValidator from 'App/Validators/Assignment/CreateAssignmentValidator'
import UpdateAssignmentValidator from 'App/Validators/Assignment/UpdateAssignmentValidator'

export default class AssignmentsController {
  public async index({ response }: HttpContextContract) {
    const assignments = await Assignment.query()
      .preload('volunteer')
      .preload('zone')
      .preload('slot')
    return response.ok(assignments)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateAssignmentValidator)
    const assignment: Assignment = await Assignment.create(payload)
    return response.ok(assignment)
  }

  public async storeAll({ response }: HttpContextContract) {
    const wishes = await Wishe.query()
      .select('volunteer_id', 'zone_id', 'slot_id', 'is_referent')
      .groupBy('volunteer_id', 'zone_id', 'slot_id', 'is_referent')
      .havingRaw('COUNT(volunteer_id) = 1')

    const assignments = await Promise.all(
      wishes.map(async (wish) => {
        const assignment = await Assignment.create(wish)
        return assignment
      })
    )

    return response.ok(assignments)
  }

  public async show({ request, response }: HttpContextContract) {
    const assignment = await Assignment.findOrFail(request.param('id'))
    await assignment.load('volunteer')
    await assignment.load('zone')
    await assignment.load('slot')
    return response.ok(assignment)
  }

  public async update({ request, response }: HttpContextContract) {
    const assignment = await Assignment.findOrFail(request.param('id'))
    const payload = await request.validate(UpdateAssignmentValidator)
    assignment.merge(payload)
    await assignment.save()
    return response.ok(assignment)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const assignment = await Assignment.findOrFail(request.param('id'))
    await assignment.delete()
    return response.ok({ message: 'Assignment deleted successfully.' })
  }
}
