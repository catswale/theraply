export function postTherapist(req: any, res: any) {
  try {
    console.log('Client post therapist called');
    const { symptoms } = req.body;
    console.log(`recipient ${symptoms}`);

    return res.json({ success: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}
