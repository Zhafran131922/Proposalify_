const transporter = require('./emailConfig');

async function sendProposalNotification(email) {
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
    }
}

module.exports = sendProposalNotification;
