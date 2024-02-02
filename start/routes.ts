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
  Route.get('/volunteers', 'VolunteersController.index')
  Route.get('/volunteers/me', 'VolunteersController.showSelf')
  Route.put('/volunteers/me', 'VolunteersController.updateSelf')
  Route.get('/volunteers/:id', 'VolunteersController.show')
  Route.put('/volunteers/:id', 'VolunteersController.update')
  Route.delete('/volunteers/:id', 'VolunteersController.destroy')

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
}).prefix('/api')

Route.get('/', () => {
  return 'protected'
}).middleware('auth')
