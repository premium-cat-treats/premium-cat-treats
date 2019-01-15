const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const OrderTotal = db.model('orderTotal')
const User = db.model('user')
const Product = db.model('product')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/:userId', () => {
    beforeEach(async () => {
      const user1 = await User.create({
        email: 'cody@email.com',
        password: '111',
        adminAccess: true
      })
      const product1 = await Product.create({
        title: 'Shepards Pie',
        description:
          'Give your cat a trip to the English country side with minced red meat, cooked in a gravy with onions, vegetables, and topped with catnip',
        priceCents: 299,
        quantity: 50
      })
      const total1 = await OrderTotal.create({
        totalCents: 299 * 4
      })
      const order1 = await Order.create({
        historicalPriceCents: 299,
        quantityOrdered: 4,
        userId: user1.id,
        productId: product1.id,
        orderTotalId: total1.id
      })
      return order1
    })

    it('GET /api/orders/1', async () => {
      const res = await request(app)
        .get('/api/orders/1')
        .expect(200)
      console.log(res.body)
      expect(res.body).to.be.an('object')
      expect(res.body.group1).to.be.an('array')
      expect(res.body.group1[0].status).to.be.equal('Created')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
