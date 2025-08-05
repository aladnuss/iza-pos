// app/data/dummyItems.ts
import { Item } from './types';

export const DUMMY_ITEMS: { [key: string]: Item[] } = {
  coffee: [
    { 
      id: 'espresso', 
      name: 'Espresso', 
      description: 'Strong coffee shot', 
      price: 25000, 
      variantCount: 3, 
      categoryId: 'coffee' 
    },
    { 
      id: 'cappuccino', 
      name: 'Cappuccino', 
      description: 'Coffee with milk foam', 
      price: 35000, 
      variantCount: 4, 
      categoryId: 'coffee' 
    },
    { 
      id: 'latte', 
      name: 'Latte', 
      description: 'Coffee with steamed milk', 
      price: 40000, 
      variantCount: 5, 
      categoryId: 'coffee' 
    },
  ],
  tea: [
    { 
      id: 'green_tea', 
      name: 'Green Tea', 
      description: 'Fresh green tea', 
      price: 20000, 
      variantCount: 2, 
      categoryId: 'tea' 
    },
    { 
      id: 'earl_grey', 
      name: 'Earl Grey', 
      description: 'Classic black tea', 
      price: 22000, 
      variantCount: 3, 
      categoryId: 'tea' 
    },
  ],
  pastry: [
    { 
      id: 'croissant', 
      name: 'Croissant', 
      description: 'Buttery flaky pastry', 
      price: 15000, 
      variantCount: 1, 
      categoryId: 'pastry' 
    },
    { 
      id: 'muffin', 
      name: 'Blueberry Muffin', 
      description: 'Fresh baked muffin', 
      price: 18000, 
      variantCount: 2, 
      categoryId: 'pastry' 
    },
    { 
      id: 'donut', 
      name: 'Glazed Donut', 
      description: 'Sweet glazed donut', 
      price: 12000, 
      variantCount: 1, 
      categoryId: 'pastry' 
    },
    { 
      id: 'cake_slice', 
      name: 'Cake Slice', 
      description: 'Delicious cake slice', 
      price: 25000, 
      variantCount: 3, 
      categoryId: 'pastry' 
    },
  ],
  snacks: [
    { 
      id: 'chips', 
      name: 'Potato Chips', 
      description: 'Crispy potato chips', 
      price: 8000, 
      variantCount: 1, 
      categoryId: 'snacks' 
    },
    { 
      id: 'nuts', 
      name: 'Mixed Nuts', 
      description: 'Healthy mixed nuts', 
      price: 15000, 
      variantCount: 1, 
      categoryId: 'snacks' 
    },
  ],
  breakfast: [
    { 
      id: 'fish_chips', 
      name: 'Fish and Chips', 
      description: 'Fresh fish with crispy chips', 
      price: 45000, 
      variantCount: 2, 
      categoryId: 'breakfast' 
    },
    { 
      id: 'roast_chicken', 
      name: 'Roast Chicken', 
      description: 'Juicy roast chicken', 
      price: 55000, 
      variantCount: 3, 
      categoryId: 'breakfast' 
    },
    { 
      id: 'pancakes', 
      name: 'Pancakes', 
      description: 'Fluffy pancakes with syrup', 
      price: 35000, 
      variantCount: 2, 
      categoryId: 'breakfast' 
    },
    { 
      id: 'eggs_benedict', 
      name: 'Eggs Benedict', 
      description: 'Poached eggs with hollandaise', 
      price: 42000, 
      variantCount: 1, 
      categoryId: 'breakfast' 
    },
  ],
  soups: [
    { 
      id: 'tomato_soup', 
      name: 'Tomato Soup', 
      description: 'Rich and creamy tomato soup', 
      price: 28000, 
      variantCount: 1, 
      categoryId: 'soups' 
    },
    { 
      id: 'chicken_soup', 
      name: 'Chicken Soup', 
      description: 'Hearty chicken soup with vegetables', 
      price: 32000, 
      variantCount: 2, 
      categoryId: 'soups' 
    },
    { 
      id: 'mushroom_soup', 
      name: 'Mushroom Soup', 
      description: 'Creamy mushroom soup', 
      price: 30000, 
      variantCount: 1, 
      categoryId: 'soups' 
    },
    { 
      id: 'miso_soup', 
      name: 'Miso Soup', 
      description: 'Traditional Japanese miso soup', 
      price: 25000, 
      variantCount: 1, 
      categoryId: 'soups' 
    },
    { 
      id: 'corn_soup', 
      name: 'Corn Soup', 
      description: 'Sweet corn soup', 
      price: 26000, 
      variantCount: 1, 
      categoryId: 'soups' 
    },
    { 
      id: 'vegetable_soup', 
      name: 'Vegetable Soup', 
      description: 'Mixed vegetable soup', 
      price: 24000, 
      variantCount: 1, 
      categoryId: 'soups' 
    },
    { 
      id: 'beef_soup', 
      name: 'Beef Soup', 
      description: 'Rich beef broth soup', 
      price: 38000, 
      variantCount: 2, 
      categoryId: 'soups' 
    },
    { 
      id: 'seafood_soup', 
      name: 'Seafood Soup', 
      description: 'Fresh seafood soup', 
      price: 42000, 
      variantCount: 1, 
      categoryId: 'soups' 
    },
    { 
      id: 'pumpkin_soup', 
      name: 'Pumpkin Soup', 
      description: 'Creamy pumpkin soup', 
      price: 29000, 
      variantCount: 1, 
      categoryId: 'soups' 
    },
    { 
      id: 'lentil_soup', 
      name: 'Lentil Soup', 
      description: 'Nutritious lentil soup', 
      price: 27000, 
      variantCount: 1, 
      categoryId: 'soups' 
    },
    { 
      id: 'onion_soup', 
      name: 'French Onion Soup', 
      description: 'Classic French onion soup', 
      price: 34000, 
      variantCount: 1, 
      categoryId: 'soups' 
    },
    { 
      id: 'minestrone', 
      name: 'Minestrone', 
      description: 'Italian vegetable soup', 
      price: 31000, 
      variantCount: 1, 
      categoryId: 'soups' 
    },
    { 
      id: 'clam_chowder', 
      name: 'Clam Chowder', 
      description: 'Creamy clam chowder', 
      price: 45000, 
      variantCount: 1, 
      categoryId: 'soups' 
    },
  ],
  pasta: [
    { 
      id: 'spaghetti_carbonara', 
      name: 'Spaghetti Carbonara', 
      description: 'Classic carbonara with bacon and eggs', 
      price: 48000, 
      variantCount: 2, 
      categoryId: 'pasta' 
    },
    { 
      id: 'penne_arrabiata', 
      name: 'Penne Arrabiata', 
      description: 'Spicy tomato sauce pasta', 
      price: 42000, 
      variantCount: 2, 
      categoryId: 'pasta' 
    },
    { 
      id: 'fettuccine_alfredo', 
      name: 'Fettuccine Alfredo', 
      description: 'Creamy white sauce pasta', 
      price: 45000, 
      variantCount: 1, 
      categoryId: 'pasta' 
    },
    { 
      id: 'lasagna', 
      name: 'Lasagna', 
      description: 'Layered pasta with meat and cheese', 
      price: 52000, 
      variantCount: 2, 
      categoryId: 'pasta' 
    },
    { 
      id: 'ravioli', 
      name: 'Cheese Ravioli', 
      description: 'Stuffed pasta with cheese filling', 
      price: 46000, 
      variantCount: 1, 
      categoryId: 'pasta' 
    },
    { 
      id: 'gnocchi', 
      name: 'Gnocchi', 
      description: 'Potato dumplings in sauce', 
      price: 44000, 
      variantCount: 3, 
      categoryId: 'pasta' 
    },
    { 
      id: 'linguine_seafood', 
      name: 'Linguine Seafood', 
      description: 'Pasta with mixed seafood', 
      price: 58000, 
      variantCount: 1, 
      categoryId: 'pasta' 
    },
    { 
      id: 'macaroni_cheese', 
      name: 'Macaroni & Cheese', 
      description: 'Classic mac and cheese', 
      price: 38000, 
      variantCount: 2, 
      categoryId: 'pasta' 
    },
    { 
      id: 'spaghetti_bolognese', 
      name: 'Spaghetti Bolognese', 
      description: 'Pasta with meat sauce', 
      price: 46000, 
      variantCount: 1, 
      categoryId: 'pasta' 
    },
    { 
      id: 'penne_pesto', 
      name: 'Penne Pesto', 
      description: 'Pasta with basil pesto sauce', 
      price: 43000, 
      variantCount: 2, 
      categoryId: 'pasta' 
    },
  ],
};
