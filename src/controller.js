(function exportController() {
  class Controller {
    constructor(ship) {
      this.ship = ship;
      this.initialiseSea();

      document.querySelector("#sailbutton").addEventListener("click", () => {
        this.setSail();
      });
    }

    initialiseSea() {
      const backgrounds = ["./images/water0.png", "./images/water1.png"];
      let backgroundIndex = 0;
      window.setInterval(() => {
        document.querySelector("#viewport").style.backgroundImage = `url('${
          backgrounds[backgroundIndex % backgrounds.length]
        }')`;
        backgroundIndex += 1;
      }, 1000);
    }

    renderPorts(ports) {
      const portsElement = document.querySelector("#ports");
      portsElement.style.width = "0px";
      ports.forEach((port, index) => {
        const newPortElement = document.createElement("div");
        newPortElement.className = "port";

        portsElement.appendChild(newPortElement);

        const portsElementWidth = parseInt(portsElement.style.width, 10);
        portsElement.style.width = `${portsElementWidth + 256}px`;
      });
    }

    renderShip() {
      const ship = this.ship;
      const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const portElement = document.querySelector(
        `[data-port-index='${shipPortIndex}']`
      );
      const shipElement = document.querySelector("#ship");
      shipElement.style.top = `${portElement.offsetTop + 20}px`;
      shipElement.style.left = `${portElement.offsetLeft - 30}px`;
    }

    renderMessage(message) {
      const viewPointSelect = document.querySelector("#viewport");
      const newMessageElement = document.createElement("div");
      newMessageElement.id = "message";
      newMessageElement.innerHTML = message;
      viewPointSelect.appendChild(newMessageElement);
      window.setTimeout(() => {
        viewPointSelect.removeChild(newMessageElement);
      }, 2000);
    }
    setSail() {
      const ship = this.ship;
      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const nextPortIndex = currentPortIndex + 1;
      const nextPortElement = document.querySelector(
        `[data-port-index='${nextPortIndex}]`
      );
      if (!nextPortElement) {
        this.renderMessage("End of the line!");
        return 0;
      } else {
        this.renderMessage("Now departing");
      }
      const shipElement = document.querySelector("#ship");
      const sailInterval = setInterval(() => {
        const shipLeft = parseInt(shipElement.style.left, 10);
        if (shipLeft === nextPortElement.offsetLeft - 32) {
          ship.setSail();
          ship.dock();
          this.renderMessage("Now docked");
          clearInterval(sailInterval);
        }
        shipElement.style.left = `${shipLeft + 1}px`;
      }, 20);
    }

  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { Controller };
  } else {
    window.Controller = Controller;
  }
})();
