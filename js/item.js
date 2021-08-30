// Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / this.state.
  const data = {
    // items: [
    //     // {id: 0, name: 'Steak Dinner', calories: 1200},
    //     // {id: 1, name: 'Cookie', calories: 400},
    //     // {id: 2, name: 'Eggs', calories: 300}
    // ],
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0,
  };

  // Public methods
  return {
    logData: function () {
      return data;
    },
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      // create ID
      let ID;

      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new Item
      newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function (id) {
      let found = null;

      // Loop through the items
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });

      return found;
    },
    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
    },
    updateItem: function (name, calories) {
      let found = null;
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          found = item;
          item.name = name;
          item.calories = calories;
        }
      });

      return found;
    },
    deleteItem: function (id) {
      // Get the ids
      ids = data.items.map(function (item) {
        return item.id;
      });

      // Get the index
      const index = ids.indexOf(id);

      // Remove Item
      data.items.splice(index, 1);
    },
    clearAllItems: function () {
      data.items = [];
    },
    getTotalCalories: function () {
      let total = 0;

      // loop through items and add cals
      data.items.forEach(function (item) {
        total += item.calories;
      });

      // set Total cal in data structure
      data.totalCalories = total;

      return data.totalCalories;
    },
  };
})();
