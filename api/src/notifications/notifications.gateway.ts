import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { WebSocketServer } from '@nestjs/websockets'

@WebSocketGateway()
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() //ipv afterInit()
  server: Server

  numberOfClients = 0

  @SubscribeMessage('order:deliver')
  handlePackageDeliver(client: any, payload: any) {
    this.server.emit('order:deliver', payload)
  }

  @SubscribeMessage('order:authenticate')
  handlePackageAuthenticate(client: any, payload: any) {
    this.server.emit('order:authenticate', payload)
  }

  handleDisconnect(client: any) {
    //throw new Error('Method not implemented.')
    this.numberOfClients--
    this.server.emit('users:userLeaving', {
      connectedUsers: this.numberOfClients,
    })
  }
  handleConnection(client: any, ...args: any[]) {
    this.numberOfClients++
    // Notify connected clients of current users
    this.server.emit('users:newuserconnected', {
      connectedUsers: this.numberOfClients,
    })
    console.log('A client has connected')
    console.log(`Number of clients: ${this.numberOfClients}`)
  }
}
