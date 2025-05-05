<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue';
import { z } from 'zod';

const registrationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'Username must be at least 1 characters long' })
    .regex(/^[a-zA-Z]*$/, { message: 'Username must contain only letters' }),
  lastName: z
    .string()
    .min(1, { message: 'Username must be at least 1 characters long' })
    .regex(/^[a-zA-Z]*$/, { message: 'Username must contain only letters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  dateOfBirth: z.date().refine(
    (date) => {
      return date <= thirteenYearsAgo;
    },
    {
      message: 'Must be at least 13 years old',
    }
  ),
});

const today = new Date();
const thirteenYearsAgo = new Date(
  today.getFullYear() - 13,
  today.getMonth(),
  today.getDate()
);

type FormData = z.infer<typeof registrationSchema>;

export default defineComponent({
  setup() {
    const formData = reactive<FormData>({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dateOfBirth: thirteenYearsAgo,
    });

    const form = ref(false);
    const menu = ref(false);

    const getFieldRules = (fieldName: keyof FormData) => {
      return computed(() => [
        (v: string) => {
          const result = registrationSchema.shape[fieldName].safeParse(v);
          return result.success ? true : result.error.issues[0].message;
        },
      ]);
    };

    const formattedDate = computed(() => {
      return new Intl.DateTimeFormat().format(formData.dateOfBirth);
    });

    const register = async () => {
      const result = registrationSchema.safeParse(formData);

      if (result.success) {
        console.log('Registration data:', formData);
      }
    };

    return {
      menu,
      form,
      register,
      formData,
      formattedDate,
      getFieldRules,
    };
  },
});
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-card width="380">
        <v-card-title class="headline">Sign Up Form</v-card-title>
        <v-card-text>
          <v-form v-model="form" @submit.prevent="register">
            <v-text-field
              v-model="formData.firstName"
              :rules="getFieldRules('firstName').value"
              label="Username"
              variant="underlined"
              required
            ></v-text-field>

            <v-text-field
              v-model="formData.lastName"
              :rules="getFieldRules('lastName').value"
              label="Username"
              variant="underlined"
              required
            ></v-text-field>

            <v-text-field
              v-model="formData.email"
              :rules="getFieldRules('email').value"
              label="Email"
              type="email"
              variant="underlined"
              required
            ></v-text-field>

            <v-text-field
              v-model="formData.password"
              :rules="getFieldRules('password').value"
              label="Password"
              type="password"
              variant="underlined"
              required
            ></v-text-field>

            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ props }">
                <v-text-field
                  v-model="formData.dateOfBirth"
                  :value="formattedDate"
                  label="Date of Birth"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="props"
                  :rules="getFieldRules('dateOfBirth').value"
                  required
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="formData.dateOfBirth"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>

            <v-btn color="primary" type="submit" :disabled="!form">
              Sign up
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<style scoped></style>
