import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white shadow-lg p-5">
      <h2 className="text-xl font-bold mb-8">Shawarma Express</h2>
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="text-gray-700 hover:text-black">🏠 Dashboard</Link>
        <Link to="/menu" className="text-gray-700 hover:text-black">📋 Menú</Link>
        <Link to="/orders" className="text-gray-700 hover:text-black">🧾 Pedidos</Link>
      </nav>
    </div>
  );
}
