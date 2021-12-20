const router = require("express").Router();
const { request, response } = require("express");
const down = require("ytdl-core");
const { getBasicInfo } = require("ytdl-core");
const findVideo = require("ytsr");

router.get("/", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return videoInfo(req, res);
  }
  try {
    const result = await findVideo(q, { limit: 15 });
    result.items = result.items.filter((i) => i.type == "video");
    res.json({ videos: result.items, q, status: "ok" });
  } catch (error) {
    res.json({ error: error.toString() });
  }
});

router.get("/download", async (req, res) => {
  const { url, format } = req.query;
  let validFormat = format == "mp4" || format == "mp3";
  if (!url || !format || !validFormat) {
    return res.json({
      error:
        "datos incorrectos debe enviar un url y el formato de descarga(format=mp3 || mp4 )",
      recibido: {
        url: `${url}`,
        format: `${format}`,
      },
    });
  }
  try {
    const {
      videoDetails: { title },
    } = await getBasicInfo(url);
    res.header("content-disposition", `attachment;filename=${title}.${format}`);
    down(url, { format }).pipe(res);
  } catch (error) {
    res.json({ error: error.toString() });
  }
});
async function videoInfo(req = request, res = response) {
  const { url, q } = req.query;
  if (!url) {
    return res.json({
      error: "no ha proveido un url de video (url) o consulta de video (q)",
      parametros: {
        url: `${url}`,
        q: `${q}`,
      },
    });
  }
  try {
    const {
      videoDetails: { title, embed, video_url, videoId },
    } = await getBasicInfo(url);
    res.json({ title, embed, videoId, video_url });
  } catch (error) {
    res.json({ error: error.toString() });
  }
}

module.exports = router;
