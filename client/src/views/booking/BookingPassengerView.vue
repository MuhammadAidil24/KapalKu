
<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let legacyScripts = []

onMounted(() => {
  const scripts = `
    (function() {
      const insuranceCheckbox = document.getElementById('addon-insurance');
      const loungeCheckbox = document.getElementById('addon-lounge');
      const rowInsurance = document.getElementById('row-insurance');
      const rowLounge = document.getElementById('row-lounge');
      const grandTotalElement = document.getElementById('grand-total');

      const BASE_PRICE = 465000;
      const FEE_PRICE = 3500;
      const INSURANCE_PRICE = 15000;
      const LOUNGE_PRICE = 50000;

      function updateTotal() {
        let total = BASE_PRICE + FEE_PRICE;

        if (insuranceCheckbox && insuranceCheckbox.checked) {
          total += INSURANCE_PRICE;
          rowInsurance.classList.remove('hidden');
        } else if (rowInsurance) {
          rowInsurance.classList.add('hidden');
        }

        if (loungeCheckbox && loungeCheckbox.checked) {
          total += LOUNGE_PRICE;
          rowLounge.classList.remove('hidden');
        } else if (rowLounge) {
          rowLounge.classList.add('hidden');
        }

        if (grandTotalElement) {
          grandTotalElement.textContent = 'Rp ' + total.toLocaleString('id-ID');
        }
      }

      if (insuranceCheckbox) {
        insuranceCheckbox.addEventListener('change', updateTotal);
      }

      if (loungeCheckbox) {
        loungeCheckbox.addEventListener('change', updateTotal);
      }
    })();
  `

  if (scripts.trim()) {
    const script = document.createElement('script')
    script.textContent = scripts
    document.body.appendChild(script)
    legacyScripts.push(script)
  }
})

onBeforeUnmount(() => {
  legacyScripts.forEach(script => script.remove())
  legacyScripts = []
})
</script>


<template>
  <div class="legacy-page">
    <header class="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_1px_8px_rgba(15,41,66,0.06)]">
      <div class="h-20 max-w-7xl mx-auto px-6 lg:px-margin flex items-center justify-between gap-space-md">
        <div class="flex items-center gap-space-lg">
          <a
            class="flex items-center gap-space-sm"
            data-path="cari-tiket-dan-rute"
            href="/beranda-pencarian-tiket-kapal"
          >
            <img
              alt="KapalKu Brand Logo"
              class="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VSjzN1dHUK24uRJRMMzI7h_muwtcDHLMng0F_s1Yd1kUxdn2VaFFFTnKK4cFdPhMR0ZDnj_ajeKf5CqGtVrCH0WmWRo1r8JsBdC-BMOT8XOSWDuwxPVs0qe3f_sFf53AhAGKBcMEgs8sSfh2pVIaz0GdS3-QWV-GWbRjeB_FF84Ta6ca_E9rgLg_qUcBsUdonRakYlRezx31biwfxKSSilkS0JWzzYBDT3ZFR9_5n8Uqk07thTWtTtEVI"
            />

            <div class="flex flex-col">
              <span class="font-headline-sm text-headline-sm text-primary tracking-tight">
                KapalKu
              </span>
              <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                Maritime Express
              </span>
            </div>
          </a>

          <nav
            class="hidden xl:flex items-center gap-space-xs"
            data-active-classes="bg-surface-container-high text-primary font-label-lg rounded-lg"
          >
            <a
              class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg"
              data-path="cari-tiket-dan-rute"
              href="/beranda-pencarian-tiket-kapal"
            >
              Cari Tiket &amp; Rute
            </a>

            <a
              class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg"
              data-path="jadwal-keberangkatan"
              href="/hasil-pencarian-jadwal-kapal"
            >
              Jadwal Keberangkatan
            </a>

            <a
              class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg"
              data-path="cek-manifest-dan-kargo"
              href="/formulir-reservasi-manifest"
            >
              Cek Manifest &amp; Kargo
            </a>

            <a
              class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg"
              data-path="promo-dan-mitra-armada"
              href="/beranda-pencarian-tiket-kapal#promo"
            >
              Promo &amp; Mitra Armada
            </a>

            <a
              class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg"
              data-path="riwayat-pesanan"
              href="/riwayat-pesanan-alur-pembatalan-refund"
            >
              Riwayat Pesanan
            </a>
          </nav>
        </div>

        <div class="flex items-center gap-space-sm">
          <a
            class="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container-high text-primary transition-colors"
            data-path="bantuan-pelayaran"
            href="/beranda-pencarian-tiket-kapal#bantuan"
          >
            <span class="w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse"></span>
            <span class="font-label-md text-label-md">Bantuan 24 Jam</span>
          </a>

          <div class="hidden sm:flex items-center px-2.5 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md gap-1">
            <span class="font-label-md text-label-md text-primary">IDR</span>
            <span class="text-outline-variant">|</span>
            <span class="font-label-md text-label-md text-secondary">ID</span>
          </div>

          <button
            aria-label="Notifikasi"
            class="relative p-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
            type="button"
          >
            <span class="material-symbols-outlined text-[22px]">notifications</span>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error"></span>
          </button>

          <div class="flex items-center gap-space-sm pl-2">
            <img
              alt="Profile"
              class="w-8 h-8 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6IYXLCn0qyYL59jkummyuJANa9WOrKy7mZIxKFlCHjewwHOMz2Tu2eZlTYwI_PLuBoceX-VyQwL_o917V2mIX_zAprPURlBDU_ZfY4uu_HdSzUue0k6C1ZsEjnZ5RhqhktjJJUw9O45VZb0DUaWGJ8Mz3SN9GAypE7okS0PveTqL5mZJGVPmH55I66zM0Rt3KlXJSAqoRHIkmBz21RvU7l-ek00iCTIyBYwMPMRNfS4HR_g5N2BGG"
            />

            <div class="hidden lg:flex flex-col text-left">
              <div class="flex items-center gap-1">
                <span class="font-label-md text-label-md text-on-surface">
                  Budi Santoso
                </span>
              </div>
              <span class="inline-block px-1.5 py-0.5 rounded bg-surface-container text-on-secondary-container font-label-sm text-label-sm">
                Member Gold
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="w-full pt-20 bg-background">
      <div class="flex flex-col w-full pb-20">
        <!-- Top Progress Stepper -->
        <section class="w-full bg-surface-container-low py-6 shadow-sm">
          <div class="max-w-7xl mx-auto px-6 lg:px-margin">
            <div class="flex items-center justify-between gap-4 overflow-x-auto pb-2 sm:pb-0">

              <!-- Step 1 Completed -->
              <div class="flex items-center gap-3 min-w-max">
                <div class="w-9 h-9 rounded-full bg-tertiary-fixed text-tertiary-container flex items-center justify-center shadow-sm">
                  <span
                    class="material-symbols-outlined text-[20px]"
                    style="font-variation-settings: 'FILL' 1;"
                  >
                    check_circle
                  </span>
                </div>

                <div class="flex flex-col">
                  <span class="font-label-sm text-label-sm text-on-tertiary-container uppercase tracking-wider">
                    Langkah 1
                  </span>
                  <span class="font-label-lg text-label-lg text-on-surface">
                    Pilih Jadwal
                  </span>
                </div>
              </div>

              <div class="h-[2px] flex-1 bg-surface-container-high hidden sm:block"></div>

              <!-- Step 2 Active -->
              <div class="flex items-center gap-3 min-w-max">
                <div class="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md">
                  <span class="font-label-lg text-label-lg">2</span>
                </div>

                <div class="flex flex-col">
                  <span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                    Sedang Diisi
                  </span>
                  <span class="font-label-lg text-label-lg text-primary font-bold">
                    Data Penumpang &amp; Muatan
                  </span>
                </div>
              </div>

              <div class="h-[2px] flex-1 bg-surface-container-high hidden sm:block"></div>

              <!-- Step 3 Pending -->
              <div class="flex items-center gap-3 min-w-max opacity-60">
                <div class="w-9 h-9 rounded-full bg-surface-container text-outline flex items-center justify-center">
                  <span class="font-label-lg text-label-lg">3</span>
                </div>

                <div class="flex flex-col">
                  <span class="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    Langkah 3
                  </span>
                  <span class="font-label-lg text-label-lg text-on-surface-variant">
                    Pembayaran
                  </span>
                </div>
              </div>

              <div class="h-[2px] flex-1 bg-surface-container-high hidden sm:block"></div>

              <!-- Step 4 Pending -->
              <div class="flex items-center gap-3 min-w-max opacity-60">
                <div class="w-9 h-9 rounded-full bg-surface-container text-outline flex items-center justify-center">
                  <span class="font-label-lg text-label-lg">4</span>
                </div>

                <div class="flex flex-col">
                  <span class="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    Langkah 4
                  </span>
                  <span class="font-label-lg text-label-lg text-on-surface-variant">
                    E-Ticket Terbit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Content Container with 12-Column Grid -->
        <div class="max-w-7xl mx-auto px-6 lg:px-margin mt-8 w-full">

          <!-- Voyage Quick Info Banner -->
          <div class="w-full bg-primary-container text-on-primary rounded-xl p-5 shadow-md mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
            <div class="absolute -right-8 -bottom-10 opacity-10 pointer-events-none">
              <span class="material-symbols-outlined text-[180px]">
                directions_boat
              </span>
            </div>

            <div class="flex items-center gap-4 z-10">
              <div class="w-12 h-12 rounded-lg bg-surface-container-lowest/10 backdrop-blur-sm flex items-center justify-center text-secondary-fixed">
                <span class="material-symbols-outlined text-[28px]">
                  directions_boat
                </span>
              </div>

              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded bg-secondary text-on-primary font-label-sm text-label-sm tracking-wide uppercase">
                    Layanan Eksekutif
                  </span>
                  <span class="font-label-sm text-label-sm text-on-primary-container">
                    Dermaga Terpadu 1
                  </span>
                </div>

                <div class="flex items-center gap-2 mt-1">
                  <span class="font-headline-md text-headline-md font-bold">
                    Pelabuhan Merak
                  </span>
                  <span class="material-symbols-outlined text-secondary-fixed text-[20px]">
                    arrow_forward
                  </span>
                  <span class="font-headline-md text-headline-md font-bold">
                    Bakauheni
                  </span>
                </div>

                <span class="font-body-sm text-body-sm text-on-primary-container mt-0.5">
                  Armada KMP Portlink III • Estimasi Penyeberangan 1 Jam 45 Menit
                </span>
              </div>
            </div>

            <div class="flex flex-wrap md:flex-col items-start md:items-end gap-1.5 z-10 bg-surface-container-lowest/10 md:bg-transparent p-3 md:p-0 rounded-lg w-full md:w-auto justify-between">
              <span class="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider">
                Jadwal Keberangkatan
              </span>

              <div class="flex items-center gap-2 text-on-primary">
                <span class="material-symbols-outlined text-secondary-fixed text-[18px]">
                  calendar_today
                </span>
                <span class="font-label-lg text-label-lg font-semibold">
                  Kamis, 24 Okt 2024
                </span>
                <span class="px-2 py-0.5 rounded bg-surface-container-lowest text-primary font-label-md text-label-md font-bold">
                  08:30 WIB
                </span>
              </div>

              <span class="font-body-sm text-body-sm text-tertiary-fixed flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-tertiary-fixed animate-pulse"></span>
                Gate Check-in Buka 06:30 WIB
              </span>
            </div>
          </div>

          <!-- Layout: Left (Form 8 cols) | Right (Summary 4 cols) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            <!-- Left Column: Forms -->
            <div class="lg:col-span-8 flex flex-col gap-6">

              
              <!-- Section 1: Data Pemesan -->
              <div class="bg-surface-container-lowest rounded-xl p-6 sm:p-7 shadow-sm">
                <div class="flex items-center justify-between pb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-surface-container-high text-primary flex items-center justify-center">
                      <span class="material-symbols-outlined text-[20px]">
                        badge
                      </span>
                    </div>

                    <h2 class="font-headline-sm text-headline-sm text-primary">
                      Data Pemesan (Kontak E-Tiket)
                    </h2>
                  </div>

                  <span class="font-label-sm text-label-sm px-2.5 py-1 rounded bg-surface-container text-on-secondary-container">
                    Notifikasi Instan
                  </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div class="md:col-span-2 flex flex-col gap-1.5">
                    <label class="font-label-md text-label-md text-on-surface-variant">
                      Nama Lengkap Pemesan
                      <span class="text-error">*</span>
                    </label>

                    <div class="flex items-center bg-surface-container-low rounded-lg px-3.5 py-2.5 focus-within:bg-surface-container-lowest focus-within:shadow-[0_0_0_2px_rgba(0,99,152,0.4)]">
                      <span class="material-symbols-outlined text-outline text-[20px] mr-2">
                        person
                      </span>
                      <input
                        class="w-full bg-transparent font-body-md text-body-md text-on-surface outline-none placeholder:text-outline"
                        placeholder="Masukkan nama sesuai kartu identitas"
                        type="text"
                        value="Budi Santoso"
                      />
                    </div>
                  </div>

                  <div class="flex flex-col gap-1.5">
                    <label class="font-label-md text-label-md text-on-surface-variant">
                      Nomor WhatsApp Aktif
                      <span class="text-error">*</span>
                    </label>

                    <div class="flex items-center bg-surface-container-low rounded-lg px-3.5 py-2.5 focus-within:bg-surface-container-lowest focus-within:shadow-[0_0_0_2px_rgba(0,99,152,0.4)]">
                      <span class="material-symbols-outlined text-outline text-[20px] mr-2">
                        chat
                      </span>
                      <input
                        class="w-full bg-transparent font-body-md text-body-md text-on-surface outline-none placeholder:text-outline"
                        placeholder="08xxxxxxxxxx"
                        type="tel"
                        value="+62 812-3456-7890"
                      />
                    </div>

                    <span class="font-body-sm text-body-sm text-outline">
                      Barcode boarding pass akan dikirimkan ke nomor ini
                    </span>
                  </div>

                  <div class="flex flex-col gap-1.5">
                    <label class="font-label-md text-label-md text-on-surface-variant">
                      Alamat Email
                      <span class="text-error">*</span>
                    </label>

                    <div class="flex items-center bg-surface-container-low rounded-lg px-3.5 py-2.5 focus-within:bg-surface-container-lowest focus-within:shadow-[0_0_0_2px_rgba(0,99,152,0.4)]">
                      <span class="material-symbols-outlined text-outline text-[20px] mr-2">
                        mail
                      </span>
                      <input
                        class="w-full bg-transparent font-body-md text-body-md text-on-surface outline-none placeholder:text-outline"
                        placeholder="email@contoh.com"
                        type="email"
                        value="budi.santoso@email.com"
                      />
                    </div>

                    <span class="font-body-sm text-body-sm text-outline">
                      Invoice resmi &amp; bukti manifest pelayaran
                    </span>
                  </div>
                </div>

                <label class="flex items-center gap-3 mt-5 p-3 rounded-lg bg-surface-container-low cursor-pointer">
                  <input
                    checked=""
                    class="w-4 h-4 rounded text-secondary accent-secondary cursor-pointer"
                    type="checkbox"
                  />
                  <span class="font-body-md text-body-md text-on-surface">
                    Data pemesan adalah salah satu penumpang kapal (Pengemudi Utama)
                  </span>
                </label>
              </div>

              <!-- Section 2: Manifest Penumpang -->
              <div class="bg-surface-container-lowest rounded-xl p-6 sm:p-7 shadow-sm">
                <div class="flex items-center justify-between pb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-surface-container-high text-primary flex items-center justify-center">
                      <span class="material-symbols-outlined text-[20px]">
                        groups
                      </span>
                    </div>

                    <div class="flex flex-col">
                      <h2 class="font-headline-sm text-headline-sm text-primary">
                        Manifest Penumpang Resmi
                      </h2>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">
                        Wajib sesuai KTP/Paspor untuk klaim Asuransi PT Jasa Raharja
                      </span>
                    </div>
                  </div>

                  <span class="px-2.5 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm flex items-center gap-1">
                    <span class="material-symbols-outlined text-[16px]">
                      verified
                    </span>
                    Terdaftar Jasa Raharja
                  </span>
                </div>

                <!-- Penumpang 1 (Pengemudi) -->
                <div class="mt-4 p-5 rounded-xl bg-surface-container-low flex flex-col gap-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm">
                        1
                      </span>
                      <span class="font-label-lg text-label-lg text-primary">
                        Penumpang 1 (Dewasa - Pengemudi Utama)
                      </span>
                    </div>

                    <span class="px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                      Tersinkron Pemesan
                    </span>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    <div class="sm:col-span-2 lg:col-span-1 flex flex-col gap-1">
                      <label class="font-label-sm text-label-sm text-on-surface-variant">
                        Nama Lengkap (Sesuai KTP)
                      </label>
                      <input
                        class="w-full bg-surface-container-lowest rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface outline-none"
                        type="text"
                        value="Budi Santoso"
                      />
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="font-label-sm text-label-sm text-on-surface-variant">
                        Nomor Induk Kependudukan (NIK)
                      </label>
                      <input
                        class="w-full bg-surface-container-lowest rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface outline-none"
                        type="text"
                        value="3271041508890003"
                      />
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="font-label-sm text-label-sm text-on-surface-variant">
                        Jenis Kelamin
                      </label>
                      <select class="w-full bg-surface-container-lowest rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface outline-none cursor-pointer">
                        <option selected="">Laki-laki</option>
                        <option>Perempuan</option>
                      </select>
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="font-label-sm text-label-sm text-on-surface-variant">
                        Tanggal Lahir
                      </label>
                      <input
                        class="w-full bg-surface-container-lowest rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface outline-none"
                        type="date"
                        value="1989-08-15"
                      />
                    </div>

                    <div class="sm:col-span-2 flex flex-col gap-1">
                      <label class="font-label-sm text-label-sm text-on-surface-variant">
                        Asal Kota &amp; Provinsi Domisili
                      </label>
                      <input
                        class="w-full bg-surface-container-lowest rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface outline-none"
                        type="text"
                        value="Kota Tangerang Selatan, Banten"
                      />
                    </div>
                  </div>
                </div>

                <!-- Penumpang 2 -->
                <div class="mt-4 p-5 rounded-xl bg-surface-container-low flex flex-col gap-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm">
                        2
                      </span>
                      <span class="font-label-lg text-label-lg text-primary">
                        Penumpang 2 (Dewasa)
                      </span>
                    </div>

                    <span class="font-label-sm text-label-sm text-outline">
                      Termasuk kuota tiket Gol IVA
                    </span>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div class="flex flex-col gap-1">
                      <label class="font-label-sm text-label-sm text-on-surface-variant">
                        Nama Lengkap (Sesuai KTP)
                      </label>
                      <input
                        class="w-full bg-surface-container-lowest rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface outline-none"
                        type="text"
                        value="Siti Rahmawati"
                      />
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="font-label-sm text-label-sm text-on-surface-variant">
                        Nomor Induk Kependudukan (NIK)
                      </label>
                      <input
                        class="w-full bg-surface-container-lowest rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface outline-none"
                        type="text"
                        value="3271045204920002"
                      />
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="font-label-sm text-label-sm text-on-surface-variant">
                        Tanggal Lahir
                      </label>
                      <input
                        class="w-full bg-surface-container-lowest rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface outline-none"
                        type="date"
                        value="1992-04-12"
                      />
                    </div>
                  </div>
                </div>
              </div>

              
              <!-- Section 3: Data Manifest Kendaraan -->
              <div class="bg-surface-container-lowest rounded-xl p-6 sm:p-7 shadow-sm">
                <div class="flex items-center justify-between pb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-surface-container-high text-primary flex items-center justify-center">
                      <span class="material-symbols-outlined text-[20px]">
                        directions_car
                      </span>
                    </div>

                    <div>
                      <h2 class="font-headline-sm text-headline-sm text-primary">
                        Manifest Kendaraan di Kapal (Car Deck)
                      </h2>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">
                        Tercatat pada gate timbangan dermaga
                      </span>
                    </div>
                  </div>

                  <span class="px-2.5 py-1 rounded bg-surface-container text-on-secondary-container font-label-sm text-label-sm">
                    Golongan IVA
                  </span>
                </div>

                <div class="p-4 rounded-xl bg-surface-container-low mb-5 flex flex-col md:flex-row items-center gap-4">
                  <div class="w-full md:w-36 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      class="w-full h-full object-cover"
                      data-alt="Modern passenger MPV family car parked neatly on a clean asphalt harbor deck during morning nautical transit, with ferry loading ramps in soft coastal daylight."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcfmCL0OHU6mc-KdQHAYz14jh_TPC32B2czJtwcKWA-emROrNc2Rb-cOIA-9XT3bpHH-qeiE4yrsQd6opwGlu_5NE2KDX59ZNC5DWskHHLowoJ9zyjw4SWWQSctVEfgZTOPykHWqpNaIwVszGEISiUfZUcfknEDQLFnzd-0nXm-LAA11JuXa-ZCl1TDqZW3mT7qnIpP2dZt82L3czWOPzswxv2jt3sRiBWIoNNqdqbQjGO1JBUtExx"
                    />
                  </div>

                  <div class="flex-1 flex flex-col">
                    <span class="font-label-lg text-label-lg text-primary font-bold">
                      Golongan IVA - Kendaraan Penumpang Kecil
                    </span>
                    <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Mobil penumpang pribadi ukuran panjang ≤ 5 meter (Avanza, Xpander, Innova, Ertiga, BR-V, dll). Termasuk asuransi kendaraan di dalam lambung kapal selama berlayar.
                    </p>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div class="flex flex-col gap-1.5">
                    <label class="font-label-md text-label-md text-on-surface-variant">
                      Nomor Polisi (Plat Nomor)
                      <span class="text-error">*</span>
                    </label>
                    <div class="flex items-center bg-surface-container-low rounded-lg px-3 py-2.5 font-headline-sm text-headline-sm text-primary uppercase font-bold tracking-wider">
                      <span class="material-symbols-outlined text-outline text-[20px] mr-2">
                        tag
                      </span>
                      <input
                        class="w-full bg-transparent outline-none uppercase"
                        type="text"
                        value="B 1842 KPL"
                      />
                    </div>
                  </div>

                  <div class="flex flex-col gap-1.5">
                    <label class="font-label-md text-label-md text-on-surface-variant">
                      Merk &amp; Model Mobil
                      <span class="text-error">*</span>
                    </label>
                    <div class="flex items-center bg-surface-container-low rounded-lg px-3 py-2.5">
                      <input
                        class="w-full bg-transparent font-body-md text-body-md text-on-surface outline-none"
                        type="text"
                        value="Toyota Avanza Veloz 2023"
                      />
                    </div>
                  </div>

                  <div class="flex flex-col gap-1.5">
                    <label class="font-label-md text-label-md text-on-surface-variant">
                      Warna Kendaraan
                      <span class="text-error">*</span>
                    </label>
                    <div class="flex items-center bg-surface-container-low rounded-lg px-3 py-2.5">
                      <input
                        class="w-full bg-transparent font-body-md text-body-md text-on-surface outline-none"
                        type="text"
                        value="Hitam Metalik"
                      />
                    </div>
                  </div>
                </div>

                <!-- Deklarasi Muatan Khusus -->
                <div class="mt-6 p-4 rounded-xl bg-surface-container-low flex flex-col gap-3">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-[18px] text-primary">
                      inventory_2
                    </span>
                    <span class="font-label-lg text-label-lg text-primary">
                      Deklarasi Muatan / Barang Bawaan dalam Kendaraan
                    </span>
                  </div>

                  <div class="flex flex-col gap-2.5">
                    <label class="flex items-start gap-3 p-3 rounded-lg bg-surface-container-lowest cursor-pointer">
                      <input
                        checked=""
                        class="mt-1 w-4 h-4 text-secondary accent-secondary cursor-pointer"
                        name="cargo_declaration"
                        type="radio"
                      />
                      <div class="flex flex-col">
                        <span class="font-label-md text-label-md text-on-surface font-semibold">
                          Barang Bawaan Pribadi / Koper Normal
                        </span>
                        <span class="font-body-sm text-body-sm text-on-surface-variant">
                          Hanya koper, pakaian, makanan, dan oleh-oleh wajar. Tidak membawa bahan mudah terbakar, gas elpiji tanpa izin, atau material B3 terlarang.
                        </span>
                      </div>
                    </label>

                    <label class="flex items-start gap-3 p-3 rounded-lg bg-surface-container-lowest cursor-pointer opacity-75">
                      <input
                        class="mt-1 w-4 h-4 text-secondary accent-secondary cursor-pointer"
                        name="cargo_declaration"
                        type="radio"
                      />
                      <div class="flex flex-col">
                        <span class="font-label-md text-label-md text-on-surface font-semibold">
                          Membawa Muatan Dagang / Hewan Ternak / Peralatan Khusus
                        </span>
                        <span class="font-body-sm text-body-sm text-on-surface-variant">
                          Memerlukan surat karantina dan pemeriksaan fisik di kantor Balai Karantina Pelabuhan sebelum masuk ramp kapal.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Section 4: Add-on & Proteksi Pelayaran -->
              <div class="bg-surface-container-lowest rounded-xl p-6 sm:p-7 shadow-sm">
                <div class="flex items-center gap-3 pb-4">
                  <div class="w-8 h-8 rounded-lg bg-surface-container-high text-primary flex items-center justify-center">
                    <span class="material-symbols-outlined text-[20px]">
                      add_moderator
                    </span>
                  </div>

                  <div>
                    <h2 class="font-headline-sm text-headline-sm text-primary">
                      Add-on &amp; Fasilitas Pelayaran (Opsional)
                    </h2>
                    <span class="font-body-sm text-body-sm text-on-surface-variant">
                      Tingkatkan kenyamanan dan proteksi perjalanan Anda sekeluarga
                    </span>
                  </div>
                </div>

                <div class="flex flex-col gap-3 mt-2">
                  <!-- Addon 1: Asuransi Ekstra -->
                  <label class="flex items-start justify-between gap-4 p-4 rounded-xl bg-surface-container-low cursor-pointer transition-colors hover:bg-surface-container">
                    <div class="flex items-start gap-3">
                      <input
                        checked=""
                        class="mt-1 w-4 h-4 rounded text-secondary accent-secondary cursor-pointer"
                        id="addon-insurance"
                        type="checkbox"
                      />
                      <div class="flex flex-col">
                        <div class="flex items-center gap-2">
                          <span class="font-label-lg text-label-lg text-primary font-bold">
                            Jasa Raharja Ekstra &amp; Garansi Sandar Tepat Waktu
                          </span>
                          <span class="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
                            Direkomendasikan
                          </span>
                        </div>
                        <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          Santunan keterlambatan sandar &gt; 120 menit (kompensasi Rp 150.000) dan proteksi medis darurat selama pelayaran.
                        </p>
                      </div>
                    </div>

                    <span class="font-label-lg text-label-lg text-primary font-bold whitespace-nowrap">
                      +Rp 15.000
                    </span>
                  </label>

                  <!-- Addon 2: Executive Lounge -->
                  <label class="flex items-start justify-between gap-4 p-4 rounded-xl bg-surface-container-low cursor-pointer transition-colors hover:bg-surface-container">
                    <div class="flex items-start gap-3">
                      <input
                        class="mt-1 w-4 h-4 rounded text-secondary accent-secondary cursor-pointer"
                        id="addon-lounge"
                        type="checkbox"
                      />
                      <div class="flex flex-col">
                        <div class="flex items-center gap-2">
                          <span class="font-label-lg text-label-lg text-primary font-bold">
                            Akses Executive Waiting Lounge Pelabuhan Merak
                          </span>
                          <span class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary font-label-sm text-label-sm">
                            2 Pax
                          </span>
                        </div>
                        <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          Ruang tunggu AC prioritas dermaga eksekutif, minuman hangat &amp; snack gratis, kursi pijat, serta jalur naik kapal ekspres.
                        </p>
                      </div>
                    </div>

                    <span class="font-label-lg text-label-lg text-primary font-bold whitespace-nowrap">
                      +Rp 50.000
                    </span>
                  </label>
                </div>
              </div>
            </div>
            
            <!-- Right Column: Sticky Summary -->
            <div class="lg:col-span-4 sticky top-28 flex flex-col gap-5">
              <div class="bg-surface-container-lowest rounded-xl p-6 shadow-md flex flex-col gap-5">
                <div class="flex items-center justify-between pb-3">
                  <h3 class="font-headline-sm text-headline-sm text-primary">
                    Ringkasan Biaya
                  </h3>
                  <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-secondary-container">
                    1 Kendaraan
                  </span>
                </div>

                <!-- Trip summary mini card -->
                <div class="p-3.5 rounded-lg bg-surface-container-low flex flex-col gap-2">
                  <div class="flex items-center justify-between">
                    <span class="font-label-md text-label-md text-primary font-bold">
                      Merak → Bakauheni
                    </span>
                    <span class="font-label-sm text-label-sm text-secondary font-semibold">
                      Reguler / Eksekutif
                    </span>
                  </div>

                  <div class="flex items-center gap-2 text-outline">
                    <span class="material-symbols-outlined text-[16px]">
                      schedule
                    </span>
                    <span class="font-body-sm text-body-sm">
                      24 Okt 2024 • 08:30 WIB
                    </span>
                  </div>

                  <div class="flex items-center gap-2 text-outline">
                    <span class="material-symbols-outlined text-[16px]">
                      directions_car
                    </span>
                    <span class="font-body-sm text-body-sm">
                      Toyota Avanza (B 1842 KPL)
                    </span>
                  </div>
                </div>

                <!-- Price items -->
                <div class="flex flex-col gap-3 pt-2">
                  <div class="flex items-center justify-between text-on-surface">
                    <div class="flex flex-col">
                      <span class="font-body-md text-body-md">
                        Tiket Kendaraan Gol. IVA
                      </span>
                      <span class="font-body-sm text-body-sm text-outline">
                        Termasuk manifest 2 orang
                      </span>
                    </div>

                    <span class="font-label-lg text-label-lg font-semibold">
                      Rp 465.000
                    </span>
                  </div>

                  <div
                    class="flex items-center justify-between text-on-surface"
                    id="row-insurance"
                  >
                    <div class="flex flex-col">
                      <span class="font-body-md text-body-md">
                        Perlindungan Pelayaran
                      </span>
                      <span class="font-body-sm text-body-sm text-outline">
                        Jasa Raharja Ekstra
                      </span>
                    </div>

                    <span
                      class="font-label-lg text-label-lg font-semibold"
                      id="price-insurance"
                    >
                      Rp 15.000
                    </span>
                  </div>

                  <div
                    class="flex items-center justify-between text-on-surface hidden"
                    id="row-lounge"
                  >
                    <div class="flex flex-col">
                      <span class="font-body-md text-body-md">
                        Executive Lounge (2 Org)
                      </span>
                      <span class="font-body-sm text-body-sm text-outline">
                        Dermaga Merak
                      </span>
                    </div>

                    <span class="font-label-lg text-label-lg font-semibold">
                      Rp 50.000
                    </span>
                  </div>

                  <div class="flex items-center justify-between text-on-surface">
                    <div class="flex flex-col">
                      <span class="font-body-md text-body-md">
                        Biaya Layanan &amp; Dermaga
                      </span>
                      <span class="font-body-sm text-body-sm text-outline">
                        Sistem reservasi terpusat
                      </span>
                    </div>

                    <span class="font-label-lg text-label-lg font-semibold">
                      Rp 3.500
                    </span>
                  </div>
                </div>

                <div class="h-[1px] bg-surface-container-high my-1"></div>

                <!-- Grand Total -->
                <div class="flex items-baseline justify-between">
                  <span class="font-headline-sm text-headline-sm text-primary">
                    Total Bayar
                  </span>

                  <div class="flex flex-col items-end">
                    <span
                      class="font-headline-md text-headline-md text-primary font-bold"
                      id="grand-total"
                    >
                      Rp 483.500
                    </span>
                    <span class="font-label-sm text-label-sm text-tertiary-fixed-dim bg-tertiary-container px-2 py-0.5 rounded mt-0.5">
                      Sudah Termasuk PPN
                    </span>
                  </div>
                </div>

                <!-- Terms Checkbox -->
                <label class="flex items-start gap-2.5 pt-2 cursor-pointer">
                  <input
                    checked=""
                    class="mt-1 w-4 h-4 rounded text-secondary accent-secondary cursor-pointer"
                    id="terms-agree"
                    type="checkbox"
                  />
                  <span class="font-body-sm text-body-sm text-on-surface-variant">
                    Saya menyetujui seluruh
                    <a class="text-secondary font-semibold hover:underline" href="#">
                      Syarat &amp; Ketentuan Penyeberangan ASDP
                    </a>,
                    standar keselamatan Ditjen Hubla, dan kebenaran data manifest untuk asuransi.
                  </span>
                </label>

                <!-- Book Now / Payment CTA Button -->
                <button
                  class="w-full h-12 rounded-lg bg-[#f97316] hover:bg-[#ea580c] text-on-primary font-headline-sm text-headline-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
                  type="button"
                >
                  <span>Lanjut ke Pembayaran</span>
                  <span class="material-symbols-outlined text-[20px]">
                    arrow_forward
                  </span>
                </button>

                <!-- Security Assurance badges -->
                <div class="flex items-center justify-center gap-4 pt-1 text-on-surface-variant">
                  <div class="flex items-center gap-1.5 font-label-sm text-label-sm">
                    <span class="material-symbols-outlined text-secondary text-[16px]">
                      lock
                    </span>
                    Enkripsi 256-bit
                  </div>

                  <div class="flex items-center gap-1.5 font-label-sm text-label-sm">
                    <span class="material-symbols-outlined text-tertiary-fixed-dim text-[16px]">
                      verified
                    </span>
                    Tiket Sah Ditjen Hubla
                  </div>
                </div>
              </div>

              <!-- Help Card Contact -->
              <div class="bg-surface-container-low rounded-xl p-4 flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
                  <span class="material-symbols-outlined text-[20px]">
                    support_agent
                  </span>
                </div>

                <div class="flex flex-col">
                  <span class="font-label-md text-label-md text-on-surface font-semibold">
                    Butuh Bantuan Pengisian Manifest?
                  </span>
                  <span class="font-body-sm text-body-sm text-on-surface-variant">
                    Hubungi Posko Merak: (0254) 571000 atau CS KapalKu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <aside class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <div class="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-lowest shadow-[0_8px_24px_rgba(15,41,66,0.12)]">
        <span class="w-2 h-2 rounded-full bg-on-tertiary-container animate-ping"></span>
        <span class="font-label-md text-label-md text-on-surface">
          Online - Siap bantu cek jadwal
        </span>
      </div>

      <button
        class="flex items-center gap-2.5 px-4 py-3 rounded-full bg-primary-container text-on-primary shadow-[0_12px_28px_-4px_rgba(15,41,66,0.24)] hover:bg-primary transition-all"
        type="button"
      >
        <span class="material-symbols-outlined text-[20px]">
          support_agent
        </span>
        <span class="font-label-lg text-label-lg">
          KapalKu Bot / Tanya CS
        </span>
      </button>
    </aside>

    <footer class="w-full bg-primary text-surface-container-low pt-16 pb-12 shadow-[0_-1px_12px_rgba(15,41,66,0.08)]">
      <div class="max-w-7xl mx-auto px-6 lg:px-margin flex flex-col gap-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-space-sm">
              <div class="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center">
                <span class="material-symbols-outlined text-primary text-[20px]">
                  directions_boat
                </span>
              </div>
              <span class="font-headline-sm text-headline-sm text-on-primary">
                KapalKu
              </span>
            </div>

            <p class="font-body-sm text-body-sm text-on-primary-container">
              Jaringan reservasi tiket kapal penumpang, fast boat antar-pulau, dan manifest muatan logistik kendaraan maritim terpadu se-Indonesia.
            </p>

            <div class="flex items-center gap-2 text-on-tertiary-fixed">
              <span class="material-symbols-outlined text-[18px] text-tertiary-fixed">
                verified_user
              </span>
              <span class="font-label-sm text-label-sm text-surface-variant">
                Sertifikasi Keselamatan Ditjen Hubla
              </span>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <span class="font-headline-sm text-headline-sm text-on-primary">
              Lintasan &amp; Dermaga Mitra
            </span>
            <ul class="flex flex-col gap-2 font-body-sm text-body-sm text-on-primary-container">
              <li>Merak (Banten) - Bakauheni (Lampung)</li>
              <li>Ketapang (Banyuwangi) - Gilimanuk (Bali)</li>
              <li>Tanjung Priok - Batam &amp; Tanjung Balai</li>
              <li>Padangbai (Bali) - Lembar (Lombok)</li>
              <li>Sanur - Nusa Penida Express Fastboat</li>
            </ul>
          </div>

          <div class="flex flex-col gap-3">
            <span class="font-headline-sm text-headline-sm text-on-primary">
              Layanan &amp; Dukungan
            </span>
            <ul class="flex flex-col gap-2 font-body-sm text-body-sm text-on-primary-container">
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-secondary-fixed">
                  call
                </span>
                Call Center 24/7: 1500-728
              </li>
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-secondary-fixed">
                  mail
                </span>
                cs@kapalku.co.id
              </li>
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-secondary-fixed">
                  schedule
                </span>
                Operasional Dermaga Non-Stop
              </li>
            </ul>
          </div>

          <div class="flex flex-col gap-3">
            <span class="font-headline-sm text-headline-sm text-on-primary">
              Kanal Pembayaran &amp; App
            </span>

            <p class="font-body-sm text-body-sm text-on-primary-container">
              Transaksi instan dan terverifikasi otomatis tiket elektronik.
            </p>

            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm">
                QRIS
              </span>
              <span class="px-2 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm">
                Virtual Account
              </span>
              <span class="px-2 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm">
                Gerai Retail
              </span>
              <span class="px-2 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm">
                Kartu Debit/Kredit
              </span>
            </div>

            <div class="pt-2">
              <span class="font-label-sm text-label-sm text-surface-variant uppercase tracking-wider block mb-1">
                Unduh Aplikasi
              </span>

              <div class="flex gap-2">
                <div class="px-3 py-1.5 rounded bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center gap-1">
                  <span class="material-symbols-outlined text-[16px]">
                    phone_android
                  </span>
                  Google Play
                </div>
                <div class="px-3 py-1.5 rounded bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center gap-1">
                  <span class="material-symbols-outlined text-[16px]">
                    phone_iphone
                  </span>
                  App Store
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-primary-container">
          <p>
            © 2025 PT Pelayaran Digital KapalKu. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </p>

          <div class="flex items-center gap-6">
            <a
              class="hover:text-on-primary transition-colors"
              data-path="syarat-dan-ketentuan"
              href="/beranda-pencarian-tiket-kapal#syarat"
            >
              Syarat &amp; Ketentuan Penyeberangan
            </a>

            <a
              class="hover:text-on-primary transition-colors"
              data-path="kebijakan-privasi"
              href="/beranda-pencarian-tiket-kapal#privasi"
            >
              Kebijakan Privasi
            </a>

            <a
              class="hover:text-on-primary transition-colors"
              data-path="asuransi-pelayaran"
              href="/beranda-pencarian-tiket-kapal#asuransi"
            >
              Asuransi Jasa Raharja
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>


<style>
@layer base {
  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    overscroll-behavior: none;
  }

  main > *:first-child {
    margin-top: 0 !important;
  }

  main > *:last-child {
    margin-bottom: 0 !important;
  }
}

*::-webkit-scrollbar {
  display: none;
}
</style>


