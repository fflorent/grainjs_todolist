const { dom, styled, observable, subscribe } = require("grainjs");
const { makeInitialTasks, serializeTasks } = require("./models/tasks");

const tasks = makeInitialTasks(localStorage.tasks || "[]");
const persistTasks = (tasksToSerialize) => {
  localStorage.tasks = serializeTasks(tasksToSerialize);
};

const todoList = styled(
  "ul",
  `
  list-style-type: none;
`
);

const trash = styled(
  "button",
  `
    margin-left: 2em;
  `
);

subscribe(tasks, (_, tasksToSerialize) => persistTasks(tasksToSerialize));

dom.update(
  document.body,
  dom("header", dom.cls("center"), dom("h1", "TODO List avec Grainjs")),
  dom(
    "main",
    dom.cls("center"),
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
    ),
    todoList(
      dom.forEach(tasks, (task, i) => {
        const inputId = "task-" + i;
        return dom(
          "li",
          dom.cls("todo-list-item"),
          dom(
            "input",
            { id: inputId, type: "checkbox", checked: task.get().done },
            dom.on("change", (ev) => {
              task.set({
                ...task.get(),
                done: ev.target.checked,
              });
              persistTasks(tasks.get());
            })
          ),
          dom(
            "label",
            dom.cls("spacer"),
            dom.cls("is-done", (use) => use(task).done),
            { for: inputId },
            dom.text((use) => use(task).name)
          ),
          trash(
            dom.on("click", () => {
              if (!task.get().done) {
                // FIXME rather use a toast
                return alert("First mark this task as done");
              }
              tasks.splice(tasks.get().indexOf(task), 1);
            }),
            dom.text("🗑")
          )
        );
      })
    )
  )
);
