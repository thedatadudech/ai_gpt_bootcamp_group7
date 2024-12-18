const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const dotenv = require("dotenv");
const sharp = require("sharp");

dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.post("/generate-image", async (req, res) => {
    const { prompts } = req.body;

    if (!Array.isArray(prompts) || prompts.length === 0) {
        return res
            .status(400)
            .send({ error: "An array of prompts is required" });
    }

    try {
        const openaiApiKey = process.env.OPENAI_API_KEY;
        console.log(openaiApiKey);
        const responses = await Promise.all(
            prompts.map(async (prompt) => {
                const response = await axios.post(
                    "https://api.openai.com/v1/images/generations",
                    {
                        prompt: prompt,
                        n: 1,
                        size: "1024x1024",
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                        },
                    },
                );

                if (
                    response.data &&
                    response.data.data &&
                    response.data.data.length > 0
                ) {
                    return response.data.data[0].url;
                } else {
                    throw new Error(
                        "Failed to generate image for prompt: " + prompt,
                    );
                }
            }),
        );

        // Create the collage using `sharp` library
        const images = await Promise.all(
            responses.map(async (url) => {
                const imageResponse = await axios.get(url, {
                    responseType: "arraybuffer",
                });
                const imageBuffer = Buffer.from(imageResponse.data);

                // Resize the image to a standard size (e.g., 512x512) for
                // 'sharp' to use it to compose and create the collage
                return await sharp(imageBuffer).resize(512, 512).toBuffer();
            }),
        );

        const collage = await sharp({
            create: {
                width: 512 * prompts.length,
                height: 512,
                channels: 3,
                background: { r: 255, g: 255, b: 255 },
            },
        })
            .composite(
                images.map((img, index) => ({
                    input: img,
                    left: index * 512,
                    top: 0,
                })),
            )
            .png()
            .toBuffer();

        res.set("Content-Type", "image/png");
        res.send(collage);
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        res.status(500).send({ error: "Failed to generate collage" });
    }
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});
