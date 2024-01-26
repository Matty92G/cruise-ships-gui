(function exportController() {
  class Controller {
    constructor(ship) {
      this.ship = ship;
      this.initialiseSea();

      document.querySelector('#sailbutton').addEventListener('click', () => {
        this.setSail();
      });
    }

    initialiseSea() {
      const backgrounds = ['./images/water0.png', './images/water1.png'];
      let backgroundIndex = 0;
      setInterval(() => {
        document.querySelector('#viewport').style.backgroundImage = `url('${
          backgrounds[backgroundIndex % backgrounds.length]
        }')`;
        backgroundIndex += 1;
      }, 1000);
    }

    renderPorts(ports) {
      const portsElement = document.querySelector('#ports');
      portsElement.style.width = '0px';
      ports.forEach((port, index) => {
        const newPortElement = document.createElement('div');
        newPortElement.dataset.portName = port.Name;
        newPortElement.dataset.portIndex = index;
        newPortElement.className = 'port';

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
      const shipElement = document.querySelector('#ship');
      shipElement.style.top = `${portElement.offsetTop + 32}px`;
      shipElement.style.left = `${portElement.offsetLeft - 32}px`;
    }

    renderMessage(message) {
      const viewPointSelect = document.querySelector('#viewport');
      const newMessageElement = document.createElement('div');
      newMessageElement.id = 'message';
      newMessageElement.innerHTML = message;
      viewPointSelect.appendChild(newMessageElement);
      window.setTimeout(() => {
        viewPointSelect.removeChild(newMessageElement);
      }, 2000);
    }

    setSail() {
      const ship = this.ship;
      // if (ship.itinerary.ports.length === 0) {
      //   this.renderMessage('Hello there, No Ports Available');
      //   return 0;
      // }
      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const nextPortIndex = currentPortIndex + 1;
      const nextPortElement = document.querySelector(
        `[data-port-index='${nextPortIndex}']`
      );
      if (!nextPortElement) {
        this.renderMessage('End of the line!');
        return 0;
      } else {
        this.renderMessage(`Now departing ${ship.currentPort.name}`);
        // document.getElementById('sailbutton').disabled = true;
      }
      const shipElement = document.querySelector('#ship');
      const sailInterval = setInterval(() => {
        const shipLeft = parseInt(shipElement.style.left, 10);
        if (shipLeft === nextPortElement.offsetLeft - 32) {
          ship.setSail();
          ship.dock();
          this.renderMessage(`Now docked at ${ship.currentPort.name}`);
          clearInterval(sailInterval);
          // this.headUpDisplay();
        }
        shipElement.style.left = `${shipLeft + 1}px`;
      }, 20);
    }
    headUpDisplay() {
      const ship = this.ship;
      if (ship.itinerary.ports.length > 0 && ship.currentPort !== null) {
        const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const nextPortIndex = currentPortIndex + 1;
        let detailMessage = `Current Port : ${ship.itinerary.ports[currentPortIndex].name}`;
        if (nextPortIndex < ship.itinerary.ports.length) {
          detailMessage += `<br>Next Port : ${ship.itinerary.ports[nextPortIndex].name}`;
        }
        document.getElementById('headUpDisplay').innerHTML = detailMessage;
      }
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Controller };
  } else {
    window.Controller = Controller;
  }
})();
