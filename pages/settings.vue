<template>
  <div class="grid grid-cols-6 gap-8 ">
    <UVerticalNavigation :links="links" class="col-span-2"/>
    <div class="col-span-4">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
const links = [
  {
    label: 'profile',
    to: '/settings/profile'
  },
  {
    label: 'avatar',
    to: '/settings/avatar'
  },
  {
    label: 'settings',
    to: '/settings/settings'
  }
]
</script>