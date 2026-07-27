const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');

exports.sendEmail = catchAsync(async (options) => {
  // Configure the transporter for Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false, //// Use `true` for port 465, `false` for all other port
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: process.env.EMAIL_HOST,
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html:options.message
  };
  transporter.verify((error, success) => {
    if (error) {
      //console.log(error);
    } else {
      // console.log('Server is ready to take our messages');
    }
  });
  return transporter.sendMail(mailOptions)

});

exports.sendWelcomeEmail = async (user, password) => {

  const subject = 'Welcome to the Youth CPCT Platform 🎉';

  const email = user.email;

  const loginLink = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8086'
    : 'https://youthcpct.kalayuredae.com';

  const message = `
Hi ${user.fullName},

Welcome to the Youth CPCT Platform!

Your account has been created successfully.

LOGIN INFORMATION:
Full Name   : ${user.fullName}
Email       : ${user.email || 'N/A'}
Phone Number: ${user.phoneNumber}
Password    : ${password}


For your security, please change your password after your first login.

Login here:
${loginLink}

With your account you can:

• Complete and update your member profile.
• Access youth services and announcements.
• Register for programs and activities.
• Receive important notifications.
• Manage your personal information securely.

If you experience any problems logging in, please contact the system administrator.

Thank you for being part of the Youth CPCT community.

Best Regards,

Youth CPCT Platform Team
${loginLink}
`;

  await exports.sendEmail({ email, subject, message });

};

exports.emailBusinessDetail = async (user, role, password) => {

  const subject = 'Your Youth CPCT Platform Account';

  const email = user.email;

  const loginLink = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8086'
    : 'https://youthcpct.kalayuredae.com';

  const message = `
Hi ${user.fullName},

Welcome to the Youth CPCT Platform.

An account has been created for you.

==================================================
ACCOUNT DETAILS
==================================================

Full Name   : ${user.fullName}
Role        : ${role}
Email       : ${user.email || 'N/A'}
Phone Number: ${user.phoneNumber}
Password    : ${password}

==================================================

Login:
${loginLink}

Please log in and change your password immediately after your first sign in.

You can then complete your member profile and access all platform services.

If you need assistance, please contact the system administrator.

Best Regards,

Youth CPCT Platform Team
${loginLink}
`;

  await exports.sendEmail({ email, subject, message });

};

exports.sendContactReplyEmail = async (contact) => {

  const subject = `Re: ${contact.subject}`;

  const message = `
Hi ${contact.fullName},

Thank you for contacting the Youth CPCT Platform.

Below is our response to your inquiry.

----------------------------------------------------

${contact.reply}

----------------------------------------------------

If you have additional questions, simply reply to this email or submit another inquiry through our website.

Best Regards,

Youth CPCT Platform Team
https://youthcpct.kalayuredae.com
`;

  await exports.sendEmail({
    email: contact.email,
    subject,
    message
  });

};