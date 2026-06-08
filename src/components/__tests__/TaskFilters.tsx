import { render, screen } from "@testing-library/react";
import TaskFiltersComponent from "../TaskFilters";
import userEvent from "@testing-library/user-event";

describe("Taskfilters", () => {
  const mockStates = [
    { id: 1, state: "Pendiente" },
    { id: 2, state: "Completada" },
    { id: 3, state: "En progreso" },
  ];

  const mockPriorities = [
    { id: 1, level: "Alta" },
    { id: 2, level: "Media" },
    { id: 3, level: "Baja" },
  ];
  test("Boton Limpiar filtros no se renderiza si no hay filtros", () => {
    render(
      <TaskFiltersComponent
        priorities={[]}
        states={[]}
        filters={{}}
        onChange={() => {}}
      />,
    );
    expect(screen.queryByText("Limpiar filtros")).not.toBeInTheDocument();
  });

  test("Cambiar select de estado llama a onChange con el estado seleccionado", async () => {
    const user = userEvent.setup();
    const onStateChange = jest.fn();
    render(
      <TaskFiltersComponent
        priorities={[]}
        states={mockStates}
        filters={{}}
        onChange={onStateChange}
      />,
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: /seleccionar estado/i }),
      "1",
    );
    expect(onStateChange).toHaveBeenCalledWith({ state_id: 1 });
  });
  test("Boton Limpiar filtros se renderiza si se selecciona un estado", () => {
    render(
      <TaskFiltersComponent
        priorities={[]}
        states={mockStates}
        filters={{ state_id: 1 }}
        onChange={() => {}}
      />,
    );
    expect(screen.getByText("Limpiar filtros")).toBeInTheDocument();
  });
  test("Boton Limpiar filtros se renderiza si se selecciona una prioridad", () => {
    render(
      <TaskFiltersComponent
        priorities={mockPriorities}
        states={[]}
        filters={{ priority_id: 1 }}
        onChange={() => {}}
      />,
    );
    expect(screen.getByText("Limpiar filtros")).toBeInTheDocument();
  });
  test("Boton Limpiar filtros se renderiza si se selecciona una prioridad y un estado", () => {
    render(
      <TaskFiltersComponent
        priorities={mockPriorities}
        states={mockStates}
        filters={{ priority_id: 1, state_id: 1 }}
        onChange={() => {}}
      />,
    );
    expect(screen.getByText("Limpiar filtros")).toBeInTheDocument();
  });
  test("Cambiar select de prioridades llama a onChange con la prioridad seleccionada", async () => {
    const user = userEvent.setup();
    const onPriorityChange = jest.fn();
    render(
      <TaskFiltersComponent
        priorities={mockPriorities}
        states={[]}
        filters={{}}
        onChange={onPriorityChange}
      />,
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: /seleccionar prioridad/i }),
      "1",
    );
    expect(onPriorityChange).toHaveBeenCalledWith({ priority_id: 1 });
  });
  test("Hacer click en boton Limpiar filtros llama a onChange con estado y prioridad undefined", async () => {
    const user = userEvent.setup();
    const onFilterChange = jest.fn();
    render(
      <TaskFiltersComponent
        priorities={mockPriorities}
        states={mockStates}
        filters={{ priority_id: 1, state_id: 1 }}
        onChange={onFilterChange}
      />,
    );
    await user.click(screen.getByText("Limpiar filtros"));
    expect(onFilterChange).toHaveBeenCalledWith({
      priority_id: undefined,
      state_id: undefined,
    });
  });
});
