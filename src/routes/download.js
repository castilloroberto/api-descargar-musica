const router = require("express").Router();
const down = require("ytdl-core");
const findvideo = require("ytsr");
const { getBasicInfo } = require("ytdl-core");

router.get("/", (req, res) => {
  res.json({
    rutasv1: {
      search: {
        method: "post",
        endpoint: "/search",
        query: ["url"],
      },
      download: { method: "get", endpoint: "/download" },
      info: { method: "post", endpoint: "/info" },
      song: { method: "get", endpoint: "/song" },
    },
    rutasv2: {
      "/api.v2/videos/": {
        query: {
          q: "busqueda de video",
        },
        "/download": {
          query: ["url", "format"],
        },
      },
    },
  });
});
router.post("/search", async (req, res) => {
  const { url } = req.body;
  const { items } = await findvideo(url, { limit: 15 });
  res.json({
    items,
  });
});

router.get("/download", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({
      msg: "no ha enviado el identificador del video que desea decargar",
    });
  }
  try {
    const info = await getBasicInfo(url);
    const { title } = info.videoDetails;
    res.header("Content-Disposition", `attachment;filename="${title}.mp4`);

    down(url, {
      format: "mp4",
    }).pipe(res);
  } catch (error) {
    res.status(400).json({ msg: "url invalido", error });
  }
});

router.post("/info/", async (req, res) => {
  const { url } = req.body;

  console.log("LOG de URL: ", url);
  if (url) {
    let info = await getBasicInfo(url);

    const { title, video_url, thumbnails, videoId } = info.videoDetails;

    res.json({
      title,
      video_url,
      videoId,
    });
  } else {
    res.status(400).send({ msg: "no envio ningun url" });
  }
});

router.get("/song", async (req, res) => {
  const { url } = req.query;
  let info = await getBasicInfo(url);
  const { title } = info.videoDetails;
  res.header("Content-Disposition", `attachment;filename="${title}.mp3`);
  down(url, {
    format: "mp3",
  }).pipe(res);
});

module.exports = router;
