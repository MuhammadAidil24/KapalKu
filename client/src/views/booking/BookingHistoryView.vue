
<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let legacyScripts = []

onMounted(() => {
  const scripts = [
    // Tab Interaction
    "const tabButtons = document.querySelectorAll('.tab-btn');",
    "tabButtons.forEach(btn => {",
    "  btn.addEventListener('click', () => {",
    "    tabButtons.forEach(b => {",
    "      b.classList.remove('bg-primary', 'text-on-primary');",
    "      b.classList.add('bg-surface-container-lowest', 'text-on-surface-variant');",
    "    });",
    "    btn.classList.add('bg-primary', 'text-on-primary');",
    "    btn.classList.remove('bg-surface-container-lowest', 'text-on-surface-variant');",
    "  });",
    "});",

    // Dynamic Refund Calculation
    "const checkboxes = document.querySelectorAll('.item-checkbox');",
    "const baseDisplay = document.getElementById('base-amount-display');",
    "const deductionDisplay = document.getElementById('deduction-amount-display');",
    "const totalDisplay = document.getElementById('total-refund-display');",
    "const confirmBtn = document.getElementById('confirm-refund-btn');",

    "function calculateRefund() {",
    "  let currentBase = 0;",
    "  checkboxes.forEach(cb => {",
    "    if (cb.checked) {",
    "      currentBase += parseInt(cb.getAttribute('data-base-price') || 0);",
    "    }",
    "  });",

    "  const deduction = Math.round(currentBase * 0.25);",
    "  const adminInsuranceDeductions = currentBase > 0 ? 18500 : 0;",
    "  const totalRefund = Math.max(0, currentBase - deduction - adminInsuranceDeductions);",

    "  const formatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });",

    "  baseDisplay.innerText = formatter.format(currentBase);",
    "  deductionDisplay.innerText = '-' + formatter.format(deduction);",
    "  totalDisplay.innerText = formatter.format(totalRefund);",
    "  confirmBtn.innerHTML = `<span class=\"material-symbols-outlined text-[18px]\">verified</span> Konfirmasi Pengajuan Pembatalan (${formatter.format(totalRefund)})`;",

    "  if (currentBase === 0) {",
    "    confirmBtn.disabled = true;",
    "    confirmBtn.classList.add('opacity-50', 'cursor-not-allowed');",
    "  } else {",
    "    confirmBtn.disabled = false;",
    "    confirmBtn.classList.remove('opacity-50', 'cursor-not-allowed');",
    "  }",
    "}",

    "checkboxes.forEach(cb => cb.addEventListener('change', calculateRefund));",

    // Select All Shortcut
    "const selectAllBtn = document.getElementById('select-all-btn');",
    "if (selectAllBtn) {",
    "  selectAllBtn.addEventListener('click', () => {",
    "    const allChecked = Array.from(checkboxes).every(c => c.checked);",
    "    checkboxes.forEach(c => c.checked = !allChecked);",
    "    selectAllBtn.innerText = allChecked ? 'Pilih Semua Item' : 'Batalkan Pilihan Semua';",
    "    calculateRefund();",
    "  });",
    "}",

    // Scroll to interactive cancellation form
    "const openBtn = document.getElementById('open-cancellation-btn');",
    "const cancelSection = document.getElementById('refund-interactive-panel');",
    "if (openBtn && cancelSection) {",
    "  openBtn.addEventListener('click', () => {",
    "    cancelSection.scrollIntoView({ behavior: 'smooth', block: 'start' });",
    "    cancelSection.classList.add('ring-4', 'ring-secondary');",
    "    setTimeout(() => cancelSection.classList.remove('ring-4', 'ring-secondary'), 1800);",
    "  });",
    "}",

    // Cancel action button
    "const cancelActionBtn = document.getElementById('cancel-action-btn');",
    "if (cancelActionBtn) {",
    "  cancelActionBtn.addEventListener('click', () => {",
    "    window.scrollTo({ top: 0, behavior: 'smooth' });",
    "    showNotification('Pengajuan pembatalan ditutup. Tiket Anda tetap aman.');",
    "  });",
    "}",

    // Confirm Refund action
    "if (confirmBtn) {",
    "  confirmBtn.addEventListener('click', () => {",
    "    const agreed = document.getElementById('terms-agree').checked;",
    "    if (!agreed) {",
    "      alert('Mohon centang persetujuan syarat pembatalan terlebih dahulu.');",
    "      return;",
    "    }",

    "    confirmBtn.disabled = true;",
    "    confirmBtn.innerHTML = '<span class=\"material-symbols-outlined animate-spin text-[18px]\">progress_activity</span> Memproses Pengajuan...';",

    "    setTimeout(() => {",
    "      showNotification('Pengajuan Refund Berhasil Didaftarkan! Kode Klaim: RFN-9048291');",
    "      confirmBtn.innerHTML = '<span class=\"material-symbols-outlined text-[18px]\">check_circle</span> Refund Sedang Ditransfer';",
    "      confirmBtn.classList.replace('bg-rose-600', 'bg-emerald-600');",
    "    }, 1500);",
    "  });",
    "}",

    // Accordion handler
    "function toggleFaq(id) {",
    "  const el = document.getElementById(id);",
    "  const icon = document.getElementById(id + '-icon');",
    "  if (el) {",
    "    if (el.classList.contains('hidden')) {",
    "      el.classList.remove('hidden');",
    "      icon.innerText = 'expand_less';",
    "    } else {",
    "      el.classList.add('hidden');",
    "      icon.innerText = 'expand_more';",
    "    }",
    "  }",
    "}",

    // Toast Utility
    "function showNotification(msg) {",
    "  const toast = document.getElementById('toast-banner');",
    "  const toastText = document.getElementById('toast-text');",
    "  if (toast && toastText) {",
    "    toastText.innerText = msg;",
    "    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');",
    "    toast.classList.add('opacity-100', 'translate-y-0');",

    "    setTimeout(() => {",
    "      toast.classList.remove('opacity-100', 'translate-y-0');",
    "      toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');",
    "    }, 3200);",
    "  }",
    "}"
  ].join('\n')

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
    <!-- Header -->
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
            <a class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg" data-path="cari-tiket-dan-rute" href="/beranda-pencarian-tiket-kapal">
              Cari Tiket &amp; Rute
            </a>

            <a class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg" data-path="jadwal-keberangkatan" href="/hasil-pencarian-jadwal-kapal">
              Jadwal Keberangkatan
            </a>

            <a class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg" data-path="cek-manifest-dan-kargo" href="/formulir-reservasi-manifest">
              Cek Manifest &amp; Kargo
            </a>

            <a class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg" data-path="promo-dan-mitra-armada" href="/beranda-pencarian-tiket-kapal#promo">
              Promo &amp; Mitra Armada
            </a>

            <a class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg" data-path="riwayat-pesanan" href="/riwayat-pesanan-alur-pembatalan-refund">
              Riwayat Pesanan
            </a>
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
        <!-- Sub-navigation & Profile Banner -->
        <div class="w-full bg-surface-container-low py-6 shadow-sm">
          <div class="max-w-7xl mx-auto px-6 lg:px-margin flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex flex-col gap-1.5">
              <nav class="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
                <span class="hover:text-primary transition-colors cursor-pointer">Akun Saya</span>
                <span class="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
                <span class="text-primary font-semibold">Riwayat Pemesanan &amp; Pengembalian Dana</span>
              </nav>

              <h1 class="font-headline-lg text-headline-lg text-primary tracking-tight">
                Manajemen Tiket &amp; Refund
              </h1>
            </div>

            <!-- Member Badge Strip -->
            <div class="flex items-center gap-3 bg-surface-container-lowest px-4 py-2.5 rounded-xl shadow-sm">
              <div class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold font-headline-sm text-headline-sm">
                BS
              </div>

              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <span class="font-label-lg text-label-lg text-primary">Budi Santoso</span>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-label-sm text-label-sm font-bold">
                    <span class="material-symbols-outlined text-[13px] text-amber-600" style="font-variation-settings: 'FILL' 1;">stars</span>
                    Member Gold ASDP
                  </span>
                </div>

                <span class="font-body-sm text-body-sm text-on-surface-variant">
                  ID: KPK-ID-882109 • Pelayaran Prioritas
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Workspace -->
        <div class="max-w-7xl mx-auto w-full px-6 lg:px-margin py-8 flex flex-col gap-8">
          <!-- Controls: Tabs, Search & Filters -->
          <div class="flex flex-col gap-4">
            <!-- Tabs Bar -->
            <div class="flex items-center overflow-x-auto no-scrollbar gap-2 pb-1" id="status-tabs">
              <button class="tab-btn px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md flex items-center gap-2 transition-all whitespace-nowrap shadow-sm" data-tab="all">
                <span>Semua Pesanan</span>
                <span class="px-2 py-0.5 rounded-full bg-surface-container-lowest/20 text-on-primary text-[11px] font-bold">4</span>
              </button>

              <button class="tab-btn px-4 py-2 rounded-xl bg-surface-container-lowest text-on-surface-variant hover:text-primary font-label-md text-label-md flex items-center gap-2 transition-all whitespace-nowrap shadow-sm" data-tab="active">
                <span>Tiket Aktif &amp; Siap Berangkat</span>
                <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">1</span>
              </button>

              <button class="tab-btn px-4 py-2 rounded-xl bg-surface-container-lowest text-on-surface-variant hover:text-primary font-label-md text-label-md flex items-center gap-2 transition-all whitespace-nowrap shadow-sm" data-tab="pending">
                <span>Menunggu Pembayaran</span>
                <span class="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-bold">0</span>
              </button>

              <button class="tab-btn px-4 py-2 rounded-xl bg-surface-container-lowest text-on-surface-variant hover:text-primary font-label-md text-label-md flex items-center gap-2 transition-all whitespace-nowrap shadow-sm" data-tab="completed">
                <span>Selesai</span>
                <span class="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-bold">2</span>
              </button>

              <button class="tab-btn px-4 py-2 rounded-xl bg-surface-container-lowest text-on-surface-variant hover:text-primary font-label-md text-label-md flex items-center gap-2 transition-all whitespace-nowrap shadow-sm" data-tab="cancelled">
                <span>Dibatalkan &amp; Refund</span>
                <span class="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">1</span>
              </button>
            </div>

            <!-- Search & Route Quick Filters -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div class="md:col-span-6 lg:col-span-7 relative">
                <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
                <input
                  class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-lowest font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm"
                  placeholder="Cari berdasarkan Kode Booking (PNR) atau Nama Kapal / Rute..."
                  type="text"
                />
              </div>

              <div class="md:col-span-3 lg:col-span-3">
                <div class="relative w-full">
                  <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">calendar_month</span>

                  <select class="w-full pl-9 pr-8 py-2.5 rounded-xl bg-surface-container-lowest font-label-md text-label-md text-on-surface appearance-none focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm cursor-pointer">
                    <option>Semua Rentang Tanggal</option>
                    <option>30 Hari Terakhir</option>
                    <option>Bulan Ini (Oktober 2024)</option>
                    <option>Tahun 2024</option>
                  </select>

                  <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">expand_more</span>
                </div>
              </div>

              <div class="md:col-span-3 lg:col-span-2">
                <div class="relative w-full">
                  <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">directions_boat</span>

                  <select class="w-full pl-9 pr-8 py-2.5 rounded-xl bg-surface-container-lowest font-label-md text-label-md text-on-surface appearance-none focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm cursor-pointer">
                    <option>Semua Tipe Rute</option>
                    <option>Lintasan Utama Ferry</option>
                    <option>Fast Boat / Express</option>
                    <option>Ro-Ro Muatan Kargo</option>
                  </select>

                  <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Active High-Priority Booking Card (Spotlight) -->
          <div class="flex flex-col bg-surface-container-lowest rounded-2xl shadow-md overflow-hidden relative">
            <!-- Top Operational Ribbon -->
            <div class="bg-primary px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 text-on-primary">
              <div class="flex items-center gap-3">
                <span class="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-label-sm text-label-sm flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  TIKET TERBIT - SIAP BERANGKAT
                </span>

                <span class="text-on-primary-container text-body-sm">|</span>
                <span class="font-label-sm text-label-sm text-on-primary-container tracking-wider uppercase">
                  PNR: <strong class="text-on-primary font-mono text-[13px]">KPK-MRT-9048291</strong>
                </span>
              </div>

              <div class="flex items-center gap-4 text-body-sm font-body-sm text-on-primary-container">
                <span>Dipesan: <strong class="text-on-primary">24 Okt 2024, 06:12 WIB</strong></span>
                <span class="px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm font-bold">Lunas (QRIS)</span>
              </div>
            </div>

            <!-- Main Itinerary Body -->
            <div class="p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <!-- Journey Data -->
              <div class="flex-1 flex flex-col gap-6">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <!-- Departure -->
                  <div class="flex flex-col min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="px-2 py-0.5 rounded bg-surface-container-high text-on-secondary-container font-label-sm text-label-sm">
                        Dermaga Eksekutif Sosoro
                      </span>
                    </div>

                    <span class="font-headline-md text-headline-md text-primary mt-1">Pelabuhan Merak</span>
                    <span class="font-body-md text-body-md text-on-surface-variant">Banten, Selat Sunda</span>
                    <span class="font-headline-sm text-headline-sm text-primary font-bold mt-2 flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-[20px] text-secondary">schedule</span>
                      08:30 WIB
                    </span>
                  </div>

                  <!-- Route Track Visualizer -->
                  <div class="flex flex-col items-center justify-center px-4 flex-1 max-w-xs">
                    <span class="font-label-sm text-label-sm text-secondary font-bold mb-1">
                      Durasi ± 1 Jam 30 Menit
                    </span>

                    <div class="w-full flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                      <div class="h-0.5 w-full bg-surface-container-highest relative flex items-center justify-center">
                        <span class="material-symbols-outlined text-secondary text-[22px] bg-surface-container-lowest px-1" style="transform: rotate(0deg);">
                          directions_boat
                        </span>
                      </div>
                      <span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
                    </div>

                    <span class="font-body-sm text-body-sm text-outline mt-1">
                      KMP Portlink III (Eksekutif Express)
                    </span>
                  </div>

                  <!-- Arrival -->
                  <div class="flex flex-col md:items-end min-w-0 text-left md:text-right">
                    <div class="flex items-center gap-2">
                      <span class="px-2 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm">
                        Dermaga 7 Eksekutif
                      </span>
                    </div>

                    <span class="font-headline-md text-headline-md text-primary mt-1">Bakauheni</span>
                    <span class="font-body-md text-body-md text-on-surface-variant">Lampung Selatan</span>
                    <span class="font-headline-sm text-headline-sm text-on-surface font-bold mt-2">± 10:00 WIB</span>
                  </div>
                </div>

                <!-- Manifest Chips -->
                <div class="flex flex-wrap items-center gap-2 pt-2">
                  <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low text-primary font-label-md text-label-md">
                    <span class="material-symbols-outlined text-[18px] text-secondary">group</span>
                    <span>2 Penumpang Dewasa (Budi Santoso, Ratna Dewi)</span>
                  </div>

                  <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low text-primary font-label-md text-label-md">
                    <span class="material-symbols-outlined text-[18px] text-secondary">directions_car</span>
                    <span>Golongan IVA: Toyota Avanza (Plat B 1842 KPL)</span>
                  </div>

                  <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 font-label-md text-label-md">
                    <span class="material-symbols-outlined text-[18px] text-emerald-600">health_and_safety</span>
                    <span>Jasa Raharja Terproteksi</span>
                  </div>
                </div>
              </div>

              <!-- Tariff & Quick Actions Side -->
              <div class="lg:w-72 flex flex-col justify-between p-5 rounded-xl bg-surface-container-low">
                <div class="flex flex-col gap-1 pb-4">
                  <span class="font-label-md text-label-md text-on-surface-variant">Total Pembayaran Tiket</span>

                  <div class="flex items-baseline gap-1">
                    <span class="font-headline-md text-headline-md text-primary font-bold">Rp 483.500</span>
                    <span class="font-body-sm text-body-sm text-on-surface-variant">/ All-in</span>
                  </div>

                  <span class="font-label-sm text-label-sm text-emerald-700 flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px]">check_circle</span>
                    Transaksi Terverifikasi
                  </span>
                </div>

                <div class="flex flex-col gap-2.5">
                  <button class="w-full py-2.5 px-4 rounded-lg bg-primary hover:bg-inverse-surface text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 transition-all shadow-sm" onclick="showNotification('Membuka Boarding Pass Barcode...')">
                    <span class="material-symbols-outlined text-[18px]">qr_code_2</span>
                    Lihat E-Ticket &amp; QR
                  </button>

                  <div class="grid grid-cols-2 gap-2">
                    <button class="py-2 px-2.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all text-center" onclick="showNotification('Pengalihan jadwal tersedia H-2 jam.')">
                      Ubah Jadwal
                    </button>

                    <button class="py-2 px-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-label-md text-label-md transition-all text-center flex items-center justify-center gap-1" id="open-cancellation-btn">
                      <span class="material-symbols-outlined text-[16px]">cancel</span>
                      Ajukan Refund
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- DEDICATED CANCELLATION & REFUND WALKTHROUGH PANEL (Expandable Flow) -->
          <div class="w-full bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden scroll-mt-24 transition-all" id="refund-interactive-panel">
            <!-- Panel Header Bar -->
            <div class="bg-inverse-surface text-inverse-on-surface p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center">
                  <span class="material-symbols-outlined text-[24px]">currency_exchange</span>
                </div>

                <div class="flex flex-col">
                  <h2 class="font-headline-md text-headline-md text-inverse-on-surface">
                    Formulir Pengajuan Pembatalan Tiket &amp; Simulasi Refund
                  </h2>
                  <span class="font-body-sm text-body-sm text-on-primary-container">
                    ID Transaksi Terkait: KPK-MRT-9048291 • Merak - Bakauheni
                  </span>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <span class="px-3 py-1 rounded-full bg-surface-container-lowest/10 font-label-sm text-label-sm text-surface-container-high">
                  Status: Menunggu Pengisian Data
                </span>
              </div>
            </div>

            <!-- Warning Regulation Banner -->
            <div class="bg-amber-50 px-6 py-4 flex items-start gap-3">
              <span class="material-symbols-outlined text-amber-600 text-[22px] shrink-0 mt-0.5">policy</span>

              <div class="flex flex-col gap-0.5">
                <span class="font-label-md text-label-md text-amber-900 font-bold">
                  Regulasi &amp; Ketentuan Refund PM 19/2020 Ditjen Perhubungan Laut:
                </span>
                <p class="font-body-sm text-body-sm text-amber-800 leading-relaxed">
                  Pengajuan pembatalan yang dilakukan lebih dari 24 jam sebelum jadwal keberangkatan berhak menerima pengembalian hingga
                  <strong>75% dari tarif dasar tiket</strong>. Biaya administrasi gerbang/pelabuhan dan premi asuransi perlindungan penumpang tidak dapat dikembalikan.
                </p>
              </div>
            </div>

            <div class="p-6 lg:p-8 flex flex-col gap-8">
              <!-- STEP 1: Select Items -->
              <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold">1</span>
                    <h3 class="font-headline-sm text-headline-sm text-primary">
                      Pilih Item Tiket yang Ingin Dibatalkan
                    </h3>
                  </div>

                  <span class="font-label-sm text-label-sm text-secondary cursor-pointer hover:underline" id="select-all-btn">
                    Pilih Semua Item
                  </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                  <!-- Passenger 1 -->
                  <label class="item-checkbox-card relative p-4 rounded-xl bg-surface-container-low cursor-pointer flex flex-col justify-between gap-3 hover:bg-surface-container-high transition-all">
                    <div class="flex items-start justify-between">
                      <div class="flex items-center gap-2.5">
                        <span class="material-symbols-outlined text-secondary text-[22px]">person</span>
                        <div class="flex flex-col">
                          <span class="font-label-md text-label-md text-primary">Budi Santoso</span>
                          <span class="font-body-sm text-body-sm text-on-surface-variant">Dewasa (NIK: 3201****9821)</span>
                        </div>
                      </div>
                      <input checked="" class="item-checkbox w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer" data-base-price="45000" type="checkbox" />
                    </div>

                    <div class="flex items-center justify-between pt-2">
                      <span class="font-label-sm text-label-sm text-outline">Tarif Dasar</span>
                      <span class="font-label-md text-label-md text-primary">Rp 45.000</span>
                    </div>
                  </label>

                  <!-- Passenger 2 -->
                  <label class="item-checkbox-card relative p-4 rounded-xl bg-surface-container-low cursor-pointer flex flex-col justify-between gap-3 hover:bg-surface-container-high transition-all">
                    <div class="flex items-start justify-between">
                      <div class="flex items-center gap-2.5">
                        <span class="material-symbols-outlined text-secondary text-[22px]">person</span>
                        <div class="flex flex-col">
                          <span class="font-label-md text-label-md text-primary">Ratna Dewi</span>
                          <span class="font-body-sm text-body-sm text-on-surface-variant">Dewasa (NIK: 3201****4412)</span>
                        </div>
                      </div>
                      <input checked="" class="item-checkbox w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer" data-base-price="45000" type="checkbox" />
                    </div>

                    <div class="flex items-center justify-between pt-2">
                      <span class="font-label-sm text-label-sm text-outline">Tarif Dasar</span>
                      <span class="font-label-md text-label-md text-primary">Rp 45.000</span>
                    </div>
                  </label>

                  <!-- Vehicle -->
                  <label class="item-checkbox-card relative p-4 rounded-xl bg-surface-container-low cursor-pointer flex flex-col justify-between gap-3 hover:bg-surface-container-high transition-all">
                    <div class="flex items-start justify-between">
                      <div class="flex items-center gap-2.5">
                        <span class="material-symbols-outlined text-secondary text-[22px]">directions_car</span>
                        <div class="flex flex-col">
                          <span class="font-label-md text-label-md text-primary">Kendaraan Gol. IVA</span>
                          <span class="font-body-sm text-body-sm text-on-surface-variant">Toyota Avanza (B 1842 KPL)</span>
                        </div>
                      </div>
                      <input checked="" class="item-checkbox w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer" data-base-price="375000" type="checkbox" />
                    </div>

                    <div class="flex items-center justify-between pt-2">
                      <span class="font-label-sm text-label-sm text-outline">Tarif Dasar</span>
                      <span class="font-label-md text-label-md text-primary">Rp 375.000</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- STEP 2: Reason for Cancellation -->
              <div class="flex flex-col gap-3">
                <div class="flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold">2</span>
                  <h3 class="font-headline-sm text-headline-sm text-primary">Pilih Alasan Pembatalan</h3>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="relative">
                    <select class="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md appearance-none focus:outline-none focus:ring-2 focus:ring-secondary">
                      <option value="plans_changed">Perubahan Rencana Perjalanan / Wisata</option>
                      <option value="health">Kendala Medis / Kondisi Kesehatan</option>
                      <option value="weather">Peringatan Cuaca Buruk / Gelombang Selat</option>
                      <option value="vehicle_issue">Kendala Kendaraan Pribadi</option>
                      <option value="other">Alasan Lainnya</option>
                    </select>
                    <span class="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none">unfold_more</span>
                  </div>

                  <input
                    class="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="Catatan tambahan (Opsional untuk pelaporan syahbandar)..."
                    type="text"
                  />
                </div>
              </div>

              <!-- STEP 3 & 4: Refund Breakdown & Payout Channel Grid -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <!-- STEP 3: Refund Simulation Calculation Breakdown -->
                <div class="lg:col-span-7 flex flex-col gap-4 p-6 rounded-2xl bg-surface-container-low">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="w-6 h-6 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold">3</span>
                      <h3 class="font-headline-sm text-headline-sm text-primary">
                        Simulasi &amp; Rincian Pengembalian Dana
                      </h3>
                    </div>
                    <span class="font-label-sm text-label-sm text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full font-bold">
                      Pengajuan H-1 Valid (75%)
                    </span>
                  </div>

                  <div class="flex flex-col gap-3 pt-2">
                    <div class="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
                      <span>Tarif Tiket Dasar Kendaraan &amp; Penumpang Terpilih</span>
                      <span class="font-semibold text-primary" id="base-amount-display">Rp 465.000</span>
                    </div>

                    <div class="flex items-center justify-between font-body-md text-body-md text-rose-700">
                      <span class="flex items-center gap-1.5">
                        <span>Potongan Biaya Regulasi Pembatalan (25%)</span>
                        <span class="material-symbols-outlined text-[15px] text-outline cursor-help" title="Sesuai PM 19/2020 penyeberangan reguler/eksekutif">info</span>
                      </span>
                      <span class="font-semibold" id="deduction-amount-display">-Rp 116.250</span>
                    </div>

                    <div class="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
                      <span class="flex items-center gap-1.5">
                        <span>Premi Asuransi Jasa Raharja (Non-refundable)</span>
                        <span class="text-[11px] px-1.5 py-0.2 rounded bg-surface-container text-outline">Tetap Aktif</span>
                      </span>
                      <span class="font-semibold text-on-surface-variant">-Rp 15.000</span>
                    </div>

                    <div class="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
                      <span>Biaya Layanan Gerbang Tiket Terpadu</span>
                      <span class="font-semibold text-on-surface-variant">-Rp 3.500</span>
                    </div>

                    <!-- Inline Progress Indicator for Transparency -->
                    <div class="my-2 p-3 rounded-xl bg-surface-container-lowest flex flex-col gap-2">
                      <div class="flex items-center justify-between font-label-sm text-label-sm">
                        <span class="text-on-surface-variant">Efisiensi Pengembalian Dana:</span>
                        <span class="text-secondary font-bold">71.02% Dari Nilai Total Invoice</span>
                      </div>
                      <div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                        <div class="bg-secondary h-full rounded-full" style="width: 71%;"></div>
                      </div>
                    </div>

                    <!-- Grand Estimated Total Refund -->
                    <div class="flex items-center justify-between pt-3 border-t border-surface-container-highest">
                      <div class="flex flex-col">
                        <span class="font-headline-sm text-headline-sm text-primary font-bold">
                          Estimasi Total Dana Kembali
                        </span>
                        <span class="font-body-sm text-body-sm text-on-surface-variant">
                          Pencairan diproses dalam 1-3 hari kerja
                        </span>
                      </div>

                      <div class="flex flex-col items-end">
                        <span class="font-headline-xl text-headline-xl text-emerald-700 font-bold tracking-tight" id="total-refund-display">
                          Rp 330.250
                        </span>
                        <span class="font-label-sm text-label-sm text-outline">
                          Bebas potongan bank tambahan
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- STEP 4: Destination Account Choice -->
                <div class="lg:col-span-5 flex flex-col gap-4">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold">4</span>
                    <h3 class="font-headline-sm text-headline-sm text-primary">Rekening Pengembalian Dana</h3>
                  </div>

                  <!-- Choice A: KapalKu Pay (Highlighted Incentive) -->
                  <label class="p-4 rounded-xl bg-gradient-to-br from-surface-container-low to-surface-container cursor-pointer flex items-start gap-3.5 hover:shadow-md transition-all">
                    <input checked="" class="mt-1 text-secondary focus:ring-secondary w-4 h-4 cursor-pointer" name="refund_destination" type="radio" value="wallet" />

                    <div class="flex flex-col gap-1 w-full">
                      <div class="flex items-center justify-between">
                        <span class="font-label-lg text-label-lg text-primary font-bold">KapalKu Pay Wallet</span>
                        <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-label-sm font-bold animate-pulse">
                          Instan 10 Menit
                        </span>
                      </div>

                      <p class="font-body-sm text-body-sm text-on-surface-variant leading-tight">
                        Saldo langsung masuk akun + Bonus Cashback 5% untuk reservasi kapal berikutnya.
                      </p>

                      <div class="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm pt-1">
                        <span class="material-symbols-outlined text-[16px]">account_balance_wallet</span>
                        <span>Saldo Aktif Saat Ini: Rp 52.000</span>
                      </div>
                    </div>
                  </label>

                  <!-- Choice B: Bank Transfer / Original QRIS -->
                  <label class="p-4 rounded-xl bg-surface-container-low cursor-pointer flex items-start gap-3.5 hover:bg-surface-container transition-all">
                    <input class="mt-1 text-secondary focus:ring-secondary w-4 h-4 cursor-pointer" name="refund_destination" type="radio" value="original_bank" />

                    <div class="flex flex-col gap-1 w-full">
                      <div class="flex items-center justify-between">
                        <span class="font-label-lg text-label-lg text-primary font-bold">Rekening Asal / Bank Pembayar</span>
                        <span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">
                          1-3 Hari Kerja
                        </span>
                      </div>

                      <p class="font-body-sm text-body-sm text-on-surface-variant leading-tight">
                        Ditransfer kembali ke: Bank BCA • No Rekening <strong>****5891</strong> a.n. Budi Santoso
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Agreement & Final Decision Buttons -->
              <div class="flex flex-col gap-5 pt-4">
                <label class="flex items-start gap-3 cursor-pointer">
                  <input checked="" class="mt-1 w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer" id="terms-agree" type="checkbox" />

                  <span class="font-body-sm text-body-sm text-on-surface-variant">
                    Saya telah membaca, memahami, dan menyetujui seluruh ketentuan pembatalan tiket maritim ASDP/KapalKu. Saya mengonfirmasi bahwa tiket yang dibatalkan akan hangus dan hak naik kapal pada slot waktu ini otomatis dilepas kembali ke manifest publik.
                  </span>
                </label>

                <div class="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                  <button class="w-full sm:w-auto px-6 py-3 rounded-xl bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-colors" id="cancel-action-btn">
                    Batalkan Pengajuan
                  </button>

                  <button class="w-full sm:w-auto px-8 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-on-error font-label-lg text-label-lg flex items-center justify-center gap-2 transition-all shadow-md" id="confirm-refund-btn">
                    <span class="material-symbols-outlined text-[18px]">verified</span>
                    Konfirmasi Pengajuan Pembatalan (Rp 330.250)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- History Section: Completed & Past Trips -->
          <div class="flex flex-col gap-4 mt-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary text-[24px]">history</span>
                <h2 class="font-headline-md text-headline-md text-primary">
                  Riwayat Perjalanan Maritim Sebelumnya
                </h2>
              </div>
              <span class="font-label-sm text-label-sm text-on-surface-variant">
                Menampilkan 2 pelayaran selesai
              </span>
            </div>

            <!-- Past Trip Card 1: Completed Ferry -->
            <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
              <div class="flex flex-col sm:flex-row sm:items-center gap-6 flex-1">
                <div class="w-16 h-16 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-primary shrink-0">
                  <span class="material-symbols-outlined text-[28px] text-secondary">sailing</span>
                  <span class="font-label-sm text-label-sm font-bold text-outline">KET-GIL</span>
                </div>

                <div class="flex flex-col gap-1 min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-headline-sm text-headline-sm text-primary">
                      Ketapang (Banyuwangi) → Gilimanuk (Bali)
                    </span>
                    <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-label-sm font-bold">
                      SELESAI BERLAYAR
                    </span>
                  </div>

                  <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-on-surface-variant font-body-sm text-body-sm">
                    <span>Kapal: <strong class="text-on-surface">KMP Dharma Rucitra VII</strong></span>
                    <span>•</span>
                    <span>15 Sep 2024 • 14:15 WIB</span>
                    <span>•</span>
                    <span>1 Mobil + 3 Orang</span>
                  </div>

                  <span class="font-label-sm text-label-sm text-outline font-mono">
                    Kode Tiket: KPK-KTG-4401928
                  </span>
                </div>
              </div>

              <div class="flex sm:flex-col items-end justify-between sm:justify-center gap-3 shrink-0">
                <span class="font-headline-sm text-headline-sm text-primary font-bold">Rp 215.000</span>

                <div class="flex items-center gap-2">
                  <button class="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" onclick="showNotification('Mengunduh e-Invoice PDF...')">
                    Unduh Invoice
                  </button>

                  <button class="px-3.5 py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-inverse-surface transition-colors" onclick="showNotification('Menyiapkan rute Ketapang-Gilimanuk...')">
                    Pesan Lagi
                  </button>
                </div>
              </div>
            </div>

            <!-- Past Trip Card 2: Cancelled & Refunded Fastboat -->
            <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
              <div class="flex flex-col sm:flex-row sm:items-center gap-6 flex-1">
                <div class="w-16 h-16 rounded-xl bg-rose-50 flex flex-col items-center justify-center text-rose-800 shrink-0">
                  <span class="material-symbols-outlined text-[28px] text-rose-600">remove_shopping_cart</span>
                  <span class="font-label-sm text-label-sm font-bold text-rose-600">PDB-LMB</span>
                </div>

                <div class="flex flex-col gap-1 min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-headline-sm text-headline-sm text-primary">
                      Padangbai (Bali) → Lembar (Lombok)
                    </span>
                    <span class="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-label-sm text-label-sm font-bold flex items-center gap-1">
                      <span class="material-symbols-outlined text-[13px]">check_circle</span>
                      REFUND SELESAI
                    </span>
                  </div>

                  <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-on-surface-variant font-body-sm text-body-sm">
                    <span>Fastboat: <strong class="text-on-surface">Express Bahari 3B</strong></span>
                    <span>•</span>
                    <span>10 Agu 2024 • 09:00 WITA</span>
                    <span>•</span>
                    <span>2 Penumpang (Eksekutif)</span>
                  </div>

                  <div class="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg font-body-sm text-body-sm w-fit mt-1">
                    <span class="material-symbols-outlined text-[16px] text-emerald-600">account_balance</span>
                    <span>
                      Dana <strong>Rp 210.000</strong> telah ditransfer ke Rekening BCA (10 Agu 2024, 16:40 WIB)
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0">
                <div class="flex flex-col items-end">
                  <span class="font-body-sm text-body-sm text-outline line-through">Rp 280.000</span>
                  <span class="font-headline-sm text-headline-sm text-rose-700 font-bold">Refund: Rp 210.000</span>
                </div>

                <button class="px-3.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" onclick="showNotification('Membuka rincian bukti transfer...')">
                  Bukti Transfer
                </button>
              </div>
            </div>
          </div>

          <!-- FAQ & Information Collapsible Section -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 my-4">
            <!-- FAQ Accordions -->
            <div class="lg:col-span-8 flex flex-col gap-3">
              <h3 class="font-headline-sm text-headline-sm text-primary mb-1">
                Pertanyaan Seputar Pembatalan &amp; Pengembalian Dana
              </h3>

              <div class="bg-surface-container-lowest rounded-xl shadow-sm p-4 cursor-pointer" onclick="toggleFaq('faq-1')">
                <div class="flex items-center justify-between">
                  <span class="font-label-lg text-label-lg text-primary">
                    Berapa lama proses dana refund masuk ke rekening / e-wallet?
                  </span>
                  <span class="material-symbols-outlined text-outline" id="faq-1-icon">expand_more</span>
                </div>
                <div class="hidden pt-3 font-body-sm text-body-sm text-on-surface-variant leading-relaxed" id="faq-1">
                  Jika memilih KapalKu Pay, pengembalian dana selesai dalam waktu maksimal 10 menit. Untuk transfer via Bank BCA, Mandiri, BRI, atau QRIS, proses kliring antar-bank memakan waktu 1 hingga 3 hari kerja (Senin-Jumat, tidak termasuk libur nasional).
                </div>
              </div>

              <div class="bg-surface-container-lowest rounded-xl shadow-sm p-4 cursor-pointer" onclick="toggleFaq('faq-2')">
                <div class="flex items-center justify-between">
                  <span class="font-label-lg text-label-lg text-primary">
                    Apakah tiket bisa dibatalkan jika jadwal kapal tertunda (delay) atau cuaca buruk?
                  </span>
                  <span class="material-symbols-outlined text-outline" id="faq-2-icon">expand_more</span>
                </div>
                <div class="hidden pt-3 font-body-sm text-body-sm text-on-surface-variant leading-relaxed" id="faq-2">
                  Ya! Jika penundaan pelayaran disebabkan oleh peringatan cuaca buruk dari BMKG atau kendala teknis armada dari pihak operator, Anda berhak mendapatkan pengembalian penuh 100% tanpa potongan 25%. Silakan pilih alasan "Kondisi Cuaca / Force Majeure" saat pengajuan.
                </div>
              </div>

              <div class="bg-surface-container-lowest rounded-xl shadow-sm p-4 cursor-pointer" onclick="toggleFaq('faq-3')">
                <div class="flex items-center justify-between">
                  <span class="font-label-lg text-label-lg text-primary">
                    Apakah manifest kendaraan bisa dibatalkan tanpa membatalkan penumpang?
                  </span>
                  <span class="material-symbols-outlined text-outline" id="faq-3-icon">expand_more</span>
                </div>
                <div class="hidden pt-3 font-body-sm text-body-sm text-on-surface-variant leading-relaxed" id="faq-3">
                  Bisa. Sistem reservasi KapalKu mendukung partial cancel. Anda cukup menghapus centang pada manifest kendaraan Avanza dan membiarkan manifest penumpang tetap aktif pada jadwal semula.
                </div>
              </div>
            </div>

            <!-- Operational Port Contact Box -->
            <div class="lg:col-span-4 flex flex-col justify-between p-6 rounded-2xl bg-primary-container text-on-primary">
              <div class="flex flex-col gap-3">
                <div class="flex items-center gap-2 text-tertiary-fixed">
                  <span class="material-symbols-outlined text-[22px]">contact_support</span>
                  <span class="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                    Posko Layanan Pelabuhan
                  </span>
                </div>

                <h4 class="font-headline-sm text-headline-sm text-on-primary">
                  Butuh Pendampingan Darurat di Dermaga?
                </h4>

                <p class="font-body-sm text-body-sm text-on-primary-container">
                  Petugas loket refund pos Merak Sosoro dan Bakauheni siap melayani verifikasi fisik kartu identitas dan STNK 24 jam nonstop.
                </p>
              </div>

              <div class="flex flex-col gap-2 pt-6">
                <div class="flex items-center gap-2 text-surface-variant font-label-md text-label-md">
                  <span class="material-symbols-outlined text-[18px]">call</span>
                  <span>Hotline Merak Express: (0254) 571000</span>
                </div>

                <div class="flex items-center gap-2 text-surface-variant font-label-md text-label-md">
                  <span class="material-symbols-outlined text-[18px]">mark_chat_unread</span>
                  <span>WhatsApp Posko Refund: 0811-1920-728</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Notification Toast Simulation -->
        <div class="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all opacity-0 pointer-events-none translate-y-4" id="toast-banner">
          <span class="material-symbols-outlined text-secondary-fixed text-[20px]" id="toast-icon">info</span>
          <span class="font-label-md text-label-md" id="toast-text">Pemberitahuan sistem</span>
        </div>

        <!-- Client-side Logic Script -->
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
              <span class="font-label-sm text-label-sm text-surface-variant">
                Sertifikasi Keselamatan Ditjen Hubla
              </span>
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
              <span class="font-label-sm text-label-sm text-surface-variant uppercase tracking-wider block mb-1">
                Unduh Aplikasi
              </span>

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
          <p>
            © 2025 PT Pelayaran Digital KapalKu. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </p>

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
