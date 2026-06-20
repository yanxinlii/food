export const FOOD_CATEGORIES = {
  brunch: {
    key: 'brunch',
    label: 'Brunch / Breakfast',
    shortLabel: 'Brunch',
    spinTitle: 'Spin for Brunch',
    accent: '#ef7774',
    soft: '#fff0eb',
    image: './assets/brunch-sketch.png',
    groups: [
      {
        name: 'North American Brunch',
        items: [
          'Eggs Benedict', 'Pancakes', 'Waffles', 'French Toast',
          'Breakfast Sandwich', 'Breakfast Burrito', 'Avocado Toast',
          'Omelette', 'Bagel with Cream Cheese', 'Smoked Salmon Bagel',
          'Breakfast Poutine', 'Chicken and Waffles', 'Hash Browns',
        ],
      },
      {
        name: 'French Brunch',
        items: ['Croissant', 'Pain au Chocolat', 'Quiche', 'Crêpes', 'Brioche Toast'],
      },
      {
        name: 'Mediterranean / Middle Eastern Brunch',
        items: ['Shakshuka', 'Manakish', 'Turkish Breakfast', 'Foul Medames'],
      },
      {
        name: 'Asian Brunch',
        items: [
          'Congee', 'Dim Sum', 'Onigiri', 'Japanese Breakfast Set',
          'Taiwanese Breakfast Sandwich', 'Soy Milk & Youtiao',
        ],
      },
      {
        name: 'Healthy Brunch',
        items: ['Acai Bowl', 'Smoothie Bowl', 'Yogurt Bowl', 'Granola Bowl', 'Protein Bowl', 'Fruit Bowl'],
      },
    ],
  },
  main: {
    key: 'main',
    label: 'Main Course',
    shortLabel: 'Main Course',
    spinTitle: 'Spin for Main Course',
    accent: '#9b7ac9',
    soft: '#f3edf9',
    image: './assets/main-sketch.png',
    groups: [
      {
        name: 'Burgers & Sandwiches',
        items: [
          'Burger', 'Cheeseburger', 'Smash Burger', 'Chicken Burger', 'Hot Dog',
          'Philly Cheesesteak', 'Lobster Roll', 'Pulled Pork Sandwich',
          'Grilled Cheese', 'Club Sandwich', 'Deli Sandwich',
        ],
      },
      {
        name: 'Mexican & Latin American',
        items: [
          'Taco', 'Burrito', 'Burrito Bowl', 'Quesadilla', 'Nachos', 'Enchiladas',
          'Fajitas', 'Tostadas', 'Empanadas', 'Arepas', 'Pupusas', 'Ceviche',
        ],
      },
      {
        name: 'Japanese',
        items: [
          'Sushi', 'Sashimi', 'Nigiri', 'Poke Bowl', 'Ramen', 'Udon', 'Soba',
          'Donburi', 'Katsu Curry', 'Yakitori', 'Takoyaki', 'Okonomiyaki',
        ],
      },
      {
        name: 'Korean',
        items: [
          'Korean BBQ', 'Bibimbap', 'Korean Fried Chicken', 'Tteokbokki',
          'Kimbap', 'Bulgogi', 'Kimchi Fried Rice',
        ],
      },
      {
        name: 'Chinese',
        items: [
          'Dim Sum', 'Dumplings', 'Xiao Long Bao', 'Peking Duck', 'Hot Pot',
          'Malatang', 'Lanzhou Beef Noodles', 'Hand-Pulled Noodles',
          'Cantonese BBQ', 'BBQ Skewers', 'Wonton Noodle Soup',
        ],
      },
      {
        name: 'Vietnamese',
        items: ['Pho', 'Banh Mi', 'Vermicelli Bowl', 'Fresh Spring Rolls', 'Bun Bo Hue'],
      },
      {
        name: 'Thai',
        items: ['Pad Thai', 'Pad See Ew', 'Green Curry', 'Red Curry', 'Tom Yum Soup'],
      },
      {
        name: 'Indian',
        items: ['Butter Chicken', 'Biryani', 'Tandoori Chicken', 'Curry Bowl', 'Dosa', 'Chaat', 'Samosa'],
      },
      {
        name: 'Middle Eastern',
        items: ['Shawarma', 'Doner Kebab', 'Falafel', 'Gyro', 'Kafta', 'Mixed Grill', 'Shish Taouk'],
      },
      {
        name: 'Mediterranean & Greek',
        items: ['Souvlaki', 'Greek Plate', 'Moussaka', 'Grilled Octopus'],
      },
      {
        name: 'Turkish',
        items: ['Iskender Kebab', 'Pide', 'Lahmacun'],
      },
      {
        name: 'Italian',
        items: ['Pizza', 'Neapolitan Pizza', 'Pasta', 'Lasagna', 'Risotto', 'Gnocchi', 'Calzone', 'Arancini'],
      },
      {
        name: 'French',
        items: ['Steak Frites', 'Duck Confit', 'French Onion Soup', 'Beef Tartare', 'Coq au Vin'],
      },
      {
        name: 'Spanish & Portuguese',
        items: ['Paella', 'Tapas', 'Piri Piri Chicken'],
      },
      {
        name: 'Caribbean',
        items: ['Jerk Chicken', 'Curry Goat', 'Oxtail', 'Roti'],
      },
      {
        name: 'African',
        items: ['Jollof Rice', 'Injera Platter', 'Doro Wat', 'Tagine', 'Couscous'],
      },
      {
        name: 'Canadian Classics',
        items: ['Poutine', 'Smoked Meat Sandwich', 'Tourtière', 'Fish and Chips'],
      },
      {
        name: 'Healthy / Fast Casual',
        items: ['Salad Bowl', 'Grain Bowl', 'Rice Bowl', 'Protein Bowl', 'Wrap', 'Rice Paper Rolls'],
      },
    ],
  },
  dessert: {
    key: 'dessert',
    label: 'Dessert',
    shortLabel: 'Dessert',
    spinTitle: 'Spin for Dessert',
    accent: '#78af9a',
    soft: '#eef8f0',
    image: './assets/dessert-sketch.png',
    groups: [
      {
        name: 'Ice Cream & Frozen',
        items: ['Ice Cream', 'Soft Serve', 'Gelato', 'Frozen Yogurt', 'Sorbet', 'Mochi Ice Cream'],
      },
      {
        name: 'Cakes & Pastries',
        items: [
          'Cheesecake', 'Tiramisu', 'Red Velvet Cake', 'Carrot Cake',
          'Chocolate Cake', 'Mille-Feuille', 'Éclair', 'Opera Cake',
        ],
      },
      {
        name: 'French Desserts',
        items: ['Macarons', 'Crème Brûlée', 'Profiteroles', 'Madeleines'],
      },
      {
        name: 'Asian Desserts',
        items: ['Taiyaki', 'Bubble Waffle', 'Mochi', 'Japanese Cheesecake', 'Mango Sago', 'Tanghulu'],
      },
      {
        name: 'Dough-Based Desserts',
        items: ['Donuts', 'Churros', 'Cinnamon Rolls', 'Funnel Cake', 'Beignets'],
      },
      {
        name: 'Bakery Items',
        items: ['Croissant', 'Pain au Chocolat', 'Danish', 'Muffin', 'Scone', 'Cookie', 'Brownie'],
      },
      {
        name: 'Specialty Desserts',
        items: ['Bubble Tea', 'Shaved Ice', 'Bingsu', 'Acai Bowl', 'Smoothie Bowl', 'Affogato'],
      },
    ],
  },
};

export const CATEGORY_LIST = Object.values(FOOD_CATEGORIES).map((category) => ({
  ...category,
  items: category.groups.flatMap((group) => group.items),
}));
