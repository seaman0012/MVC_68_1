# Job Fair MVC 

## การติดตั้งและรัน
1. Install dependencies
   ```
   npm install
   ```
2. Run server
   ```
   npm start
   ```
3. Open browser
   - http://localhost:3000

---

## ภาษา: Node.js, Express, EJS, CSS

## สถาปัตยกรรม (Architecture)

MVC Ideas
- Model: โครงสร้างข้อมูล + business rule และการเข้าถึงข้อมูล (Read/Write JSON)
- View: หน้าจอที่ผู้ใช้ (EJS)
- Controller: ประมวลผลคำขอจาก Route เรียกใช้ Model แล้วส่งข้อมูลไป View

Flow
1) ผู้ใช้เข้าหน้าเว็บ → Route จับ URL
2) Route เรียก Controller ที่เกี่ยวข้อง
3) Controller ใช้ Model อ่าน/ตรวจ/บันทึกข้อมูล
4) Controller ส่งข้อมูลให้ View (EJS) เรนเดอร์ตอบกลับ
5) หากเป็นการส่งฟอร์ม → ตรวจสิทธิ์/กฎ → บันทึก → redirect ตาม business rule

---

## Arichitecture

```text
.
├─ app.js                          # Entry point: ตั้งค่า Express, EJS, Static, Session, ต่อ Route
├─ package.json                    # Scripts/Dependencies
├─ public/
│  └─ style.css                    # สไตล์รวมของระบบ (มี Dark Mode + การ์ด + ตาราง + ปุ่ม)
├─ views/
│  ├─ partials/
│  │  ├─ header.ejs                # แถบนำทาง + ปุ่มสลับธีม + user badge
│  │  └─ footer.ejs                # ส่วนท้ายหน้า
│  ├─ auth/
│  │  └─ login.ejs                 # หน้าเข้าสู่ระบบ
│  ├─ jobs/
│  │  ├─ list.ejs                  # หน้ารายการงานที่เปิดรับ (การ์ด)
│  │  └─ apply.ejs                 # หน้าฟอร์มยืนยันสมัครงาน
│  └─ admin/
│     └─ dashboard.ejs             # ตารางใบสมัคร + ใส่เกรด + ปุ่มบันทึก
├─ routes/
│  ├─ auth.js                      # /login, /logout
│  ├─ jobs.js                      # /jobs, /jobs/:jobId/apply
│  ├─ applications.js              # POST /applications/:jobId (สมัครงาน)
│  └─ admin.js                     # /admin, POST /admin/applications/:id/grade
├─ controllers/
│  ├─ authController.js            # ล็อกอิน/ล็อกเอาต์
│  ├─ jobsController.js            # รายการงาน/หน้า apply
│  ├─ applicationsController.js    # บันทึกใบสมัคร
│  └─ adminController.js           # แดชบอร์ด/ให้เกรด
├─ models/
│  ├─ DataStore.js                 # อ่าน/เขียนไฟล์ JSON (data/*.json)
│  ├─ Company.js                   # โมเดลบริษัท
│  ├─ Job.js                       # โมเดลงาน (title/description/deadline/type/status/companyId)
│  ├─ Candidate.js                 # โมเดลผู้สมัคร
│  ├─ ApplicationBase.js           # คลาสฐานของการสมัคร (สัญญา isEligible)
│  ├─ InternshipApplication.js     # สมัครสหกิจ (ต้องกำลังศึกษา)
│  └─ RegularApplication.js        # สมัครงานปกติ (ต้องจบแล้ว)
├─ middlewares/
│  └─ auth.js                      # ensureAuthenticated / ensureStudent / ensureAdmin
├─ utils/
│  └─ validation.js                # ฟังก์ชันตรวจความถูกต้อง (เช่นอีเมล)
└─ data/
   ├─ companies.json               # ข้อมูลบริษัท
   ├─ jobs.json                    # ตำแหน่งงาน
   ├─ candidates.json              # ผู้สมัคร
   ├─ users.json                   # บัญชีเข้าสู่ระบบ (เช่น admin/student)
   └─ applications.json            # ใบสมัครที่บันทึกแล้ว
```


### บัญชีตัวอย่าง
- นักศึกษา: `student1 / 123456`
- นักศึกษา: `student2 / 123456`
- แอดมิน: `admin / admin123`



## การต่อยอด

- เปลี่ยน data layer จาก JSON ไป DB จริง (เช่น PostgreSQL/MongoDB)
- เพิ่มการอัปโหลดไฟล์เรซูเม่
- ระบบสิทธิ์ละเอียดขึ้น (RBAC)
- ใช้ Passport.js หรือ JWT สำหรับ auth
