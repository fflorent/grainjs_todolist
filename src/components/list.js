const { dom, styled } = require("grainjs");

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

module.exports = (tasks) =>
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
  );
