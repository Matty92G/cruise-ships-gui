(function exportPort() {
  class Port {
    constructor(name) {
      this.name = name;
      this.ships = [];
    }

    addShip(ship) {
      this.ships.push(ship);
    }

    removeShip(ship) {
      const shipIndex = this.ships.indexOf(ship);
      if (shipIndex > -1) {
        this.ships.splice(shipIndex, 1);
      }
      // else {
      //   throw new Error('No ships currently at dock');
      // }
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Port };
  } else {
    window.Port = Port;
  }
})();
