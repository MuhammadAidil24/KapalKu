
<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let legacyScripts = []

onMounted(() => {
  const scripts = `
    // Countdown Timer Simulation (14:48)
    let totalSeconds = 14 * 60 + 48;
    const timerElement = document.getElementById('payment-timer');

    const countdownInterval = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(countdownInterval);
        if (timerElement) timerElement.innerText = "00:00 (Waktu Habis)";
        return;
      }

      totalSeconds--;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      if (timerElement) {
        timerElement.innerText = \`\${minutes < 10 ? '0' : ''}\${minutes}:\${seconds < 10 ? '0' : ''}\${seconds}\`;
      }
    }, 1000);

    // Payment Method Switching Logic
    function switchMethod(method) {
      const paneQris = document.getElementById('pane-qris');
      const paneVa = document.getElementById('pane-va');
      const paneRetail = document.getElementById('pane-retail');

      const btnQris = document.getElementById('tab-btn-qris');
      const btnVa = document.getElementById('tab-btn-va');
      const btnRetail = document.getElementById('tab-btn-retail');

      // Hide all panels
      paneQris.classList.add('hidden');
      paneVa.classList.add('hidden');
      paneRetail.classList.add('hidden');

      paneQris.classList.remove('flex');
      paneVa.classList.remove('flex');
      paneRetail.classList.remove('flex');

      // Reset button states
      [btnQris, btnVa, btnRetail].forEach(btn => {
        btn.className = "flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-3 rounded-lg font-label-md text-label-md transition-all text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low";
      });

      if (method === 'qris') {
        paneQris.classList.remove('hidden');
        paneQris.classList.add('flex');
        btnQris.className = "flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-3 rounded-lg font-label-md text-label-md transition-all bg-primary-container text-on-primary shadow-sm";
      } else if (method === 'va') {
        paneVa.classList.remove('hidden');
        paneVa.classList.add('flex');
        btnVa.className = "flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-3 rounded-lg font-label-md text-label-md transition-all bg-primary-container text-on-primary shadow-sm";
      } else if (method === 'retail') {
        paneRetail.classList.remove('hidden');
        paneRetail.classList.add('flex');
        btnRetail.className = "flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-3 rounded-lg font-label-md text-label-md transition-all bg-primary-container text-on-primary shadow-sm";
      }
    }

    // Virtual Account Selection
    function selectBank(bankName, vaNumber) {
      const vaDisplay = document.getElementById('va-number-display');
      const bankNameDisplay = document.getElementById('va-bank-name');

      if (vaDisplay) vaDisplay.innerText = vaNumber;
      if (bankNameDisplay) bankNameDisplay.innerText = bankName;

      // Toggle styling on selector elements
      const cards = document.querySelectorAll('.bank-option');

      cards.forEach(card => {
        const isSelected = card.innerText.includes(bankName);
        const icon = card.querySelector('.check-icon');

        if (isSelected) {
          card.classList.remove('bg-surface-container-low');
          card.classList.add('bg-surface-container', 'shadow-sm');

          if (icon) {
            icon.innerText = 'radio_button_checked';
            icon.classList.remove('text-outline');
            icon.classList.add('text-secondary');
          }
        } else {
          card.classList.add('bg-surface-container-low');
          card.classList.remove('bg-surface-container', 'shadow-sm');

          if (icon) {
            icon.innerText = 'radio_button_unchecked';
            icon.classList.add('text-outline');
            icon.classList.remove('text-secondary');
          }
        }
      });
    }

    // Status check simulation button
    function checkStatusBtn() {
      const txt = document.getElementById('txt-status-check');
      if (!txt) return;

      txt.innerText = 'Memeriksa...';

      setTimeout(() => {
        txt.innerText = 'Menunggu Transaksi';

        setTimeout(() => {
          txt.innerText = 'Cek Status';
        }, 2000);
      }, 1200);
    }

    // Main verification action
    function verifyPaymentSubmission() {
      const btn = document.getElementById('btn-verify-main');

      if (btn) {
        btn.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">progress_activity</span><span>Memverifikasi Mutasi Bank...</span>';
        btn.classList.add('opacity-80');
      }

      setTimeout(() => {
        const modal = document.getElementById('payment-success-modal');
        if (modal) modal.classList.remove('hidden');

        if (btn) {
          btn.innerHTML = '<span class="material-symbols-outlined text-[22px]">task_alt</span><span>Saya Sudah Membayar</span>';
          btn.classList.remove('opacity-80');
        }
      }, 1800);
    }

    function closeSuccessModal() {
      const modal = document.getElementById('payment-success-modal');
      if (modal) modal.classList.add('hidden');
    }
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
            <a class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg" data-path="jadwal-keberangkatan" href="/hasil-pencarian-jadwal-kapal">Jadwal Keberangkatan</a>
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
      <div class="flex flex-col w-full pb-20">
        <!-- Stepper Breadcrumb Header -->
        <section class="w-full bg-surface-container-low py-8 shadow-sm">
          <div class="max-w-7xl mx-auto px-6 lg:px-margin flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2 text-secondary">
                <span class="material-symbols-outlined text-[20px]">shield_lock</span>
                <span class="font-label-md text-label-md uppercase tracking-wider">Checkout Terenkripsi 256-Bit</span>
              </div>
              <h1 class="font-headline-lg text-headline-lg text-primary">Selesaikan Reservasi Pelayaran</h1>
            </div>

            <!-- Step Indicator -->
            <div class="flex items-center gap-2 sm:gap-4 bg-surface-container-lowest p-2 rounded-xl shadow-sm">
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-on-surface-variant">
                <span class="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center font-label-sm text-label-sm text-primary">✓</span>
                <span class="hidden sm:inline font-label-md text-label-md">Rute &amp; Armada</span>
              </div>
              <div class="w-6 h-0.5 bg-surface-container-high"></div>
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-on-surface-variant">
                <span class="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center font-label-sm text-label-sm text-primary">✓</span>
                <span class="hidden sm:inline font-label-md text-label-md">Data Manifest</span>
              </div>
              <div class="w-6 h-0.5 bg-secondary"></div>
              <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary shadow-sm">
                <span class="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-label-sm font-bold">3</span>
                <span class="font-label-md text-label-md">Pembayaran</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Countdown Alert & Booking ID Banner -->
        <section class="max-w-7xl mx-auto px-6 lg:px-margin w-full -mt-4">
          <div class="bg-surface-container-lowest rounded-2xl shadow-md p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-error-container/60 text-error flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[28px] animate-pulse">timer</span>
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container">Slot Ditahan Sementara</span>
                  <span class="font-body-sm text-body-sm text-on-surface-variant">KMP Portlink III (Merak - Bakauheni)</span>
                </div>
                <p class="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                  Selesaikan Pembayaran dalam:
                  <span class="text-error font-bold tracking-tight" id="payment-timer">14:48</span>
                  Menit
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 bg-surface-container-low px-4 py-2.5 rounded-xl self-start lg:self-center">
              <div class="flex flex-col">
                <span class="font-label-sm text-label-sm text-on-surface-variant uppercase">Kode Booking (PNR)</span>
                <span class="font-headline-sm text-headline-sm text-primary font-mono tracking-wider" id="booking-code">KPK-20241024-88492</span>
              </div>
              <button
                class="p-2 rounded-lg bg-surface-container-lowest text-secondary hover:text-primary transition-colors shadow-sm"
                onclick="navigator.clipboard.writeText('KPK-20241024-88492'); alert('Kode Booking disalin!');"
                title="Salin Kode Booking"
                type="button"
              >
                <span class="material-symbols-outlined text-[20px]">content_copy</span>
              </button>
            </div>
          </div>
        </section>

        <!-- 2-Column Checkout Layout -->
        <div class="max-w-7xl mx-auto px-6 lg:px-margin w-full mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- LEFT COLUMN: Payment Methods Selector & Instructions -->
          <main class="lg:col-span-7 flex flex-col gap-6">
            <!-- Payment Tabs Container -->
            <div class="bg-surface-container-lowest rounded-2xl shadow-md p-6 sm:p-8 flex flex-col gap-6">
              <div>
                <span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Kanal Resmi Pembayaran</span>
                <h2 class="font-headline-md text-headline-md text-primary mt-1">Pilih Metode Pembayaran</h2>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Transaksi diverifikasi otomatis secara real-time tanpa perlu unggah struk manual.</p>
              </div>

              <!-- Method Navigation Bar -->
              <div class="flex items-center p-1.5 bg-surface-container rounded-xl gap-1 overflow-x-auto" id="payment-tabs" role="tablist">
                <button class="flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-3 rounded-lg font-label-md text-label-md transition-all bg-primary-container text-on-primary shadow-sm" id="tab-btn-qris" onclick="switchMethod('qris')" role="tab" type="button">
                  <span class="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                  <span>QRIS</span>
                  <span class="w-2 h-2 rounded-full bg-secondary-container"></span>
                </button>

                <button class="flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-3 rounded-lg font-label-md text-label-md transition-all text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low" id="tab-btn-va" onclick="switchMethod('va')" role="tab" type="button">
                  <span class="material-symbols-outlined text-[18px]">account_balance</span>
                  <span>Virtual Account</span>
                </button>

                <button class="flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-3 rounded-lg font-label-md text-label-md transition-all text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low" id="tab-btn-retail" onclick="switchMethod('retail')" role="tab" type="button">
                  <span class="material-symbols-outlined text-[18px]">storefront</span>
                  <span>Gerai Ritel</span>
                </button>
              </div>

              <!-- TAB CONTENT 1: QRIS -->
              <section aria-labelledby="tab-btn-qris" class="flex flex-col gap-6" id="pane-qris">
                <div class="bg-surface-container-low rounded-xl p-5 flex flex-col items-center text-center gap-4">
                  <div class="flex items-center justify-between w-full pb-3">
                    <div class="flex items-center gap-2">
                      <span class="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">QRIS</span>
                      <span class="font-label-sm text-label-sm bg-surface-container-high text-primary px-2 py-0.5 rounded">Standar BI &amp; ASPI</span>
                    </div>
                    <div class="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                      <span class="w-2 h-2 rounded-full bg-on-tertiary-container animate-ping"></span>
                      <span>Aktif Terhubung</span>
                    </div>
                  </div>

                  <!-- Dynamic QR Code Card -->
                  <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-md flex flex-col items-center gap-4 max-w-sm w-full">
                    <div class="flex items-center justify-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                      <span class="material-symbols-outlined text-[16px] text-secondary">verified</span>
                      <span>NMID: ID1020038891283 - KapalKu ASDP</span>
                    </div>

                    <!-- Interactive Dynamic QR Code Vector Visual -->
                    <div class="relative w-60 h-60 bg-surface-container-lowest rounded-xl flex items-center justify-center p-3 shadow-inner">
                      <svg class="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <!-- QR Corner Finder 1 -->
                        <rect fill="#001428" height="50" rx="6" width="50" x="10" y="10"></rect>
                        <rect fill="#ffffff" height="30" rx="3" width="30" x="20" y="20"></rect>
                        <rect fill="#001428" height="18" rx="2" width="18" x="26" y="26"></rect>

                        <!-- QR Corner Finder 2 -->
                        <rect fill="#001428" height="50" rx="6" width="50" x="140" y="10"></rect>
                        <rect fill="#ffffff" height="30" rx="3" width="30" x="150" y="20"></rect>
                        <rect fill="#001428" height="18" rx="2" width="18" x="156" y="26"></rect>

                        <!-- QR Corner Finder 3 -->
                        <rect fill="#001428" height="50" rx="6" width="50" x="10" y="140"></rect>
                        <rect fill="#ffffff" height="30" rx="3" width="30" x="20" y="150"></rect>
                        <rect fill="#001428" height="18" rx="2" width="18" x="26" y="156"></rect>

                        <!-- QR Matrix Data Blocks -->
                        <path
                          d="M70,14 h10 v10 h-10 z M90,14 h8 v8 h-8 z M110,14 h12 v12 h-12 z M70,34 h16 v8 h-16 z M100,34 h8 v14 h-8 z M120,34 h8 v8 h-8 z M70,52 h24 v8 h-24 z M104,52 h14 v10 h-14 z M14,70 h14 v8 h-14 z M36,70 h8 v14 h-8 z M54,70 h8 v8 h-8 z M72,70 h18 v8 h-18 z M100,70 h10 v10 h-10 z M120,70 h20 v8 h-20 z M150,70 h10 v18 h-10 z M170,70 h16 v16 h-16 z M14,90 h8 v20 h-8 z M32,90 h18 v8 h-18 z M60,90 h22 v8 h-22 z M130,90 h14 v14 h-14 z M170,96 h16 v14 h-16 z M14,120 h16 v10 h-16 z M40,118 h12 v12 h-12 z M64,110 h16 v18 h-16 z M90,110 h24 v10 h-24 z M124,114 h14 v16 h-14 z M150,114 h20 v8 h-20 z M180,120 h10 v10 h-10 z M70,138 h12 v14 h-12 z M90,140 h14 v10 h-14 z M114,136 h16 v14 h-16 z M140,140 h8 v24 h-8 z M160,140 h14 v10 h-14 z M184,140 h8 v24 h-8 z M70,164 h24 v8 h-24 z M104,160 h10 v20 h-10 z M124,168 h26 v8 h-26 z M160,160 h12 v12 h-12 z M70,180 h14 v10 h-14 z M94,180 h18 v10 h-18 z M120,182 h20 v8 h-20 z M150,180 h18 v10 h-18 z M178,174 h14 v16 h-14 z"
                          fill="#001428"
                        ></path>

                        <!-- Center Brand Emblem -->
                        <circle cx="100" cy="100" fill="#ffffff" r="18"></circle>
                        <circle cx="100" cy="100" fill="#006398" r="14"></circle>
                        <path d="M94 103 C96 95, 104 95, 106 103 Z M93 105 L107 105 C105 108, 95 108, 93 105 Z" fill="#ffffff"></path>
                      </svg>

                      <!-- Scanning Line Animation -->
                      <div class="absolute inset-x-2 h-0.5 bg-secondary-container shadow-[0_0_8px_#5bb8fe] animate-[bounce_2s_infinite]"></div>
                    </div>

                    <!-- Amount Lock Tag -->
                    <div class="flex flex-col items-center">
                      <span class="font-label-sm text-label-sm text-on-surface-variant">Nominal Tepat Terenkripsi</span>
                      <span class="font-headline-md text-headline-md text-primary font-bold">Rp 483.500</span>
                    </div>

                    <!-- Quick Action Buttons -->
                    <div class="grid grid-cols-2 gap-2 w-full pt-2">
                      <button class="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md transition-colors" onclick="alert('Mengunduh berkas QRIS KapalKu.png');" type="button">
                        <span class="material-symbols-outlined text-[18px]">file_download</span>
                        <span>Unduh QR</span>
                      </button>

                      <button class="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-secondary font-label-md text-label-md transition-colors" id="btn-status-check" onclick="checkStatusBtn()" type="button">
                        <span class="material-symbols-outlined text-[18px]">sync</span>
                        <span id="txt-status-check">Cek Status</span>
                      </button>
                    </div>
                  </div>

                  <!-- Supported Apps Logos Matrix -->
                  <div class="w-full flex flex-col gap-2 pt-2">
                    <span class="font-label-sm text-label-sm text-on-surface-variant">Dapat dibayar melalui semua aplikasi pembayaran berlogo QRIS:</span>
                    <div class="flex flex-wrap items-center justify-center gap-2">
                      <span class="px-2.5 py-1 bg-surface-container-lowest rounded-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">BCA Mobile</span>
                      <span class="px-2.5 py-1 bg-surface-container-lowest rounded-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">Livin' Mandiri</span>
                      <span class="px-2.5 py-1 bg-surface-container-lowest rounded-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">BRImo</span>
                      <span class="px-2.5 py-1 bg-surface-container-lowest rounded-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">GoPay</span>
                      <span class="px-2.5 py-1 bg-surface-container-lowest rounded-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">OVO</span>
                      <span class="px-2.5 py-1 bg-surface-container-lowest rounded-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">ShopeePay</span>
                      <span class="px-2.5 py-1 bg-surface-container-lowest rounded-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">DANA</span>
                      <span class="px-2.5 py-1 bg-surface-container-lowest rounded-md font-label-sm text-label-sm text-primary shadow-sm font-semibold">LinkAja</span>
                    </div>
                  </div>
                </div>

                <!-- 3 Easy Steps Flow -->
                <div class="flex flex-col gap-3">
                  <span class="font-label-lg text-label-lg text-primary">Cara Pembayaran 3 Langkah Mudah:</span>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div class="bg-surface-container-low p-3.5 rounded-xl flex items-start gap-3">
                      <span class="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-sm text-label-sm shrink-0">1</span>
                      <div class="flex flex-col">
                        <span class="font-label-md text-label-md text-primary">Buka Aplikasi</span>
                        <span class="font-body-sm text-body-sm text-on-surface-variant">Buka Mobile Banking atau E-Wallet pilihan Anda.</span>
                      </div>
                    </div>

                    <div class="bg-surface-container-low p-3.5 rounded-xl flex items-start gap-3">
                      <span class="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-sm text-label-sm shrink-0">2</span>
                      <div class="flex flex-col">
                        <span class="font-label-md text-label-md text-primary">Pindai / Scan QRIS</span>
                        <span class="font-body-sm text-body-sm text-on-surface-variant">Arahkan kamera ke kode QR atau unggah screenshot QR.</span>
                      </div>
                    </div>

                    <div class="bg-surface-container-low p-3.5 rounded-xl flex items-start gap-3">
                      <span class="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-sm text-label-sm shrink-0">3</span>
                      <div class="flex flex-col">
                        <span class="font-label-md text-label-md text-primary">Konfirmasi &amp; PIN</span>
                        <span class="font-body-sm text-body-sm text-on-surface-variant">Pastikan nominal Rp 483.500 dan masukkan PIN Anda.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- TAB CONTENT 2: VIRTUAL ACCOUNT -->
              <section aria-labelledby="tab-btn-va" class="hidden flex-col gap-6" id="pane-va">
                <div class="flex flex-col gap-3">
                  <span class="font-label-md text-label-md text-on-surface-variant">Pilih Bank Penerbit Virtual Account:</span>

                  <!-- Bank List Radios -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" id="bank-selector">
                    <div class="bank-option p-4 rounded-xl bg-surface-container cursor-pointer flex items-center justify-between shadow-sm transition-all" onclick="selectBank('BCA', '80777 08129849201')">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center font-bold text-secondary font-headline-sm">BCA</div>
                        <div class="flex flex-col">
                          <span class="font-label-lg text-label-lg text-primary">BCA Virtual Account</span>
                          <span class="font-label-sm text-label-sm text-on-tertiary-container">Verifikasi &lt; 30 Detik</span>
                        </div>
                      </div>
                      <span class="material-symbols-outlined text-secondary check-icon">radio_button_checked</span>
                    </div>

                    <div class="bank-option p-4 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer flex items-center justify-between transition-all" onclick="selectBank('Mandiri', '89022 08129849201')">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center font-bold text-primary font-headline-sm">MDR</div>
                        <div class="flex flex-col">
                          <span class="font-label-lg text-label-lg text-primary">Mandiri Livin' VA</span>
                          <span class="font-label-sm text-label-sm text-on-surface-variant">Otomatis Terverifikasi</span>
                        </div>
                      </div>
                      <span class="material-symbols-outlined text-outline check-icon">radio_button_unchecked</span>
                    </div>

                    <div class="bank-option p-4 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer flex items-center justify-between transition-all" onclick="selectBank('BRI', '12888 08129849201')">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center font-bold text-secondary font-headline-sm">BRI</div>
                        <div class="flex flex-col">
                          <span class="font-label-lg text-label-lg text-primary">BRI BRIVA</span>
                          <span class="font-label-sm text-label-sm text-on-surface-variant">Otomatis Terverifikasi</span>
                        </div>
                      </div>
                      <span class="material-symbols-outlined text-outline check-icon">radio_button_unchecked</span>
                    </div>

                    <div class="bank-option p-4 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer flex items-center justify-between transition-all" onclick="selectBank('BNI', '98888 08129849201')">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center font-bold text-primary font-headline-sm">BNI</div>
                        <div class="flex flex-col">
                          <span class="font-label-lg text-label-lg text-primary">BNI Virtual Account</span>
                          <span class="font-label-sm text-label-sm text-on-surface-variant">Otomatis Terverifikasi</span>
                        </div>
                      </div>
                      <span class="material-symbols-outlined text-outline check-icon">radio_button_unchecked</span>
                    </div>
                  </div>
                </div>

                <!-- VA Details Card -->
                <div class="p-5 rounded-2xl bg-surface-container-low flex flex-col gap-4">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3">
                    <div>
                      <span class="font-label-sm text-label-sm text-on-surface-variant block">
                        Nomor Virtual Account (<span id="va-bank-name">BCA</span>)
                      </span>
                      <span class="font-headline-md text-headline-md text-primary font-mono tracking-wider font-bold" id="va-number-display">80777 08129849201</span>
                    </div>

                    <button class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors self-start sm:self-center shadow-sm" onclick="navigator.clipboard.writeText('8077708129849201'); alert('Nomor Virtual Account disalin!');" type="button">
                      <span class="material-symbols-outlined text-[18px]">content_copy</span>
                      <span>Salin Nomor VA</span>
                    </button>
                  </div>

                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3">
                    <div>
                      <span class="font-label-sm text-label-sm text-on-surface-variant block">Total Nominal Transfer</span>
                      <span class="font-headline-sm text-headline-sm text-primary font-bold">Rp 483.500</span>
                    </div>
                    <button class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container text-primary font-label-md text-label-md hover:bg-surface-container-high transition-colors self-start sm:self-center" onclick="navigator.clipboard.writeText('483500'); alert('Nominal Rp 483.500 disalin!');" type="button">
                      <span class="material-symbols-outlined text-[18px]">content_copy</span>
                      <span>Salin Nominal</span>
                    </button>
                  </div>
                </div>

                <!-- Accordion Payment Guide -->
                <div class="flex flex-col gap-2">
                  <span class="font-label-lg text-label-lg text-primary">Panduan Pembayaran Virtual Account:</span>

                  <details class="group bg-surface-container-low rounded-xl overflow-hidden p-4">
                    <summary class="flex items-center justify-between cursor-pointer list-none font-label-md text-label-md text-primary">
                      <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-secondary text-[20px]">phone_android</span>
                        <span>Petunjuk via Mobile Banking (BCA / Mandiri / BRI / BNI)</span>
                      </div>
                      <span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                    </summary>

                    <div class="mt-3 pt-3 flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
                      <p>1. Login ke aplikasi m-Banking Anda.</p>
                      <p>2. Pilih menu <strong>Transfer</strong> ➔ <strong>Virtual Account</strong>.</p>
                      <p>3. Masukkan nomor Virtual Account di atas.</p>
                      <p>4. Validasi nama penerima: <strong>KapalKu - Budi Santoso</strong> dan nominal bayar <strong>Rp 483.500</strong>.</p>
                      <p>5. Masukkan PIN transaksi dan simpan struk bukti transfer.</p>
                    </div>
                  </details>

                  <details class="group bg-surface-container-low rounded-xl overflow-hidden p-4">
                    <summary class="flex items-center justify-between cursor-pointer list-none font-label-md text-label-md text-primary">
                      <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-secondary text-[20px]">local_atm</span>
                        <span>Petunjuk via Mesin ATM</span>
                      </div>
                      <span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                    </summary>

                    <div class="mt-3 pt-3 flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
                      <p>1. Masukkan kartu ATM dan 6 digit PIN.</p>
                      <p>2. Pilih menu <strong>Transaksi Lainnya</strong> ➔ <strong>Pembayaran / Transfer VA</strong>.</p>
                      <p>3. Masukkan kode Virtual Account.</p>
                      <p>4. Konfirmasi data tiket KMP Portlink III dan selesaikan transaksi.</p>
                    </div>
                  </details>

                  <details class="group bg-surface-container-low rounded-xl overflow-hidden p-4">
                    <summary class="flex items-center justify-between cursor-pointer list-none font-label-md text-label-md text-primary">
                      <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-secondary text-[20px]">laptop_mac</span>
                        <span>Petunjuk via Internet Banking</span>
                      </div>
                      <span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                    </summary>

                    <div class="mt-3 pt-3 flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
                      <p>1. Masuk ke situs portal Internet Banking perbankan Anda.</p>
                      <p>2. Pilih menu Pembayaran Tagihan ➔ Virtual Account.</p>
                      <p>3. Isi nomor VA dan token otentikasi transaksi.</p>
                    </div>
                  </details>
                </div>
              </section>

              <!-- TAB CONTENT 3: GERAI RITEL -->
              <section aria-labelledby="tab-btn-retail" class="hidden flex-col gap-6" id="pane-retail">
                <div class="bg-surface-container-low rounded-xl p-5 flex flex-col gap-4">
                  <div class="flex items-center justify-between">
                    <span class="font-headline-sm text-headline-sm text-primary">Gerai Ritel &amp; Loket Pelabuhan</span>
                    <span class="px-2.5 py-0.5 rounded-full bg-surface-container text-on-secondary-container font-label-sm text-label-sm">Bayar Tunai / Non-Tunai</span>
                  </div>

                  <p class="font-body-sm text-body-sm text-on-surface-variant">
                    Tunjukkan kode bayar berikut ke kasir Indomaret, Alfamart, atau Loket Resmi Pelabuhan ASDP sebelum batas waktu pelunasan berakhir.
                  </p>

                  <div class="bg-surface-container-lowest p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                    <div class="flex flex-col">
                      <span class="font-label-sm text-label-sm text-on-surface-variant">Kode Pembayaran Ritel (Alfamart / Indomaret)</span>
                      <span class="font-headline-md text-headline-md text-primary font-mono font-bold tracking-wider">KPK-M77-9042</span>
                    </div>

                    <button class="px-3.5 py-2 rounded-lg bg-surface-container text-primary font-label-md text-label-md hover:bg-surface-container-high transition-colors" onclick="navigator.clipboard.writeText('KPK-M77-9042'); alert('Kode Gerai Ritel disalin!');" type="button">
                      Salin Kode
                    </button>
                  </div>

                  <div class="flex flex-col gap-2 pt-2">
                    <span class="font-label-md text-label-md text-primary">Langkah di Kasir Gerai:</span>
                    <ul class="flex flex-col gap-1.5 font-body-sm text-body-sm text-on-surface-variant list-disc pl-5">
                      <li>Sampaikan ke kasir untuk melakukan pembayaran merchant <strong>KapalKu ASDP</strong>.</li>
                      <li>Sebutkan kode pembayaran <strong>KPK-M77-9042</strong> dan nama pemesan (Budi Santoso).</li>
                      <li>Lakukan pembayaran nominal Rp 483.500 (biaya admin ritel Rp 2.500 dibayarkan terpisah ke kasir).</li>
                      <li>Simpan struk transaksi kasir sebagai bukti sah e-tiket cadangan.</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            <!-- Trust Badges & Policies -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex items-start gap-3">
                <div class="w-10 h-10 rounded-lg bg-surface-container text-secondary flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[22px]">verified_user</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-label-md text-label-md text-primary">Proteksi Penyeberangan Jasa Raharja</span>
                  <span class="font-body-sm text-body-sm text-on-surface-variant">Seluruh penumpang dan kendaraan otomatis terlindungi asuransi resmi selama di lintasan laut.</span>
                </div>
              </div>

              <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex items-start gap-3">
                <div class="w-10 h-10 rounded-lg bg-surface-container text-secondary flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[22px]">cyclone</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-label-md text-label-md text-primary">Garansi Cuaca Ekstrem BMKG</span>
                  <span class="font-body-sm text-body-sm text-on-surface-variant">Pengembalian dana 100% atau jadwal ulang tanpa biaya jika dermaga ditutup demi keselamatan.</span>
                </div>
              </div>
            </div>
          </main>

          <!-- RIGHT COLUMN: Order Summary & Instant Verification Action -->
          <aside class="lg:col-span-5 flex flex-col gap-6 sticky top-24">
            <!-- Voyage Overview Card -->
            <div class="bg-surface-container-lowest rounded-2xl shadow-md p-6 flex flex-col gap-5">
              <div class="flex items-center justify-between pb-3">
                <span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Ringkasan Tiket Kapal</span>
                <span class="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-secondary-container font-label-sm text-label-sm font-semibold">Reguler Eksekutif</span>
              </div>

              <!-- Vessel & Crossing Details -->
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[28px]">directions_boat</span>
                </div>

                <div class="flex flex-col">
                  <h3 class="font-headline-sm text-headline-sm text-primary">KMP Portlink III</h3>
                  <span class="font-body-sm text-body-sm text-on-surface-variant">Operator: PT ASDP Indonesia Ferry (Persero)</span>
                  <div class="flex items-center gap-1.5 mt-1 text-on-tertiary-container font-label-sm text-label-sm">
                    <span class="w-2 h-2 rounded-full bg-on-tertiary-container"></span>
                    <span>Dermaga Eksekutif Sosoro</span>
                  </div>
                </div>
              </div>

              <!-- Route Indicator Maplet -->
              <div class="bg-surface-container-low p-4 rounded-xl flex flex-col gap-3">
                <div class="flex items-center justify-between">
                  <div class="flex flex-col">
                    <span class="font-headline-sm text-headline-sm text-primary font-bold">08:30 WIB</span>
                    <span class="font-label-md text-label-md text-on-surface">Pelabuhan Merak</span>
                    <span class="font-body-sm text-body-sm text-on-surface-variant">Dermaga Eksekutif</span>
                  </div>

                  <div class="flex flex-col items-center px-2">
                    <span class="font-label-sm text-label-sm text-secondary">± 2 Jam Layar</span>
                    <div class="flex items-center gap-1 w-20 justify-center">
                      <span class="w-2 h-2 rounded-full bg-secondary"></span>
                      <span class="h-0.5 w-full bg-secondary"></span>
                      <span class="material-symbols-outlined text-[16px] text-secondary">navigation</span>
                    </div>
                    <span class="font-label-sm text-label-sm text-on-surface-variant">Selat Sunda</span>
                  </div>

                  <div class="flex flex-col items-end">
                    <span class="font-headline-sm text-headline-sm text-primary font-bold">10:30 WIB</span>
                    <span class="font-label-md text-label-md text-on-surface">Bakauheni</span>
                    <span class="font-body-sm text-body-sm text-on-surface-variant">Dermaga Eksekutif Anjungan</span>
                  </div>
                </div>

                <div class="pt-2 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-[16px]">calendar_today</span>
                    Kamis, 24 Oktober 2024
                  </span>
                  <span class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-[16px]">verified</span>
                    Tiket Barcode Masuk Port
                  </span>
                </div>
              </div>

              <!-- Passenger & Vehicle Manifest Info -->
              <div class="flex flex-col gap-3 pt-1">
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-[20px] text-on-surface-variant">directions_car</span>
                    <div class="flex flex-col">
                      <span class="font-label-md text-label-md text-primary">Kendaraan Golongan IVA</span>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">Mobil Penumpang ≤ 5m</span>
                    </div>
                  </div>
                  <span class="px-2.5 py-1 rounded bg-surface-container font-mono font-bold text-label-md text-primary">B 1842 KPL</span>
                </div>

                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-[20px] text-on-surface-variant">group</span>
                    <div class="flex flex-col">
                      <span class="font-label-md text-label-md text-primary">Penumpang Terdaftar (2 Jiwa)</span>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">1. Budi Santoso (Dewasa)</span>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">2. Ratna Dewi (Dewasa)</span>
                    </div>
                  </div>
                  <span class="font-label-sm text-label-sm text-secondary bg-surface-container-high px-2 py-0.5 rounded">Termasuk Gol. IV</span>
                </div>
              </div>

              <!-- Detailed Tariff Breakdown -->
              <div class="bg-surface-container-low/60 rounded-xl p-4 flex flex-col gap-2 mt-2">
                <span class="font-label-md text-label-md text-primary font-bold">Rincian Tarif Penyeberangan:</span>

                <div class="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Tarif Dasar Kapal Eksekutif (Gol IVA)</span>
                  <span class="text-primary font-medium">Rp 448.000</span>
                </div>
                <div class="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Iuran Wajib Asuransi Jasa Raharja</span>
                  <span class="text-primary font-medium">Rp 7.000</span>
                </div>
                <div class="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Retribusi Jasa Dermaga &amp; Sandar Kapal</span>
                  <span class="text-primary font-medium">Rp 24.000</span>
                </div>
                <div class="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>PPN Maritim 1.1% &amp; Sistem IT Port</span>
                  <span class="text-primary font-medium">Rp 4.500</span>
                </div>

                <div class="pt-3 mt-1 flex items-center justify-between">
                  <div class="flex flex-col">
                    <span class="font-label-sm text-label-sm text-on-surface-variant uppercase">Total Tagihan Final</span>
                    <span class="font-headline-lg text-headline-lg text-primary font-bold">Rp 483.500</span>
                  </div>
                  <span class="font-label-sm text-label-sm px-2.5 py-1 rounded bg-surface-container text-on-tertiary-container font-semibold">Bebas Biaya Admin QR</span>
                </div>
              </div>

              <!-- Primary Verification CTA Button -->
              <button class="w-full py-4 rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm hover:bg-inverse-surface shadow-md flex items-center justify-center gap-2 transition-all" id="btn-verify-main" onclick="verifyPaymentSubmission()" type="button">
                <span class="material-symbols-outlined text-[22px]">task_alt</span>
                <span>Saya Sudah Membayar</span>
              </button>

              <p class="font-label-sm text-label-sm text-on-surface-variant text-center">
                Klik tombol di atas untuk sinkronisasi seketika manifest tiket pelabuhan jika notifikasi e-tiket belum masuk ke ponsel Anda.
              </p>

              <!-- Visual Vessel Cardlet Snapshot -->
              <div class="relative w-full h-28 rounded-xl overflow-hidden shadow-sm">
                <div
                  class="bg-cover bg-center w-full h-full"
                  data-alt="A modern large roll-on roll-off passenger ferry KMP Portlink III navigating calm deep blue ocean waters during morning sunlight, clean nautical design, Indonesian maritime landscape in background"
                  style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFK-IDJzpS95lBUShugSzhqx0gBOOToHNJ4OFgOofCJiyLIOzCmy2I_lYqEV5pSyYl4QeDline50gMOt8nCRHoG4DgxoB5L3g1Hq8Z0CAd6qkMcWR1xtPRWxzjmFTsWCAy85EFkHm1p_dvYUPyFvCyDINQNcNFXtr9cSWQyGdPp8rI4jcFYaHUmVhhwQqiWKerVtMzcFX79MvhSSjjsUh-B11AUObE570mP8q7chsA19S8lXb86XmY')"
                ></div>
                <div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex items-end p-3">
                  <span class="font-label-sm text-label-sm text-on-primary flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[16px] text-tertiary-fixed">directions_boat</span>
                    Armada Siap Sandar di Merak Dermaga 6 Eksekutif
                  </span>
                </div>
              </div>
            </div>

            <!-- Live Help Callout -->
            <div class="bg-surface-container-low p-4 rounded-xl flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-surface-container-high text-primary flex items-center justify-center">
                  <span class="material-symbols-outlined text-[20px]">help_outline</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-label-md text-label-md text-primary">Kendala saat bayar?</span>
                  <span class="font-body-sm text-body-sm text-on-surface-variant">Hubungi Petugas Gate ASDP via WhatsApp</span>
                </div>
              </div>
              <button class="px-3 py-1.5 rounded-lg bg-surface-container-lowest font-label-md text-label-md text-secondary hover:text-primary transition-colors shadow-sm" onclick="alert('Membuka Bantuan CS 24 Jam via WhatsApp...');" type="button">
                Bantuan
              </button>
            </div>
          </aside>
        </div>

        <!-- Interactive Modal / Confirmation Popup Simulated Notification -->
        <div class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-container/60 backdrop-blur-sm" id="payment-success-modal">
          <div class="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl flex flex-col items-center text-center gap-4 animate-[fadeIn_0.3s_ease-out]">
            <div class="w-16 h-16 rounded-full bg-surface-container-high text-secondary flex items-center justify-center">
              <span class="material-symbols-outlined text-[36px] text-on-tertiary-container">check_circle</span>
            </div>

            <div class="flex flex-col gap-1">
              <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Pembayaran Diterima</span>
              <h3 class="font-headline-md text-headline-md text-primary">Tiket Elektronik Terbit!</h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Pelunasan Rp 483.500 telah berhasil diverifikasi oleh sistem loket ASDP Merak. Barcode boarding pass telah dikirimkan ke email dan nomor WhatsApp pemesan.
              </p>
            </div>

            <div class="bg-surface-container-low p-3.5 rounded-xl w-full flex items-center justify-between font-mono text-label-md">
              <span class="text-on-surface-variant">Kode Manifest:</span>
              <span class="text-primary font-bold">KPK-20241024-88492</span>
            </div>

            <div class="flex flex-col gap-2 w-full pt-2">
              <button class="w-full py-3 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-inverse-surface transition-colors" onclick="closeSuccessModal()" type="button">
                Lihat E-Tiket &amp; Barcode Boarding
              </button>
              <button class="w-full py-2.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors" onclick="closeSuccessModal()" type="button">
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Client-side Script for Tabs, Bank Toggle, Timer & Simulated Payment Check -->
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
              <li>Merak (Banten) - Bakauheni (Lampung)</li>
              <li>Ketapang (Banyuwangi) - Gilimanuk (Bali)</li>
              <li>Tanjung Priok - Batam &amp; Tanjung Balai</li>
              <li>Padangbai (Bali) - Lembar (Lombok)</li>
              <li>Sanur - Nusa Penida Express Fastboat</li>
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
          <p>© 2025 PT Pelayaran Digital KapalKu. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
          <div class="flex items-center gap-6">
            <a class="hover:text-on-primary transition-colors" data-path="syarat-dan-ketentuan" href="/beranda-pencarian-tiket-kapal#syarat">
              Syarat &amp; Ketentuan Penyeberangan
            </a>
            <a class="hover:text-on-primary transition-colors" data-path="kebijakan-privasi" href="/beranda-pencarian-tiket-kapal#privasi">
              Kebijakan Privasi
            </a>
            <a class="hover:text-on-primary transition-colors" data-path="asuransi-pelayaran" href="/beranda-pencarian-tiket-kapal#asuransi">
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
