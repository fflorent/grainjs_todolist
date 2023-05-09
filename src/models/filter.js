const { observable } = require("grainjs");

class FilterModel {
  static VALUES = { ALL: "all", DONE: "done", UNDONE: "undone" };
  constructor(initialValue = "all") {
    this.observable = observable(initialValue);
  }
  showTask(filterVal, taskDone) {
    switch (filterVal) {
      case "all":
        return true;
      case "done":
        return taskDone;
      case "undone":
        return !taskDone;
    }
  }
}

module.exports = {
  FilterModel,
};
