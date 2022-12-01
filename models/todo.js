// models/todo.js
'use strict';
const { Model, Op } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      (await this.overdue()).forEach((i)=>{
          console.log(i.displayableString())
      })
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      (await this.dueToday()).forEach((i)=>{
        console.log(i.displayableString())
      })

      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      (await this.dueLater()).forEach((i)=>{
        console.log(i.displayableString())
      })
      // await this.dueLater();
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      //return a list of overdue items
      //return a list "[items..]" item.duedate < presnt
      //return an array of all tuples/items of that table where(conditon)
      const overdues = await Todo.findAll({
        where:{
          dueDate:{
            [Op.lt]:new Date()
          }
        }
      });
      return overdues
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const dueTodays = await Todo.findAll({
        where:{
          dueDate:{
            [Op.eq]:new Date()
          }
        }
      });
      return dueTodays
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const duelaters = await Todo.findAll({
        where:{
          dueDate:{
            [Op.gt]:new Date()
          }
        }
      });
      return duelaters
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE

    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate === new Date().toLocaleDateString("en-CA") ? "" :this.dueDate}`.trim();
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};