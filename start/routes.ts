/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // Authentification
  Route.post('/auth/register', 'AuthController.register')
  Route.post('/auth/login', 'AuthController.login')
  Route.post('/auth/logout', 'AuthController.logout')
  Route.get('/auth/hash-seed', 'AuthController.getHashSeed')

  // Volunteer
  Route.get('/volunteers', 'VolunteersController.index').middleware('auth')
  Route.get('/volunteers/me', 'VolunteersController.showSelf').middleware('auth')
  Route.put('/volunteers/me', 'VolunteersController.updateSelf').middleware('auth')
  Route.get('/volunteers/:id', 'VolunteersController.show').middleware('auth')
  Route.put('/volunteers/:id', 'VolunteersController.update').middleware('auth')
  Route.delete('/volunteers/:id', 'VolunteersController.destroy').middleware('auth')

  // Festival
  Route.group(() => {
    // The current festival
    Route.get('/current', 'FestivalsController.showCurrent')
    Route.put('/current', 'FestivalsController.updateCurrent').middleware('role:admin')

    Route.post('/new', 'FestivalsController.new').middleware('role:admin')

    Route.get('/', 'FestivalsController.index')
    Route.post('/', 'FestivalsController.store').middleware('role:admin')
    Route.get('/:id', 'FestivalsController.show')
    Route.put('/:id', 'FestivalsController.update').middleware('role:admin')
    Route.delete('/:id', 'FestivalsController.destroy').middleware('role:admin')
  }).prefix('/festivals')

  // Game
  Route.group(() => {
    Route.get('/', 'GamesController.index')
    Route.post('/', 'GamesController.store').middleware('role:admin')
    Route.post('/multiple', 'GamesController.storeMultiple').middleware('role:admin')
    Route.get('/:id', 'GamesController.show')
    Route.put('/:id', 'GamesController.update').middleware('role:admin')
    Route.delete('/:id', 'GamesController.destroy').middleware('role:admin')
  }).prefix('/games')

  // Zone
  Route.group(() => {
    Route.get('/', 'ZonesController.index')
    Route.post('/', 'ZonesController.store').middleware('role:admin')
    Route.post('/multiple', 'ZonesController.storeMultiple').middleware('role:admin')
    Route.get('/:id', 'ZonesController.show')
    Route.put('/:id', 'ZonesController.update').middleware('role:admin')
    Route.delete('/:id', 'ZonesController.destroy').middleware('role:admin')
  }).prefix('/zones')

  // Slot
  Route.group(() => {
    Route.get('/', 'SlotsController.index')
    Route.post('/', 'SlotsController.store').middleware('role:admin')
    Route.post('/multiple', 'SlotsController.storeMultiple').middleware('role:admin')
    Route.get('/:id', 'SlotsController.show')
    Route.put('/:id', 'SlotsController.update').middleware('role:admin')
    Route.delete('/:id', 'SlotsController.destroy').middleware('role:admin')
  }).prefix('/slots')

  // GameZone
  Route.group(() => {
    Route.get('/', 'GameZoneController.index')
    Route.post('/', 'GameZoneController.store').middleware('role:admin')
    Route.post('/multiple', 'GameZoneController.storeMultiple').middleware('role:admin')
    // Route.get('/:id', 'GameZoneController.show') // Nothing to implement
    // Route.put('/:id', 'GameZoneController.update').middleware('role:admin') // Nothing to implement
    Route.delete('/', 'GameZoneController.destroy').middleware('role:admin')
    Route.get('/zones/:id', 'GameZoneController.listZones')
    Route.get('/games/:id', 'GameZoneController.listGames')
  })
    .prefix('/game-zones')
    .middleware('auth')

  // Association
  Route.group(() => {
    Route.get('/', 'AssociationsController.index')
    Route.post('/', 'AssociationsController.store').middleware('role:admin')
    Route.get('/:id', 'AssociationsController.show')
    Route.put('/:id', 'AssociationsController.update').middleware('role:admin')
    Route.delete('/:id', 'AssociationsController.destroy').middleware('role:admin')
  })
    .prefix('/associations')
    .middleware('auth')

  // Wishe
  Route.group(() => {
    Route.get('/', 'WishesController.index')
    Route.post('/', 'WishesController.store')
    Route.get('/:id', 'WishesController.show')
    Route.put('/:id', 'WishesController.update')
    Route.delete('/:id', 'WishesController.destroy')
  })
    .prefix('/wishes')
    .middleware('auth')

  // Assignment
  Route.group(() => {
    Route.get('/', 'AssignmentsController.index')
    Route.post('/', 'AssignmentsController.store').middleware('role:admin')
    Route.post('/all', 'AssignmentsController.storeAll').middleware('role:admin')
    Route.get('/:id', 'AssignmentsController.show')
    Route.put('/:id', 'AssignmentsController.update').middleware('role:admin')
    Route.delete('/:id', 'AssignmentsController.destroy').middleware('role:admin')
  })
    .prefix('/assignments')
    .middleware('auth')
}).prefix('/api')

Route.get('/', () => {
  return 'protected'
}).middleware('auth')
