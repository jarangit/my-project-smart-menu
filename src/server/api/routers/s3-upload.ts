/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "~/env";
import { PutObjectCommand, UploadPartCommand } from "@aws-sdk/client-s3";
import { TRPCError } from "@trpc/server";

export const s3Router = createTRPCRouter({
  getStandardUploadPresignedUrl: publicProcedure
    .input(z.object({
      key: z.string(),
      type: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { key, type } = input;
      const { s3 } = ctx;

      const putObjectCommand = new PutObjectCommand({
        Bucket: env.BUCKET_NAME,
        Key: key,
      });


      const url = await getSignedUrl(s3, putObjectCommand);
      return url
    }),
  getMultipartUploadPresignedUrl: publicProcedure
    .input(z.object({ key: z.string(), filePartTotal: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { key, filePartTotal } = input;
      const { s3 } = ctx;

      const uploadId = (
        await s3.createMultipartUpload({
          Bucket: env.BUCKET_NAME,
          Key: key,
        })
      ).UploadId;

      if (!uploadId) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not create multipart upload",
        });
      }

      const urls: Promise<{ url: string; partNumber: number }>[] = [];

      for (let i = 1; i <= filePartTotal; i++) {
        const uploadPartCommand = new UploadPartCommand({
          Bucket: env.BUCKET_NAME,
          Key: key,
          UploadId: uploadId,
          PartNumber: i,
        });

        const url = getSignedUrl(s3, uploadPartCommand).then((url) => ({
          url,
          partNumber: i,
        }));

        urls.push(url);
      }

      return {
        uploadId,
        urls: await Promise.all(urls),
      };
    }),
  getObjects: publicProcedure.query(async ({ ctx }) => {
    const { s3 } = ctx;

    const listObjectsOutput = await s3.listObjectsV2({
      Bucket: "smart-menu-web-storage",
    });

    return listObjectsOutput.Contents ?? [];
  }),
  // ...
  completeMultipartUpload: publicProcedure
    .input(
      z.object({
        type: z.string(),
        key: z.string(),
        uploadId: z.string(),
        parts: z.array(
          z.object({
            ETag: z.string(),
            PartNumber: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { key, uploadId, parts, type } = input;
      const { s3 } = ctx;

      const completeMultipartUploadOutput = await s3.completeMultipartUpload({
        Bucket: env.BUCKET_NAME,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: parts,
        },
      });

      // if (completeMultipartUploadOutput) {
      //   const imageStore = await ctx.db.imageStores.create({
      //     data: {
      //       Etag: completeMultipartUploadOutput.ETag as '',
      //       key: completeMultipartUploadOutput.Key as '',
      //       url: completeMultipartUploadOutput.Location as '',
      //       type: type
      //     }
      //   })
      //   return imageStore;
      // }
      return completeMultipartUploadOutput
    }),
});