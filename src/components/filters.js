const { dom } = require("grainjs");
const { FilterModel } = require("../models/filter");

module.exports = (filterModel) => {
  const filterRadio = (props) =>
    dom(
      "input",
      {
        type: "radio",
        name: "filter",
        checked: filterModel.observable.get() === props.value,
        ...props,
      },
      dom.on("change", (ev) => filterModel.observable.set(ev.target.value))
    );

  return dom(
    "p",
    "filter: ",
    filterRadio({ value: FilterModel.VALUES.ALL, id: "filter_all" }),
    dom("label", { for: "filter_all" }, "show all"),
    ", ",
    filterRadio({ value: FilterModel.VALUES.DONE, id: "filter_done" }),
    dom("label", { for: "filter_done" }, "show done"),
    ", ",
    filterRadio({ value: FilterModel.VALUES.UNDONE, id: "filter_undone" }),
    dom("label", { for: "filter_undone" }, "show undone")
  );
};
