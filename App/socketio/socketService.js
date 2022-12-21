import { log } from "console";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  console.log("a user connected", socket);
});

httpServer.listen(3000);

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

  emit(event, data = {}) {
    this.socket.emit(event, data);
  }

  emit(event, cb = {}) {
    this.socket.on(event, cb);
  }

  emit(listernerName = {}) {
    this.socket.emit(listernerName);
  }
}

const socketService = new WSService();

export default socketService;
