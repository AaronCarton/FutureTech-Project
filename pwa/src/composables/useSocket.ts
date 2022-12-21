import { ref } from 'vue'
import { io, Socket } from 'socket.io-client'
import { Parcel } from '../interfaces/parcel.interface'

// SHARED
const socketServer = ref<Socket>()
const connected = ref<boolean>(false)

export default () => {
  const _connect = () => {
    console.log('Connected')
    connected.value = true
  }

  const _disconnect = () => {
    console.log('Disconnected')
    connected.value = false
  }

  const _error = (error: any) => {
    console.error(error)
  }

  const disconnectFromServer = () => {
    if (socketServer.value) {
      socketServer.value.disconnect()
      socketServer.value = undefined
    }
  }

  const sendNewParcel = (parcel: Parcel) => {
    if (socketServer.value) {
      socketServer.value.emit('newParcel', parcel)
    }
  }

  const connectToServer = () => {
    if (socketServer.value) {
      return
    }

    socketServer.value = io('ws://172.30.99.139:3003', {
      transports: ['websocket'], // polling is default, can give cors errors
    })

    socketServer.value.on('connect', _connect)
    socketServer.value.on('disconnect', _disconnect)
    socketServer.value.on('error', _error)
  }

  return {
    connected,

    connectToServer,
    disconnectFromServer,
    sendNewParcel,
  }
}
