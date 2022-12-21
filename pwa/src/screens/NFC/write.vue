<template>
  <div class="mb-16 text-2xl font-bold">NFC Write page</div>
  <select
    v-model="selectedOrder"
    name="packages"
    id="packages"
    class="my-3 text-black"
  >
    <option v-for="parcel in parcels" :key="parcel.id" :value="parcel.id">
      {{ (parcel.id, parcel.name) }}
    </option>
  </select>
  <button @click="write()" class="rounded-lg bg-red-500 px-16 py-2 text-xl">
    Write
  </button>
  <p class="my-4 font-mono text-lg">{{ response || 'No respone yet...' }}</p>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { ref } from 'vue'
import useNFC from '../../composables/useNFC'
import { PARCELS } from '../../graphql/query.parcels'
import { Parcel } from '../../interfaces/parcel.interface'

export default {
  setup() {
    const response = ref(' No response yet')
    const selectedOrder = ref<String | null>(null)
    const parcels = ref<Parcel[]>([])
    const { writeNFC } = useNFC()
    const { onResult } = useQuery(PARCELS)

    onResult((result) => {
      if (result.data) {
        console.log(result.data.parcels)

        parcels.value = result.data.parcels
      }
    })

    const write = async () => {
      if (!selectedOrder.value) {
        return console.log('No order selected')
      }
      const parcel = parcels.value.find(
        (parcel) => parcel.id === selectedOrder.value,
      )
      if (!parcel) {
        return console.log('No parcel found')
      }
      const parcelData = JSON.stringify(parcel)
      const res = writeNFC(parcelData)
      response.value = parcelData
    }

    return { writeNFC, write, response, parcels, selectedOrder }
  },
}
</script>
