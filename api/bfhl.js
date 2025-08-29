// Bajaj Task: take an array of strings, categorize items, and return computed results
// along with fixed user metadata and a human-readable user_id.
function alternatingCapsReverse(s) {
  const chars = [...s].reverse();
  return chars
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join('');
}

function handler(req, res) {
  //  only POST as per requirements
  if (req.method !== 'POST') {
    // For browsers hitting GET /bfhl, return a friendly JSON instead of a 404/405.
    if (req.method === 'GET') {
      const email = (process.env.BFHL_EMAIL || 'john@xyz.com').toString();
      const rollNumber = (process.env.BFHL_ROLL || 'ABCD123').toString();
      const fullName = (process.env.BFHL_FULL_NAME || 'john doe').toString();
      const dob = (process.env.BFHL_DOB || '17091999').toString();
      const user_id = `${fullName.trim().toLowerCase().replace(/\s+/g, '_')}_${dob}`;
      return res.status(200).json({
        is_success: true,
        message: 'BFHL API is up. Send a POST to this same /bfhl endpoint with JSON { "data": [ ... ] }.',
        user_id,
        email,
        roll_number: rollNumber,
        example_request: { data: ['a','1','334','4','R','$'] }
      });
    }
    return res.status(405).json({ is_success: false, message: 'Method Not Allowed' });
  }

  try {
    const body = req.body || {}; 

    const data = Array.isArray(body.data) ? body.data.map(String) : [];
    if (!Array.isArray(body.data)) {
      return res.status(400).json({ is_success: false, message: 'Invalid body. Expect { data: string[] }' });
    }

  // Provide defaults so user_id and metadata are always present
  const email = (body.email || process.env.BFHL_EMAIL || 'john@xyz.com').toString();
  const rollNumber = (body.roll_number || process.env.BFHL_ROLL || 'ABCD123').toString();
  const fullName = (body.full_name || process.env.BFHL_FULL_NAME || 'john doe').toString();
  const dob = (body.dob_ddmmyyyy || process.env.BFHL_DOB || '17091999').toString();


    // user_id format: full_name (lower_snake_case) + '_' + dob
    const user_id = `${fullName.trim().toLowerCase().replace(/\s+/g, '_')}_${dob}`;

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];

    let sum = 0;

    for (const token of data) {
      if (/^[+-]?\d+$/.test(token)) {
        const n = Number(token);
        sum += n;
        if (Math.abs(n) % 2 === 0) {
          even_numbers.push(token.replace(/^\+/, ''));
        } else {
          odd_numbers.push(token.replace(/^\+/, ''));
        }
        continue;
      }
      if (/^[a-zA-Z]+$/.test(token)) {
        alphabets.push(token.toUpperCase());
        continue;
      }
      const specials = token.match(/[^a-zA-Z0-9]/g);
      if (specials) {
        special_characters.push(...specials);
      }
    }
    const alphaConcat = data
      .filter((t) => /^[a-zA-Z]+$/.test(t))
      .join('');

    const concat_string = alternatingCapsReverse(alphaConcat);

    return res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number: rollNumber,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string,
    });
  } catch (err) {
    return res.status(500).json({ is_success: false, message: 'Internal Server Error' });
  }
}

export default handler;
