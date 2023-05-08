const { obsArray, observable } = require("grainjs");

module.exports = {
  makeInitialTasks: function (json) {
    return obsArray(JSON.parse(json).map((task) => observable(task)));
  },
  serializeTasks: (tasksToSerialize) => {
    return JSON.stringify(tasksToSerialize.map((task) => task.get()));
  },
};
