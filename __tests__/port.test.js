/* globals describe it expect */
const { Port } = require("../src/port.js");

describe("Port", () => {
  let port;
  let ship;
  let titanic;
  let queenMary;
  beforeEach(() => {
    port = new Port("Dover");
    ship = jest.fn();
    titanic = jest.fn();
    queenMary = jest.fn();
  });
  it("Can be instantiated", () => {
    expect(new Port()).toBeInstanceOf(Object);
  });
  it("Can add a Ship", () => {
    port.addShip(ship);
    expect(port.ships).toContain(ship);
  });
  it("Can remove a Ship", () => {
    port.addShip(titanic);
    port.addShip(queenMary);
    port.removeShip(queenMary);
    expect(port.ships).toEqual([titanic]);
  });
});
