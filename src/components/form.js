const { dom, observable } = require("grainjs");

module.exports = (tasks) =>
  dom(
    "form",
    dom(
      "label",
      {
        for: "task-input",
      },
      "Enter your task: "
    ),
    dom("input", {
      type: "text",
      name: "task",
      id: "task-input",
      placeholder: "Wash my dishes",
      autofocus: true,
      style: "margin: 0 0.5em",
    }),
    dom("input", { type: "submit", value: "validate" }),
    dom.on("submit", (ev) => {
      const taskEl = ev.target.elements.task;
      tasks.push(
        observable({
          name: taskEl.value,
          done: false,
        })
      );
      taskEl.value = "";
      ev.preventDefault();
    })
  );
