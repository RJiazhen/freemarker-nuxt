<template>
  <UContainer
    class="p-20 min-h-screen grid grid-rows-[auto,1fr,auto] gap-10 place-items-center"
  >
    <h1 class="text-4xl font-bold text-center">ftl模板在线编译</h1>
    <div class="flex gap-10 w-full h-full">
      <div class="flex flex-col gap-5 w-1/2 h-full">
        <UCard class="flex-grow">
          <template #header> 模板 </template>
          <UTextarea
            v-model="template"
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
    <UButton
      size="xl"
      icon="i-heroicons-play"
      :loading="compileBtnLoading"
      :disabled="compileBtnLoading"
      @click="compile"
    >
      编译
    </UButton>
  </UContainer>
</template>

<script setup lang="ts">
const template = ref('Hello, ${name}!');
const dataModal = ref(JSON.stringify({ name: 'world' }, null, 2));
const html = ref('');

const toast = useToast();
const compileBtnLoading = ref(false);

const compile = async () => {
  try {
    JSON.parse(dataModal.value);
  } catch (e) {
    toast.add({
      icon: 'i-heroicons-x-circle',
      title: '数据格式错误',
      description: '请检查数据格式是否正确',
      color: 'red',
    });
    return;
  }

  compileBtnLoading.value = true;
  const { data } = await useFetch('/api/ftl/render', {
    method: 'POST',
    body: {
      template: template.value,
      dataModal: JSON.parse(dataModal.value),
    },
  });
  compileBtnLoading.value = false;

  html.value = data.value.html;
};
</script>
