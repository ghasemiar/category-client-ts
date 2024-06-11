<template>
  <q-btn label="Close Icon" color="primary" @click="icon = true" />
  <q-dialog v-model="icon">
    <q-form @submit="onSubmit">
      <q-input
        v-model="name"
        label="name"
        error-message="Please enter a valid name"
        :error="errors.name"
      />
      <q-input
        v-model="description"
        label="description"
        error-message="Please enter a valid description"
        :error="errors.description"
      />
      <q-input
        v-model="year"
        label="year"
        type="number"
        error-message="Please enter a valid year"
        :error="errors.year"
      />
      <q-input
        v-model="price"
        label="price"
        type="number"
        error-message="Please enter a valid price"
        :error="errors.price"
      />
      <q-select
        filled
        v-model="category"
        :options="categoryOptions"
        option-value="id"
        option-label="name"
        label="Categories"
        class="tw-w-[70%]"
      />
      <q-select
        filled
        v-model="brand"
        :options="brandOptions"
        option-value="id"
        option-label="name"
        label="Brands"
        class="tw-w-[70%]"
      />
      <q-input
        v-model="image"
        label="image"
        type="file"
        error-message="Please enter a valid image"
        :error="errors.image"
      />
      <q-btn type="submit" label="Update Product" />
    </q-form>
  </q-dialog>
</template>
<script setup>
import {  ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from 'stores/auth.store';
import { useForm,useField } from 'vee-validate';
import axios from 'axios';

const props = defineProps({
  productId: String,
})

const icon = ref()
const route = useRoute();
const authStore = useAuthStore();
const categoryOptions = ref();
const brandOptions = ref();
const { handleSubmit, errors, setValues } = useForm();
const { value: name } = useField('name');
const { value: description } = useField('description');
const { value: price } = useField('price');
const { value: year } = useField('year');
const { value: category } = useField('category');
const { value: brand } = useField('brand');
const { value: image } = useField('image');

const getCategories = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/category");
    categoryOptions.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const getBrands = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/brand");
    brandOptions.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchProduct = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/product/${props.productId}`);
    const product = response.data;
    setValues({
      name: product.name,
      description: product.description,
      year: product.year,
      price: product.price,
      category: product.category.id,
      brand: product.brand.id,
      image: '', // Leave image empty as you can't pre-fill a file input
    });
  } catch (error) {
    console.error('Failed to fetch product:', error);
  }
};


getCategories();
getBrands();
fetchProduct();


const onSubmit = handleSubmit(async (values) => {
  try {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('year', values.year);
    formData.append('price', values.price);
    formData.append('category', values.category.id);
    formData.append('brand', values.brand.id);
    if (values.image) {
      formData.append('image', values.image[0]);
    }

    const response = await axios.put(`http://localhost:3000/api/product/${route.params.id}`, formData, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    alert('Product updated successfully');
    console.log(response);
  } catch (error) {
    console.error('Failed to update product:', error);
  }
});
</script>
