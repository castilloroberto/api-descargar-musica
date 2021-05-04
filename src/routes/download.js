const router = require('express').Router()
const down = require('ytdl-core')
const findvideo = require('ytsr')
const {getBasicInfo} = require('ytdl-core')

router.post('/search', async (req,res)=>{
    const {url} = req.body
    const {items} = await findvideo(url,{limit:15})
    res.json({
        items
    })
})

router.get('/download', async (req,res)=>{
    
    const {url} = req.query
    const info = await getBasicInfo(url)
    const {title} = info.videoDetails
    res.header(
        'Content-Disposition',
        `attachment;filename="${title}.mp4`
    )
    
    down(url,{
        format:'mp4'
    })
    .pipe(res)


})


router.post('/info/', async (req,res)=>{
    const {url} = req.body
   
    console.log('LOG de URL: ',url)
    if (url) {
        let info = await getBasicInfo(url)

        const {title,video_url,thumbnails,videoId} = info.videoDetails
       
        res.json({
           title,
           video_url,
           videoId
        })
    }else{
        res.send({"msg":"hola"})
    }
})


router.get('/song', async (req,res)=>{
    const {url} = req.query
    let info = await getBasicInfo(url)
    const {title} = info.videoDetails
    res.header(
        'Content-Disposition',
        `attachment;filename="${title}.mp3`
    )
    down(url,{
        format:'mp3'
    })
    .pipe(res)
    

})


module.exports = router