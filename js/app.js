// App Controller
const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
  // Load Event Listener
  const loadEventListeners = function () {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add Item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // Disable submit on enter
    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemUpdateSubmit);

    // Update btn click event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdate);

    // Delete item event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);

    // Back button event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UICtrl.clearEditState);

    // Clear items event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", clearAllItemsClick);
  };

  // Add item submit
  const itemAddSubmit = function (e) {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and calories input
    if (input.name !== "" && input.calories !== "") {
      // Add item to the list
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI Ctrl
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to the UI
      UICtrl.showTotalCalories(totalCalories);

      // Store in localStorage
      StorageCtrl.storeITem(newItem);

      // Clear Fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  // Update item submit
  const itemUpdateSubmit = function (e) {
    if (e.target.classList.contains("edit-item")) {
      // Get list item id (item-0, item-1, ...)
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split("-");

      // GEt the actual Id
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // SEt current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add Item to form
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  };

  const itemUpdate = function (e) {
    // Get form input from UI Controller
    let { name, calories } = UICtrl.getItemInput();

    calories = parseInt(calories);
    // Add item to the list
    const updatedItem = ItemCtrl.updateItem(name, calories);

    // Fetch Items from data Structure
    const items = ItemCtrl.getItems();

    // Check if any items
    if (items.length === 0) {
      UICtrl.hideList();
    } else {
      // Populate list with items
      UICtrl.populateItemList(items);
    }

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to the UI
    UICtrl.showTotalCalories(totalCalories);

    // Update local Storage
    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();

    // Clear Current Item
    ItemCtrl.setCurrentItem(null);

    e.preventDefault();
  };

  // Delete button event
  const itemDeleteSubmit = function (e) {
    // get current item id
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to the UI
    UICtrl.showTotalCalories(totalCalories);

    // Delete from ls
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  // Clear item event
  const clearAllItemsClick = function (e) {
    // Delete All Items from data Structure
    ItemCtrl.clearAllItems();

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to the UI
    UICtrl.showTotalCalories(totalCalories);

    // Remove from UI
    UICtrl.removeItems();

    // Clear from Local storage
    StorageCtrl.clearItemsFromStorage();

    // Hide UL
    UICtrl.hideList();

    e.preventDefault();
  };
  // Public Methods
  return {
    init: function () {
      // Clear edit state / set initial set
      UICtrl.clearEditState();

      // Fetch Items from data Structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to the UI
        UICtrl.showTotalCalories(totalCalories);
      }

      // Load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, StorageCtrl, UICtrl);

App.init();
