<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar> </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="desktop" bordered>
      <q-tree
        :nodes="categoryOptions"
        node-key="id"
        label-key="name"
        v-model:selected="selectedCategory"
      />
      {{ selectedCategory }}
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import axios from 'axios';
const leftDrawerOpen = ref(true);
const categoryOptions = ref([]); // Initialize as an empty array
// const brandOptions = ref([]);
const selectedCategory = ref(null);
// const selectedBrand = ref();

provide('category', selectedCategory);
// provide('brand', selectedBrand);

// Get categories
const getCategories = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/category');
    console.log(response.data);
    categoryOptions.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
getCategories();

// const getBrands = async () => {
//   try {
//     const response = await axios.get('http://localhost:3000/api/brand');
//     console.log(response.data);
//     brandOptions.value = response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
// getBrands();
</script>
