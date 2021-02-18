export function sendEmail(req: any, res: any) {
  try {
    console.log('Email called');
    const {
      recipient, sender, topic, text,
    } = req.body;
    console.log(`recipient ${recipient}`);

    return res.json({ success: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}
