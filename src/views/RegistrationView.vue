<script lang="ts">
import { defineComponent, ref, reactive, computed } from "vue";
import { z } from "zod";

const registrationSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username must be at least 1 characters long" })
    .regex(/^[a-zA-Z]*$/, { message: "Username must contain only letters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});

type FormData = z.infer<typeof registrationSchema>;

export default defineComponent({
  setup() {
    const formData = reactive<FormData>({
      username: "",
      email: "",
      password: "",
    });

    const form = ref(false);

    const getFieldRules = (fieldName: keyof FormData) => {
      return computed(() => [
        (v: string) => {
          const result = registrationSchema.shape[fieldName].safeParse(v);
          return result.success ? true : result.error.issues[0].message;
        },
      ]);
    };

    const register = async () => {
      const result = registrationSchema.safeParse(formData);

      if (result.success) {
        console.log("Registration data:", formData);
      }
    };

    return {
      form,
      register,
      formData,
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
              v-model="formData.username"
              :rules="getFieldRules('username').value"
              label="Username"
              required
            ></v-text-field>

            <v-text-field
              v-model="formData.email"
              :rules="getFieldRules('email').value"
              label="Email"
              type="email"
              required
            ></v-text-field>

            <v-text-field
              v-model="formData.password"
              :rules="getFieldRules('password').value"
              label="Password"
              type="password"
              required
            ></v-text-field>

            <v-btn color="primary" type="submit" :disabled="!form">
              Register
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<style scoped></style>
