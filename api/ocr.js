export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    let body = req.body;

    // 🔑 Vercel에서 body가 비어있는 경우 대비
    if (!body) {
      body = await new Promise((resolve, reject) => {
        let data = "";
        req.on("data", chunk => (data += chunk));
        req.on("end", () => resolve(JSON.parse(data)));
        req.on("error", reject);
      });
    }

    const imageBase64 = body.imageBase64;

    if (!imageBase64) {
      return res.status(400).json({ error: "imageBase64 is required" });
    }

    const response = await fetch(
      "https://clovaocr-api.ncloud.com/ocr/v1/allerjo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-OCR-SECRET": process.env.CLOVA_OCR_SECRET
        },
        body: JSON.stringify({
          version: "V2",
          requestId: "test",
          timestamp: Date.now(),
          images: [
            {
              format: "png",
              name: "test",
              data: imageBase64
            }
          ]
        })
      }
    );

    const result = await response.json();
    return res.status(200).json(result);

  } catch (error) {
    console.error("OCR ERROR:", error);
    return res.status(500).json({
      error: "OCR server error",
      detail: error.message
    });
  }
}
