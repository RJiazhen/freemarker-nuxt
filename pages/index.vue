<template>
  <UContainer style="padding: 20px">
    <UHeader>ftl在线编辑器</UHeader>
    <UPageBody>
      <UTextarea v-model="template"></UTextarea>
      <UTextarea v-model="dataModal"></UTextarea>
      <UTextarea v-model="html"></UTextarea>
      <UButton @click="compile">编译</UButton>
    </UPageBody>
  </UContainer>
</template>

<script setup lang="ts">
const template = ref('');
const dataModal = ref('');
const html = ref('');

const compile = async () => {
  const { data } = await useFetch('/api/ftl/render', {
    method: 'POST',
    body: {
      template: template.value,
      dataModal: dataModal.value,
    },
  });
  console.log(data);

  html.value = data.value.html;
};
</script>
