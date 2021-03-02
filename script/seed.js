// 'use strict'
const db = require('../server/db')
// const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')
const faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // console.log('hello', {
  //   productName,
  //   productDescription,
  //   productPrice,
  //   productCategory,
  //   productLighting,
  //   productWatering,
  //   productInventory,
  // })

  const lightingArray = [
    'This plant does well in low light.',
    'This plant does best in partial shade.',
    'This plant does best in bright direct sunlight.'
  ]

  const wateringArray = [
    'This plant needs to be watered once a week.',
    'This plant needs to be watered daily.',
    'This plant needs to be watered every 30 minutes or it will DIE!'
  ]

  const categoriesArray = ['Succulents', 'Indoor', 'Outdoor', 'Pet-Friendly']
  // const randomElement = array[Math.floor(Math.random() * array.length)]

  const productArray = []
  for (let i = 1; i <= 1; i++) {
    const name = faker.commerce.productName()
    const description = faker.commerce.productDescription()
    const price = faker.commerce.price(99, 1000)
    const category = faker.helpers.shuffle(categoriesArray)[0]
    const lighting = faker.helpers.shuffle(lightingArray)[0]
    const watering = faker.helpers.shuffle(wateringArray)[0]
    const inventory = faker.random.number({
      min: 0,
      max: 100
    })
    productArray.push({
      name,
      description,
      price,
      category,
      lighting,
      watering,
      inventory
    })
  }

  console.log('hello', productArray)

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'}),
  // ])

  await Promise.all(
    productArray.forEach(product => {
      return Product.create(product)
    })
  )

  // console.log(`seeded ${users.length} users`)
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
