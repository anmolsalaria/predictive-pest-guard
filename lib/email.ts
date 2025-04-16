import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendProConfirmationEmail(userEmail: string, userName: string) {
  const mailOptions = {
    from: 'Predictive PestGuard <predictivepestguard@gmail.com>',
    to: userEmail,
    subject: 'Welcome to PestGuard Pro!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #F8DEB9;">Welcome to PestGuard Pro!</h1>
        <p>Dear ${userName},</p>
        <p>Thank you for upgrading to PestGuard Pro! We're excited to have you on board.</p>
        <p>Your subscription is now active, and you have access to all our premium features:</p>
        <ul>
          <li>Advanced Analytics</li>
          <li>Real-time Alerts</li>
          <li>Global Coverage</li>
          <li>Priority Support</li>
        </ul>
        <p>You can access your Pro features by logging into your account at <a href="https://predictivepestguard.com">predictivepestguard.com</a></p>
        <p>If you have any questions or need assistance, our support team is available 24/7.</p>
        <p>Best regards,<br>The Predictive PestGuard Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Pro confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending pro confirmation email:', error);
    throw error;
  }
} 