<template>
  <div class="mb-16 text-2xl font-bold">NFC Write page</div>

  <button
    @click="write('helllooooo')"
    class="rounded-lg bg-red-500 px-16 py-2 text-xl"
  >
    Write
  </button>
  <p class="my-4 font-mono text-lg">{{ response || 'No respone yet...' }}</p>
</template>

<script lang="ts">
import { ref } from 'vue'
import useNFC from '../../composables/useNFC'

export default {
  setup() {
    const response = ref(' No response yet')
    const { writeNFC } = useNFC()

    const write = async (text: string) => {
      const res = writeNFC(text)
      response.value = (await res) as any
    }

    return { writeNFC, write, response }
  },
}
</script>
