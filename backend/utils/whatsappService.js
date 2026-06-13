import twilio from 'twilio';

export const sendWhatsAppConfirmation = async (appointment) => {
  const { clientInfo, services, date, time } = appointment;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

  const selectedServicesText = services.map(s => s.name).join(', ');
  const messageBody = `Hello ${clientInfo.name}! Your appointment at Forever Beauty Salon for [${selectedServicesText}] on ${date} at ${time} is officially CONFIRMED. We look forward to pampering you!`;

  // Standardize the phone number prefix
  let formattedTo = clientInfo.phone;
  if (!formattedTo.startsWith('whatsapp:')) {
    formattedTo = `whatsapp:${formattedTo}`;
  }

  // Check if Twilio API keys are configured and not placeholders
  if (!accountSid || accountSid.startsWith('your_') || !authToken || authToken.startsWith('your_')) {
    console.log('\n================================================================');
    console.log('[MOCK WHATSAPP SERVICE] TWILIO CREDENTIALS ARE NOT CONFIGURED OR ARE DEFAULT.');
    console.log(`To: ${formattedTo}`);
    console.log(`From: ${fromWhatsAppNumber}`);
    console.log('--- WHATSAPP MESSAGE CONTENT ---');
    console.log(messageBody);
    console.log('================================================================\n');
    return true; // Simulate successful WhatsApp delivery
  }

  try {
    const client = twilio(accountSid, authToken);
    const response = await client.messages.create({
      body: messageBody,
      from: fromWhatsAppNumber,
      to: formattedTo,
    });
    console.log(`[Twilio] WhatsApp confirmation sent successfully. SID: ${response.sid}`);
    return true;
  } catch (error) {
    console.error('[Twilio] Error sending WhatsApp message:', error.message);
    return false;
  }
};
