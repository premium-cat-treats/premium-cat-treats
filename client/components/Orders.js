// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {me} from '../store/user'
// import {fetchOrders} from '../store/order'
// import Order from './order'

// class OrderHistory extends Component {
//   async componentDidMount() {
//     await this.props.getUser()
//     await this.props.fetchOrders(this.props.user.id)
//   }

//   render() {
//     return (
//       <div>
//         {this.state.orders.map(order => (
//           <Order
//             key={order.id}
//             orderItem={order.product.title}
//             image={order.product.imageUrl}
//             price={+order.product.price}
//             date={order.createdAt}
//           />
//         ))}
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => ({
//   user: state.user,
//   orders: state.orders
// })

// const mapDispatchToProps = dispatch => ({
//   getUser: () => dispatch(me()),
//   getOrders: id => dispatch(fetchOrders(id))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
