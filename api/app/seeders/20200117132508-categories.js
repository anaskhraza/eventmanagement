"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "categories",
      [
        {
          id: 1,
          category_name: "Package",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          category_name: "Tent",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          category_name: "Chair",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          category_name: "Cover",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          category_name: "Kanaat",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6,
          category_name: "Glass",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 7,
          category_name: "Plate",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 8,
          category_name: "Dish",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 9,
          category_name: "Table",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 10,
          category_name: "Table Cover",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 11,
          category_name: "Transportation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 12,
          category_name: "Hello",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 13,
          category_name: "Dari",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 14,
          category_name: "Miscellaneous",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
