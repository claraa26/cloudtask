# Deployment Guide – CloudTask Application

Dokumen ini menjelaskan langkah-langkah deployment aplikasi CloudTask pada server berbasis Ubuntu Linux menggunakan Nginx sebagai web server dan reverse proxy.

## Persiapan Server
1. Pastikan server menggunakan Ubuntu
2. Update package <br>
`sudo apt update && sudo apt upgrade -y`
3. Install Node.js dan npm <br>
`sudo apt install nodejs npm -y`

## Clone Repository Frontend
`git clone https://github.com/claraa26/cloudtask.git` </br>
`cd cloudtask-frontend`

## Install Dependency Frontend
`npm install`

## Konfigurasi Environment Frontend
Buat file .env: <br>
`nano .env`

Isi dengan: <br>
`REACT_APP_API_URL=`

Frontend akan mengakses backend melalui Nginx reverse proxy, bukan langsung ke IP backend.

## Build Aplikasi Frontend
`npm run build` <br>

Hasil build akan berada di folder: <br>
`cloudtask/build`

## Install dan Konfigurasi Nginx
1. Install Nginx
Buat file konfigurasi Nginx <br>
`sudo nano /etc/nginx/sites-available/cloudtask`

Isi konfigurasi:
```
server {
  listen 80;
  server_name _;

  root /home/ubuntu/cloudtask-frontend/build;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /auth/ {
    proxy_pass http://BACKEND_IP:8080/auth/;
  }

  location /tasks {
    proxy_pass http://BACKEND_IP:8080/tasks;
  }
}
```

## Aktifkan Konfigurasi Nginx
`sudo ln -s /etc/nginx/sites-available/cloudtask /etc/nginx/sites-enabled/` <br>
`sudo nginx -t`<br>
`sudo systemctl reload nginx` <br>

## Akses Aplikasi
Buka browser dan akses:

`http://IP_SERVER`


Jika berhasil, halaman frontend CloudTask akan tampil.