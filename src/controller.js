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

    renderMessage(message, time) {
      const viewPointSelect = document.querySelector('#viewport');
      const newMessageElement = document.createElement('div');
      newMessageElement.id = 'message';
      newMessageElement.innerHTML = message;
      viewPointSelect.appendChild(newMessageElement);
      window.setTimeout(() => {
        viewPointSelect.removeChild(newMessageElement);
      }, time);
    }

    setSail() {
      const ship = this.ship;
      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const nextPortIndex = currentPortIndex + 1;
      const nextPortElement = document.querySelector(
        `[data-port-index='${nextPortIndex}']`
      );
      if (!nextPortElement) {
        this.renderMessage('End of the line!', 1000);
        return 0;
      } else {
        this.renderMessage(
          `Next Stop: ${ship.itinerary.ports[nextPortIndex].name}`,
          6000
        );
        this.renderMessage(`Now departing ${ship.currentPort.name}`, 2000);
      }
      const shipElement = document.querySelector('#ship');
      const sailInterval = setInterval(() => {
        const shipLeft = parseInt(shipElement.style.left, 10);
        if (shipLeft === nextPortElement.offsetLeft - 32) {
          ship.setSail();
          ship.dock();
          this.headUpDisplay();
          this.renderMessage(`Now docked at ${ship.currentPort.name}`, 2000);
          clearInterval(sailInterval);
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
        document.querySelector('#headUpDisplay').innerHTML = detailMessage;
      }
    }

    renderForm() {
      const ship = this.ship;
      const lastPortIndex = ship.itinerary.ports.indexOf(ship.lastPort);
      let formMessage = `Last Port : ${ship.itinerary.ports[lastPortIndex].name}`;
      let formInput =
        formMessage +
        '<div id="addPort"><form id="addPortForm"><label for="portValue">Add Port:</label><input type="text" id="portadd" class="form-control" placeholder="Enter New Destination..."/><input type="button" id="addportbutton" value="Add Port"></input></form></div>';
      // document.querySelector('#formDisplay').innerHTML = formMessage;
      document.querySelector('#formDisplay').innerHTML = formInput;
      document
        .querySelector('#addportbutton')
        .addEventListener('click', (e) => {
          e.preventDefault();
          let PortElement = document.getElementById('portadd').value;
          this.ship.itinerary.ports.push(new Port(PortElement));
          this.headUpDisplay();
          const portsElement = document.querySelector('#ports');
          const newPortElement = document.createElement('div');
          newPortElement.dataset.portName = itinerary.ports[lastPortIndex].name;
          newPortElement.dataset.portIndex = itinerary.ports[lastPortIndex];
          newPortElement.className = 'port';

          portsElement.appendChild(newPortElement);

          const portsElementWidth = parseInt(portsElement.style.width, 10);
          portsElement.style.width = `${portsElementWidth + 256}px`;
          this.ship.itinerary.ports;
          this.renderShip();
        });
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Controller };
  } else {
    window.Controller = Controller;
  }
})();
