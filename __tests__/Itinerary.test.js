const { Itinerary } = require("../src/itinerary.js");

describe("Itinerary", () => {
  it("Can be instantiated", () => {
    expect(new Itinerary()).toBeInstanceOf(Object);
  });
});

describe("I want a ship to take an itinerary which determines at which port it next docks.", () => {
  it("Check the Itinerary", () => {
    const dover = jest.fn();
    const calais = jest.fn();
    const itinerary = new Itinerary([dover, calais]);
    expect(itinerary.ports).toEqual([dover, calais]);
  });
});
