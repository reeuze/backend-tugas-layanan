# Gunakan image Node.js resmi
FROM node:20.18.0

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package.json ./
# COPY package-lock.json ./

# Instal dependensi
RUN npm install

# Salin kode aplikasi ke dalam container
COPY . .

# Expose port aplikasi
EXPOSE 4000

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
