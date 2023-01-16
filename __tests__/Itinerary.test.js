const { Itinerary } = require("../src/itinerary.js");

describe("Itinerary", () => {
  it("Can be instantiated", () => {
    expect(new Itinerary()).toBeInstanceOf(Object);
  });

  it("Can be instantiated with an array of ports", () => {
    const dover = jest.fn();
    const calais = jest.fn();
    const itinerary = new Itinerary([dover, calais]);

    expect(itinerary.ports).toEqual([dover, calais]);
  });
});
