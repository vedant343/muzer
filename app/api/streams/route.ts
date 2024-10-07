import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";

const YT_REGEX = new RegExp(
  "^https?://(www.)?youtube.com/watch?v=[w-]+(&t=d+s)?$"
);

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());
    const isyt = YT_REGEX.test(data.url); //isyt is bool
    if (!isyt) {
      return NextResponse.json(
        {
          messgae: "wrong url format",
        },
        {
          status: 411,
        }
      );
    }

    const extractedId = data.url.split("?v=")[1];

    await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube",
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Error while adding a stream",
      },
      {
        status: 411,
      }
    );
  }
}
