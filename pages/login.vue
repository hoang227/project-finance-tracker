<template>
  <UCard v-if="!success">
    <template #header>
      sign-in to finance tracker
    </template>

    <form @submit.prevent="handleLogin">
      <UFormGroup label="email" name="email" class="mb-4" :required="true" 
        help="you will receive an email with the confirmation link">
        <UInput type="email" placeholder="email" required v-model="email"/>
      </UFormGroup>

      <UButton type="submit" variant="solid" color="black" :loading="pending" :disabled="pending">sign-in</UButton>
    </form>
  </UCard>
  <UCard v-else>
    <template #header>
      email has been sent
    </template>

    <div class="text-center">
      <p class="mb-4">we have sent and email to <strong>{{ email }}</strong> with a link to sign-in</p>
      <p>
        <strong>important: </strong>the link will expire in 5 minutes
      </p>
    </div>
  </UCard>
</template>

<script setup>
const success = ref(false)
const email = ref('')
const pending = ref(false)
const toast = useToast()
const supabase = useSupabaseClient()

const handleLogin = async () => {
  pending.value = true
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: 'http://localhost:3000'
      }
    })

    if (error) {
      toast.add({
        title: 'error authenticating',
        icon: 'i-heroicons-exclamation-circle',
        description: error.message,
        color: 'red'
      })
    } else {
      success.value = true
    }
  } finally {
    pending.value = false
  }
}
</script>