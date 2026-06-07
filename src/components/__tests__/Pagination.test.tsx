import { render, screen } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Pagination", () => {
  it("no renderiza nada si pages es 1", () => {
    render(<Pagination page={1} pages={1} total={5} onPageChange={() => {}} />);
    expect(screen.queryByText(/anterior/i)).not.toBeInTheDocument();
  });
});
