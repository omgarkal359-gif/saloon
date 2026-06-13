import sgMail from '@sendgrid/mail';

export const sendConfirmationEmail = async (appointment) => {
  const { clientInfo, services, date, time, totalPrice, totalDuration } = appointment;

  const apiKey = process.env.SENDGRID_API_KEY;
  const verifiedEmail = process.env.VERIFIED_SENDER_EMAIL;

  const servicesListHtml = services
    .map(s => `<li>${s.name} - $${s.price} (${s.duration} mins)</li>`)
    .join('');

  const emailHtml = `
    <div style="background-color: #1A1A1A; padding: 40px; font-family: 'Playfair Display', Georgia, serif; color: #FDFBF7; text-align: center; min-height: 100%;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #222222; border: 1px solid #D4AF37; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
         <h1 style="color: #D4AF37; font-size: 28px; margin-top: 0; margin-bottom: 10px; font-weight: normal; letter-spacing: 2px; text-transform: uppercase;">Forever Beauty Salon</h1>
         <p style="font-size: 12px; font-style: italic; color: #A8A29E; letter-spacing: 1px; margin-bottom: 25px;">Your Exclusive Sanctuary of Timeless Beauty — Strictly for Ladies</p>
         <hr style="border: 0; border-top: 1px solid #D4AF37; margin: 25px 0;" />
         
         <h2 style="color: #FDFBF7; font-size: 20px; font-weight: normal; margin-bottom: 20px; letter-spacing: 1px;">Appointment Confirmed</h2>
         <p style="text-align: left; line-height: 1.6; font-size: 15px; color: #ECEAE4;">Dear ${clientInfo.name},</p>
         <p style="text-align: left; line-height: 1.6; font-size: 15px; color: #ECEAE4;">Thank you for choosing Forever Beauty Salon. We are delighted to confirm your upcoming appointment. Please find your reservation details below:</p>
         
         <div style="background-color: #1D1D1D; border: 1px dashed #D4AF37; padding: 20px; text-align: left; margin: 25px 0; border-radius: 4px;">
           <p style="margin: 5px 0; font-size: 15px; color: #FDFBF7;"><strong>Date:</strong> ${date}</p>
           <p style="margin: 5px 0; font-size: 15px; color: #FDFBF7;"><strong>Time:</strong> ${time}</p>
           <p style="margin: 15px 0 5px 0; font-size: 15px; color: #FDFBF7;"><strong>Services Selected:</strong></p>
           <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #ECEAE4; line-height: 1.6;">
             ${servicesListHtml}
           </ul>
           <p style="margin: 15px 0 5px 0; font-size: 15px; color: #FDFBF7;"><strong>Total Cost:</strong> $${totalPrice}</p>
           <p style="margin: 5px 0; font-size: 15px; color: #FDFBF7;"><strong>Total Duration:</strong> ${totalDuration} mins</p>
         </div>
         
         <div style="font-size: 13px; color: #D4AF37; line-height: 1.6; text-align: left; background-color: #2D2D2D; padding: 15px; border-left: 4px solid #D4AF37; margin-bottom: 25px;">
           <strong>Important Privacy Notice:</strong> Please note that our salon environment is strictly reserved for ladies to ensure complete privacy, comfort, and relaxation.
         </div>
         
         <hr style="border: 0; border-top: 1px solid #D4AF37; margin: 25px 0;" />
         <p style="font-size: 12px; color: #A8A29E; line-height: 1.5; margin-bottom: 0;">
           Forever Beauty Salon<br/>
           Luxury Suite 101, Serenity Square<br/>
           WhatsApp / Call: +1 (555) 987-6543 | Email: info@foreverbeautysalon.com
         </p>
      </div>
    </div>
  `;

  // Check if API keys are set and valid (not default placeholders)
  if (!apiKey || apiKey.startsWith('your_') || !verifiedEmail || verifiedEmail.includes('your_')) {
    console.log('\n================================================================');
    console.log('[MOCK EMAIL SERVICE] SENDGRID API KEY IS NOT CONFIGURED OR IS DEFAULT.');
    console.log(`Sending booking confirmation email to: ${clientInfo.email}`);
    console.log(`Verified Sender: ${verifiedEmail || 'NOT SET'}`);
    console.log('--- EMAIL HTML TEMPLATE OUTPUT ---');
    console.log(emailHtml.trim());
    console.log('================================================================\n');
    return true; // Return true to simulate successful email delivery
  }

  sgMail.setApiKey(apiKey);
  const msg = {
    to: clientInfo.email,
    from: verifiedEmail,
    subject: 'Appointment Confirmed - Forever Beauty Salon',
    text: `Hello ${clientInfo.name}! Your appointment at Forever Beauty Salon on ${date} at ${time} is confirmed. Selected Services: ${services.map(s => s.name).join(', ')}. Total: $${totalPrice}. Please note that our salon is strictly reserved for ladies.`,
    html: emailHtml,
  };

  try {
    await sgMail.send(msg);
    console.log(`[SendGrid] Email sent successfully to ${clientInfo.email}`);
    return true;
  } catch (error) {
    console.error('[SendGrid] Error sending email:', error.response ? error.response.body : error.message);
    return false;
  }
};
