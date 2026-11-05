
<script setup>
</script>

<template>
  <div id="registerSection" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <h2 class="font-headline-lg text-headline-lg text-on-surface">
        Buat Akun Penumpang Baru
      </h2>
      <p class="font-body-md text-body-md text-on-surface-variant">
        Sinkronkan data identitas nasional untuk boarding pass instan tanpa kertas.
      </p>
    </div>

    <form @submit.prevent="" class="flex flex-col gap-3.5">
      <!-- Full Name sesuai KTP -->
      <div class="flex flex-col gap-1">
        <label
          class="font-label-md text-label-md text-on-surface"
          for="regFullName"
        >
          Nama Lengkap
          <span class="text-error"></span>
          <span class="font-body-sm text-body-sm text-on-surface-variant">
            (Wajib sesuai KTP/Paspor untuk Manifest)
          </span>
        </label>

        <div class="relative flex items-center">
          <span
            class="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]"
          >
            person
          </span>

          <input
            id="regFullName"
            class="w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
            placeholder="Contoh: Rahmat Hidayat"
            required
            type="text"
          />
        </div>
      </div>

      <!-- Contact Grid: WhatsApp & Email -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div class="flex flex-col gap-1">
          <label
            class="font-label-md text-label-md text-on-surface"
            for="regPhone"
          >
            Nomor WhatsApp
            <span class="text-error"></span>
          </label>

          <div class="relative flex items-center">
            <span
              class="absolute left-3.5 font-label-md text-label-md text-primary font-bold"
            >
              +62
            </span>

            <input
              id="regPhone"
              class="w-full pl-14 pr-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
              placeholder="812-3456-7890"
              required
              type="tel"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <label
            class="font-label-md text-label-md text-on-surface"
            for="regEmail"
          >
            Alamat Email
            <span class="text-error"></span>
          </label>

          <div class="relative flex items-center">
            <span
              class="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]"
            >
              mail
            </span>

            <input
              id="regEmail"
              class="w-full pl-11 pr-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
              placeholder="nama@domain.id"
              required
              type="email"
            />
          </div>
        </div>
      </div>

      <!-- Password & Confirm -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div class="flex flex-col gap-1">
          <label
            class="font-label-md text-label-md text-on-surface"
            for="regPassword"
          >
            Buat Kata Sandi
          </label>

          <div class="relative flex items-center">
            <span
              class="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]"
            >
              lock
            </span>

            <input
              id="regPassword"
              class="w-full pl-11 pr-10 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
              placeholder="Min. 8 Karakter"
              required
              type="password"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <label
            class="font-label-md text-label-md text-on-surface"
            for="regPasswordConfirm"
          >
            Konfirmasi Sandi
          </label>

          <div class="relative flex items-center">
            <span
              class="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]"
            >
              check_circle
            </span>

            <input
              id="regPasswordConfirm"
              class="w-full pl-11 pr-10 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
              placeholder="Ulangi Kata Sandi"
              required
              type="password"
            />
          </div>
        </div>
      </div>

      <!-- Terms & Privacy Agreement -->
      <div class="pt-1">
        <label class="flex items-start gap-2.5 cursor-pointer">
          <input
            class="mt-1 w-4 h-4 rounded text-primary focus:ring-secondary border-outline accent-primary"
            required
            type="checkbox"
          />

          <span
            class="font-body-sm text-body-sm text-on-surface-variant leading-normal"
          >
            Saya menyetujui
            <a class="text-secondary hover:underline" href="#">
              Syarat &amp; Ketentuan Tiket Pelayaran
            </a>,
            regulasi asuransi Jasa Raharja, serta
            <a class="text-secondary hover:underline" href="#">
              Kebijakan Privasi Data Manifest
            </a>
            Ditjen Hubla.
          </span>
        </label>
      </div>

      <!-- Register Submit Button -->
      <button
        class="mt-2 w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md transition-all active:scale-[0.99]"
        type="submit"
      >
        <span class="">Buat Akun Sekarang</span>
        <span class="material-symbols-outlined text-[18px]">
          how_to_reg
        </span>
      </button>
    </form>
  </div>
</template>

<style scoped>
</style>
