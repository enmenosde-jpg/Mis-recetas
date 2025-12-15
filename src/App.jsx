import React, { useState } from 'react';
import { ChefHat, Users, Clock, Flame, ArrowLeft, Heart, Share2, Search, Plus, Minus } from 'lucide-react';

const RecipeApp = () => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Base de datos de recetas
  const recipes = [
    {
      id: 1,
      title: "Tarta de Queso 'La Viña'",
      image: "[https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800](https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800)",
      category: "Postres",
      method: "Air Fryer",
      prepTime: "5 min",
      cookTime: "20 min",
      calories: "320 kcal",
      description: "La famosa tarta de queso vasca, cremosa por dentro y tostada por fuera. Adaptada para Air Fryer.",
      baseServings: 5,
      ingredients: [
        { name: "Queso Philadelphia", amount: 450, unit: "g" },
        { name: "Huevos medianos", amount: 4, unit: "ud" },
        { name: "Nata de montar (35% M.G.)", amount: 200, unit: "ml" },
        { name: "Azúcar", amount: 100, unit: "g" },
        { name: "Harina (opcional para consistencia)", amount: 1, unit: "cucharada", isStatic: true } 
      ],
      steps: [
        "Pon todos los ingredientes en un bol o en el vaso de la batidora.",
        "Bate suavemente hasta obtener una mezcla homogénea y sin grumos. No batas en exceso para no meter mucho aire.",
        "Arruga una hoja de papel de horno, mójala bajo el grifo y escúrrela bien. Esto ayuda a que se adapte al molde.",
        "Forra el molde con el papel húmedo y vierte la mezcla dentro.",
        "Precalienta la Air Fryer si es necesario.",
        "Programa modo 'Bake' (Hornear) a 160°C durante 20 minutos.",
        "Al terminar, comprueba el centro. Debe temblar ligeramente como un flan. Si está muy líquida, añade 5-10 minutos más.",
        "Deja enfriar a temperatura ambiente antes de desmoldar para que gane consistencia."
      ]
    },
    {
      id: 2,
      title: "Salmón con Espárragos",
      image: "[https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&q=80&w=800](https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&q=80&w=800)",
      category: "Principal",
      method: "Air Fryer",
      prepTime: "10 min",
      cookTime: "12 min",
      calories: "450 kcal",
      description: "Cena saludable y rápida, todo cocinado a la vez.",
      baseServings: 2,
      ingredients: [
        { name: "Lomos de salmón", amount: 2, unit: "ud" },
        { name: "Espárragos verdes", amount: 1, unit: "manojo" },
        { name: "Aceite de oliva", amount: 15, unit: "ml" },
        { name: "Limón", amount: 1, unit: "ud" },
        { name: "Sal y pimienta", amount: 1, unit: "pizca", isStatic: true }
      ],
      steps: [
        "Lava los espárragos y quita la parte dura del tallo.",
        "Salpimenta el salmón y los espárragos.",
        "Coloca todo en la cesta de la Air Fryer rociado con aceite.",
        "Cocina a 180°C durante 10-12 minutos."
      ]
    }
  ];

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setActiveScreen('detail');
  };

  const handleBack = () => {
    setActiveScreen('home');
    setSelectedRecipe(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {activeScreen === 'home' && (
        <HomeScreen 
          recipes={recipes} 
          onRecipeClick={handleRecipeClick} 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
      {activeScreen === 'detail' && selectedRecipe && (
        <DetailScreen 
          recipe={selectedRecipe} 
          onBack={handleBack} 
        />
      )}
    </div>
  );
};

// --- Componente: Pantalla de Inicio ---
const HomeScreen = ({ recipes, onRecipeClick, searchTerm, setSearchTerm }) => {
  const filteredRecipes = recipes.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-orange-500 p-6 rounded-b-3xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Hola, Chef 👋</h1>
            <p className="text-orange-100">¿Qué cocinamos hoy?</p>
          </div>
          <div className="bg-white/20 p-2 rounded-full">
            <ChefHat className="text-white w-8 h-8" />
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar recetas..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Categories Scroll (Visual only) */}
      <div className="flex gap-4 p-6 overflow-x-auto no-scrollbar">
        {['Todo', 'Desayunos', 'Postres', 'Air Fryer', 'Cenas'].map((cat, idx) => (
          <button 
            key={idx}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${idx === 0 ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recipe List */}
      <div className="px-6 pb-20 space-y-6">
        <h2 className="text-xl font-bold text-gray-800">Populares</h2>
        {filteredRecipes.map((recipe) => (
          <div 
            key={recipe.id} 
            onClick={() => onRecipeClick(recipe)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="relative h-40 overflow-hidden">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-orange-600 flex items-center gap-1">
                <Flame className="w-3 h-3" /> {recipe.method}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-900 leading-tight">{recipe.title}</h3>
                <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded-md">{recipe.prepTime}</span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 mb-3">{recipe.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {recipe.cookTime}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" /> {recipe.baseServings} raciones
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Componente: Pantalla de Detalle ---
const DetailScreen = ({ recipe, onBack }) => {
  const [servings, setServings] = useState(recipe.baseServings);

  // Función para escalar ingredientes
  const calculateAmount = (baseAmount, isStatic) => {
    if (isStatic) return ""; // No mostrar cantidad para ingredientes estáticos
    const val = (baseAmount / recipe.baseServings) * servings;
    // Redondear para evitar decimales feos
    return val % 1 === 0 ? val : val.toFixed(1).replace('.0', '');
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative pb-20">
      {/* Top Image */}
      <div className="relative h-72">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 via-transparent to-transparent"></div>
        
        {/* Nav Bar */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center text-white">
          <button onClick={onBack} className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            <button className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative -mt-10 bg-white rounded-t-3xl px-6 pt-8">
        {/* Title & Info */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-bold text-gray-900 w-3/4">{recipe.title}</h1>
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
              {recipe.calories}
            </span>
          </div>
          
          <div className="flex gap-6 py-4 border-b border-gray-100">
            <div className="text-center">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Tiempo</p>
              <p className="font-semibold text-gray-700">{recipe.cookTime}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Método</p>
              <p className="font-semibold text-gray-700">{recipe.method}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Dificultad</p>
              <p className="font-semibold text-gray-700">Fácil</p>
            </div>
          </div>
        </div>

        {/* Dynamic Portions Calculator */}
        <div className="bg-orange-50 rounded-2xl p-4 mb-8 border border-orange-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-orange-800">
              <Users className="w-5 h-5" />
              <span className="font-bold">Raciones</span>
            </div>
            <div className="flex items-center bg-white rounded-xl shadow-sm border border-orange-200">
              <button 
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="p-2 hover:bg-gray-50 text-orange-600 rounded-l-xl transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-gray-800">{servings}</span>
              <button 
                onClick={() => setServings(servings + 1)}
                className="p-2 hover:bg-gray-50 text-orange-600 rounded-r-xl transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-xs text-orange-600/70 mt-2 text-center">
            Los ingredientes se recalculan automáticamente
          </p>
        </div>

        {/* Ingredients */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Ingredientes</h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <span className="text-gray-700 font-medium">{ing.name}</span>
                <span className="font-bold text-gray-900 bg-white px-2 py-1 rounded-md shadow-sm text-sm">
                  {calculateAmount(ing.amount, ing.isStatic)} {ing.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="pb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Preparación</h2>
          <div className="space-y-6">
            {recipe.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Start Cooking Button (Floating) */}
      <div className="fixed bottom-6 left-0 w-full px-6 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-gray-800 transition flex items-center justify-center gap-2">
            <Flame className="w-5 h-5" />
            Empezar a Cocinar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeApp;
