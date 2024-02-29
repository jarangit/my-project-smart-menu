/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "~/env";
const s3Client = new S3Client({
  region: env.REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  }
});

async function uploadFileToS3(file: any, fileName: any) {

  const fileBuffer = file;
  console.log(fileName);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "image/jpg"
  }

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return fileName;
}

export async function POST(request: any) {
  try {

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name);

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    return NextResponse.json({ error });
  }
}