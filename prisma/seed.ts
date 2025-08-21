import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create default educator account for alpha tenant
  const educator = await prisma.educator_account.upsert({
    where: { email: 'admin@alpha.com' },
    update: {},
    create: {
      domain: 'alpha',
      domain_verified: true,
      name: 'Alpha Academy',
      email: 'admin@alpha.com',
      password_hash: null, // No password for now
    },
  })

  console.log('✅ Created educator account:', educator.domain)

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
