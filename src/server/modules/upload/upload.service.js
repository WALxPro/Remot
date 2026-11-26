import { cloudinary } from "@/server/config/cloudinary";
import { imageUploadSchema } from "./upload.schema";

export async function uploadImage(file) {
  const validatedFile = imageUploadSchema.parse(file);

  const buffer = Buffer.from(
    await validatedFile.arrayBuffer()
  );

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "remot/blogs",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        unique_filename: true,
        overwrite: false,
      },
      (error, result) => {
        if (error) return reject(error);

        resolve(result);
      }
    );

    stream.on("error", reject);
    stream.end(buffer);
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    size: result.bytes,
  };
}