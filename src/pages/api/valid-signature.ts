import type { NextApiRequest, NextApiResponse } from "next";
import { SiweMessage } from "siwe";

type Data = boolean;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    const response = await POST(req);
    res.json(response);
  }
}

async function POST(req: NextApiRequest): Promise<Data> {
  try {
    const body = req.body as { message: SiweMessage; signature: string };
    let siweMessage = new SiweMessage(body.message);
    const validationResponse = await siweMessage.verify({
      signature: body.signature,
    });
    if (validationResponse.success) {
      return true;
    } else {
      throw new Error("Invalid signature");
    }
  } catch (err) {
    // TODO: Log capture and other error handling
    return false;
  }
}
