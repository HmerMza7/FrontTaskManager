import { render, screen } from "@testing-library/react";
import Pagination from "../Pagination";
import userEvent from "@testing-library/user-event";

describe("Pagination", () => {
  it("no renderiza nada si pages es 1", () => {
    render(<Pagination page={1} pages={1} total={5} onPageChange={() => {}} />);
    expect(screen.queryByText(/anterior/i)).not.toBeInTheDocument();
  });
  test("deshabilita el botón anterior en la primera página", () => {
    render(<Pagination page={1} pages={3} total={5} onPageChange={() => {}} />);
    expect(screen.getByText(/anterior/i)).toBeDisabled();
  });
  test("deshabilita el botón siguiente en la última página", () => {
    render(<Pagination page={2} pages={2} total={5} onPageChange={() => {}} />);
    expect(screen.getByText(/siguiente/i)).toBeDisabled();
  });
  test("llama a onPageChange con la página siguiente al hacer click en Siguiente", async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();
    render(
      <Pagination page={1} pages={3} total={5} onPageChange={onPageChange} />,
    );
    await user.click(screen.getByText(/siguiente/i));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
  test("llama a onPageChange con la página anterior al hacer click en anterior", async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();
    render(
      <Pagination page={2} pages={3} total={5} onPageChange={onPageChange} />,
    );
    await user.click(screen.getByText(/anterior/i));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
