<template>
  <q-page class="tw-container tw-mx-auto">
    <q-form @submit="onSubmit">
      <q-input
        v-model="username"
        label="Username"
        error-message="Please enter a valid username"
        :error="errors.username"
      />
      <q-input
        v-model="password"
        label="Password"
        type="password"
        error-message="Please enter a valid password"
        :error="errors.password"
      />
      <q-btn type="submit" label="Login" />
    </q-form>
    <RouterLink to="register">do not have any account</RouterLink>
  </q-page>
</template>

<script>
import { useAuthStore } from 'stores/auth.store';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const schema = yup.object({
      username: yup.string().required('Username is required'),
      password: yup.string().required('Password is required'),
    });

    const { handleSubmit, errors } = useForm({
      validationSchema: schema,
    });

    const { value: username } = useField('username');
    const { value: password } = useField('password');

    const onSubmit = handleSubmit(async (values) => {
      await authStore.login(values);
      console.log(authStore.isAuthenticated());
      if (authStore.isAuthenticated()) {
        await router.push('/add-post');
      }
    });

    return {
      username,
      password,
      onSubmit,
      errors,
    };
  },
};
</script>
