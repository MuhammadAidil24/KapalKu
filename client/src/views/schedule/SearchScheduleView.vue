<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let legacyScripts = []

onMounted(() => {
  const scripts = [
    "",
    "    function setActiveCategory(btn, category) {",
    "      const pills = document.querySelectorAll('#ticket-type-group .cat-pill');",
    "      pills.forEach(p => {",
    "        p.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-sm');",
    "        p.classList.add('text-on-surface-variant');",
    "      });",
    "      btn.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-sm');",
    "      btn.classList.remove('text-on-surface-variant');",
    "    }",
    "",
    "    function minimizeChatbot() {",
    "      const panel = document.getElementById('kapalku-bot-panel');",
    "      if (panel) {",
    "        panel.classList.toggle('translate-y-80');",
    "      }",
    "    }",
    "",
    "    function closeChatbot() {",
    "      const panel = document.getElementById('kapalku-bot-panel');",
    "      if (panel) {",
    "        panel.style.display = 'none';",
    "      }",
    "    }",
    "",
    "    function sendQuickReply(btn) {",
    "      const queryText = btn.innerText.trim();",
    "      const chatBody = document.querySelector('#kapalku-bot-panel .bg-surface');",
    "      if (!chatBody) return;",
    "",
    "      // User Bubble",
    "      const userBubble = document.createElement('div');",
    "      userBubble.className = 'flex justify-end gap-2.5';",
    "      userBubble.innerHTML = `",
    "        <div class=\"rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2.5 text-on-primary font-body-md text-body-md max-w-[80%]\">",
    "          ${queryText}",
    "        </div>",
    "      `;",
    "      chatBody.appendChild(userBubble);",
    "",
    "      // AI Response with slight delay",
    "      setTimeout(() => {",
    "        const botReply = document.createElement('div');",
    "        botReply.className = 'flex items-start gap-2.5';",
    "        let responseMsg = 'Sedang mengecek data maritim BMKG terkini untuk lintasan Anda...';",
    "        if (queryText.includes('Cek Ombak')) {",
    "          responseMsg = 'Status BMKG Maritim: Selat Sunda (Merak-Bakauheni) tinggi gelombang 0.5 - 1.25m (Kategori Rendah & Aman). Seluruh dermaga beroperasi normal.';",
    "        } else if (queryText.includes('Mobil')) {",
    "          responseMsg = 'Persyaratan bawa kendaraan: Siapkan STNK asli aktif, e-KTP pengemudi, dan pastikan dimensi kendaraan sesuai golongan saat booking tiket.';",
    "        } else if (queryText.includes('Reschedule')) {",
    "          responseMsg = 'Reschedule dapat dilakukan maksimal 2 jam sebelum jam keberangkatan kapal yang dipilih via menu \"Riwayat Pesanan\".';",
    "        }",
    "",
    "        botReply.innerHTML = `",
    "          <div class=\"flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container\">",
    "            <span class=\"material-symbols-outlined text-[16px]\">directions_boat</span>",
    "          </div>",
    "          <div class=\"flex flex-col gap-1 max-w-[85%]\">",
    "            <span class=\"font-label-sm text-label-sm text-on-surface-variant\">KapalKu Bot</span>",
    "            <div class=\"rounded-2xl rounded-tl-sm bg-surface-container-lowest p-3.5 shadow-sm text-on-surface font-body-md text-body-md leading-relaxed\">",
    "              ${responseMsg}",
    "            </div>",
    "          </div>",
    "        `;",
    "        chatBody.appendChild(botReply);",
    "        chatBody.scrollTop = chatBody.scrollHeight;",
    "      }, 500);",
    "",
    "      chatBody.scrollTop = chatBody.scrollHeight;",
    "    }",
    "",
    "    function sendCustomMessage() {",
    "      const input = document.getElementById('chat-input-field');",
    "      if (!input || !input.value.trim()) return;",
    "",
    "      const messageText = input.value.trim();",
    "      input.value = '';",
    "",
    "      const chatBody = document.querySelector('#kapalku-bot-panel .bg-surface');",
    "      if (!chatBody) return;",
    "",
    "      const userBubble = document.createElement('div');",
    "      userBubble.className = 'flex justify-end gap-2.5';",
    "      userBubble.innerHTML = `",
    "        <div class=\"rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2.5 text-on-primary font-body-md text-body-md max-w-[80%]\">",
    "          ${messageText}",
    "        </div>",
    "      `;",
    "      chatBody.appendChild(userBubble);",
    "",
    "      setTimeout(() => {",
    "        const botReply = document.createElement('div');",
    "        botReply.className = 'flex items-start gap-2.5';",
    "        botReply.innerHTML = `",
    "          <div class=\"flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container\">",
    "            <span class=\"material-symbols-outlined text-[16px]\">directions_boat</span>",
    "          </div>",
    "          <div class=\"flex flex-col gap-1 max-w-[85%]\">",
    "            <span class=\"font-label-sm text-label-sm text-on-surface-variant\">KapalKu Bot</span>",
    "            <div class=\"rounded-2xl rounded-tl-sm bg-surface-container-lowest p-3.5 shadow-sm text-on-surface font-body-md text-body-md leading-relaxed\">",
    "              Terima kasih! Tim operasional pelabuhan kami siap membantu Anda terkait \"${messageText}\". Anda juga dapat menghubungi Call Center 24 Jam di 1500-728.",
    "            </div>",
    "          </div>",
    "        `;",
    "        chatBody.appendChild(botReply);",
    "        chatBody.scrollTop = chatBody.scrollHeight;",
    "      }, 600);",
    "",
    "      chatBody.scrollTop = chatBody.scrollHeight;",
    "    }",
    "",
    "    // Enter key support for chatbot input",
    "    document.getElementById('chat-input-field')?.addEventListener('keypress', function(e) {",
    "      if (e.key === 'Enter') {",
    "        sendCustomMessage();",
    "      }",
    "    });",
    "  "
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
    <header class="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_1px_8px_rgba(15,41,66,0.06)]">
      <div class="h-20 max-w-7xl mx-auto px-6 lg:px-margin flex items-center justify-between gap-space-md">
        <div class="flex items-center gap-space-lg">
          <a class="flex items-center gap-space-sm" data-path="cari-tiket-dan-rute" href="/beranda-pencarian-tiket-kapal">
            <img alt="KapalKu Brand Logo" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1VSjzN1dHUK24uRJRMMzI7h_muwtcDHLMng0F_s1Yd1kUxdn2VaFFFTnKK4cFdPhMR0ZDnj_ajeKf5CqGtVrCH0WmWRo1r8JsBdC-BMOT8XOSWDuwxPVs0qe3f_sFf53AhAGKBcMEgs8sSfh2pVIaz0GdS3-QWV-GWbRjeB_FF84Ta6ca_E9rgLg_qUcBsUdonRakYlRezx31biwfxKSSilkS0JWzzYBDT3ZFR9_5n8Uqk07thTWtTtEVI"/>
            <div class="flex flex-col">
              <span class="font-headline-sm text-headline-sm text-primary tracking-tight">
                KapalKu
              </span>
              <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                Maritime Express
              </span>
            </div>
          </a>
          <nav class="hidden xl:flex items-center gap-space-xs" data-active-classes="bg-surface-container-high text-primary font-label-lg rounded-lg">
            <a class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg" data-path="cari-tiket-dan-rute" href="/beranda-pencarian-tiket-kapal">
              Cari Tiket
              &amp;
              Rute
            </a>
            <a class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg" data-path="jadwal-keberangkatan" href="/hasil-pencarian-jadwal-kapal">
              Jadwal Keberangkatan
            </a>
            <a class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg" data-path="cek-manifest-dan-kargo" href="/formulir-reservasi-manifest">
              Cek Manifest
              &amp;
              Kargo
            </a>
            <a class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg" data-path="promo-dan-mitra-armada" href="/beranda-pencarian-tiket-kapal#promo">
              Promo
              &amp;
              Mitra Armada
            </a>
            <a class="px-3 py-2 text-on-surface-variant font-label-lg text-label-lg transition-colors hover:text-on-surface hover:bg-surface-container-low rounded-lg" data-path="riwayat-pesanan" href="/riwayat-pesanan-alur-pembatalan-refund">
              Riwayat Pesanan
            </a>
          </nav>
        </div>
        <div class="flex items-center gap-space-sm">
          <a class="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container-high text-primary transition-colors" data-path="bantuan-pelayaran" href="/beranda-pencarian-tiket-kapal#bantuan">
            <span class="w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse">
            </span>
            <span class="font-label-md text-label-md">
              Bantuan 24 Jam
            </span>
          </a>
          <div class="hidden sm:flex items-center px-2.5 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md gap-1">
            <span class="font-label-md text-label-md text-primary">
              IDR
            </span>
            <span class="text-outline-variant">
              |
            </span>
            <span class="font-label-md text-label-md text-secondary">
              ID
            </span>
          </div>
          <button aria-label="Notifikasi" class="relative p-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors" type="button">
            <span class="material-symbols-outlined text-[22px]">
              notifications
            </span>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error">
            </span>
          </button>
          <div class="flex items-center gap-space-sm pl-2">
            <img alt="Profile" class="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6IYXLCn0qyYL59jkummyuJANa9WOrKy7mZIxKFlCHjewwHOMz2Tu2eZlTYwI_PLuBoceX-VyQwL_o917V2mIX_zAprPURlBDU_ZfY4uu_HdSzUue0k6C1ZsEjnZ5RhqhktjJJUw9O45VZb0DUaWGJ8Mz3SN9GAypE7okS0PveTqL5mZJGVPmH55I66zM0Rt3KlXJSAqoRHIkmBz21RvU7l-ek00iCTIyBYwMPMRNfS4HR_g5N2BGG"/>
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
      <div class="flex flex-col w-full">
        <!-- HERO SECTION WITH INTEGRATED SEARCH ENGINE -->
        <section class="relative w-full overflow-hidden bg-primary pb-20 pt-8 lg:pt-14 text-on-primary">
          <!-- Ambient Nautical Light Gradients -->
          <div class="pointer-events-none absolute inset-0 opacity-40">
            <div class="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-secondary/30 blur-[130px]">
            </div>
            <div class="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-on-tertiary-container/20 blur-[140px]">
            </div>
            <div class="absolute bottom-0 left-1/3 h-[400px] w-[700px] rounded-full bg-surface-variant/10 blur-[100px]">
            </div>
          </div>
      
          <!-- Background Subtle Vessel Blueprint Overlay -->
          <div class="pointer-events-none absolute inset-0 opacity-5" style="background-image: radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0); background-size: 32px 32px;">
          </div>
          <div class="relative mx-auto max-w-7xl px-6 lg:px-margin">
            <!-- Breadcrumb / Live Maritime Bulletin Ticker -->
            <div class="mb-6 inline-flex items-center gap-3 rounded-full bg-surface-container-lowest/10 px-4 py-1.5 backdrop-blur-md">
              <span class="flex h-2 w-2 items-center justify-center">
                <span class="h-2 w-2 rounded-full bg-tertiary-fixed animate-ping">
                </span>
              </span>
              <span class="font-label-sm text-label-sm uppercase tracking-wider text-tertiary-fixed">
                Status Pelabuhan Real-Time
              </span>
              <span class="text-surface-variant/40">
                |
              </span>
              <span class="font-body-sm text-body-sm text-surface-container-high truncate">
                Dermaga Eksekutif Merak-Bakauheni beroperasi normal • Gelombang Selat Sunda tenang (0.5m)
              </span>
            </div>
            <!-- Hero Typography Cluster -->
            <div class="max-w-4xl">
              <h1 class="font-display-hero text-display-hero tracking-tight text-on-primary">
                Jelajahi Lautan Nusantara
                <span class="bg-gradient-to-r from-secondary-fixed via-tertiary-fixed to-secondary-container bg-clip-text text-transparent">
                  Bersama KapalKu
                </span>
              </h1>
              <p class="mt-4 font-body-lg text-body-lg text-surface-variant max-w-2xl leading-relaxed">
                Pesan tiket kapal ferry cepat, roro penumpang, kendaraan, hingga kargo pelabuhan antar pulau dalam hitungan menit. Terhubung ke 120+ dermaga resmi se-Indonesia.
              </p>
            </div>
            <!-- MAIN INTERACTIVE SEARCH ENGINE WIDGET -->

            <div class="mt-10 rounded-2xl bg-surface-container-lowest p-6 shadow-2xl lg:p-8 text-on-surface">
              <!-- Top Category Pill Switcher -->
              <div class="flex flex-wrap items-center justify-between gap-4 border-b border-surface-container pb-6">
                <div class="flex items-center rounded-xl bg-surface-container-low p-1.5" id="ticket-type-group">
                  <button class="cat-pill active flex items-center gap-2 rounded-lg bg-surface-container-lowest px-4 py-2 font-label-lg text-label-lg text-primary shadow-sm transition-all" onclick="setActiveCategory(this, 'passenger')" type="button">
                    <span class="material-symbols-outlined text-[20px]">
                      person
                    </span>
                    Penumpang Saja
                  </button>
                  <button class="cat-pill flex items-center gap-2 rounded-lg px-4 py-2 font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-all" onclick="setActiveCategory(this, 'vehicle')" type="button">
                    <span class="material-symbols-outlined text-[20px]">
                      directions_car
                    </span>
                    Penumpang
                    &amp;
                    Kendaraan
                  </button>
                  <button class="cat-pill flex items-center gap-2 rounded-lg px-4 py-2 font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-all" onclick="setActiveCategory(this, 'cargo')" type="button">
                    <span class="material-symbols-outlined text-[20px]">
                      local_shipping
                    </span>
                    Muatan Kargo / Logistik
                  </button>
                </div>
        
                <!-- Trip Type Radios -->
                <div class="flex items-center gap-6">
                  <label class="flex cursor-pointer items-center gap-2 font-label-md text-label-md text-on-surface">
                    <input checked="" class="h-4 w-4 accent-secondary text-secondary focus:ring-0" name="trip-type" type="radio" value="single"/>
                    <span class="">
                      Sekali Jalan
                    </span>
                  </label>
                  <label class="flex cursor-pointer items-center gap-2 font-label-md text-label-md text-on-surface-variant hover:text-on-surface">
                    <input class="h-4 w-4 accent-secondary text-secondary focus:ring-0" name="trip-type" type="radio" value="return"/>
                    <span class="">
                      Pulang Pergi
                    </span>
                  </label>
                </div>
              </div>
              
              <!-- Input Parameters Matrix -->
              <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-stretch">
                <!-- Port Origin & Destination Connected Group -->
                <div class="lg:col-span-5 relative grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-surface-container-low">
          
                  <!-- Origin -->
                  <div class="flex flex-col gap-1">
                    <span class="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      <span class="material-symbols-outlined text-[15px] text-secondary">
                        anchor
                      </span>
                      Pelabuhan Asal
                    </span>
                    <div class="relative">
                      <select class="w-full appearance-none rounded-lg bg-surface-container-lowest px-3 py-2.5 font-headline-sm text-headline-sm text-primary pr-8 outline-none focus:bg-surface-container-high transition-colors cursor-pointer">
                        <option selected="">
                          Pekanbaru (Pelabuhan Sungai Duku)
                        </option>
                        <option>
                          Tanjung Buton (Siak)
                        </option>
                        <option>
                          Selatpanjang (Kepulauan Meranti)
                        </option>
                      </select>
                      <span class="pointer-events-none absolute right-2.5 top-3.5 material-symbols-outlined text-outline">
                        expand_more
                      </span>
                    </div>
                    <span class="font-label-sm text-label-sm text-secondary truncate">
                      Pelabuhan Sungai Duku • Dermaga Utama
                    </span>
                  </div>
                  
                  <!-- Interconnect Flip Button -->
                  <div class="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <button aria-label="Tukar rute" class="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-lowest text-primary shadow-md hover:bg-surface-container-high transition-transform active:rotate-180" type="button">
                      <span class="material-symbols-outlined text-[18px]">
                        sync_alt
                      </span>
                    </button>
                  </div>

                  <!-- Destination -->
                  <div class="flex flex-col gap-1">
                    <span class="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      <span class="material-symbols-outlined text-[15px] text-secondary">
                        location_on
                      </span>
                      Pelabuhan Tujuan
                    </span>
                    <div class="relative">
                      <select class="w-full appearance-none rounded-lg bg-surface-container-lowest px-3 py-2.5 font-headline-sm text-headline-sm text-primary pr-8 outline-none focus:bg-surface-container-high transition-colors cursor-pointer">
                        <option selected="">
                          Selatpanjang (Kepulauan Meranti)
                        </option>
                        <option>
                          Tanjung Buton (Siak)
                        </option>
                        <option>
                          Pekanbaru (Pelabuhan Sungai Duku)
                        </option>
                      </select>
                      <span class="pointer-events-none absolute right-2.5 top-3.5 material-symbols-outlined text-outline">
                        expand_more
                      </span>
                    </div>
                    <span class="font-label-sm text-label-sm text-secondary truncate">
                      Pelabuhan Tanjung Harapan • Selatpanjang
                    </span>
                  </div>
                </div>

                <!-- Departure Date -->
                <div class="lg:col-span-2 flex flex-col justify-between p-3 rounded-xl bg-surface-container-low">
                  <span class="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    <span class="material-symbols-outlined text-[15px] text-secondary">
                      calendar_today
                    </span>
                    Tanggal Berangkat
                  </span>
                  <div class="flex items-center justify-between bg-surface-container-lowest rounded-lg px-3 py-2">
                    <div class="flex flex-col">
                      <span class="font-headline-sm text-headline-sm text-primary">
                        24 Okt 2024
                      </span>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">
                        Kamis • 14 Jadwal Tersedia
                      </span>
                    </div>
                    <span class="material-symbols-outlined text-secondary text-[22px]">
                      edit_calendar
                    </span>
                  </div>
                </div>
            
                <!-- Passengers & Vehicles Class Selection -->
                <div class="lg:col-span-3 flex flex-col justify-between p-3 rounded-xl bg-surface-container-low">
                  <span class="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    <span class="material-symbols-outlined text-[15px] text-secondary">
                      group_work
                    </span>
                    Golongan / Penumpang
                  </span>
                  <div class="flex items-center justify-between bg-surface-container-lowest rounded-lg px-3 py-2">
                    <div class="flex flex-col truncate">
                      <span class="font-headline-sm text-headline-sm text-primary truncate">
                        2 Dewasa • 1 Mobil
                      </span>
                      <span class="font-body-sm text-body-sm text-on-tertiary-container font-semibold truncate">
                        Golongan IVA (Sedan/Minibus ≤5m)
                      </span>
                    </div>
                    <span class="material-symbols-outlined text-outline text-[20px]">
                      tune
                    </span>
                  </div>
                </div>

                <!-- Service Class Selector -->
                <div class="lg:col-span-2 flex flex-col justify-between p-3 rounded-xl bg-surface-container-low">
                  <span class="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    <span class="material-symbols-outlined text-[15px] text-secondary">
                      hotel_class
                    </span>
                    Kelas Layanan
                  </span>
                  <div class="relative">
                    <select class="w-full appearance-none rounded-lg bg-surface-container-lowest px-3 py-2.5 font-headline-sm text-headline-sm text-primary pr-8 outline-none focus:bg-surface-container-high transition-colors cursor-pointer">
                      <option selected="">
                        Layanan Eksekutif
                      </option>
                      <option>
                        Layanan Reguler
                      </option>
                      <option>
                        VIP Super Express
                      </option>
                      <option>
                        Bisnis AC
                      </option>
                    </select>
                    <span class="pointer-events-none absolute right-2.5 top-3.5 material-symbols-outlined text-outline">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              <!-- Action Row: Vehicle Guarantee Alert & Orange Primary Search CTA -->
              <div class="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div class="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                  <span class="flex h-5 w-5 items-center justify-center rounded-full bg-surface-container text-secondary">
                    <span class="material-symbols-outlined text-[14px]">
                      format_image_left
                    </span>
                  </span>
                  <span class="">
                    Reservasi online menjamin slot antrean dermaga tanpa biaya calo liar.
                  </span>
                </div>
                <button class="group flex items-center justify-center gap-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] px-8 py-4 font-headline-sm text-headline-sm text-white shadow-[0_10px_25px_-5px_rgba(249,115,22,0.4)] transition-all hover:scale-[1.02] active:scale-95" type="button">
                  <span class="material-symbols-outlined text-[24px] transition-transform group-hover:rotate-12">
                    anchor
                  </span>
                  <span class="">
                    Cari Jadwal Kapal
                  </span>
                  <span class="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            <!-- Quick Pills: Popular Sea Corridors -->

            <div class="mt-8 flex flex-wrap items-center gap-2">
              <span class="font-label-md text-label-md uppercase tracking-wider text-surface-container-high flex items-center gap-1.5 mr-2">
                <span class="material-symbols-outlined text-[16px] text-secondary-fixed">
                  trending_up
                </span>
                Lintasan Populer:
              </span>
              <a class="group flex items-center gap-1.5 rounded-full bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 px-3.5 py-1.5 text-surface-variant transition-colors backdrop-blur-sm" href="#">
                <span class="font-label-md text-label-md text-on-primary">
                  Pekanbaru → Selatpanjang
                </span>
                <span class="rounded bg-secondary/60 px-1.5 py-0.5 font-label-sm text-label-sm text-on-primary">
                  Rute Utama
                </span>
              </a>
              <a class="group flex items-center gap-1.5 rounded-full bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 px-3.5 py-1.5 text-surface-variant transition-colors backdrop-blur-sm" href="#">
                <span class="font-label-md text-label-md text-on-primary">
                  Pekanbaru → Tanjung Buton
                </span>
                <span class="rounded bg-secondary/60 px-1.5 py-0.5 font-label-sm text-label-sm text-on-primary">
                  Transit Fastboat
                </span>
              </a>
              <a class="group flex items-center gap-1.5 rounded-full bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 px-3.5 py-1.5 text-surface-variant transition-colors backdrop-blur-sm" href="#">
                <span class="font-label-md text-label-md text-on-primary">
                  Tanjung Buton → Selatpanjang
                </span>
                <span class="rounded bg-on-tertiary-container/80 px-1.5 py-0.5 font-label-sm text-label-sm text-on-primary">
                  Speedboat Cepat
                </span>
              </a>
            </div>
          </div>
        </section>

        <!-- SECTION 2: 4 PILLARS OF SEAMLESS MARITIME TRAVEL -->

        <section class="w-full bg-surface py-20">
          <div class="mx-auto max-w-7xl px-6 lg:px-margin">

            <!-- Section Header with Visual Overline Tag -->

            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div class="flex flex-col gap-2">
                <span class="font-label-md text-label-md uppercase tracking-widest text-secondary flex items-center gap-2 font-bold">
                  <span class="h-1.5 w-6 rounded-full bg-secondary">
                  </span>
                  Standar Baru Reservasi Pelayaran
                </span>
                <h2 class="font-headline-xl text-headline-xl text-primary tracking-tight">
                  Keunggulan Berlayar Bersama KapalKu
                </h2>
              </div>
              <p class="font-body-md text-body-md text-on-surface-variant max-w-md">
                Sistem digital modern yang dirancang untuk menghilangkan antrean fisik di gerbang masuk pelabuhan nusantara.
              </p>
            </div>

            <!-- 4 Pillars Bento Grid -->

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              <!-- Pillar 1: QR Boarding -->

              <div class="group relative rounded-2xl bg-surface-container-lowest p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-container-low text-secondary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span class="material-symbols-outlined text-[28px]">
                    qr_code_scanner
                  </span>
                </div>
                <div class="mt-6 flex flex-col gap-2">
                  <div class="flex items-center gap-2">
                    <span class="font-label-sm text-label-sm text-secondary font-bold">
                      01 / CHECK-IN
                    </span>
                    <span class="h-1 w-1 rounded-full bg-outline-variant">
                    </span>
                    <span class="font-label-sm text-label-sm text-on-tertiary-container font-semibold">
                      Fast Track
                    </span>
                  </div>
                  <h3 class="font-headline-md text-headline-md text-primary">
                    Boarding Instan QR Code
                  </h3>
                  <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Langsung scan tiket dari smartphone di gate tollgate dermaga. Bebas antre loket fisik, cetak boarding pass hanya 3 detik.
                  </p>
                </div>

                <!-- Visual accent mini sparkline SVG -->

                <div class="mt-6 pt-4 border-t border-surface-container flex items-center justify-between text-on-surface-variant">
                  <span class="font-label-sm text-label-sm">
                    Rerata tap gate: 2.4 detik
                  </span>
                  <span class="material-symbols-outlined text-secondary text-[20px]">
                    bolt
                  </span>
                </div>
              </div>

              <!-- Pillar 2: Tracking & Dock Guarantees -->

              <div class="group relative rounded-2xl bg-surface-container-lowest p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-container-low text-secondary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span class="material-symbols-outlined text-[28px]">
                    radar
                  </span>
                </div>
                <div class="mt-6 flex flex-col gap-2">
                  <div class="flex items-center gap-2">
                    <span class="font-label-sm text-label-sm text-secondary font-bold">
                      02 / AIS TRACKING
                    </span>
                    <span class="h-1 w-1 rounded-full bg-outline-variant">
                    </span>
                    <span class="font-label-sm text-label-sm text-on-tertiary-container font-semibold">
                      99.2% Tepat Waktu
                    </span>
                  </div>
                  <h3 class="font-headline-md text-headline-md text-primary">
                    Jaminan Sandar
                    &amp;
                    On-Time
                  </h3>
                  <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Pantau posisi koordinat kapal via radar AIS maritim langsung. Dapatkan notifikasi push pembukaan dermaga dan estimasi sandar akurat.
                  </p>
                </div>
                <div class="mt-6 pt-4 border-t border-surface-container flex items-center justify-between text-on-surface-variant">
                  <span class="font-label-sm text-label-sm">
                    Satelit Maritim VTS terhubung
                  </span>
                  <span class="material-symbols-outlined text-on-tertiary-container text-[20px]">
                    satellite_alt
                  </span>
                </div>
              </div>

              <!-- Pillar 3: Jasa Raharja -->

              <div class="group relative rounded-2xl bg-surface-container-lowest p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-container-low text-secondary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span class="material-symbols-outlined text-[28px]">
                    verified_user
                  </span>
                </div>
                <div class="mt-6 flex flex-col gap-2">
                  <div class="flex items-center gap-2">
                    <span class="font-label-sm text-label-sm text-secondary font-bold">
                      03 / PROTEKSI PENUH
                    </span>
                    <span class="h-1 w-1 rounded-full bg-outline-variant">
                    </span>
                    <span class="font-label-sm text-label-sm text-on-tertiary-container font-semibold">
                      Resmi Negara
                    </span>
                  </div>
                  <h3 class="font-headline-md text-headline-md text-primary">
                    Asuransi Jasa Raharja
                  </h3>
                  <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Setiap lembar e-tiket otomatis tercakup polis perlindungan jiwa dan santunan kecelakaan angkutan laut resmi PT Jasa Raharja.
                  </p>
                </div>
                <div class="mt-6 pt-4 border-t border-surface-container flex items-center justify-between text-on-surface-variant">
                  <span class="font-label-sm text-label-sm">
                    UU No. 33
                    &amp;
                    34 Tahun 1964
                  </span>
                  <span class="material-symbols-outlined text-tertiary-fixed-dim text-[20px]">
                    policy
                  </span>
                </div>
              </div>

              <!-- Pillar 4: Flexible Reschedule -->

              <div class="group relative rounded-2xl bg-surface-container-lowest p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-container-low text-secondary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span class="material-symbols-outlined text-[28px]">
                    change_circle
                  </span>
                </div>
                <div class="mt-6 flex flex-col gap-2">
                  <div class="flex items-center gap-2">
                    <span class="font-label-sm text-label-sm text-secondary font-bold">
                      04 / FLEKSIBILITAS
                    </span>
                    <span class="h-1 w-1 rounded-full bg-outline-variant">
                    </span>
                    <span class="font-label-sm text-label-sm text-on-tertiary-container font-semibold">
                      100% Online
                    </span>
                  </div>
                  <h3 class="font-headline-md text-headline-md text-primary">
                    Reschedule
                    &amp;
                    Refund Cepat
                  </h3>
                  <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Ubah jam pelayaran hingga 2 jam sebelum keberangkatan atau ajukan pengembalian dana mandiri langsung ke rekening bank atau e-wallet.
                  </p>
                </div>
                <div class="mt-6 pt-4 border-t border-surface-container flex items-center justify-between text-on-surface-variant">
                  <span class="font-label-sm text-label-sm">
                    Refund cair ≤ 24 jam kerja
                  </span>
                  <span class="material-symbols-outlined text-secondary text-[20px]">
                    currency_exchange
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 3: FLEET & OFFICIAL OPERATOR PARTNERS -->

        <section class="w-full bg-surface-container-low py-20">
          <div class="mx-auto max-w-7xl px-6 lg:px-margin">

            <!-- Section Header -->

            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div class="flex flex-col gap-2">
                <span class="font-label-md text-label-md uppercase tracking-widest text-secondary font-bold flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px]">
                    verified
                  </span>
                  Armada Maritim Berstandar Internasional
                </span>
                <h2 class="font-headline-xl text-headline-xl text-primary tracking-tight">
                  Armada Kapal
                  &amp;
                  Mitra Operator Resmi
                </h2>
                <p class="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                  Bekerja sama erat dengan BUMN pelayaran dan operator swasta terakreditasi untuk menjamin keamanan dan kenyamanan penyeberangan Anda.
                </p>
              </div>
              <div class="flex items-center gap-3">
                <button aria-label="Armada sebelumnya" class="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-container-lowest text-primary shadow-sm hover:bg-surface-container-high transition-colors" type="button">
                  <span class="material-symbols-outlined">
                    arrow_back
                  </span>
                </button>
                <button aria-label="Armada selanjutnya" class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-on-primary shadow-sm hover:bg-primary-container transition-colors" type="button">
                  <span class="material-symbols-outlined">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            <!-- Fleet Showcase Grid -->

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div class="flex flex-col rounded-2xl bg-surface-container-lowest overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                <div class="relative h-64 w-full overflow-hidden bg-primary-container">
                  <img alt="KM Jelatik" class="h-full w-full object-cover transition-transform duration-700 hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAotxT7DqOQiD9nIBiDcMuQANt05U-y28Spq5uOCrSZQL68lQLiWc3OJX2PekvbnJCHrg1iRnGz_Rm24E77MciiQTnfORND0Ovmjv6WMWjYDak_L8ZJMAp7MvwFENrgYVREkEvbsyuJMoUGpgMxUJy66oXJqfNjCFaRaC1rZeoWT4qr-J3etLQ2U1cNH26p00leZicvl_GZDtGympfWJtOb75YkdLYm0UZA6_rRhmxl5YE14mJyNuOn"/>
                  <div class="absolute top-4 left-4 flex gap-2">
                    <span class="rounded-full bg-primary/80 backdrop-blur-md px-3 py-1 font-label-sm text-label-sm text-on-primary">
                      Kapal Penumpang Legendaris
                    </span>
                    <span class="rounded-full bg-[#166534] px-3 py-1 font-label-sm text-label-sm text-white">
                      Rute PP
                    </span>
                  </div>
                  <div class="absolute bottom-4 right-4 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 text-primary font-label-md text-label-md shadow-sm">
                    Kapasitas: 200 Pax • Muatan Kargo
                  </div>
                </div>
                <div class="p-6 lg:p-8 flex flex-col justify-between flex-1">
                  <div class="flex flex-col gap-3">
                    <div class="flex items-center justify-between">
                      <div>
                        <h3 class="font-headline-lg text-headline-lg text-primary">
                          KM Jelatik
                        </h3>
                        <p class="font-body-sm text-body-sm text-on-surface-variant">
                          Lintasan: Pekanbaru (Sungai Duku) ↔ Selatpanjang (PP)
                        </p>
                      </div>
                      <div class="text-right">
                        <span class="font-label-sm text-label-sm text-on-surface-variant block">
                          Mulai dari
                        </span>
                        <span class="font-headline-md text-headline-md text-[#F97316]">
                          Rp 160.000
                        </span>
                        <span class="font-label-sm text-label-sm text-on-surface-variant">
                          /pax
                        </span>
                      </div>
                    </div>
                    <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Kapal penumpang kayu klasik bersejarah yang nyaman dengan tempat tidur bertingkat, suasana santai menelusuri Sungai Siak hingga Selat Malaka.
                    </p>
                    <div class="my-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          bed
                        </span>
                        Tempat Tidur Kasur
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          deck
                        </span>
                        Dek Terbuka Luas
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          restaurant
                        </span>
                        Kantin
                        &amp;
                        Kopi
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          inventory_2
                        </span>
                        Bagasi Kargo Aman
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          mosque
                        </span>
                        Musholla Kapal
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          security
                        </span>
                        Pelampung SOLAS
                      </div>
                    </div>
                  </div>
                  <div class="mt-4 flex items-center justify-between pt-4 border-t border-surface-container">
                    <span class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                      <span class="material-symbols-outlined text-[16px] text-secondary">
                        schedule
                      </span>
                      Pelayaran Malam Santai
                    </span>
                    <a class="font-label-lg text-label-lg text-secondary hover:text-primary flex items-center gap-1" href="#">
                      Pilih Jadwal Kapal Ini
                      <span class="material-symbols-outlined text-[18px]">
                        chevron_right
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="flex flex-col rounded-2xl bg-surface-container-lowest overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                <div class="relative h-64 w-full overflow-hidden bg-primary-container">
                  <img alt="Nagaline" class="h-full w-full object-cover transition-transform duration-700 hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmhLG4NqJipJm8DVvAIqeIyawEZzKSrGyU13Lo9FFSXhQkLhBdrned87Iz6gS1690VxUceJO_cBaz5VP0OTgjVbrmOFiV6KI3KtoDjWX3LMzhosGw6Ebay2BsRAExxaPJPDnmWoT8kqRXPWsfrjM8NWsTBhToERzdcsZW_SLVk6VMBi7Fielk1bmQJztWl35N6ifcsiI6M-HFT4s90BYgGH_80Df0U4LWuOIvLyPEe_tSScYUZgWxJ"/>
                  <div class="absolute top-4 left-4 flex gap-2">
                    <span class="rounded-full bg-primary/80 backdrop-blur-md px-3 py-1 font-label-sm text-label-sm text-on-primary">
                      Fastboat Express
                    </span>
                    <span class="rounded-full bg-secondary px-3 py-1 font-label-sm text-label-sm text-white">
                      Kecepatan Tinggi
                    </span>
                  </div>
                  <div class="absolute bottom-4 right-4 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 text-primary font-label-md text-label-md shadow-sm">
                    Kapasitas: 120 Pax • AC Dingin
                  </div>
                </div>
                <div class="p-6 lg:p-8 flex flex-col justify-between flex-1">
                  <div class="flex flex-col gap-3">
                    <div class="flex items-center justify-between">
                      <div>
                        <h3 class="font-headline-lg text-headline-lg text-primary">
                          Nagaline
                        </h3>
                        <p class="font-body-sm text-body-sm text-on-surface-variant">
                          Lintasan: Pekanbaru (Sungai Duku) ↔ Tanjung Buton ↔ Selatpanjang
                        </p>
                      </div>
                      <div class="text-right">
                        <span class="font-label-sm text-label-sm text-on-surface-variant block">
                          Mulai dari
                        </span>
                        <span class="font-headline-md text-headline-md text-[#F97316]">
                          Rp 180.000
                        </span>
                        <span class="font-label-sm text-label-sm text-on-surface-variant">
                          /pax
                        </span>
                      </div>
                    </div>
                    <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Speedboat/fastboat cepat modern dengan mesin bertenaga tinggi, tempat duduk reclining empuk, dan koneksi langsung Tanjung Buton ke Selatpanjang.
                    </p>
                    <div class="my-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          ac_unit
                        </span>
                        Kabin Full AC
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          airline_seat_recline_extra
                        </span>
                        Kursi Reclining
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          speed
                        </span>
                        Perjalanan Cepat
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          luggage
                        </span>
                        Kompartemen Bagasi
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          tv
                        </span>
                        Layar Audio Visual
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          lifepreserver
                        </span>
                        Jaket Pelampung
                      </div>
                    </div>
                  </div>
                  <div class="mt-4 flex items-center justify-between pt-4 border-t border-surface-container">
                    <span class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                      <span class="material-symbols-outlined text-[16px] text-secondary">
                        timer
                      </span>
                      Waktu tempuh efisien
                    </span>
                    <a class="font-label-lg text-label-lg text-secondary hover:text-primary flex items-center gap-1" href="#">
                      Pilih Jadwal Kapal Ini
                      <span class="material-symbols-outlined text-[18px]">
                        chevron_right
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="flex flex-col rounded-2xl bg-surface-container-lowest overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                <div class="relative h-64 w-full overflow-hidden bg-primary-container">
                  <img alt="Meranti Express" class="h-full w-full object-cover transition-transform duration-700 hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-8mENJRKdq1f4hzibYFpcc25A5IVH_GJQUr1wleCqQqmOj6BLyG19hpSdNdPNjkK8IEpQ0qtxuM3F5s6AQ-eOYY1TT0h_ykTIuDIhqbQxS18oGSzhjGSb5IdNRN8AVQGfokh1JeJsPOMJnysazAIJywYbmmsTjKLZxBpvvvNl8kgEyF6Ef04GhU3ka5imT4z57S47MwMHh2qeLlF07JYdJ0yTDAppE-9G7JO-7Jhp-ZEFJNcRaquU"/>
                  <div class="absolute top-4 left-4 flex gap-2">
                    <span class="rounded-full bg-primary/80 backdrop-blur-md px-3 py-1 font-label-sm text-label-sm text-on-primary">
                      Speedboat Andalan
                    </span>
                    <span class="rounded-full bg-[#166534] px-3 py-1 font-label-sm text-label-sm text-white">
                      Rute Reguler
                    </span>
                  </div>
                  <div class="absolute bottom-4 right-4 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 text-primary font-label-md text-label-md shadow-sm">
                    Kapasitas: 110 Pax • Nyaman
                    &amp;
                    Cepat
                  </div>
                </div>
                <div class="p-6 lg:p-8 flex flex-col justify-between flex-1">
                  <div class="flex flex-col gap-3">
                    <div class="flex items-center justify-between">
                      <div>
                        <h3 class="font-headline-lg text-headline-lg text-primary">
                          Meranti Express
                        </h3>
                        <p class="font-body-sm text-body-sm text-on-surface-variant">
                          Lintasan: Pekanbaru ↔ Tanjung Buton ↔ Selatpanjang
                        </p>
                      </div>
                      <div class="text-right">
                        <span class="font-label-sm text-label-sm text-on-surface-variant block">
                          Mulai dari
                        </span>
                        <span class="font-headline-md text-headline-md text-[#F97316]">
                          Rp 175.000
                        </span>
                        <span class="font-label-sm text-label-sm text-on-surface-variant">
                          /pax
                        </span>
                      </div>
                    </div>
                    <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Speedboat ekspres andalan masyarakat Riau dan Kepulauan Meranti dengan armada terawat, kapten berpengalaman, dan jadwal tepat waktu setiap hari.
                    </p>
                    <div class="my-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          ac_unit
                        </span>
                        Kabin Sejuk AC
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          event_seat
                        </span>
                        Kursi Ergonomis
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          schedule
                        </span>
                        Tepat Waktu
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          luggage
                        </span>
                        Bagasi 15kg Gratis
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          verified_user
                        </span>
                        Asuransi Lengkap
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          water_drop
                        </span>
                        Air Mineral Gratis
                      </div>
                    </div>
                  </div>
                  <div class="mt-4 flex items-center justify-between pt-4 border-t border-surface-container">
                    <span class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                      <span class="material-symbols-outlined text-[16px] text-secondary">
                        timer
                      </span>
                      Jadwal Pagi
                      &amp;
                      Siang
                    </span>
                    <a class="font-label-lg text-label-lg text-secondary hover:text-primary flex items-center gap-1" href="#">
                      Pilih Jadwal Kapal Ini
                      <span class="material-symbols-outlined text-[18px]">
                        chevron_right
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="flex flex-col rounded-2xl bg-surface-container-lowest overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                <div class="relative h-64 w-full overflow-hidden bg-primary-container">
                  <img alt="Verando" class="h-full w-full object-cover transition-transform duration-700 hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgS7RR1jM67RdVjveJTFzDUhRIb4WkTvqReRpXrJW1nZX7qC7CUKO0AZeeS6L8yrvaK_uV5OuCsnVXQN6iGxM44qDU-tV6dRSB8gtHiwyPQGYHFPa5EOvMon6lYYojrHC0AbXPDyTNOUBVT5kG3v3XkfHQG505o3mHs_N1g2mktTgYyVq01SFNU_v97Rccp3igHrxMIllMWEvytnLqI16uWcWPbkcP5Z9aLxqGagzENIEsDXsy2TEF"/>
                  <div class="absolute top-4 left-4 flex gap-2">
                    <span class="rounded-full bg-primary/80 backdrop-blur-md px-3 py-1 font-label-sm text-label-sm text-on-primary">
                      Speedboat Connecting
                    </span>
                    <span class="rounded-full bg-secondary px-3 py-1 font-label-sm text-label-sm text-white">
                      Rute Pendek
                    </span>
                  </div>
                  <div class="absolute bottom-4 right-4 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 text-primary font-label-md text-label-md shadow-sm">
                    Kapasitas: 80 Pax • Akses Mudah
                  </div>
                </div>
                <div class="p-6 lg:p-8 flex flex-col justify-between flex-1">
                  <div class="flex flex-col gap-3">
                    <div class="flex items-center justify-between">
                      <div>
                        <h3 class="font-headline-lg text-headline-lg text-primary">
                          Verando
                        </h3>
                        <p class="font-body-sm text-body-sm text-on-surface-variant">
                          Lintasan: Tanjung Buton ↔ Selatpanjang (Langsung)
                        </p>
                      </div>
                      <div class="text-right">
                        <span class="font-label-sm text-label-sm text-on-surface-variant block">
                          Mulai dari
                        </span>
                        <span class="font-headline-md text-headline-md text-[#F97316]">
                          Rp 120.000
                        </span>
                        <span class="font-label-sm text-label-sm text-on-surface-variant">
                          /pax
                        </span>
                      </div>
                    </div>
                    <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Speedboat connecting / langsung menghubungkan Pelabuhan Tanjung Buton (Siak) menuju Selatpanjang dengan waktu tempuh cepat dan efisien.
                    </p>
                    <div class="my-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          bolt
                        </span>
                        Akselerasi Cepat
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          ac_unit
                        </span>
                        Kabin Nyaman AC
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          hub
                        </span>
                        Koneksi Fleksibel
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          luggage
                        </span>
                        Ruang Bagasi Cepat
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          security
                        </span>
                        Standar Navigasi
                      </div>
                      <div class="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-on-surface font-label-sm text-label-sm">
                        <span class="material-symbols-outlined text-[18px] text-secondary">
                          confirmation_number
                        </span>
                        E-Tiket Instan
                      </div>
                    </div>
                  </div>
                  <div class="mt-4 flex items-center justify-between pt-4 border-t border-surface-container">
                    <span class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                      <span class="material-symbols-outlined text-[16px] text-secondary">
                        timer
                      </span>
                      Waktu tempuh: ±60 Menit
                    </span>
                    <a class="font-label-lg text-label-lg text-secondary hover:text-primary flex items-center gap-1" href="#">
                      Pilih Jadwal Kapal Ini
                      <span class="material-symbols-outlined text-[18px]">
                        chevron_right
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Partner Logos Strip -->

            <div class="mt-12 rounded-xl bg-surface-container-lowest p-6 flex flex-wrap items-center justify-around gap-8 text-outline">
              <div class="flex items-center gap-2 font-headline-sm text-headline-sm text-primary opacity-80">
                <span class="material-symbols-outlined text-[28px] text-secondary">
                  directions_boat
                </span>
                KM Jelatik Mandiri
              </div>
              <div class="flex items-center gap-2 font-headline-sm text-headline-sm text-primary opacity-80">
                <span class="material-symbols-outlined text-[28px] text-secondary">
                  speed
                </span>
                Nagaline Fastboat
              </div>
              <div class="flex items-center gap-2 font-headline-sm text-headline-sm text-primary opacity-80">
                <span class="material-symbols-outlined text-[28px] text-secondary">
                  anchor
                </span>
                Meranti Express Maritime
              </div>
              <div class="flex items-center gap-2 font-headline-sm text-headline-sm text-primary opacity-80">
                <span class="material-symbols-outlined text-[28px] text-secondary">
                  waves
                </span>
                Verando Speedboat Line
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 4: PROMO PENYEBERANGAN & PAKET LIBURAN KEPULAUAN -->

        <section class="w-full bg-surface py-20">
          <div class="mx-auto max-w-7xl px-6 lg:px-margin">

            <!-- Section Header -->

            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div class="flex flex-col gap-2">
                <span class="font-label-md text-label-md uppercase tracking-widest text-secondary font-bold flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px]">
                    local_offer
                  </span>
                  Penawaran Eksklusif Minggu Ini
                </span>
                <h2 class="font-headline-xl text-headline-xl text-primary tracking-tight">
                  Promo Penyeberangan
                  &amp;
                  Paket Liburan
                </h2>
              </div>
              <a class="font-label-lg text-label-lg text-secondary hover:text-primary flex items-center gap-1 font-semibold" href="#">
                Lihat Semua Penawaran Spesial (18)
                <span class="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </a>
            </div>

            <!-- 3 Promo Cards -->

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

              <!-- Promo 1: Bali-Lombok Escape -->

              <div class="group relative rounded-2xl bg-surface-container-lowest overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="relative h-48 w-full overflow-hidden">
                  <img class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Tropical ocean view of Gili islands and Lombok coastline with turquoise sea water, traditional outrigger boats, and speed ferry passing by under summer sky, vivid warm tropical lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-8mENJRKdq1f4hzibYFpcc25A5IVH_GJQUr1wleCqQqmOj6BLyG19hpSdNdPNjkK8IEpQ0qtxuM3F5s6AQ-eOYY1TT0h_ykTIuDIhqbQxS18oGSzhjGSb5IdNRN8AVQGfokh1JeJsPOMJnysazAIJywYbmmsTjKLZxBpvvvNl8kgEyF6Ef04GhU3ka5imT4z57S47MwMHh2qeLlF07JYdJ0yTDAppE-9G7JO-7Jhp-ZEFJNcRaquU"/>
                  <span class="absolute top-3 left-3 rounded-md bg-[#BA1A1A] px-2.5 py-1 font-label-sm text-label-sm font-bold text-white uppercase tracking-wider">
                    Diskon 30%
                  </span>
                  <div class="absolute bottom-3 right-3 rounded-full bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 font-label-sm text-label-sm text-primary">
                    Fastboat Express
                  </div>
                </div>
                <div class="p-6 flex flex-col justify-between">
                  <div class="flex flex-col gap-2">
                    <span class="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
                      Rute Padangbai / Sanur → Lombok
                    </span>
                    <h3 class="font-headline-md text-headline-md text-primary">
                      Jelajah Pulau Nusa Penida
                      &amp;
                      Gili Trawangan
                    </h3>
                    <p class="font-body-sm text-body-sm text-on-surface-variant">
                      Tiket fastboat pulang-pergi plus voucher bagasi koper gratis 20kg. Berlaku pelayaran Senin hingga Kamis.
                    </p>
                  </div>
                  <div class="mt-6 pt-4 border-t border-surface-container flex items-center justify-between">
                    <div>
                      <span class="font-label-sm text-label-sm line-through text-outline">
                        Rp 350.000
                      </span>
                      <span class="font-headline-sm text-headline-sm text-[#F97316] font-bold block">
                        Rp 245.000
                      </span>
                    </div>
                    <button class="rounded-lg bg-surface-container-low hover:bg-primary hover:text-on-primary px-4 py-2 font-label-md text-label-md text-primary transition-colors" type="button">
                      Klaim Promo
                    </button>
                  </div>
                </div>
              </div>

              <!-- Promo 2: Weekend Car Crossings -->

              <div class="group relative rounded-2xl bg-surface-container-lowest overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="relative h-48 w-full overflow-hidden">
                  <img class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A family SUV entering a massive ro-ro ferry car deck at sunset in port terminal Merak with illuminated docking lights and maritime signs, clean realistic automotive maritime travel photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgS7RR1jM67RdVjveJTFzDUhRIb4WkTvqReRpXrJW1nZX7qC7CUKO0AZeeS6L8yrvaK_uV5OuCsnVXQN6iGxM44qDU-tV6dRSB8gtHiwyPQGYHFPa5EOvMon6lYYojrHC0AbXPDyTNOUBVT5kG3v3XkfHQG505o3mHs_N1g2mktTgYyVq01SFNU_v97Rccp3igHrxMIllMWEvytnLqI16uWcWPbkcP5Z9aLxqGagzENIEsDXsy2TEF"/>
                  <span class="absolute top-3 left-3 rounded-md bg-secondary px-2.5 py-1 font-label-sm text-label-sm font-bold text-white uppercase tracking-wider">
                    Spesial Roadtrip
                  </span>
                  <div class="absolute bottom-3 right-3 rounded-full bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 font-label-sm text-label-sm text-primary">
                    Golongan IVA / IVB
                  </div>
                </div>
                <div class="p-6 flex flex-col justify-between">
                  <div class="flex flex-col gap-2">
                    <span class="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
                      Merak ↔ Bakauheni Akhir Pekan
                    </span>
                    <h3 class="font-headline-md text-headline-md text-primary">
                      Diskon Tarif Kendaraan Pribadi 20%
                    </h3>
                    <p class="font-body-sm text-body-sm text-on-surface-variant">
                      Bawa mobil keluarga menyeberang ke Pulau Sumatra lebih hemat dengan reservasi jadwal malam dermaga eksekutif.
                    </p>
                  </div>
                  <div class="mt-6 pt-4 border-t border-surface-container flex items-center justify-between">
                    <div>
                      <span class="font-label-sm text-label-sm line-through text-outline">
                        Rp 650.000
                      </span>
                      <span class="font-headline-sm text-headline-sm text-[#F97316] font-bold block">
                        Rp 520.000
                      </span>
                    </div>
                    <button class="rounded-lg bg-surface-container-low hover:bg-primary hover:text-on-primary px-4 py-2 font-label-md text-label-md text-primary transition-colors" type="button">
                      Klaim Promo
                    </button>
                  </div>
                </div>
              </div>

              <!-- Promo 3: Cashback QRIS 15% -->

              <div class="group relative rounded-2xl bg-gradient-to-br from-primary via-primary-container to-secondary p-6 text-on-primary shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div class="flex flex-col gap-4">
                  <div class="flex items-center justify-between">
                    <span class="rounded-full bg-surface-container-lowest/20 px-3 py-1 font-label-sm text-label-sm text-tertiary-fixed backdrop-blur-sm">
                      QRIS
                      &amp;
                      Virtual Account
                    </span>
                    <span class="material-symbols-outlined text-secondary-fixed text-[32px]">
                      qr_code_2
                    </span>
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="font-headline-xl text-headline-xl text-secondary-fixed font-black">
                      CASHBACK 15%
                    </span>
                    <h3 class="font-headline-md text-headline-md text-on-primary">
                      Pembayaran Instan Tanpa Biaya Admin
                    </h3>
                    <p class="font-body-sm text-body-sm text-surface-variant leading-relaxed">
                      Gunakan kode voucher
                      <strong class="text-tertiary-fixed font-mono">
                        BERLAYARKAPALKU
                      </strong>
                      pada checkout e-wallet (GoPay, OVO, ShopeePay, Dana, BCA Mobile).
                    </p>
                  </div>
                </div>
                <div class="mt-8 rounded-xl bg-surface-container-lowest/10 p-4 backdrop-blur-md flex items-center justify-between">
                  <div class="flex flex-col">
                    <span class="font-label-sm text-label-sm text-surface-variant">
                      Periode Promo:
                    </span>
                    <span class="font-label-md text-label-md text-on-primary">
                      Hingga 31 November 2024
                    </span>
                  </div>
                  <button class="rounded-lg bg-surface-container-lowest text-primary px-4 py-2 font-label-md text-label-md font-bold shadow-md hover:bg-secondary-fixed transition-colors" type="button">
                    Salin Kupon
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 5: FLOATING CHATBOT MODAL PREVIEW (ACTIVE ON BOTTOM RIGHT) -->

        <div class="fixed bottom-24 right-6 z-50 w-84 sm:w-96 rounded-2xl bg-surface-container-lowest shadow-[0_16px_40px_rgba(15,41,66,0.18)] border border-surface-container overflow-hidden transition-all duration-300" id="kapalku-bot-panel">

          <!-- Chatbot Header -->

          <div class="flex items-center justify-between bg-primary p-4 text-on-primary">
            <div class="flex items-center gap-3">
              <div class="relative flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-on-secondary">
                <span class="material-symbols-outlined text-[22px]">
                  smart_toy
                </span>
                <span class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#166534] border-2 border-primary">
                </span>
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-1.5">
                  <span class="font-headline-sm text-headline-sm text-on-primary leading-none">
                    KapalKu AI
                  </span>
                  <span class="rounded bg-surface-container-lowest/20 px-1.5 py-0.5 font-label-sm text-label-sm text-tertiary-fixed">
                    Online
                  </span>
                </div>
                <span class="font-label-sm text-label-sm text-surface-variant">
                  Asisten Navigasi
                  &amp;
                  Penyeberangan
                </span>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <button aria-label="Kecilkan chat" class="p-1 rounded text-surface-variant hover:text-on-primary transition-colors" onclick="minimizeChatbot()" type="button">
                <span class="material-symbols-outlined text-[20px]">
                  minimize
                </span>
              </button>
              <button aria-label="Tutup chat" class="p-1 rounded text-surface-variant hover:text-on-primary transition-colors" onclick="closeChatbot()" type="button">
                <span class="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
            </div>
          </div>

          <!-- Chat Messages Body -->

          <div class="p-4 bg-surface flex flex-col gap-3 max-h-80 overflow-y-auto">

            <!-- Timestamp Marker -->

            <div class="text-center">
              <span class="font-label-sm text-label-sm text-outline-variant">
                Hari ini • 10:24 WIB
              </span>
            </div>

            <!-- AI Incoming Message -->

            <div class="flex items-start gap-2.5">
              <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
                <span class="material-symbols-outlined text-[16px]">
                  directions_boat
                </span>
              </div>
              <div class="flex flex-col gap-1 max-w-[85%]">
                <span class="font-label-sm text-label-sm text-on-surface-variant">
                  KapalKu Bot
                </span>
                <div class="rounded-2xl rounded-tl-sm bg-surface-container-lowest p-3.5 shadow-sm text-on-surface font-body-md text-body-md leading-relaxed">
                  Halo Budi! 👋 Mau cek jadwal kapal cuaca hari ini atau bantuan reservasi kendaraan melintasi Selat Sunda?
                </div>
              </div>
            </div>

            <!-- Quick Action Pill Buttons -->

            <div class="flex flex-col gap-1.5 pl-9 mt-1">
              <span class="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                Pertanyaan Cepat:
              </span>
              <div class="flex flex-wrap gap-1.5">
                <button class="rounded-full bg-surface-container px-3 py-1.5 font-label-sm text-label-sm text-primary hover:bg-secondary hover:text-on-secondary transition-colors text-left flex items-center gap-1" onclick="sendQuickReply(this)" type="button">
                  <span class="material-symbols-outlined text-[14px]">
                    tsunami
                  </span>
                  Cek Ombak Merak
                </button>
                <button class="rounded-full bg-surface-container px-3 py-1.5 font-label-sm text-label-sm text-primary hover:bg-secondary hover:text-on-secondary transition-colors text-left flex items-center gap-1" onclick="sendQuickReply(this)" type="button">
                  <span class="material-symbols-outlined text-[14px]">
                    directions_car
                  </span>
                  Syarat Bawa Mobil
                </button>
                <button class="rounded-full bg-surface-container px-3 py-1.5 font-label-sm text-label-sm text-primary hover:bg-secondary hover:text-on-secondary transition-colors text-left flex items-center gap-1" onclick="sendQuickReply(this)" type="button">
                  <span class="material-symbols-outlined text-[14px]">
                    autorenew
                  </span>
                  Cara Reschedule
                </button>
              </div>
            </div>
          </div>

          <!-- Chat Input Field Footer -->

          <div class="p-3 bg-surface-container-lowest border-t border-surface-container flex items-center gap-2">
            <input class="flex-1 rounded-xl bg-surface-container-low px-3.5 py-2 font-body-sm text-body-sm text-on-surface outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary transition-all" id="chat-input-field" placeholder="Ketik pesan atau nomor manifest..." type="text"/>
            <button aria-label="Kirim Pesan" class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F97316] text-white hover:bg-[#EA580C] transition-colors shadow-sm" onclick="sendCustomMessage()" type="button">
              <span class="material-symbols-outlined text-[18px]">
                send
              </span>
            </button>
          </div>
        </div>

        <!-- INTERACTIVE VANILLA JS SCRIPT FOR CATEGORY SWITCHING & CHATBOT INTERACTION -->

      </div>
    </main>
    <aside class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <div class="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-lowest shadow-[0_8px_24px_rgba(15,41,66,0.12)]">
        <span class="w-2 h-2 rounded-full bg-on-tertiary-container animate-ping">
        </span>
        <span class="font-label-md text-label-md text-on-surface">
          Online - Siap bantu cek jadwal
        </span>
      </div>
      <button class="flex items-center gap-2.5 px-4 py-3 rounded-full bg-primary-container text-on-primary shadow-[0_12px_28px_-4px_rgba(15,41,66,0.24)] hover:bg-primary transition-all" type="button">
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
              Lintasan
              &amp;
              Dermaga Mitra
            </span>
            <ul class="flex flex-col gap-2 font-body-sm text-body-sm text-on-primary-container">
              <li class="">
                Pekanbaru (Sungai Duku) - Selatpanjang (PP)
              </li>
              <li class="">
                Pekanbaru - Tanjung Buton - Selatpanjang
              </li>
              <li class="">
                Tanjung Buton (Siak) - Selatpanjang
              </li>
              <li class="">
                Ketapang (Banyuwangi) - Gilimanuk (Bali)
              </li>
              <li class="">
                Merak (Banten) - Bakauheni (Lampung)
              </li>
            </ul>
          </div>
          <div class="flex flex-col gap-3">
            <span class="font-headline-sm text-headline-sm text-on-primary">
              Layanan
              &amp;
              Dukungan
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
              Kanal Pembayaran
              &amp;
              App
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
          <p class="">
            © 2025 PT Pelayaran Digital KapalKu. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div class="flex items-center gap-6">
            <a class="hover:text-on-primary transition-colors" data-path="syarat-dan-ketentuan" href="/beranda-pencarian-tiket-kapal#syarat">
              Syarat
              &amp;
              Ketentuan Penyeberangan
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