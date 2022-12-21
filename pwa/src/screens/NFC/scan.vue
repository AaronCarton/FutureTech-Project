<template>
  <div class="mb-16 text-2xl font-bold">NFC Scan page</div>
  <button
    @click="toggleScan()"
    class="rounded-lg bg-red-500 px-16 py-2 text-xl"
  >
    {{ scanning ? 'Scanning...' : 'Scan' }}
  </button>
  <p class="my-4 font-mono text-lg">{{ response || 'No respone yet...' }}</p>
</template>

<script lang="ts">
import { ref } from 'vue'
import useNFC from '../../composables/useNFC'

export default {
  setup() {
    const scanning = ref(false)
    const response = ref('No response yet')
    const { scanNFC } = useNFC()

    const toggleScan = async () => {
      scanning.value = !scanning.value
    }

    setInterval(async () => {
      if (!scanning.value) return
      const res = scanNFC()
      response.value = (await res) as any
    }, 2000)

    return { toggleScan, response, scanning }
  },
}
</script>
