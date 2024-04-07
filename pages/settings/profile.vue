<template>
  <UForm :state="state" :schema="schema" @submit="saveProfile">
    <UFormGroup class="mb-4" label="full name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup class="mb-4" label="email" name="email" help="you will receive a confirmation email on both the old and the new email addresses if you modify the email address">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UButton type="submit" color="black" variant="solid" label="save" :pending="pending" :disabled="pending"/>
  </UForm>
</template>

<script setup>
import { z } from 'zod'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const { toastSuccess, toastError } = useAppToast()
const pending = ref(false)

const state = ref({
  name: user.value?.user_metadata?.full_name,
  email: user.value?.email
})

const schema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email()
})

const saveProfile = async () => {
  pending.value = true

  try {
    const data =  {
      data: {
        full_name: state.value.name
      }
    }

    if (state.value.email !== user.value.email) {
      data.email = state.value.email
    }

    console.log(data)

    const { error } = await supabase.auth.updateUser(data)
    if (error) throw error

    toastSuccess({
      title: 'profile updated',
      description: 'your profile has been updated!'
    })
  } catch(error) {
    toastError({
      title: 'error updating profile',
      description: error.message
    })
  } finally {
    pending.value = false
  }
}
</script>