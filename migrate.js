require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');
const fs = require('fs/promises');
const path = require('path');

async function migrate() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('No MONGODB_URI found in .env.local');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('zox');

    // Migrate Products
    try {
      const productsData = await fs.readFile(path.join(__dirname, 'data', 'products.json'), 'utf8');
      const products = JSON.parse(productsData);
      if (products.length > 0) {
        await db.collection('products').deleteMany({}); // clear existing
        await db.collection('products').insertMany(products);
        console.log(`Migrated ${products.length} products to MongoDB`);
      }
    } catch (err) {
      console.log('No products to migrate or error reading products.json', err.message);
    }

    // Migrate Orders
    try {
      const ordersData = await fs.readFile(path.join(__dirname, 'data', 'orders.json'), 'utf8');
      const orders = JSON.parse(ordersData);
      if (orders.length > 0) {
        await db.collection('orders').deleteMany({}); // clear existing
        await db.collection('orders').insertMany(orders);
        console.log(`Migrated ${orders.length} orders to MongoDB`);
      }
    } catch (err) {
      console.log('No orders to migrate or error reading orders.json', err.message);
    }

    console.log('Migration completed successfully!');
  } finally {
    await client.close();
  }
}

migrate();
