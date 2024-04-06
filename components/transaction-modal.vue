<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        {{ isEditing ? 'edit' : 'add' }} transaction
      </template>
      <UForm :state="state" :schema="schema" ref="form" @submit="save">
        <UFormGroup label="transaction type" :required="true" name="type" class="mb-4">
          <USelect :disabled="isEditing" placeholder="select transaction type" :options="types" v-model="state.type" />
        </UFormGroup>

        <UFormGroup label="amount" :required="true" name="amount" class="mb-4">
          <UInput type="number" placeholder="amount" v-model.number="state.amount" />
        </UFormGroup>

        <UFormGroup label="date" :required="true" name="created_at" class="mb-4">
          <UInput type="date" icon="i-heroicons-calendar-days-20-solid" v-model="state.created_at" />
        </UFormGroup>

        <UFormGroup label="description" hint="optional" name="description" class="mb-4">
          <UInput placeholder="description" v-model="state.description" />
        </UFormGroup>

        <UFormGroup label="category" :required="true" name="category" class="mb-4" v-if="state.type === 'expense'">
          <USelect placeholder="select category" :options="categories" v-model="state.category" />
        </UFormGroup>

        <UButton type="submit" color="black" variant="solid" label="save" :loading="isLoading" />
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup>
import { categories, types } from '~/constants'
import { z } from 'zod'
const props = defineProps({
  modelValue: Boolean,
  transaction: {
    type: Object,
    required: false
  }
})
const isEditing = computed(() => !!props.transaction)
const emit = defineEmits(['update:modelValue', 'saved'])

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
const isLoading = ref(false)
const supabase = useSupabaseClient()
const { toastSuccess, toastError }  = useAppToast()

const save = async () => {
  if (form.value.errors.length) return

  isLoading.value = true
  try {
    const { error } = await supabase.from('transactions')
      .upsert({
        ...state.value,
        id: props.transaction?.id
      })

    if (!error) {
      toastSuccess({
        title: 'transaction-saved',
      })
      isOpen.value = false
      emit('saved')
      return
    }
    throw (error)
  } catch (error) {
    toastError({
      title: 'transaction not saved',
      description: error.message,
    })

  } finally {
    isLoading.value = false
  }
}

console.log('mounted')

const initialState = isEditing.value ? {
  type: props.transaction.type,
  amount: props.transaction.amount,
  created_at: useDateTime(props.transaction.created_at),
  description: props.transaction.description,
  category: props.transaction.category,
}: {
  type: undefined,
  amount: 0,
  created_at: undefined,
  description: undefined,
  category: undefined
}

const state = ref({ ...initialState })

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