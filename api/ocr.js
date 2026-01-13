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
      "https://2b3hwshmqc.apigw.ntruss.com/custom/v1/49397/6b4d717ef1f41b29d55628607d9efef197289d47a2dae31b6a191a3f518381cd/general",
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

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
