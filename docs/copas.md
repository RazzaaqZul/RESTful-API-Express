- Setup databases
- `npx init prima`
- atur `.env` ke databases
  _Lakukan per model_
- buat model prisma
- ketika selesai membuat model, lakukan `npx prisma migrate dev --create-only <nama-migration>`
- Jika sudah cek query sql, lakukan `npx prisma migrate dev`
- Tidak perlu melakukan `npx prisma generate` karena sudah secara otomatis dilakukan oleh langkah sebelumnya.

- bikin singletone prismaClient() di database.js
- setup winston di logging.js
- setup express di web.js

Semua Logic aplikasi akan disimpan dalam layer src/service
Semua handler api akan disimpan dalam layer src/controller
Semua Validasi akan disimpan dalam layer src/validation
Semua Route akan disimpan dalam layer src/route

validation --> service --> error --> controller --> web --> middleware
