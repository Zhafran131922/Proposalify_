// emailService.js
const transporter = require('./emailConfig');
const nodemailer = require('nodemailer');

async function sendProposalNotification(email) {
    // Pastikan email penerima tidak kosong atau tidak ditentukan
    if (!email) {
        throw new Error('No recipient email defined');
    }

    // Konfigurasi email
    const mailOptions = {
        from: 'proposalify01@gmail.com',
        to: email,
        subject: 'Notification: New Proposal Submitted',
        text: 'Dear Dosen,\n\nA new proposal has been submitted for your review.\n\nBest regards,\nProposalify Team'
    };

    // Kirim email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email notification sent to dosen:', email);
    } catch (error) {
        console.error('Failed to send email notification:', error);
        throw new Error('Failed to send email notification: ' + error.message);
    }
}

module.exports = sendProposalNotification;