import io from "socket.io-client";

const SOCKET_URL = io("http://localhost:3000");

class WSService {
  initializeSocket = async () => {
    try {
      this.socket = io(SOCKET_URL, {
        transports: ["websocket"],
      });

      console.log("Socket initialized", this.socket);

      this.socket.on("Initializing socket", (data) => {
        console.log("=== Socket connected ===", data);
      });

      this.socket.on("Disconnected", (data) => {
        console.log("=== Socket disconnected ===", data);
      });

      this.socket.on("Error", (data) => {
        console.log("=== Socket error ===", data);
      });
    } catch (error) {
      console.log("Error in socket", error);
    }
  };
}
