const mongoose = require('mongoose');

const MONGODB = 'mongodb+srv://hanif:hanif999@cluster0.owf6hnt.mongodb.net/merng?retryWrites=true&w=majority';

console.log('Trying to connect to MongoDB...');
console.log('Connection string:', MONGODB.replace(/hanif999/, '***'));

mongoose.connect(MONGODB, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 30000,
  family: 4
})
.then(() => {
  console.log('✅ MongoDB Connected Successfully!');
  console.log('Connection state:', mongoose.connection.readyState);
  process.exit(0);
})
.catch((err) => {
  console.error('❌ MongoDB Connection Error:');
  console.error('Error name:', err.name);
  console.error('Error message:', err.message);
  console.error('Error code:', err.code);
  console.error('Full error:', JSON.stringify(err, null, 2));
  process.exit(1);
});

setTimeout(() => {
  console.log('Connection timeout after 35 seconds');
  process.exit(1);
}, 35000);