'use strict'

const db = require('../server/db')
const {Product, Category, User} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '111', adminAccess: true}),
    User.create({email: 'murphy@email.com', password: '111'})
  ])

  const products = await Promise.all([
    Product.create({
      title: 'Shepards Pie',
      description:
        'Give your cat a trip to the English country side with minced red meat, cooked in a gravy with onions, vegetables, and topped with catnip',
      priceCents: 299,
      quantity: 50
    }),
    Product.create({
      title: 'Vegan Kitty Korma',
      description:
        'Low fat, traditional Indian dish that’s light and flavorful almond curry made with tomato paste, plenty of spices and cream thats buttery and completely purrrrfect',
      priceCents: 599,
      quantity: 50
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
