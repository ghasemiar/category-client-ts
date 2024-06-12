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
      <hr />
      <q-list dense bordered padding class="rounded-borders">
        <q-item v-for="item in brandOptions" :key="item.id"   clickable v-ripple>
          <q-item-section @click="()=>{selectedBrand = item.id}">
            {{item.name}}
          </q-item-section>
        </q-item>
      </q-list>
      {{selectedBrand}}
      <hr />
      <div class="tw-mx-5 tw-my-10">  <q-range
        v-model="price"
        :min="0"
        :max="50"
        label-always
        color="green"
      /></div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import axios from 'axios';
interface BrandI{
  id:number,
  name:string,
}
const leftDrawerOpen = ref(true);
const categoryOptions = ref([]); // Initialize as an empty array
const brandOptions = ref<BrandI[]>();
const selectedCategory = ref(null);
const selectedBrand = ref();
const price = ref({
  min:0,
  max:100
})
provide('category', selectedCategory);
provide('price', price);
provide('brand', selectedBrand);



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
//get all brands
const getBrands = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/brand');
    console.log(response.data);
    brandOptions.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
getBrands();
</script>
