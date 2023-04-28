import sequelize from '../config/database.js'
import Sequelize from 'sequelize';
'use strict';

const ShoppingCart = sequelize.define('shopping_cart', {

      item_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },                                                                
      cart_id: Sequelize.STRING,
      product_id: {
        type: Sequelize.INTEGER,
      },
      attributes: {
        type: Sequelize.STRING,
        defaultValue: "Large Size",
      },
      // attributes: DataTypes.STRING,
      quantity: Sequelize.INTEGER,
      buy_now: Sequelize.BOOLEAN,
      added_on: Sequelize.DATE,
    
    },
     {
      timestamps: false,
      freezeTableName: true,
    });
    


 

export default ShoppingCart


// const ShoppingCart = {
//   ShoppingCart: {
//     options: {
//       tableName: 'shopping_cart'
//     },
//     attributes: {
//       item_id: {
//         type: DataTypes.STRING,
//         primaryKey: true
//       },                                                                
//       cart_id: DataTypes.STRING,
//       product_id: {
//         type: DataTypes.INTEGER,
//       },
//       attributes: {
//         type: DataTypes.STRING,
//         defaultValue: "Large Size",
//       },
//       // attributes: DataTypes.STRING,
//       quantity: DataTypes.INTEGER,
//       buy_now: DataTypes.BOOLEAN,
//       added_on: DataTypes.DATE,
//     },
//     },
//     relations: {
//       hasMany: {
//         Product: {
//           as: 'products',
//           foreignKey: 'product_id'
//         }
//       }
//     }
//   }


  // const shopping_cart = sequelize.define('shopping_cart', {

  //   item_id: {
  //     type: Sequelize.STRING,
  //     primaryKey: true
  //   },                                                                
  //   cart_id: Sequelize.STRING,
  //   product_id: {
  //     type: Sequelize.INTEGER,
  //     references: {
  //       model: Product,
  //       key: 'product_id'
  //     }
  //   },
  //   attributes: {
  //     type: Sequelize.STRING,
  //     defaultValue: "Large Size",
  //   },
  //   // attributes: DataTypes.STRING,
  //   quantity: Sequelize.INTEGER,
  //   buy_now: Sequelize.BOOLEAN,
  //   added_on: Sequelize.DATE,
  // },

  
   
  
      // ShoppingCart.hasMany: {
      //   Product: {
      //     as: 'products',
      //     foreignKey: 'product_id'
      //   }
      // }
    
    // associations can be defined here
    
  // export default shopping_cart;
