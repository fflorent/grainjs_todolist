const { dom, subscribe, styled, observable, Observable } = require("grainjs");
const { form, list, filters } = require("./components");
const { FilterModel } = require("./models/filter");
const { makeInitialTasks, serializeTasks } = require("./models/tasks");

const tasks = makeInitialTasks(localStorage.tasks || "[]");
const persistTasks = (tasksToSerialize) => {
  localStorage.tasks = serializeTasks(tasksToSerialize);
};

subscribe(tasks, (_, tasksToSerialize) => persistTasks(tasksToSerialize));

const filterModel = new FilterModel(localStorage.filter);
subscribe(filterModel.observable, (_, val) => {
  localStorage.filter = val;
});

dom.update(
  document.body,
  dom("header", dom.cls("center"), dom("h1", "TODO List with Grainjs")),
  dom(
    "main",
    dom.cls("center"),
    form(tasks),
    filters(filterModel),
    list(tasks, { filterModel, persistTasks })
  )
);
