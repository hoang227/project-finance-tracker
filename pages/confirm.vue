<template>
  <UCard>
    <template #header>
      signing in ...
    </template>

    wait a moment while we sign you in!
  </UCard>
</template>

<script setup>
const user = useSupabaseUser()

watch(user, (user) => {
  if (user) {
    return navigateTo('/')
  }
}, { immediate: true })
</script>