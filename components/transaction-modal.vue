<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        add transaction
      </template>
      <UForm :state="state">
        <UFormGroup
          label="transaction type"
          :required="true"
          name="type"
          class="mb-4"
        >
          <USelect
            placeholder="select transaction type"
            :options="types"
            v-model="state.type"
          />
        </UFormGroup>

        <UFormGroup
          label="amount"
          :required="true"
          name="amount"
          class="mb-4"
        >
          <UInput
            type="number"
            placeholder="amount"
            v-model.number="state.amount"
          />
        </UFormGroup>

        <UFormGroup
          label="date"
          :required="true"
          name="created_at"
          class="mb-4"
        >
          <UInput
            type="date"
            icon="i-heroicons-calendar-days-20-solid"
            v-model="state.created_at"
          />
        </UFormGroup>

        <UFormGroup
          label="description"
          hint="optional"
          name="description"
          class="mb-4"
        >
          <UInput
            placeholder="description"
            v-model="state.description"
          />
        </UFormGroup>

        <UFormGroup
          label="category"
          :required="true"
          name="category"
          class="mb-4"
        >
          <USelect
            placeholder="select category"
            :options="categories"
            v-model="state.category"
          />
        </UFormGroup>

        <UButton
          type="submit"
          color="black"
          variant="solid"
          label="save"
        />
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup>
import { categories, types } from '~/constants'
const props = defineProps({
  modelValue: Boolean
})
const emit = defineEmits(['update:modelValue'])

const state = ref({
  type: undefined,
  amount: 0,
  created_at: undefined,
  description: undefined,
  category: undefined
})

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>