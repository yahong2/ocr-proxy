export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { imageBase64 } = req.body;

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
      requestId: "test-id",
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

            }
          ]
        })
      }
    );

    const result = await response.json();
    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
