<template>
  <UCard v-if="!success">
    <template #header>
      sign-in to finance tracker
    </template>

    <form>
      <UFormGroup label="email" name="email" class="mb-4" :required="true" 
        help="you will receive an email with the confirmation link">
        <UInput type="email" placeholder="email" required />
      </UFormGroup>

      <UButton type="submit" variant="solid" color="black" @click="success = true">sign-in</UButton>
    </form>
  </UCard>
  <UCard v-else>
    <template #header>
      email has been sent
    </template>

    <div class="text-center">
      <p class="mb-4">we have sent and email to <strong>something@gmail.com</strong> with a link to sign-in</p>
      <p>
        <strong>important: </strong>the link will expire in 5 minutes
      </p>
    </div>
  </UCard>
</template>

<script setup>
const success = ref(false)
</script>