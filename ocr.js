export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST만 됩니다" });
  }

  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "사진이 필요해요" });
    }

    const response = await fetch(
      "https://clovaocr-api.ncloud.com/ocr/v1/general",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-OCR-SECRET": process.env.CLOVA_OCR_SECRET
        },
        body: JSON.stringify({
          version: "V1",
          requestId: Date.now().toString(),
          timestamp: Date.now(),
          images: [
            {
              format: "jpg",
              name: "menu",
              data: imageBase64
            }
          ]
        })
      }
    );

    const result = await response.json();
    res.status(200).json(result);

  } catch (e) {
    res.status(500).json({ error: "문제 생김" });
  }
}
