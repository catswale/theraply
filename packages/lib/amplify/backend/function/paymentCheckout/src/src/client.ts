export const postTherapist = ({ db, config }: any) => async (req: any, res: any) => {
  try {
    console.log('Client post therapist called');
    const { symptoms } = req.body;
    console.log(`recipient ${symptoms}`);

    const params = {
      TableName: config.therapistTableName,
      KeyConditionExpression: "",
      ExpressionAttributeValues: {}
    };

    req.body.genders.forEach((gender, i) => {
      params.KeyConditionExpression += `${i !== 0 ? ' OR ' : ''}gender = :gender${i}`;
      params.ExpressionAttributeValues[`:gender${i}`] = gender;
    });

    const data = await db.query(params).promise();

    console.log(data);

    return res.json({ success: 'success', data });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}
