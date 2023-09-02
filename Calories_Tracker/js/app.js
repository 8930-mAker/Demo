// STORAGE CONTROLLER
const StorateCtrl = (function () {
    // PUBLIC METHODS
    return {
        storeItem: function (item) {
            let items;
            // CHECK IF ANY ITEMS IN LS
            if (localStorage.getItem('items') === null) {
                items = [];
                // PUSH NEW ITEM
                items.push(item);
                // SET LS
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                items = JSON.parse(localStorage.getItem('items'));
                // PUSH NEW ITEM
                items.push(item);
                // SET LS
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        removeItemFromLS: function (id) {
            let items = this.getItemsFromStorage();

            items.forEach(function (item, index) {
                if (id === item.id) {
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        getItemsFromStorage: function () {
            let items;
            if (localStorage.getItem('items') === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemStorage: function (updateItem) {
            let items = this.getItemsFromStorage();

            items.forEach(function (item, index) {
                if (updateItem.id === item.id) {
                    items.splice(index, 1, updateItem);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        clearAllItemsFromStorage: function () {
            localStorage.clear();
        }
    }
})();


// ITEM CONTROLLER
const ItemCtrl = (function () {
    // body
    class Item {
        constructor(id, name, calories) {
            this.id = id;
            this.name = name;
            this.calories = calories;
        }
    }

    // DATA STRUCTURE / STATE
    const data = {
        // items: [
        //     //     {
        //     //     id: 0,
        //     //     name: 'egg',
        //     //     calories: 2000
        //     // }, {
        //     //     id: 1,
        //     //     name: 'Cokkies',
        //     //     calories: 2000
        //     // }, {
        //     //     id: 2,
        //     //     name: 'steak',
        //     //     calories: 2000
        //     // }
        // ]
        items: StorateCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    // PUBLIC METHODS
    return {
        getItems: function () {
            return data.items;
        },
        getCurrentItem: function () {
            return data.currentItem;
        },
        logData: function () {
            return data;
        },
        addItem: function (name, calories) {
            let ID;
            // CREATE ID
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // CALORIES TO NUMBER
            calories = parseInt(calories);

            // CREATE NEW ITEM
            newItem = new Item(ID, name, calories);

            // ADD TO DATA ITEM ARREY
            data.items.push(newItem);

            return newItem;
        },
        getTotalCalories: function () {
            let total = 0;

            // LOOP THROUGH ITEMS CALORIES AND ADD CALS
            data.items.forEach(function (item) {
                total += item.calories;
            });

            // SET TOTAL CAL IN DATA STRUCTURE 
            data.totalCalories = total;
            return data.totalCalories;
        },
        getItemById: function (id) {
            let found = null;
            // LOOP THROUGH DATA ITEMS
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
        updateItem: function (name, calories) {
            // TURN CALORIES TO NUMB
            calories = parseInt(calories);

            let found = null;
            // LOOP THROUGH DATA ITEMS
            data.items.forEach(function (item) {
                // if (item.calories === calories) {
                //     found = item;
                // }
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },
        deleteItem: function (id) {
            // GET IDS
            const ids = data.items.map((item) => {
                return item.id;
            })

            // GET INDEX
            const index = ids.indexOf(id);

            // REMOVE ITEMS
            data.items.splice(index, 1);
        },
        clearAllItems: function () {
            data.items = [];
        }
    }
})();


// UI CONTROLLER
const UICtrl = (function () {

    const UISelector = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        itemNamaInput: '#item-name',
        backBtn: '.back-btn',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
        clearBtn: '.clear-btn',
        listCollec: '.collection'
    }

    // PUBLIC METHODS
    return {
        populateItemList: function (items) {
            let output = '';

            items.forEach(function (item) {
                output += `  <li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class="edit-item fa fa-pencil"></i>
                </a>
              </li>`
            });

            // INSERT LIST ITEMS
            document.querySelector(UISelector.itemList).innerHTML = output;
        },
        getSelectors: function () {
            return UISelector;
        },
        getItemInput: function () {
            return {
                name: document.querySelector(UISelector.itemNamaInput).value,
                calories: document.querySelector(UISelector.itemCaloriesInput).value
            }
        },
        addListItem: function (item) {
            // SHOW THE LIST ITEM
            document.querySelector(UISelector.itemList).style.display = 'block';
            // CREATE LI ELEMEMT
            const li = document.createElement('li');
            // ADD CLASS
            li.classList.add('collection-item');
            li.id = `item-${item.id}`;
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>`;

            // INSERT ITEM TO THE END
            document.querySelector(UISelector.itemList).insertAdjacentElement('beforeend', li);

        },
        clearInput: function () {
            document.querySelector(UISelector.itemNamaInput).value = '';
            document.querySelector(UISelector.itemCaloriesInput).value = '';
        },
        hideList: function () {
            document.querySelector(UISelector.itemList).style.display = 'none';
        },
        showTotalCalories: function (total) {
            document.querySelector('.total-calories').innerHTML = total;
        },
        clearEditState: function () {
            this.clearInput();
            document.querySelector(UISelector.updateBtn).style.display = 'none';
            document.querySelector(UISelector.deleteBtn).style.display = 'none';
            document.querySelector(UISelector.backBtn).style.display = 'none';
            document.querySelector(UISelector.addBtn).style.display = 'inline';
        },
        showEditState: function () {
            document.querySelector(UISelector.updateBtn).style.display = 'inline';
            document.querySelector(UISelector.deleteBtn).style.display = 'inline';
            document.querySelector(UISelector.backBtn).style.display = 'inline';
            document.querySelector(UISelector.addBtn).style.display = 'none';
        },
        addItemToForm: function () {
            document.querySelector(UISelector.itemNamaInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelector.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            this.showEditState();
        },
        updateListItem: function (item) {
            let listItems = document.querySelectorAll(UISelector.listItems);

            // CONVERTS NODE LIST INTO ARREY
            listItems = Array.from(listItems);

            listItems.forEach(function (items) {
                const itemId = items.getAttribute('id');

                if (itemId === `item-${item.id}`) {
                    document.querySelector(`#${itemId}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                   <a href="#" class="secondary-content">
                     <i class="edit-item fa fa-pencil"></i>
                   </a>`;;
                }
            });
        },
        deleteListItem: function (id) {
            const item = document.querySelector(`#item-${id}`);
            item.remove();
        },
        removeItems: function () {
            const listitems = document.querySelector(UISelector.listCollec);
            while (listitems.firstChild) {
                listitems.removeChild(listitems.firstChild);
            }

            // const listitem = document.querySelectorAll(UISelector.listItems);
            // listitem.forEach(function(item) {
            //     item.remove();
            // });
        }

    }

})();

// APP CONTROLLER
const App = (function (ItemCtrl, UICtrl, StorageCtrl) {
    // LOAD EVENT LISTENERS
    const loadEventListener = function () {
        // GEI UI SELECTOR
        const uiselectors = UICtrl.getSelectors();

        // ADD ITEM EVENT
        document.querySelector(uiselectors.addBtn).addEventListener('click', function (e) {
            // GET FORM INPUT FROM UI CONTROLLER
            const input = UICtrl.getItemInput();

            // CHECK FOR NAME AND CALORIES INPUT
            if ((input.name !== '' && /^[A-z]+$/g.exec(input.name)) && (input.calories !== '' && !(isNaN(input.calories)))) {
                // ADD ITEM
                const newItem = ItemCtrl.addItem(input.name, input.calories);
                // ADD ITEM TO UI
                UICtrl.addListItem(newItem);

                // GET TOTAL CALORIES
                const totalCalories = ItemCtrl.getTotalCalories();
                // ADD TOTAL CALORIES TO UI
                UICtrl.showTotalCalories(totalCalories);

                // STORE IN LOCALST
                StorageCtrl.storeItem(newItem);

                // // CLEAR INPUT FIELDS
                // document.querySelector(uiselectors.itemNamaInput).value = '';
                // document.querySelector(uiselectors.itemCaloriesInput).value = '';
                UICtrl.clearInput();
            }
            e.preventDefault();
        });

        // DISABLE SUBMIT ON ENTER
        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });

        // CLICK EDIT ITEM
        document.querySelector(uiselectors.itemList).addEventListener('click', function (e) {
            if (e.target.classList.contains('edit-item')) {
                // GET LIST ITEM ID
                const listId = e.target.parentNode.parentNode.id;

                // BREAK INTO AN ARREY
                const listAr = listId.split('-');

                // const listAr = listId.split('');
                // listAr.forEach(function (item, index) {
                //     if (!isNaN(parseInt(item))) {
                //         return index;
                //     }
                // });

                // GET THE ACTUAL ID
                const id = parseInt(listAr[1]);

                // GET ITEM
                const itemToEdit = ItemCtrl.getItemById(id);
                // SET CURRENT ITEM
                ItemCtrl.setCurrentItem(itemToEdit);


                // ADD ITEM TO FORM
                UICtrl.addItemToForm();
            }
            e.preventDefault();
        });

        // UPDATE ITEM EVENT
        document.querySelector(uiselectors.updateBtn).addEventListener('click', function (e) {

            // GET ITEM INPUT AS OBJ
            const input = UICtrl.getItemInput();

            // UPDATE ITEM 
            const updateItem = ItemCtrl.updateItem(input.name, input.calories);

            // UPDATE UI
            UICtrl.updateListItem(updateItem);

            // GET TOTAL CALORIES
            const totalCalories = ItemCtrl.getTotalCalories();
            // ADD TOTAL CALORIES TO UI
            UICtrl.showTotalCalories(totalCalories);

            // UPDATE LOCAL STORAGE
            StorageCtrl.updateItemStorage(updateItem);

            UICtrl.clearEditState();

            e.preventDefault();
        });

        // BACK BUTTON EVENT
        document.querySelector(uiselectors.backBtn).addEventListener('click', function (e) {
            UICtrl.clearEditState();
            e.preventDefault();
        });

        // DELETE ITEM EVETN
        document.querySelector(uiselectors.deleteBtn).addEventListener('click', function (e) {
            // GET CURRENT ITEM
            const currentItem = ItemCtrl.getCurrentItem();

            // DELETE FROM DATA STRUCTURE
            ItemCtrl.deleteItem(currentItem.id);
            // DELETE FROM UI
            UICtrl.deleteListItem(currentItem.id);

            // GET TOTAL CALORIES
            const totalCalories = ItemCtrl.getTotalCalories();
            // ADD TOTAL CALORIES TO UI
            UICtrl.showTotalCalories(totalCalories);

            // DELETE ITEM FROM LS
            StorageCtrl.removeItemFromLS(currentItem.id);

            // HIDE UL IF DATA LIST IS EMPTY
            if (ItemCtrl.getItems().length === 0) {
                UICtrl.hideList();
            }

            UICtrl.clearEditState();

            e.preventDefault();
        });

        // DELETE ALL ITEM EVENT
        document.querySelector(uiselectors.clearBtn).addEventListener('click', function (e) {
            // DELETE ALL ITEMS FROM DATA STRUCTURE
            ItemCtrl.clearAllItems();
            // DELETE ALL ITEMS FORM UI
            UICtrl.removeItems();

            // GET TOTAL CALORIES
            const totalCalories = ItemCtrl.getTotalCalories();
            // ADD TOTAL CALORIES TO UI
            UICtrl.showTotalCalories(totalCalories);

            // CLEAR ALL THE ITEMS FROM LS
            StorageCtrl.clearAllItemsFromStorage();

            UICtrl.clearEditState();

            // HIDE UL
            UICtrl.hideList();

            e.preventDefault();
        });
    }


    // PUBLIC METHODS
    return {
        init: function () {
            // CLEAR EDIT STATE & SET INITIAL SET
            UICtrl.clearEditState();

            // FETCH ITEMS FROM DATA STRUCTURE
            const items = ItemCtrl.getItems();

            // CHECK IF ANY ITEMS 
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                // POPULATE LIST WITH ITEMS
                UICtrl.populateItemList(items);
                // GET TOTAL CALORIES
                const totalCalories = ItemCtrl.getTotalCalories();
                // ADD TOTAL CALORIES TO UI
                UICtrl.showTotalCalories(totalCalories);
            }

            // LOAD EVENT LISTERNS
            loadEventListener();
        }
    }
})(ItemCtrl, UICtrl, StorateCtrl);


// INITIALIZE APP
App.init();
