export default function Dashboard() {
    return <h1 className="text-2xl font-bold">Bienvenido al panel de control</h1>;
  }
  




// import { useEffect, useState } from 'react'
// import axios from 'axios'

// function Dashboard() {
//   const [orders, setOrders] = useState([])

//   useEffect(() => {
//     axios.get('/api/orders').then(res => setOrders(res.data))
//   }, [])

//   const updateStatus = (id, status) => {
//     axios.patch(`/api/orders/${id}`, { status })
//       .then(res => setOrders(prev => prev.map(o => o._id === id ? res.data : o)))
//   }

//   return (
//     <div>
//       <h1 className="text-2xl">Pedidos</h1>
//       <ul>
//         {orders.map(order => (
//           <li key={order._id}>
//             <p>Usuario: {order.userId}</p>
//             <p>Items: {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}</p>
//             <p>Estado: {order.status}</p>
//             <button onClick={() => updateStatus(order._id, 'en preparación')}>En preparación</button>
//             <button onClick={() => updateStatus(order._id, 'en reparto')}>En reparto</button>
//             <button onClick={() => updateStatus(order._id, 'completado')}>Completado</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default Dashboard
