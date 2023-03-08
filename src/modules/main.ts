export {};

const wsUrl: string = "wss://echo-ws-service.herokuapp.com";

const btnSend: HTMLButtonElement | null = document.querySelector(".btn-submit");
const output: HTMLDivElement | null = document.querySelector(".output");
const btnGeolocation: HTMLButtonElement | null = document.querySelector(".btn-geolocation");

let websocket: WebSocket | null;

function writeToScreenClient(message: string): void {
  const preClient: HTMLParagraphElement | null = document.createElement("p");
  preClient.classList.add("field-text");
  preClient.classList.add("field-client");
  preClient.innerHTML = message;
  if (output) {
    output.appendChild(preClient);
  }
}

function writeToScreenServer(message: string) {
  const preServer: HTMLParagraphElement | null = document.createElement("p");
  preServer.classList.add("field-text");
  preServer.classList.add("field-server");
  preServer.innerHTML = message;
  if (output) {
    output.appendChild(preServer);
  }
}

btnSend?.addEventListener("click", (event: MouseEvent) => {
  event.preventDefault();
  websocket = new WebSocket(wsUrl);

  websocket.onopen = function() {
    const inputNode = <HTMLInputElement>document.getElementById("chat-input");
    const message: string = inputNode.value;

    if (!message) {
      inputNode.style.borderColor = "red";
      return;
    } else {
      inputNode.style.borderColor = "rgb(150, 195, 255)";
      writeToScreenClient(message);
      if (websocket) {
        websocket.send(message);
        inputNode.value = "";
      }
    }
    
  };

  websocket.onclose = function() {
    writeToScreenClient(
      "<span style=\"color: red;text-transform: uppercase;\">Offline</span>"
    );

    if (websocket) {
        websocket.close();
        websocket = null;
      }
  };

  websocket.onmessage = function(evt) {
    writeToScreenServer(
      "<span>Server: " + evt.data+"</span>"
    );
  };

  websocket.onerror = function() {
    writeToScreenServer(
      "<span style=\"color:red;text-transform: uppercase;\">ERROR</span>"
    );
  };
});

let latitude: number | null;
let longitude: number | null;
let preClientLink: HTMLAnchorElement | null;

function writeClientGeoLink(message: string): void {
  preClientLink = document.createElement("a");
  preClientLink.classList.add("field-text");
  preClientLink.classList.add("field-client");
  preClientLink.href = `https://www.openstreetmap.org/#map=10/${latitude}/${longitude}`;
  preClientLink.innerHTML = message;

  if (output) {
    output.appendChild(preClientLink);
  }
}

const errorGeolocation = (): void => {
  writeToScreenClient("Unable to get your location");
};

const successGeolocation = (position: GeolocationPosition): void => {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  writeClientGeoLink("Geo-location");
};

btnGeolocation?.addEventListener("click", (event: MouseEvent) => {
  event.preventDefault();
  latitude = null;
  longitude = null;
  preClientLink = null;

  if (!navigator.geolocation) {
    writeToScreenServer("Geolocation is not supported by your browser");
  } else {
    writeToScreenServer("Locating...");
    navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation);
  }
});