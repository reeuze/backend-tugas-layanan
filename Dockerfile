# Gunakan image Node.js resmi
FROM node:20.18.0

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
# RUN apt-get update && apt-get install -y build-essential python3

# Instal dependensi
RUN npm install

# Salin kode aplikasi ke dalam container
COPY . .

# Expose port aplikasi
EXPOSE 4000

# Perintah untuk menjalankan aplikasi
CMD ["node", "index.js"]
