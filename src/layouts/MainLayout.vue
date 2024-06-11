<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      behavior="desktop"
      bordered
    >
      <q-tree
        :nodes="categoryOptions"
        v-model:selected="selectedCategory"
        node-key="id"
        node-lable="name"
      />
      <hr />
      <q-tree
        :nodes="brandOptions"
        v-model:selected="selectedBrand"
        node-key="id"
        node-lable="name"
      />
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
const categoryOptions = ref();
const brandOptions = ref();
const selectedCategory = ref();
const selectedBrand = ref();

provide('category', selectedCategory);
provide('brand', selectedBrand);
//get categories
const getCategories = async () => {
  await axios
    .get('http://localhost:3000/api/category')
    .then((response) => {
      console.log(response.data);
      categoryOptions.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
getCategories();
const getBrands = async () => {
  await axios
    .get('http://localhost:3000/api/brand')
    .then((response) => {
      console.log(response.data);
      brandOptions.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
getBrands();
</script>
