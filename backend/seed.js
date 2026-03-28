import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config(); // if .env is inside backend/
// ─── Models ───────────────────────────────────────────────────────────────────

const paymentSchema = new mongoose.Schema(
  {
    tenantName: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    amount: { type: Number },
    datePaid: { type: Date, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const tenantSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    unitNumber: { type: Number, required: true },
    email: { type: String },
    phoneNumber: { type: String, required: true },
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }],
  },
  { timestamps: true }
);

const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
const Tenant = mongoose.models.Tenant || mongoose.model("Tenant", tenantSchema);

// ─── Config ───────────────────────────────────────────────────────────────────

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/landlordhub";

// ─── Seed Data ────────────────────────────────────────────────────────────────

const tenantSeeds = [
  { firstName: "James",   lastName: "Carter",    unitNumber: 101, email: "james.carter@email.com",   phoneNumber: "555-101-2001" },
  { firstName: "Sofia",   lastName: "Mendes",    unitNumber: 102, email: "sofia.mendes@email.com",    phoneNumber: "555-102-2002" },
  { firstName: "Liam",    lastName: "Thompson",  unitNumber: 103, email: "liam.thompson@email.com",   phoneNumber: "555-103-2003" },
  { firstName: "Aisha",   lastName: "Patel",     unitNumber: 104, email: "aisha.patel@email.com",     phoneNumber: "555-104-2004" },
  { firstName: "Marcus",  lastName: "Rivera",    unitNumber: 105, email: "marcus.rivera@email.com",   phoneNumber: "555-105-2005" },
  { firstName: "Elena",   lastName: "Kovacs",    unitNumber: 201, email: "elena.kovacs@email.com",    phoneNumber: "555-201-2006" },
  { firstName: "Tariq",   lastName: "Hassan",    unitNumber: 202, email: "tariq.hassan@email.com",    phoneNumber: "555-202-2007" },
  { firstName: "Priya",   lastName: "Nair",      unitNumber: 203, email: "priya.nair@email.com",      phoneNumber: "555-203-2008" },
  { firstName: "Owen",    lastName: "Bennett",   unitNumber: 204, email: "owen.bennett@email.com",    phoneNumber: "555-204-2009" },
  { firstName: "Camille", lastName: "Dubois",    unitNumber: 205, email: "camille.dubois@email.com",  phoneNumber: "555-205-2010" },
];

// Payment history per tenant: 3 months of rent each
// Statuses reflect realistic variety: Paid, Pending, Late
function buildPayments(tenantId, index) {
  const rentAmounts = [1200, 950, 1100, 1350, 800, 1250, 900, 1050, 1400, 1150];
  const rent = rentAmounts[index];

  const now = new Date();

  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);
  const twoMonthsAgo  = new Date(now.getFullYear(), now.getMonth() - 2, 1);
  const oneMonthAgo   = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  // Vary statuses so the UI looks interesting
  const statusSets = [
    ["Paid", "Paid", "Paid"],
    ["Paid", "Paid", "Pending"],
    ["Paid", "Late",  "Paid"],
    ["Late", "Paid",  "Paid"],
    ["Paid", "Paid",  "Late"],
    ["Paid", "Paid",  "Paid"],
    ["Late", "Late",  "Paid"],
    ["Paid", "Paid",  "Pending"],
    ["Paid", "Late",  "Pending"],
    ["Paid", "Paid",  "Paid"],
  ];

  const [s1, s2, s3] = statusSets[index];

  return [
    { tenantName: tenantId, amount: rent, datePaid: threeMonthsAgo, status: s1 },
    { tenantName: tenantId, amount: rent, datePaid: twoMonthsAgo,  status: s2 },
    { tenantName: tenantId, amount: rent, datePaid: oneMonthAgo,   status: s3 },
  ];
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB:", MONGO_URI);

  // Clear existing data
  await Payment.deleteMany({});
  await Tenant.deleteMany({});
  console.log("🗑️  Cleared existing Tenants and Payments");

  // Insert tenants
  const insertedTenants = await Tenant.insertMany(tenantSeeds);
  console.log(`👤 Inserted ${insertedTenants.length} tenants`);

  // Build & insert payments, then link them back to each tenant
  for (let i = 0; i < insertedTenants.length; i++) {
    const tenant = insertedTenants[i];
    const paymentDocs = buildPayments(tenant._id, i);

    const insertedPayments = await Payment.insertMany(paymentDocs);
    const paymentIds = insertedPayments.map((p) => p._id);

    await Tenant.findByIdAndUpdate(tenant._id, { $push: { payments: { $each: paymentIds } } });

    console.log(
      `  💳 ${tenant.firstName} ${tenant.lastName} (Unit ${tenant.unitNumber}) — ${insertedPayments.length} payments added`
    );
  }

  console.log("\n🎉 Seed complete!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  mongoose.disconnect();
  process.exit(1);
});