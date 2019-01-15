'use strict'

const db = require('../server/db')
const {
  Product,
  Category,
  User,
  Order,
  OrderTotal
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '111', adminAccess: true}),
    User.create({email: 'murphy@email.com', password: '111'}),
    User.create({email: 'tom@email.com', password: '111'}),
    User.create({email: 'lion@email.com', password: '111'}),
    User.create({email: 'socks@email.com', password: '111'}),
    User.create({email: 'nala@email.com', password: '111'}),
    User.create({email: 'simba@email.com', password: '111'})
  ])

  const categories = await Promise.all([
    Category.create({title: 'Savory Purrrfection'}),
    Category.create({title: 'Foreign Foods for Furry Felines'}),
    Category.create({title: 'Crazy Catnips'})
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
    }),
    Product.create({
      title: 'Royal Canin Veterinary Diet',
      description:
        'The most common cause of Lower Urinary Tract Disease in cats is idiopathic cystitis.This diet promotes a urinary environment unfavorable to the development of both struvite and calcium oxalate crystals.',
      priceCents: 250,
      quantity: 10
    }),
    Product.create({
      title: 'Fancy Feast',
      description:
        'Make dinner a black tie optional affair with the Fancy Feast Grilled Seafood Feast Variety Pack. With a delicious combo of your cat’s favorite flavors, this gourmet food features tender cuts of seafood that are slow-cooked to perfection in a savory gravy.',
      priceCents: 400,
      quantity: 30
    }),
    Product.create({
      title: 'Meow Mix',
      description:
        'Meow Mix Original Choice Dry Cat Food is specially formulated to help adult cats stay healthy and happy. To maintain wellness throughout adulthood, fully grown cats need the proper nutrition to keep them in top shape as they age.',
      priceCents: 199,
      quantity: 5
    }),
    Product.create({
      title: 'Kit & Kaboodle',
      description: `Taste? Kit & Kaboodle Original Dry Cat Food has got it. A lip-smackin' combination of four cat-pleasing flavors—chicken, liver, turkey and ocean fish. Variety? Oh, yeah. Four flavors and four fun shapes... no "bowl boredom" happening here! Nutrition? You know it.`,
      priceCents: 399,
      quantity: 18
    }),
    Product.create({
      title: 'Meowy Wowie Catnip',
      description:
        'Give your favorite feline something to purr about with Meowijuana Meowi-Waui Catnip. These convenient, eco-friendly containers are full of premium catnip, trimmed and picked by hand at the peak of essential oil production—creating the most radical catnip on the market.',
      priceCents: 420,
      quantity: 18
    }),
    Product.create({
      title: 'Northern Lights Meowijauna Catnip',
      description: `Treat your kitty to catnip so good it should be illegal with Meowijuana Jar of Buds Catnip. These trimmed catnip buds will invoke the reaction in your cat that only catnip can; providing a happy, euphoric experience for your favorite furry friend.`,
      priceCents: 420,
      quantity: 18
    })
  ])

  await products[0].addCategory(categories[0])
  await products[1].addCategory(categories[1])
  await products[2].addCategory(categories[0])
  await products[3].addCategory(categories[0])
  await products[4].addCategory(categories[1])
  await products[5].addCategory(categories[1])
  await products[6].addCategory(categories[2])
  await products[7].addCategory(categories[2])

  const total1 = await OrderTotal.create({
    totalCents: 299 * 4 + 599 * 2
  })

  const total2 = await OrderTotal.create({
    totalCents: 599 * 5
  })

  const orders = await Promise.all([
    Order.create({
      historicalPriceCents: 299,
      quantityOrdered: 4,
      userId: 1,
      productId: 1,
      orderTotalId: total1.id
    }),
    Order.create({
      status: 'Processing',
      historicalPriceCents: 599,
      quantityOrdered: 2,
      userId: 1,
      productId: 2,
      orderTotalId: total1.id
    }),
    Order.create({
      status: 'Processing',
      historicalPriceCents: 599,
      quantityOrdered: 5,
      userId: 1,
      productId: 2,
      orderTotalId: total2.id
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
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
