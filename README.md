# BFHL API

A minimal Node.js serverless API for the BFHL assignment, deployable on Vercel.

## API

- Method: POST
- Route: `/bfhl`
- Status: 200 on success
- Body:
```json
{
  "data": ["a", "1", "334", "4", "R", "$"],
  "full_name": "john doe",
  "dob_ddmmyyyy": "17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123"
}
```

If `full_name` and `dob_ddmmyyyy` are provided, `user_id` will be `full_name` lowercased with spaces as `_` plus `_` and the provided date. Otherwise defaults will be used.

### Response
- `is_success`: boolean
- `user_id`: string (e.g. `john_doe_17091999`)
- `email`: string
- `roll_number`: string
- `odd_numbers`: string[] (odd numeric tokens)
- `even_numbers`: string[] (even numeric tokens)
- `alphabets`: string[] (alphabet tokens uppercased; words preserved)
- `special_characters`: string[] (special chars extracted)
- `sum`: string (sum of all integer numbers)
- `concat_string`: string (all alphabetic characters concatenated in input order, reversed, alternating caps starting uppercase)

## Local Dev

1. Install Vercel CLI
2. Run locally

```powershell
npm i -g vercel
npm i
vercel dev
```
Use Postman or ThunderClient for testing the API
POST to https://bajaj-task-bfhl.vercel.app/bfhl

## Deploy on Vercel

```powershell
vercel login
vercel
vercel --prod
```

## Frontend

- A simple static frontend (index.html) is included at the repo root.
- It is deployed and reachable at: https://bajaj-task-bfhl.vercel.app/
- The page lets you send requests to POST /bfhl and view the JSON response.

## Notes
- Only integers are treated as numbers; strings like `12.5` are not.
- Special characters are extracted from tokens that contain them.
- Errors return `{ is_success: false }` with proper HTTP status.
