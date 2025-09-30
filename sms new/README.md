# 🏫 School Management System

A comprehensive school management system built with Next.js and Node.js, featuring student management, staff payroll, attendance tracking, financial management, and communication tools.

## ✨ Features

### 👩‍🎓 Student Management
- Add, edit, and delete student records
- Store comprehensive student details (name, photo, DOB, class, guardian info)
- Automatic birthday reminders with SMS/email greetings
- Attendance tracking and report generation

### 👨‍🏫 Staff Management & Payroll
- Complete staff record management
- Payroll module with PAYE deductions and allowances
- Monthly payslip generation
- Department and position management

### 💰 Finance & Accounting
- Income and expense tracking
- Student fee management with payment history
- Outstanding fee tracking
- Profit & loss statements
- Financial dashboard with KPIs

### 📩 Communication
- Bulk SMS/Email system
- Fee payment reminders
- Event announcements
- Birthday greetings automation

### 📊 Reports & Dashboard
- Student reports (attendance, fees, birthdays)
- Staff payroll reports
- Financial reports (monthly, termly, yearly)
- Comprehensive dashboard with KPIs

### 🔒 Authentication & Roles
- JWT-based authentication
- Role-based access control (Admin, Staff, Student, Parent)
- Secure password management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **SMS**: Twilio integration
- **Email**: Nodemailer
- **State Management**: React Query
- **UI Components**: Custom components with Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- MongoDB
- Twilio account (for SMS)
- Email service (Gmail)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd school-management-system
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   
   Create `.env` file in the `server` directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/school_management
   
   # JWT
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   
   # Server
   PORT=5000
   CLIENT_URL=http://localhost:3000
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   
   # SMS Configuration (Twilio)
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   ```






## 🏗️ Project Structure

```
school-management-system/
├── client/                 # Next.js frontend
│   ├── components/         # React components
│   ├── contexts/          # React contexts
│   ├── pages/             # Next.js pages
│   └── styles/            # CSS styles
├── server/                # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   └── config/            # Configuration files
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create student
- `GET /api/students/:id` - Get student by ID
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Staff
- `GET /api/staff` - Get all staff
- `POST /api/staff` - Create staff member
- `GET /api/staff/:id` - Get staff by ID
- `PUT /api/staff/:id` - Update staff
- `DELETE /api/staff/:id` - Delete staff

### Attendance
- `POST /api/attendance/mark` - Mark attendance
- `GET /api/attendance` - Get attendance records
- `GET /api/attendance/student/:id` - Get student attendance

### Finance
- `POST /api/finance/income` - Record income
- `POST /api/finance/expense` - Record expense
- `GET /api/finance/transactions` - Get transactions
- `GET /api/finance/dashboard` - Get financial dashboard

### Communication
- `POST /api/communication/sms/bulk` - Send bulk SMS
- `POST /api/communication/email/bulk` - Send bulk email
- `POST /api/communication/birthday-greetings` - Send birthday greetings

### Reports
- `GET /api/reports/dashboard` - Get dashboard data
- `GET /api/reports/students` - Student reports
- `GET /api/reports/staff` - Staff reports
- `GET /api/reports/financial` - Financial reports

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Interface**: Clean, professional design with Tailwind CSS
- **Dark/Light Mode**: Toggle between themes
- **Interactive Charts**: Visual data representation
- **Real-time Updates**: Live data updates
- **Form Validation**: Client and server-side validation
- **File Upload**: Profile picture and document uploads

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- Rate limiting
- CORS protection
- Helmet.js security headers

## 📊 Database Schema

### Key Models
- **User**: Authentication and basic profile
- **Student**: Student information and academic details
- **Staff**: Staff information and employment details
- **Attendance**: Daily attendance records
- **Fee**: Student fee structure and payments
- **Finance**: Income and expense transactions
- **Payroll**: Staff salary calculations

## 🚀 Deployment

### Production Build
```bash
# Build frontend
cd client && npm run build

# Start production server
cd server && npm start
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use production MongoDB URI
- Configure production email and SMS services
- Set secure JWT secrets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints

## 🔮 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Advanced reporting with charts
- [ ] Integration with external systems
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Parent portal
- [ ] Online fee payment integration
- [ ] Grade management system
- [ ] Library management
- [ ] Transport management

---



