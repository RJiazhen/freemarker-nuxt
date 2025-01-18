<template>
  <UContainer
    class="p-20 min-h-screen grid grid-rows-[auto,1fr,auto] gap-10 place-items-center"
  >
    <h1>ftl在线编辑器</h1>
    <div class="flex gap-10 w-full h-full">
      <div class="flex flex-col gap-5 w-1/2 h-full">
        <UCard class="flex-grow">
          <template #header> 模板 </template>
          <UTextarea
            v-model="template"
            size="xl"
            autoresize
            resize
          ></UTextarea>
        </UCard>
        <UCard class="flex-grow">
          <template #header> 数据 </template>
          <UTextarea
            v-model="dataModal"
            autoresize
            resize
          ></UTextarea>
        </UCard>
      </div>
      <UCard class="w-1/2">
        <template #header> 编译结果 </template>
        <UTextarea
          v-model="html"
          autoresize
          resize
          readonly
        ></UTextarea>
      </UCard>
    </div>
    <UButton @click="compile">编译</UButton>
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
