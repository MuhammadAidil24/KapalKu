
<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let legacyScripts = []

onMounted(() => {
  const scripts = `
    (function () {
      const selectButtons = document.querySelectorAll('.btn-select-voyage');
      const selectedVesselName = document.getElementById('selected-vessel-name');
      const selectedDepartureTime = document.getElementById('selected-departure-time');
      const selectedPrice = document.getElementById('selected-price');
      const selectedServiceBadge = document.getElementById('selected-service-badge');

      selectButtons.forEach(btn => {
        btn.addEventListener('click', function () {
          const vessel = this.getAttribute('data-vessel');
          const time = this.getAttribute('data-time');
          const price = this.getAttribute('data-price');

          // Update sticky bottom bar
          if (selectedVesselName) selectedVesselName.textContent = vessel;
          if (selectedDepartureTime) selectedDepartureTime.textContent = '(' + time + ')';
          if (selectedPrice) selectedPrice.textContent = price;

          if (selectedServiceBadge) {
            if (vessel.includes('Portlink') || vessel.includes('Batumandi')) {
              selectedServiceBadge.textContent = 'Dermaga Eksekutif Sosoro';
            } else {
              selectedServiceBadge.textContent = 'Dermaga Reguler Merak';
            }
          }

          // Reset other button appearances
          selectButtons.forEach(b => {
            b.classList.remove('bg-primary', 'text-on-primary');
            b.classList.add('bg-surface-container-high', 'text-primary');
            b.textContent = 'Pilih Jadwal';
          });

          // Mark current active button
          this.classList.remove('bg-surface-container-high', 'text-primary');
          this.classList.add('bg-primary', 'text-on-primary');
          this.textContent = 'Terpilih ✓';
        });
      });
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
          <a class="flex items-center gap-space-sm" data-path="cari-tiket-dan-rute" href="/beranda-pencarian-tiket-kapal">
            <img
              alt="KapalKu Brand Logo"
              class="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VSjzN1dHUK24uRJRMMzI7h_muwtcDHLMng0F_s1Yd1kUxdn2VaFFFTnKK4cFdPhMR0ZDnj_ajeKf5CqGtVrCH0WmWRo1r8JsBdC-BMOT8XOSWDuwxPVs0qe3f_sFf53AhAGKBcMEgs8sSfh2pVIaz0GdS3-QWV-GWbRjeB_FF84Ta6ca_E9rgLg_qUcBsUdonRakYlRezx31biwfxKSSilkS0JWzzYBDT3ZFR9_5n8Uqk07thTWtTtEVI"
            />
            <div class="flex flex-col">
              <span class="font-headline-sm text-headline-sm text-primary tracking-tight">KapalKu</span>
              <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Maritime Express</span>
            </div>
          </a>

          <nav class="hidden xl:flex items-center gap-space-xs" data-active-classes="bg-surface-container-high text-primary font-label-lg rounded-lg">
            <a class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg" data-path="cari-tiket-dan-rute" href="/beranda-pencarian-tiket-kapal">Cari Tiket &amp; Rute</a>

            <a aria-current="page" class="px-3 py-2 transition-colors bg-surface-container-high text-primary font-label-lg rounded-lg" data-path="jadwal-keberangkatan" href="/hasil-pencarian-jadwal-kapal">Jadwal Keberangkatan</a>

            <a class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg" data-path="cek-manifest-dan-kargo" href="/formulir-reservasi-manifest">Cek Manifest &amp; Kargo</a>

            <a class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg" data-path="promo-dan-mitra-armada" href="/beranda-pencarian-tiket-kapal#promo">Promo &amp; Mitra Armada</a>

            <a class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg" data-path="riwayat-pesanan" href="/riwayat-pesanan-alur-pembatalan-refund">Riwayat Pesanan</a>
          </nav>
        </div>

        <div class="flex items-center gap-space-sm">
          <a class="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container-high text-primary transition-colors" data-path="bantuan-pelayaran" href="/beranda-pencarian-tiket-kapal#bantuan">
            <span class="w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse"></span>
            <span class="font-label-md text-label-md">Bantuan 24 Jam</span>
          </a>

          <div class="hidden sm:flex items-center px-2.5 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md gap-1">
            <span class="font-label-md text-label-md text-primary">IDR</span>
            <span class="text-outline-variant">|</span>
            <span class="font-label-md text-label-md text-secondary">ID</span>
          </div>

          <button aria-label="Notifikasi" class="relative p-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors" type="button">
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
                <span class="font-label-md text-label-md text-on-surface">Budi Santoso</span>
              </div>
              <span class="inline-block px-1.5 py-0.5 rounded bg-surface-container text-on-secondary-container font-label-sm text-label-sm">Member Gold</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="w-full pt-20 bg-background">
      <div class="flex flex-col w-full">
        <!-- SEARCH SUMMARY STRIP -->
        <section class="w-full bg-primary-container text-on-primary shadow-md relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-primary-container via-secondary/20 to-primary-container pointer-events-none"></div>

          <div class="max-w-7xl mx-auto px-6 lg:px-margin py-4 relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div class="flex flex-wrap items-center gap-y-2 gap-x-4">
              <div class="flex items-center gap-2">
                <span class="p-1.5 rounded-lg bg-surface-container-high/20 text-secondary-fixed">
                  <span class="material-symbols-outlined text-[20px]">directions_boat</span>
                </span>

                <div class="flex flex-col">
                  <span class="font-label-sm text-label-sm uppercase tracking-wider text-on-primary-container">Lintasan Penyeberangan</span>
                  <div class="flex items-center gap-2 font-headline-sm text-headline-sm text-on-primary">
                    <span class="">Pekanbaru (Sungai Duku)</span>
                    <span class="material-symbols-outlined text-secondary-fixed-dim text-[18px]">arrow_forward</span>
                    <span class="">Selatpanjang</span>
                  </div>
                </div>
              </div>

              <div class="h-8 w-px bg-on-primary-container/20 hidden md:block"></div>

              <div class="flex items-center gap-4 text-on-primary-container font-label-lg text-label-lg">
                <div class="flex items-center gap-1.5 text-on-primary">
                  <span class="material-symbols-outlined text-secondary-container text-[18px]">calendar_today</span>
                  <span class="">Kamis, 24 Okt 2024</span>
                </div>
                <span class="text-on-primary-container/40">•</span>

                <div class="flex items-center gap-1.5 text-on-primary">
                  <span class="material-symbols-outlined text-secondary-container text-[18px]">group</span>
                  <span class="">2 Dewasa</span>
                </div>
                <span class="text-on-primary-container/40">•</span>

                <div class="flex items-center gap-1.5 text-on-primary">
                  <span class="material-symbols-outlined text-secondary-container text-[18px]">directions_car</span>
                  <span class="">Gol. IVA (Minibus / Avanza)</span>
                </div>
              </div>
            </div>

            <button class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-on-primary font-label-lg text-label-lg transition-all shadow-sm" id="btn-edit-search" type="button">
              <span class="material-symbols-outlined text-[18px]">tune</span>
              <span class="">Ubah Pencarian</span>
            </button>
          </div>
        </section>

        <!-- DATE SLIDER CAROUSEL -->
        <section class="w-full bg-surface-container-low shadow-sm">
          <div class="max-w-7xl mx-auto px-6 lg:px-margin py-3 flex items-center justify-between gap-2 overflow-x-auto">
            <!-- Carousel Item 1 -->
            <button class="flex flex-col items-center flex-1 min-w-[120px] py-2 px-3 rounded-lg bg-transparent hover:bg-surface-container text-on-surface transition-all" type="button">
              <span class="font-label-sm text-label-sm text-on-surface-variant">Sen, 21 Okt</span>
              <span class="font-label-lg text-label-lg font-bold text-primary">Rp 420.000</span>
              <span class="font-label-sm text-label-sm text-on-tertiary-container mt-0.5">Lancar</span>
            </button>

            <!-- Carousel Item 2 -->
            <button class="flex flex-col items-center flex-1 min-w-[120px] py-2 px-3 rounded-lg bg-transparent hover:bg-surface-container text-on-surface transition-all" type="button">
              <span class="font-label-sm text-label-sm text-on-surface-variant">Sel, 22 Okt</span>
              <span class="font-label-lg text-label-lg font-bold text-primary">Rp 420.000</span>
              <span class="font-label-sm text-label-sm text-on-tertiary-container mt-0.5">Lancar</span>
            </button>

            <!-- Carousel Item 3 -->
            <button class="flex flex-col items-center flex-1 min-w-[120px] py-2 px-3 rounded-lg bg-transparent hover:bg-surface-container text-on-surface transition-all" type="button">
              <span class="font-label-sm text-label-sm text-on-surface-variant">Rab, 23 Okt</span>
              <span class="font-label-lg text-label-lg font-bold text-primary">Rp 435.000</span>
              <span class="font-label-sm text-label-sm text-on-tertiary-container mt-0.5">Lancar</span>
            </button>

            <!-- Carousel Item 4 (ACTIVE) -->
            <button class="flex flex-col items-center flex-1 min-w-[130px] py-2.5 px-3 rounded-lg bg-primary text-on-primary shadow-md relative scale-105 transition-all" type="button">
              <span class="font-label-sm text-label-sm text-secondary-fixed">Kam, 24 Okt (Hari Ini)</span>
              <span class="font-headline-sm text-headline-sm text-on-primary font-bold">Rp 465.000</span>
              <span class="inline-block mt-0.5 px-2 py-0.2 rounded-full bg-secondary text-on-secondary font-label-sm text-[10px]">Pilihan Anda</span>
            </button>

            <!-- Carousel Item 5 -->
            <button class="flex flex-col items-center flex-1 min-w-[120px] py-2 px-3 rounded-lg bg-transparent hover:bg-surface-container text-on-surface transition-all" type="button">
              <span class="font-label-sm text-label-sm text-on-surface-variant">Jum, 25 Okt</span>
              <span class="font-label-lg text-label-lg font-bold text-primary">Rp 490.000</span>
              <span class="font-label-sm text-label-sm text-secondary mt-0.5">Padat Libur</span>
            </button>

            <!-- Carousel Item 6 -->
            <button class="flex flex-col items-center flex-1 min-w-[120px] py-2 px-3 rounded-lg bg-transparent hover:bg-surface-container text-on-surface transition-all" type="button">
              <span class="font-label-sm text-label-sm text-on-surface-variant">Sab, 26 Okt</span>
              <span class="font-label-lg text-label-lg font-bold text-primary">Rp 490.000</span>
              <span class="font-label-sm text-label-sm text-secondary mt-0.5">Padat Libur</span>
            </button>

            <!-- Carousel Item 7 -->
            <button class="flex flex-col items-center flex-1 min-w-[120px] py-2 px-3 rounded-lg bg-transparent hover:bg-surface-container text-on-surface transition-all" type="button">
              <span class="font-label-sm text-label-sm text-on-surface-variant">Min, 27 Okt</span>
              <span class="font-label-lg text-label-lg font-bold text-primary">Rp 465.000</span>
              <span class="font-label-sm text-label-sm text-on-tertiary-container mt-0.5">Lancar</span>
            </button>
          </div>
        </section>

        <!-- MAIN SEARCH MATRIX & RESULTS CONTAINER -->
        <div class="max-w-7xl mx-auto px-6 lg:px-margin py-8 w-full">
          <!-- Notice Bar -->
          <div class="mb-6 p-4 rounded-xl bg-surface-container-high/60 flex items-center justify-between flex-wrap gap-3">
            <div class="flex items-center gap-3">
              <span class="p-2 rounded-lg bg-secondary text-on-secondary">
                <span class="material-symbols-outlined text-[20px]">water</span>
              </span>

              <p class="font-body-md text-body-md text-on-surface">
                <strong>Kondisi Selat Sunda:</strong> Ombak tenang (0.5 - 1.0m), kecepatan angin 8 knot. Seluruh dermaga Merak-Bakauheni beroperasi normal tanpa kendala pasang surut.
              </p>
            </div>
            <div class="flex items-center gap-1.5 text-secondary font-label-md text-label-md">
              <span class="material-symbols-outlined text-[16px]">verified</span>
              <span class="">Update BMKG Maritim: 10 Menit Lalu</span>
            </div>
          </div>

          <!-- 2 COLUMN CONTENT GRID -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-24">
            
            <!-- LEFT COLUMN: FILTER SIDEBAR (4 COLUMNS) -->
            <aside class="lg:col-span-4 flex flex-col gap-6 sticky top-24">
              <div class="p-5 rounded-xl bg-surface-container-lowest shadow-md flex flex-col gap-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[22px]">filter_alt</span>
                    <h2 class="font-headline-sm text-headline-sm text-primary">Filter Pelayaran</h2>
                  </div>
                  <button class="font-label-sm text-label-sm text-secondary hover:underline" type="button">Reset Semua</button>
                </div>

                <!-- Sort Filter -->
                <div class="flex flex-col gap-2">
                  <label class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Urutkan Berdasarkan</label>
                  <div class="relative">
                    <select class="w-full py-2.5 px-3 rounded-lg bg-surface-container-low text-on-surface font-label-lg text-label-lg appearance-none cursor-pointer focus:outline-none focus:bg-surface-container">
                      <option selected="">Waktu Berangkat Paling Awal</option>
                      <option>Harga Terendah</option>
                      <option>Durasi Tercepat (Eksekutif)</option>
                      <option>Sisa Kuota Terbanyak</option>
                    </select>
                    <span class="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-on-surface-variant text-[20px]">expand_more</span>
                  </div>
                </div>

                <!-- Time Range -->
                <div class="flex flex-col gap-3">
                  <label class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Rentang Waktu Keberangkatan</label>

                  <div class="grid grid-cols-2 gap-2">
                    <label class="flex flex-col p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-all">
                      <div class="flex items-center justify-between mb-1">
                        <span class="material-symbols-outlined text-secondary text-[18px]">wb_twilight</span>
                        <input class="rounded text-primary focus:ring-0" type="checkbox" />
                      </div>
                      <span class="font-label-md text-label-md text-primary">Pagi Subuh</span>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">00:00 - 06:00</span>
                    </label>

                    <label class="flex flex-col p-2.5 rounded-lg bg-surface-container-high cursor-pointer transition-all">
                      <div class="flex items-center justify-between mb-1">
                        <span class="material-symbols-outlined text-secondary text-[18px]">light_mode</span>
                        <input checked="" class="rounded text-primary focus:ring-0" type="checkbox" />
                      </div>
                      <span class="font-label-md text-label-md text-primary font-bold">Pagi - Siang</span>
                      <span class="font-body-sm text-body-sm text-on-surface">06:00 - 12:00</span>
                    </label>

                    <label class="flex flex-col p-2.5 rounded-lg bg-surface-container-high cursor-pointer transition-all">
                      <div class="flex items-center justify-between mb-1">
                        <span class="material-symbols-outlined text-secondary text-[18px]">sunny</span>
                        <input checked="" class="rounded text-primary focus:ring-0" type="checkbox" />
                      </div>
                      <span class="font-label-md text-label-md text-primary font-bold">Siang - Sore</span>
                      <span class="font-body-sm text-body-sm text-on-surface">12:00 - 18:00</span>
                    </label>

                    <label class="flex flex-col p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-all">
                      <div class="flex items-center justify-between mb-1">
                        <span class="material-symbols-outlined text-secondary text-[18px]">bedtime</span>
                        <input class="rounded text-primary focus:ring-0" type="checkbox" />
                      </div>
                      <span class="font-label-md text-label-md text-primary">Malam</span>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">18:00 - 24:00</span>
                    </label>
                  </div>
                </div>

                <!-- Vessel & Service Class -->
                <div class="flex flex-col gap-2.5">
                  <label class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Layanan &amp; Tipe Dermaga</label>

                  <label class="flex items-start gap-3 p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-all">
                    <input checked="" class="mt-1 rounded text-primary focus:ring-0" type="checkbox" />
                    <div class="flex flex-col">
                      <div class="flex items-center gap-1.5">
                        <span class="font-label-lg text-label-lg text-primary font-semibold">Dermaga Eksekutif (Sosoro)</span>
                        <span class="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px]">1 Jam</span>
                      </div>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">Dermaga 6 khusus kapal express, garbarata modern, lounge AC.</span>
                    </div>
                  </label>

                  <label class="flex items-start gap-3 p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-all">
                    <input checked="" class="mt-1 rounded text-primary focus:ring-0" type="checkbox" />
                    <div class="flex flex-col">
                      <div class="flex items-center gap-1.5">
                        <span class="font-label-lg text-label-lg text-primary font-semibold">Ferry Reguler</span>
                        <span class="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface font-label-sm text-[10px]">2-3 Jam</span>
                      </div>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">Dermaga 1-5, kapasitas kendaraan besar lebih luas &amp; ekonomis.</span>
                    </div>
                  </label>
                </div>

                <!-- Vessel Operator -->
                <div class="flex flex-col gap-2">
                  <label class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Armada Kapal (Vessel)</label>
                  <div class="flex flex-col gap-2">
                    <label class="flex items-center justify-between text-body-md text-body-md text-on-surface cursor-pointer">
                      <span class="flex items-center gap-2">
                        <input checked="" class="rounded text-primary focus:ring-0" type="checkbox" />
                        <span class="">KMP Portlink III</span>
                      </span>
                      <span class="font-label-sm text-label-sm text-on-surface-variant">ASDP</span>
                    </label>

                    <label class="flex items-center justify-between text-body-md text-body-md text-on-surface cursor-pointer">
                      <span class="flex items-center gap-2">
                        <input checked="" class="rounded text-primary focus:ring-0" type="checkbox" />
                        <span class="">KMP Sebuku</span>
                      </span>
                      <span class="font-label-sm text-label-sm text-on-surface-variant">ASDP</span>
                    </label>

                    <label class="flex items-center justify-between text-body-md text-body-md text-on-surface cursor-pointer">
                      <span class="flex items-center gap-2">
                        <input checked="" class="rounded text-primary focus:ring-0" type="checkbox" />
                        <span class="">KMP Batumandi</span>
                      </span>
                      <span class="font-label-sm text-label-sm text-on-surface-variant">ASDP</span>
                    </label>

                    <label class="flex items-center justify-between text-body-md text-body-md text-on-surface cursor-pointer">
                      <span class="flex items-center gap-2">
                        <input checked="" class="rounded text-primary focus:ring-0" type="checkbox" />
                        <span class="">KMP Legundi</span>
                      </span>
                      <span class="font-label-sm text-label-sm text-on-surface-variant">ASDP</span>
                    </label>
                  </div>
                </div>

                <!-- Facilities Filter -->
                <div class="flex flex-col gap-2">
                  <label class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Fasilitas Dalam Kapal</label>
                  <div class="flex flex-wrap gap-1.5">
                    <span class="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1 cursor-pointer hover:bg-surface-container-high">
                      <span class="material-symbols-outlined text-[14px]">chair</span> VIP Lounge
                    </span>
                    <span class="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1 cursor-pointer hover:bg-surface-container-high">
                      <span class="material-symbols-outlined text-[14px]">hotel</span> Kabin Tidur
                    </span>
                    <span class="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1 cursor-pointer hover:bg-surface-container-high">
                      <span class="material-symbols-outlined text-[14px]">electrical_services</span> Charging Pod
                    </span>
                    <span class="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1 cursor-pointer hover:bg-surface-container-high">
                      <span class="material-symbols-outlined text-[14px]">child_care</span> Ruang Anak
                    </span>
                  </div>
                </div>
              </div>

              <!-- Port Guide Mini Card -->
              <div class="p-4 rounded-xl bg-surface-container-low shadow-sm flex items-center gap-3">
                <div class="p-2.5 rounded-lg bg-surface-container-highest text-primary">
                  <span class="material-symbols-outlined text-[24px]">local_gas_station</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-label-md text-label-md text-primary font-bold">Kantin &amp; Rest Area Dermaga 6</span>
                  <p class="font-body-sm text-body-sm text-on-surface-variant">Tersedia Starbucks, Indomaret Point &amp; musala tepat di boarding gate eksekutif.</p>
                </div>
              </div>
            </aside>

            <!-- RIGHT COLUMN: SEARCH RESULTS CARDS (8 COLUMNS) -->
            <section class="lg:col-span-8 flex flex-col gap-5">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <h1 class="font-headline-md text-headline-md text-primary">Jadwal Kapal Tersedia</h1>
                  <span class="px-2 py-0.5 rounded-full bg-surface-container text-secondary font-label-md text-label-md">14 Jadwal</span>
                </div>
                <span class="font-body-sm text-body-sm text-on-surface-variant">Termasuk 2 Tiket Penumpang &amp; Asuransi Jasa Raharja</span>
              </div>

              
              <!-- CARD 1: REKOMENDASI TERBAIK (KMP Portlink III) -->
              <article class="p-5 rounded-xl bg-surface-container-lowest shadow-md hover:shadow-lg transition-all relative overflow-hidden ring-2 ring-secondary/20">
                <div class="absolute top-0 right-0">
                  <div class="bg-secondary text-on-secondary px-4 py-1 rounded-bl-xl font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <span class="material-symbols-outlined text-[14px]">thumb_up</span>
                    <span class="">Rekomendasi Terbaik</span>
                  </div>
                </div>

                <div class="flex flex-col gap-4">
                  <div class="flex flex-wrap items-center gap-3">
                    <div class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                      <span class="material-symbols-outlined text-[28px]">directions_boat</span>
                    </div>
                    <div class="flex flex-col">
                      <div class="flex items-center gap-2">
                        <span class="font-headline-sm text-headline-sm text-primary">KM Jelatik</span>
                        <span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">Kapal Kayu Legendaris</span>
                      </div>
                      <div class="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
                        <span class="">Pekanbaru ➔ Selatpanjang PP</span>
                        <span class="">•</span>
                        <span class="flex items-center gap-1 text-on-tertiary-container font-semibold">
                          <span class="w-2 h-2 rounded-full bg-on-tertiary-container"></span>
                          Jadwal Reguler
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="p-4 rounded-xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="flex flex-col text-left w-full md:w-auto">
                      <span class="font-headline-lg text-headline-lg text-primary font-extrabold">08:00</span>
                      <span class="font-label-lg text-label-lg text-on-surface font-semibold">Pekanbaru (Sungai Duku)</span>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">Boarding 07:30 WIB</span>
                    </div>

                    <div class="flex flex-col items-center flex-1 w-full max-w-xs">
                      <span class="font-label-sm text-label-sm text-secondary font-bold">7 Jam 30 Menit</span>
                      <div class="w-full flex items-center gap-2 my-1">
                        <div class="w-2 h-2 rounded-full bg-secondary"></div>
                        <div class="flex-1 h-0.5 bg-secondary/40 relative">
                          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-1 bg-surface-container-low text-secondary">
                            <span class="material-symbols-outlined text-[16px]">sailing</span>
                          </div>
                        </div>
                        <div class="w-2 h-2 rounded-full bg-secondary"></div>
                      </div>
                      <span class="font-label-sm text-label-sm text-on-surface-variant">Lintasan Sungai Siak ke Pesisir</span>
                    </div>

                    <div class="flex flex-col text-left md:text-right w-full md:w-auto">
                      <span class="font-headline-lg text-headline-lg text-primary font-extrabold">15:30</span>
                      <span class="font-label-lg text-label-lg text-on-surface font-semibold">Selatpanjang</span>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">Pelabuhan Tanjung Harapan</span>
                    </div>
                  </div>

                  <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div class="flex flex-wrap items-center gap-3">
                      <span class="px-2.5 py-1 rounded-md bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1">
                        <span class="material-symbols-outlined text-[16px]">airline_seat_recline_normal</span>
                        Sisa 42 Kursi Penumpang
                      </span>
                      <span class="px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-1">
                        <span class="material-symbols-outlined text-[16px]">hotel</span>
                        Kabin Kayu Klasik &amp; Tempat Tidur Bertingkat
                      </span>
                    </div>

                    <div class="flex items-center gap-4 ml-auto">
                      <div class="flex flex-col text-right">
                        <span class="font-label-sm text-label-sm text-on-surface-variant">Tarif Penumpang</span>
                        <div class="flex items-baseline gap-1">
                          <span class="font-headline-md text-headline-md font-bold text-primary">Rp 160.000</span>
                          <span class="font-label-sm text-label-sm text-on-surface-variant">/pax</span>
                        </div>
                      </div>
                      <button class="btn-select-voyage px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:bg-surface-tint transition-all shadow-md active:scale-95" data-price="Rp 160.000" data-time="08:00 WIB" data-vessel="KM Jelatik" type="button">Pilih Jadwal</button>
                    </div>
                  </div>
                </div>
              </article>

              <!-- CARD 2: KMP SEBUKU (Reguler Unggulan) -->
              <article class="p-5 rounded-xl bg-surface-container-lowest shadow-md hover:shadow-lg transition-all">
                <div class="flex flex-col gap-4">
                  <div class="flex flex-wrap items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                        <span class="material-symbols-outlined text-[28px]">directions_boat</span>
                      </div>
                      <div class="flex flex-col">
                        <div class="flex items-center gap-2">
                          <span class="font-headline-sm text-headline-sm text-primary">Nagaline</span>
                          <span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-label-sm text-label-sm">Fastboat AC</span>
                        </div>
                        <span class="font-label-md text-label-md text-on-surface-variant">Lintasan: Pekanbaru ➔ Tj. Buton ➔ Selatpanjang</span>
                      </div>
                    </div>
                    <span class="px-2.5 py-1 rounded-full bg-surface-container-high text-on-secondary-container font-label-sm text-label-sm font-semibold">Fastboat</span>
                  </div>

                  <div class="p-4 rounded-xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="flex flex-col text-left w-full md:w-auto">
                      <span class="font-headline-lg text-headline-lg text-primary font-extrabold">09:00</span>
                      <span class="font-label-lg text-label-lg text-on-surface font-semibold">Pekanbaru (Sungai Duku)</span>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">Via Tj. Buton</span>
                    </div>

                    <div class="flex flex-col items-center flex-1 w-full max-w-xs">
                      <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">4 Jam 0 Menit</span>
                      <div class="w-full flex items-center gap-2 my-1">
                        <div class="w-2 h-2 rounded-full bg-outline"></div>
                        <div class="flex-1 h-0.5 bg-outline/30 relative"></div>
                        <div class="w-2 h-2 rounded-full bg-outline"></div>
                      </div>
                      <span class="font-label-sm text-label-sm text-on-surface-variant">Transit Cepat Tj. Buton</span>
                    </div>

                    <div class="flex flex-col text-left md:text-right w-full md:w-auto">
                      <span class="font-headline-lg text-headline-lg text-primary font-extrabold">13:00</span>
                      <span class="font-label-lg text-label-lg text-on-surface font-semibold">Selatpanjang</span>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">Pelabuhan Tanjung Harapan</span>
                    </div>
                  </div>

                  <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div class="flex items-center gap-3">
                      <span class="px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-1">
                        <span class="material-symbols-outlined text-[16px]">airline_seat_recline_normal</span>
                        Sisa 28 Kursi Penumpang
                      </span>
                      <span class="font-label-sm text-label-sm text-on-tertiary-container flex items-center gap-1 font-semibold">
                        <span class="w-2 h-2 rounded-full bg-on-tertiary-container"></span>
                        Kabin Full AC
                      </span>
                    </div>

                    <div class="flex items-center gap-4 ml-auto">
                      <div class="flex flex-col text-right">
                        <span class="font-label-sm text-label-sm text-on-surface-variant">Tarif Penumpang</span>
                        <div class="flex items-baseline gap-1">
                          <span class="font-headline-md text-headline-md font-bold text-primary">Rp 180.000</span>
                          <span class="font-label-sm text-label-sm text-on-surface-variant">/pax</span>
                        </div>
                      </div>
                      <button class="btn-select-voyage px-5 py-2.5 rounded-lg bg-surface-container-high text-primary font-label-lg text-label-lg hover:bg-surface-container-highest transition-all active:scale-95" data-price="Rp 180.000" data-time="09:00 WIB" data-vessel="Nagaline" type="button">Pilih Jadwal</button>
                    </div>
                  </div>
                </div>
              </article>

              <!-- CARD 3: KMP BATUMANDI (Eksekutif Siang) -->
              <article class="p-5 rounded-xl bg-surface-container-lowest shadow-md hover:shadow-lg transition-all">
                <div class="flex flex-col gap-4">
                  <div class="flex flex-wrap items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                        <span class="material-symbols-outlined text-[28px]">directions_boat</span>
                      </div>
                      <div class="flex flex-col">
                        <div class="flex items-center gap-2">
                          <span class="font-headline-sm text-headline-sm text-primary">Meranti Express</span>
                          <span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">Speedboat Ekspres</span>
                        </div>
                        <span class="font-label-md text-label-md text-on-surface-variant">Lintasan: Pekanbaru ➔ Tj. Buton ➔ Selatpanjang</span>
                      </div>
                    </div>
                    <span class="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">Speedboat Ekspres</span>
                  </div>

                  <div class="p-4 rounded-xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="flex flex-col text-left w-full md:w-auto">
                      <span class="font-headline-lg text-headline-lg text-primary font-extrabold">11:30</span>
                      <span class="font-label-lg text-label-lg text-on-surface font-semibold">Pekanbaru (Sungai Duku)</span>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">Via Tj. Buton</span>
                    </div>

                    <div class="flex flex-col items-center flex-1 w-full max-w-xs">
                      <span class="font-label-sm text-label-sm text-secondary font-bold">4 Jam 0 Menit</span>
                      <div class="w-full flex items-center gap-2 my-1">
                        <div class="w-2 h-2 rounded-full bg-secondary"></div>
                        <div class="flex-1 h-0.5 bg-secondary/40 relative">
                          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-1 bg-surface-container-low text-secondary">
                            <span class="material-symbols-outlined text-[16px]">sailing</span>
                          </div>
                        </div>
                        <div class="w-2 h-2 rounded-full bg-secondary"></div>
                      </div>
                      <span class="font-label-sm text-label-sm text-on-surface-variant">Koneksi Cepat Pelabuhan Buton</span>
                    </div>

                    <div class="flex flex-col text-left md:text-right w-full md:w-auto">
                      <span class="font-headline-lg text-headline-lg text-primary font-extrabold">15:30</span>
                      <span class="font-label-lg text-label-lg text-on-surface font-semibold">Selatpanjang</span>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">Pelabuhan Tanjung Harapan</span>
                    </div>
                  </div>

                  <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div class="flex items-center gap-3">
                      <span class="px-2.5 py-1 rounded-md bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1">
                        <span class="material-symbols-outlined text-[16px]">airline_seat_recline_normal</span>
                        Sisa 35 Kursi Penumpang
                      </span>
                      <span class="px-2.5 py-1 rounded-md bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1">
                        <span class="material-symbols-outlined text-[16px]">ac_unit</span>
                        Full AC &amp; Bagasi
                      </span>
                    </div>

                    <div class="flex items-center gap-4 ml-auto">
                      <div class="flex flex-col text-right">
                        <span class="font-label-sm text-label-sm text-on-surface-variant">Tarif Penumpang</span>
                        <div class="flex items-baseline gap-1">
                          <span class="font-headline-md text-headline-md font-bold text-primary">Rp 175.000</span>
                          <span class="font-label-sm text-label-sm text-on-surface-variant">/pax</span>
                        </div>
                      </div>
                      <button class="btn-select-voyage px-5 py-2.5 rounded-lg bg-surface-container-high text-primary font-label-lg text-label-lg hover:bg-surface-container-highest transition-all active:scale-95" data-price="Rp 175.000" data-time="11:30 WIB" data-vessel="Meranti Express" type="button">Pilih Jadwal</button>
                    </div>
                  </div>
                </div>
              </article>

              <!-- CARD 4: KMP LEGUNDI (Reguler Sore) -->
              <article class="p-5 rounded-xl bg-surface-container-lowest shadow-md hover:shadow-lg transition-all">
                <div class="flex flex-col gap-4">
                  <div class="flex flex-wrap items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                        <span class="material-symbols-outlined text-[28px]">directions_boat</span>
                      </div>
                      <div class="flex flex-col">
                        <div class="flex items-center gap-2">
                          <span class="font-headline-sm text-headline-sm text-primary">Verando</span>
                          <span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-label-sm text-label-sm">Connecting Cepat</span>
                        </div>
                        <span class="font-label-md text-label-md text-on-surface-variant">Lintasan: Pelabuhan Tj. Buton ➔ Selatpanjang</span>
                      </div>
                    </div>
                    <span class="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">Speedboat Connecting</span>
                  </div>

                  <div class="p-4 rounded-xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="flex flex-col text-left w-full md:w-auto">
                      <span class="font-headline-lg text-headline-lg text-primary font-extrabold">13:30</span>
                      <span class="font-label-lg text-label-lg text-on-surface font-semibold">Pelabuhan Tj. Buton</span>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">Dermaga Speedboat</span>
                    </div>

                    <div class="flex flex-col items-center flex-1 w-full max-w-xs">
                      <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">1 Jam 30 Menit</span>
                      <div class="w-full flex items-center gap-2 my-1">
                        <div class="w-2 h-2 rounded-full bg-outline"></div>
                        <div class="flex-1 h-0.5 bg-outline/30 relative"></div>
                        <div class="w-2 h-2 rounded-full bg-outline"></div>
                      </div>
                      <span class="font-label-sm text-label-sm text-on-surface-variant">Penyeberangan Selat Air Hitam</span>
                    </div>

                    <div class="flex flex-col text-left md:text-right w-full md:w-auto">
                      <span class="font-headline-lg text-headline-lg text-primary font-extrabold">15:00</span>
                      <span class="font-label-lg text-label-lg text-on-surface font-semibold">Selatpanjang</span>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">Pelabuhan Tanjung Harapan</span>
                    </div>
                  </div>

                  <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div class="flex items-center gap-3">
                      <span class="px-2.5 py-1 rounded-md bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1">
                        <span class="material-symbols-outlined text-[16px]">airline_seat_recline_normal</span>
                        Sisa 18 Kursi Penumpang
                      </span>
                      <span class="font-label-sm text-label-sm text-on-tertiary-container flex items-center gap-1 font-semibold">
                        <span class="w-2 h-2 rounded-full bg-on-tertiary-container"></span>
                        Boarding Cepat
                      </span>
                    </div>

                    <div class="flex items-center gap-4 ml-auto">
                      <div class="flex flex-col text-right">
                        <span class="font-label-sm text-label-sm text-on-surface-variant">Tarif Penumpang</span>
                        <div class="flex items-baseline gap-1">
                          <span class="font-headline-md text-headline-md font-bold text-primary">Rp 120.000</span>
                          <span class="font-label-sm text-label-sm text-on-surface-variant">/pax</span>
                        </div>
                      </div>
                      <button class="btn-select-voyage px-5 py-2.5 rounded-lg bg-surface-container-high text-primary font-label-lg text-label-lg hover:bg-surface-container-highest transition-all active:scale-95" data-price="Rp 120.000" data-time="13:30 WIB" data-vessel="Verando" type="button">Pilih Jadwal</button>
                    </div>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </div>
        
        <!-- BOTTOM STICKY BAR: SELECTED VOYAGE TICKET CONFIRMATION -->
        <aside class="sticky bottom-0 left-0 right-0 z-40 bg-surface-container-lowest shadow-[0_-8px_24px_rgba(15,41,66,0.12)] border-t border-transparent">
          <div class="max-w-7xl mx-auto px-6 lg:px-margin py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-4 w-full sm:w-auto">
              <div class="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
                <span class="material-symbols-outlined text-[26px]">airplane_ticket</span>
              </div>

              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Jadwal Terpilih</span>
                  <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span class="font-label-sm text-label-sm text-on-surface-variant" id="selected-service-badge">Dermaga Eksekutif Sosoro</span>
                </div>
                <div class="flex items-baseline gap-2">
                  <span class="font-headline-sm text-headline-sm text-primary font-bold" id="selected-vessel-name">KM Jelatik</span>
                  <span class="font-label-lg text-label-lg text-on-surface-variant" id="selected-departure-time">(08:00 WIB)</span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
              <div class="flex flex-col text-right">
                <span class="font-label-sm text-label-sm text-on-surface-variant">Total Biaya Tiket (Termasuk Pajak)</span>
                <span class="font-headline-lg text-headline-lg font-extrabold text-primary" id="selected-price">Rp 160.000</span>
              </div>

              <a class="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-surface-tint text-on-primary font-label-lg text-label-lg shadow-lg hover:shadow-xl transition-all" data-path="isi-manifest-kendaraan" href="#">
                <span class="">Lanjut Isi Data Manifest</span>
                <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </aside>

        <!-- CLIENT INTERACTION SCRIPT -->
      </div>
    </main>

    <aside class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <div class="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-lowest shadow-[0_8px_24px_rgba(15,41,66,0.12)]">
        <span class="w-2 h-2 rounded-full bg-on-tertiary-container animate-ping"></span>
        <span class="font-label-md text-label-md text-on-surface">Online - Siap bantu cek jadwal</span>
      </div>
      <button class="flex items-center gap-2.5 px-4 py-3 rounded-full bg-primary-container text-on-primary shadow-[0_12px_28px_-4px_rgba(15,41,66,0.24)] hover:bg-primary transition-all" type="button">
        <span class="material-symbols-outlined text-[20px]">support_agent</span>
        <span class="font-label-lg text-label-lg">KapalKu Bot / Tanya CS</span>
      </button>
    </aside>

    <footer class="w-full bg-primary text-surface-container-low pt-16 pb-12 shadow-[0_-1px_12px_rgba(15,41,66,0.08)]">
      <div class="max-w-7xl mx-auto px-6 lg:px-margin flex flex-col gap-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-space-sm">
              <div class="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center">
                <span class="material-symbols-outlined text-primary text-[20px]">directions_boat</span>
              </div>
              <span class="font-headline-sm text-headline-sm text-on-primary">KapalKu</span>
            </div>
            <p class="font-body-sm text-body-sm text-on-primary-container">
              Jaringan reservasi tiket kapal penumpang, fast boat antar-pulau, dan manifest muatan logistik kendaraan maritim terpadu se-Indonesia.
            </p>
            <div class="flex items-center gap-2 text-on-tertiary-fixed">
              <span class="material-symbols-outlined text-[18px] text-tertiary-fixed">verified_user</span>
              <span class="font-label-sm text-label-sm text-surface-variant">Sertifikasi Keselamatan Ditjen Hubla</span>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <span class="font-headline-sm text-headline-sm text-on-primary">Lintasan &amp; Dermaga Mitra</span>
            <ul class="flex flex-col gap-2 font-body-sm text-body-sm text-on-primary-container">
              <li class="">Merak (Banten) - Bakauheni (Lampung)</li>
              <li class="">Ketapang (Banyuwangi) - Gilimanuk (Bali)</li>
              <li class="">Tanjung Priok - Batam &amp; Tanjung Balai</li>
              <li class="">Padangbai (Bali) - Lembar (Lombok)</li>
              <li class="">Sanur - Nusa Penida Express Fastboat</li>
            </ul>
          </div>

          <div class="flex flex-col gap-3">
            <span class="font-headline-sm text-headline-sm text-on-primary">Layanan &amp; Dukungan</span>
            <ul class="flex flex-col gap-2 font-body-sm text-body-sm text-on-primary-container">
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-secondary-fixed">call</span>
                Call Center 24/7: 1500-728
              </li>
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-secondary-fixed">mail</span>
                cs@kapalku.co.id
              </li>
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-secondary-fixed">schedule</span>
                Operasional Dermaga Non-Stop
              </li>
            </ul>
          </div>

          <div class="flex flex-col gap-3">
            <span class="font-headline-sm text-headline-sm text-on-primary">Kanal Pembayaran &amp; App</span>
            <p class="font-body-sm text-body-sm text-on-primary-container">
              Transaksi instan dan terverifikasi otomatis tiket elektronik.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm">QRIS</span>
              <span class="px-2 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm">Virtual Account</span>
              <span class="px-2 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm">Gerai Retail</span>
              <span class="px-2 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm">Kartu Debit/Kredit</span>
            </div>

            <div class="pt-2">
              <span class="font-label-sm text-label-sm text-surface-variant uppercase tracking-wider block mb-1">Unduh Aplikasi</span>
              <div class="flex gap-2">
                <div class="px-3 py-1.5 rounded bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center gap-1">
                  <span class="material-symbols-outlined text-[16px]">phone_android</span>
                  Google Play
                </div>
                <div class="px-3 py-1.5 rounded bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center gap-1">
                  <span class="material-symbols-outlined text-[16px]">phone_iphone</span>
                  App Store
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-primary-container">
          <p class="">© 2025 PT Pelayaran Digital KapalKu. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
          <div class="flex items-center gap-6">
            <a class="hover:text-on-primary transition-colors" data-path="syarat-dan-ketentuan" href="/beranda-pencarian-tiket-kapal#syarat">Syarat &amp; Ketentuan Penyeberangan</a>
            <a class="hover:text-on-primary transition-colors" data-path="kebijakan-privasi" href="/beranda-pencarian-tiket-kapal#privasi">Kebijakan Privasi</a>
            <a class="hover:text-on-primary transition-colors" data-path="asuransi-pelayaran" href="/beranda-pencarian-tiket-kapal#asuransi">Asuransi Jasa Raharja</a>
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
