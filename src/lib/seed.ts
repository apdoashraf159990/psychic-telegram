import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { STARTER_CATEGORIES, STARTER_PRODUCTS } from "./starter-catalog";
import { EGYPT_GOVERNORATES } from "./egypt-locations";

export async function seedDatabase(ownerPassword = "RoohOwner#2026!") {
  console.log("Starting clean ROOH database initialization...");

  // 1. Ensure Owner User
  const existingOwner = await prisma.user.findFirst({
    where: { username: "abdo_admin" },
  });

  let owner = existingOwner;
  if (!existingOwner) {
    const passwordHash = await bcrypt.hash(ownerPassword, 10);
    owner = await prisma.user.create({
      data: {
        username: "abdo_admin",
        email: "owner@rooh-beauty.eg",
        passwordHash,
        name: "عبد الرحمن المدير",
        phone: "01012345678",
        role: "OWNER",
        isActive: true,
      },
    });
    console.log("Owner user initialized: abdo_admin");
  }

  // 2. Initial Branch & Warehouse
  let mainBranch = await prisma.branch.findFirst({ where: { code: "ALEX-HQ" } });
  if (!mainBranch) {
    mainBranch = await prisma.branch.create({
      data: {
        code: "ALEX-HQ",
        nameAr: "الفرع الرئيسي - الإسكندرية (سموحة)",
        nameEn: "Alexandria Main Branch (Smouha)",
        governorate: "الإسكندرية",
        district: "شرق الإسكندرية",
        address: "شارع فوزي معاذ، سموحة، الإسكندرية",
        phone: "01098765432",
        status: "ACTIVE",
      },
    });

    await prisma.warehouse.create({
      data: {
        code: "WH-ALEX-01",
        nameAr: "مستودع الإسكندرية المركزي",
        nameEn: "Alexandria Central Warehouse",
        branchId: mainBranch.id,
        address: "سموحة، الإسكندرية",
        capacity: 5000,
        status: "ACTIVE",
      },
    });
    console.log("Main branch & warehouse initialized.");
  }

  // 3. Initialize Categories
  for (const cat of STARTER_CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        nameAr: cat.nameAr,
        nameEn: cat.nameEn,
        descriptionAr: cat.descriptionAr,
        descriptionEn: cat.descriptionEn,
      },
      create: {
        slug: cat.slug,
        nameAr: cat.nameAr,
        nameEn: cat.nameEn,
        descriptionAr: cat.descriptionAr,
        descriptionEn: cat.descriptionEn,
        sortOrder: 1,
        isActive: true,
      },
    });
  }
  console.log("Starter categories initialized.");

  // 4. Initialize Starter Products
  for (const prod of STARTER_PRODUCTS) {
    const category = await prisma.category.findUnique({
      where: { slug: prod.categorySlug },
    });

    if (category) {
      await prisma.product.upsert({
        where: { slug: prod.slug },
        update: {
          nameAr: prod.nameAr,
          nameEn: prod.nameEn,
          sellingPrice: prod.sellingPrice,
          purchaseCost: prod.purchaseCost,
          shortDescAr: prod.shortDescAr,
          fullDescAr: prod.fullDescAr,
        },
        create: {
          slug: prod.slug,
          sku: prod.sku,
          barcode: prod.barcode,
          nameAr: prod.nameAr,
          nameEn: prod.nameEn,
          brand: "ROOH",
          categoryId: category.id,
          shortDescAr: prod.shortDescAr,
          shortDescEn: prod.shortDescEn,
          fullDescAr: prod.fullDescAr,
          fullDescEn: prod.fullDescEn,
          purchaseCost: prod.purchaseCost,
          sellingPrice: prod.sellingPrice,
          previousPrice: prod.previousPrice,
          status: "PUBLISHED",
          isFeatured: !!prod.isFeatured,
          isNewArrival: !!prod.isNewArrival,
          isBestSeller: !!prod.isBestSeller,
          volume: prod.volume,
          skinType: prod.skinType,
          hairType: prod.hairType,
          ingredientsAr: prod.ingredientsAr,
          ingredientsEn: prod.ingredientsEn,
          instructionsAr: prod.instructionsAr,
        },
      });
    }
  }
  console.log("Starter products initialized in SQLite database.");

  // 5. Initialize Egyptian Shipping Zones (all 27 governorates)
  for (const gov of EGYPT_GOVERNORATES) {
    await prisma.shippingZone.upsert({
      where: { governorate: gov.id },
      update: {
        deliveryFee: gov.shippingFee,
        estimatedDays: gov.estimatedDays,
      },
      create: {
        governorate: gov.id,
        governorateAr: gov.nameAr,
        deliveryFee: gov.shippingFee,
        estimatedDays: gov.estimatedDays,
        freeShippingThreshold: 600,
        isActive: true,
      },
    });
  }
  console.log("All 27 Egyptian shipping zones initialized.");

  // 6. Audit log for clean initialization
  await prisma.auditLog.create({
    data: {
      userEmail: "abdo_admin",
      action: "CLEAN_INITIALIZATION",
      entity: "SYSTEM",
      detailsJson: JSON.stringify({
        message: "Clean production state ready. Sales: 0, Orders: 0, Customers: 0, Profit: 0",
        timestamp: new Date().toISOString(),
      }),
    },
  });

  return { success: true, message: "ROOH database seeded successfully." };
}

