
<script setup>
import { ref } from 'vue'

const showPassword = ref(false)
</script>

<template>
  <div id="loginSection" class="flex flex-col gap-5">
    <div class="flex flex-col gap-1">
      <h2 class="font-headline-lg text-headline-lg text-on-surface">
        Selamat Datang Kembali
      </h2>
      <p class="font-body-md text-body-md text-on-surface-variant">
        Akses boarding pass, rute tersimpan, dan poin loyalitas Bahari Anda.
      </p>
    </div>

    <!-- SSO Buttons -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
      <button
        class="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors"
        type="button"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          ></path>
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          ></path>
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            fill="#FBBC05"
          ></path>
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            fill="#EA4335"
          ></path>
        </svg>
        Masuk via Google
      </button>

      <button
        class="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors"
        type="button"
      >
        <span class="material-symbols-outlined text-[20px] text-on-tertiary-container">
          chat
        </span>
        WhatsApp OTP
      </button>
    </div>

    <!-- Or Divider -->
    <div class="relative flex items-center justify-center my-1">
      <div class="w-full h-px bg-surface-container-high"></div>
      <span
        class="absolute bg-surface-container-lowest px-3 font-label-sm text-label-sm text-outline uppercase tracking-wider"
      >
        atau gunakan kredensial
      </span>
    </div>

    <form @submit.prevent="" class="flex flex-col gap-4">
      <!-- Identifier Input -->
      <div class="flex flex-col gap-1.5">
        <label
          class="font-label-md text-label-md text-on-surface"
          for="loginIdentifier"
        >
          Email atau Nomor Ponsel / WhatsApp
        </label>

        <div class="relative flex items-center">
          <span
            class="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]"
          >
            alternate_email
          </span>

          <input
            id="loginIdentifier"
            class="w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
            placeholder="nama@email.com atau 0812xxxxxxx"
            required
            type="text"
          />
        </div>
      </div>

      <!-- Password Input -->
      <div class="flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <label
            class="font-label-md text-label-md text-on-surface"
            for="loginPassword"
          >
            Kata Sandi
          </label>

          <a
            class="font-label-sm text-label-sm text-secondary hover:underline"
            href="#"
          >
            Lupa Kata Sandi?
          </a>
        </div>

        <div class="relative flex items-center">
          <span
            class="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]"
          >
            lock
          </span>

          <input
            id="loginPassword"
            class="w-full pl-11 pr-11 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
            placeholder="Masukkan 8+ karakter aman"
            required
            :type="showPassword ? 'text' : 'password'"
          />

          <button
            @click="showPassword = !showPassword"
            class="absolute right-3.5 text-on-surface-variant hover:text-on-surface p-0.5"
            type="button"
          >
            <span class="material-symbols-outlined text-[20px]">
              {{ showPassword ? 'visibility_off' : 'visibility' }}
            </span>
          </button>
        </div>
      </div>

      <!-- Remember Me & Portal Info -->
      <div class="flex items-center justify-between pt-1">
        <label class="flex items-center gap-2 cursor-pointer select-none">
          <input
            class="w-4 h-4 rounded text-primary focus:ring-secondary border-outline accent-primary"
            type="checkbox"
          />

          <span class="font-body-sm text-body-sm text-on-surface-variant">
            Ingat saya di perangkat ini
          </span>
        </label>

        <span
          class="font-label-sm text-label-sm text-on-tertiary-container flex items-center gap-1"
        >
          <span class="material-symbols-outlined text-[14px]">
            bolt
          </span>
          Manifest Kilat Siap
        </span>
      </div>

      <!-- Submit Button -->
      <button
        class="mt-2 w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md transition-all active:scale-[0.99]"
        type="submit"
      >
        <span class="">Masuk ke Akun KapalKu</span>
        <span class="material-symbols-outlined text-[18px]">
          arrow_forward
        </span>
      </button>
    </form>
  </div>
</template>

<style scoped>
</style>
