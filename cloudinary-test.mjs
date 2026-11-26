import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const timestamp = Math.floor(Date.now() / 1000);

const signature = cloudinary.utils.api_sign_request(
  { timestamp },
  apiSecret
);

const form = new FormData();

form.append(
  "file",
  "https://res.cloudinary.com/demo/image/upload/sample.jpg"
);

form.append("api_key", apiKey);
form.append("timestamp", String(timestamp));
form.append("signature", signature);

try {
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: form,
    }
  );

  console.log("HTTP Status:", response.status);
  console.log("Cloudinary Error:", response.headers.get("x-cld-error"));
  console.log("Response:", await response.text());
} catch (error) {
  console.error("Request failed:", error.message);
}