const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  // Buat akun admin
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@kapalku.com" },
    update: {},
    create: {
      name: "Admin KapalKu",
      email: "admin@kapalku.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Buat pelabuhan
  const portA = await prisma.port.create({
    data: { name: "Pelabuhan Merak", city: "Banten" },
  });
  const portB = await prisma.port.create({
    data: { name: "Pelabuhan Bakauheni", city: "Lampung" },
  });

  // Buat kapal
  const ship1 = await prisma.ship.create({
    data: { name: "KM Dharma Kencana", capacity: 200 },
  });

  // Buat rute
  const route1 = await prisma.route.create({
    data: { originId: portA.id, destinationId: portB.id, durationMin: 120 },
  });

  // Buat jadwal
  await prisma.schedule.create({
    data: {
      shipId: ship1.id,
      routeId: route1.id,
      departureTime: new Date("2026-10-05T08:00:00"),
      arrivalTime: new Date("2026-10-05T10:00:00"),
      priceEkonomi: 50000,
      priceVip: 150000,
      quotaEkonomi: 100,
      quotaVip: 20,
      cargoCapacityKg: 5000,
    },
  });

  console.log("Seeder selesai! Data awal berhasil dibuat.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
