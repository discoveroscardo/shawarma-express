import { useEffect, useState } from 'react';
import { getAllDishes } from '../api/menuService';
import logo from '../assets/Shawarma_Express_Logo.png';

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDishes = async () => {
      try {
        const data = await getAllDishes();
        setDishes(data);
      } catch (error) {
        console.error("Error al cargar los platos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDishes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="flex justify-center mb-8">
        <img src={logo} alt="Shawarma Express Logo" className="h-24" />
      </div>

      <h1 className="text-3xl font-bold text-center mb-6">Gestión del Menú</h1>

      {loading ? (
        <p className="text-center">Cargando platos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {dishes.map((dish) => (
            <div
              key={dish._id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{dish.name}</h2>
              <p className="text-gray-600 mb-2">{dish.description}</p>
              <p className="text-green-600 font-bold text-lg">{dish.price.toFixed(2)} €</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
