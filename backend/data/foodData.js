let foods = [
  {
    id: 1,
    name: "Pepperoni Pizza",
    description: "Classic pepperoni with mozzarella cheese and tangy tomato sauce",
    price: 299,
    rating: 4.5,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80"
  },
  {
    id: 2,
    name: "BBQ Chicken Pizza",
    description: "Smoky BBQ sauce with grilled chicken and caramelized onions",
    price: 349,
    rating: 4.7,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80"
  },
  {
    id: 3,
    name: "Margherita Pizza",
    description: "Fresh tomato, basil and buffalo mozzarella on crispy crust",
    price: 249,
    rating: 4.4,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80"
  },
  {
    id: 4,
    name: "Classic Beef Burger",
    description: "Juicy beef patty with lettuce, tomato, pickles and special sauce",
    price: 189,
    rating: 4.6,
    category: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80"
  },
  {
    id: 5,
    name: "Crispy Chicken Burger",
    description: "Golden fried chicken fillet with coleslaw and chipotle mayo",
    price: 199,
    rating: 4.8,
    category: "Burger",
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&q=80"
  },
  {
    id: 6,
    name: "Double Smash Burger",
    description: "Two smashed beef patties with American cheese and caramelized onions",
    price: 249,
    rating: 4.7,
    category: "Burger",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80"
  },
  {
    id: 7,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, parmesan, croutons with Caesar dressing",
    price: 149,
    rating: 4.3,
    category: "Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80"
  },
  {
    id: 8,
    name: "Greek Salad",
    description: "Fresh cucumber, tomatoes, olives and feta cheese with olive oil",
    price: 159,
    rating: 4.4,
    category: "Salad",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80"
  },
  {
    id: 9,
    name: "Steam Momos",
    description: "Soft steamed dumplings stuffed with spiced vegetables and herbs",
    price: 99,
    rating: 4.5,
    category: "Momos",
    image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=400&q=80"
  },
  {
    id: 10,
    name: "Fried Momos",
    description: "Crispy fried dumplings with chilli chutney and sesame sauce",
    price: 119,
    rating: 4.7,
    category: "Momos",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&q=80"
  },
  {
    id: 11,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice with tender chicken, saffron and spices",
    price: 279,
    rating: 4.9,
    category: "Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80"
  },
  {
    id: 12,
    name: "Hyderabadi Biryani",
    description: "Slow-cooked dum biryani with kacchi style mutton and caramelized onions",
    price: 349,
    rating: 4.8,
    category: "Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80"
  },
  {
    id: 13,
    name: "Spaghetti Carbonara",
    description: "Creamy pasta with pancetta, eggs, parmesan and black pepper",
    price: 229,
    rating: 4.6,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80"
  },
  {
    id: 14,
    name: "Penne Arrabbiata",
    description: "Spicy tomato sauce with garlic, chilli and fresh basil",
    price: 199,
    rating: 4.4,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?w=400&q=80"
  },
  {
    id: 15,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a gooey molten centre and vanilla ice cream",
    price: 149,
    rating: 4.8,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80"
  },
  {
    id: 16,
    name: "Mango Cheesecake",
    description: "Creamy cheesecake topped with fresh mango coulis and whipped cream",
    price: 169,
    rating: 4.7,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80"
  },
  {
    id: 17,
    name: "Gulab Jamun",
    description: "Classic milk-solid dumplings soaked in rose-cardamom sugar syrup",
    price: 89,
    rating: 4.9,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=400&q=80"
  },
  {
    id: 18,
    name: "Mango Lassi",
    description: "Chilled yogurt-based drink blended with fresh Alphonso mangoes",
    price: 79,
    rating: 4.6,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&q=80"
  },
  {
    id: 19,
    name: "Fresh Lime Soda",
    description: "Refreshing lime soda with mint, black salt and a touch of sugar",
    price: 59,
    rating: 4.4,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80"
  },
  {
    id: 20,
    name: "Cold Coffee",
    description: "Thick creamy cold coffee blended with ice cream and chocolate drizzle",
    price: 99,
    rating: 4.7,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80"
  },
  {
    id: 21,
    name: "Veggie Supreme Pizza",
    description: "Loaded with fresh bell peppers, mushrooms, olives and corn",
    price: 279,
    rating: 4.5,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80"
  },
  {
    id: 22,
    name: "Paneer Tikka Momos",
    description: "Stuffed with spiced paneer tikka, grilled to perfection",
    price: 139,
    rating: 4.6,
    category: "Momos",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&q=80"
  },
  {
    id: 23,
    name: "Mushroom Risotto",
    description: "Creamy Italian arborio rice with sautéed mushrooms and parmesan",
    price: 249,
    rating: 4.5,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80"
  },
  {
    id: 24,
    name: "Berry Smoothie",
    description: "Blended mixed berries with yogurt, honey and chia seeds",
    price: 119,
    rating: 4.5,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1553530666-ba11a90a3abe?w=400&q=80"
  }
];

let nextId = 25;

const getAll = () => foods;
const getById = (id) => foods.find(f => f.id === parseInt(id));
const add = (item) => {
  const newItem = { ...item, id: nextId++ };
  foods.push(newItem);
  return newItem;
};
const update = (id, item) => {
  const idx = foods.findIndex(f => f.id === parseInt(id));
  if (idx === -1) return null;
  foods[idx] = { ...foods[idx], ...item, id: parseInt(id) };
  return foods[idx];
};
const remove = (id) => {
  const idx = foods.findIndex(f => f.id === parseInt(id));
  if (idx === -1) return false;
  foods.splice(idx, 1);
  return true;
};

module.exports = { getAll, getById, add, update, remove };
