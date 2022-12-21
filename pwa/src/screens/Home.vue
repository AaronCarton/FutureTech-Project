<template>
  <div class="flex h-screen w-screen flex-col items-center justify-center">
    <Truck class="h-[70%] w-screen" :slots="ids" :on-click="openModal" />
    <div class="absolute left-10 flex flex-col gap-2">
      <div
        class="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-neutral-700 bg-neutral-700 text-white"
      >
        <p class="font-bold">1</p>
      </div>
      <div
        class="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-neutral-700 text-neutral-700 hover:bg-neutral-700 hover:text-white"
      >
        <p class="font-bold">2</p>
      </div>
      <div
        class="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-neutral-700 text-neutral-700 hover:bg-neutral-700 hover:text-white"
      >
        <p class="font-bold">3</p>
      </div>
    </div>
  </div>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ packageID }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  This is {{ selectedPackage?.id }}
                </p>
                <p class="text-sm text-gray-500">
                  Name {{ selectedPackage?.name }}
                </p>
                <p class="text-sm text-gray-500">
                  Description {{ selectedPackage?.description }}
                </p>
                <p class="text-sm text-gray-500">
                  Address {{ selectedPackage?.address }}
                </p>
                <p class="text-sm text-gray-500">
                  Customer {{ selectedPackage?.customerId }}
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Got it, thanks!
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import Truck from '../components/generic/Truck.vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { ref } from 'vue'
import useSocket from '../composables/useSocket'
import { Parcel } from '../interfaces/parcel.interface'
import useGraphQL from '../composables/useGraphQL'
import { useQuery } from '@vue/apollo-composable'
import { PARCELS } from '../graphql/query.parcels'
export default {
  components: {
    Truck,
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },
  setup() {
    const packageID = ref('')
    const ids = ref<Parcel[]>([])
    const selectedPackage = ref<Parcel>()

    const isOpen = ref(false)
    const { connectToServer, onNewParcel } = useSocket()
    const { result, onResult } = useQuery(PARCELS)

    onResult((result) => {
      console.log(result)
      result.data.parcels.forEach((parcel: Parcel) => {
        ids.value.push(parcel)
        console.log('pushing')
      })
      console.log('ids', ids)
    })

    function closeModal() {
      isOpen.value = false
    }
    function openModal(id: string) {
      console.log(id)
      selectedPackage.value = ids.value.find((parcel) => parcel.id === id)
      packageID.value = id
      isOpen.value = true
    }

    const sockkk = async () => {
      onNewParcel((parcel) => {
        console.log('new parcel incoming', parcel)

        ids.value.push(parcel)
      })
    }
    sockkk()

    return { ids, isOpen, closeModal, openModal, packageID, selectedPackage }
  },
}
</script>
