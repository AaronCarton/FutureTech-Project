<template>
  <div class="mb-16 text-2xl font-bold">NFC Scan page</div>
  <button
    @click="toggleScan()"
    class="rounded-lg bg-red-500 px-16 py-2 text-xl"
  >
    {{ scanning ? 'Scanning...' : 'Scan' }}
  </button>
  <p class="my-4 break-words font-mono text-lg">
    <template v-if="response">
      <p>Parcel ID: {{ response.id }}</p>
      <p>Name: {{ response.name }}</p>
      <p>Desc:{{ response.description || 'None provided' }}</p>
      <p>Address: {{ response.address }}</p>
      <p>Custom ID: {{ response.customerId }}</p>
      <button @click="addToVan">Add to van</button>
    </template>
    <template v-else>No response yet...</template>
  </p>
</template>

<script lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { ref } from 'vue'
import { receiveMessageOnPort } from 'worker_threads'
import useNFC from '../../composables/useNFC'
import useSocket from '../../composables/useSocket'
import { ADD_PARCEL_TO_VAN } from '../../graphql/mutation.van'
import { Parcel } from '../../interfaces/parcel.interface'

export default {
  setup() {
    const scanning = ref(false)
    const response = ref<Parcel>()
    const { scanNFC, recievedMessage } = useNFC()
    const { connectToServer, sendNewParcel } = useSocket()

    const toggleScan = async () => {
      scanning.value = !scanning.value
    }

    connectToServer()

    const addToVan = async () => {
      if (!response.value) return
      const { mutate, onDone } = useMutation(ADD_PARCEL_TO_VAN, {
        variables: {
          vanId: '63a3112df3830b81a99d12cb',
          parcelId: response.value.id,
        },
      })
      mutate()
      onDone((res) => {
        console.log(res)
        if (response.value) sendNewParcel(response.value)
      })
    }

    setInterval(async () => {
      if (!scanning.value) return
      scanNFC((res) => {
        //load json
        const parcel = JSON.parse(res) as Parcel
        response.value = parcel
      })
    }, 2000)

    return { toggleScan, response, scanning, addToVan }
  },
}
</script>
