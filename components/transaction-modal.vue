<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        add transaction
      </template>
      <UForm
        :state="state"
        :schema="schema"
        ref="form"
        @submit.prevent="save"
      >
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
          v-if="state.type === 'expense'"
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
import { z } from 'zod'
const props = defineProps({
  modelValue: Boolean
})
const emit = defineEmits(['update:modelValue'])

const defaultSchema = z.object({
  created_at: z.string(),
  description: z.string().optional(),
  amount: z.number().positive('amount needs to be greater than 0'),
})

const incomeSchema = z.object({
  type: z.literal('income')
})
const savingSchema = z.object({
  type: z.literal('saving')
})
const investmentSchema = z.object({
  type: z.literal('investment')
})
const expenseSchema = z.object({
  type: z.literal('expense'),
  category: z.enum(categories)
})

const schema = z.intersection(
  z.discriminatedUnion('type', [incomeSchema, expenseSchema, savingSchema, investmentSchema]),
  defaultSchema
)

const form = ref()

const save = async () => {
  if (form.value.errors.length) return

  // store into supabase
}

const initialState = {
  type: undefined,
  amount: 0,
  created_at: undefined,
  description: undefined,
  category: undefined
}

const state = ref({
  ...initialState
})

const resetForm = () => {
  Object.assign(state.value, initialState)
  form.value.clear()
}

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (!value) resetForm()
    emit('update:modelValue', value)
  }
})
</script>