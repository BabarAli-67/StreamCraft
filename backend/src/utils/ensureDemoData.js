import { User } from "../models/user.model.js"
import { Video } from "../models/video.model.js"

const SAMPLE_VIDEO = "https://res.cloudinary.com/demo/video/upload/dog.mp4"
const thumb = (seed) => `https://picsum.photos/seed/${seed}/1280/720`
const avatar = (seed) => `https://picsum.photos/seed/${seed}-avatar/200/200`
const cover = (seed) => `https://picsum.photos/seed/${seed}-cover/1600/400`

/**
 * If the database has no videos, insert public demo content so guests
 * see a feed without logging in. Never deletes existing data.
 */
export const ensureDemoData = async () => {
    const videoCount = await Video.countDocuments()
    if (videoCount > 0) {
        console.log(`Demo seed skipped — ${videoCount} video(s) already in DB`)
        return
    }

    console.log("Empty database detected — seeding public demo videos…")

    const password = "Password123!"

    const upsertUser = async (data) => {
        const existing = await User.findOne({ email: data.email })
        if (existing) return existing
        return User.create(data)
    }

    const nexus = await upsertUser({
        username: "nexusgaming",
        email: "nexus@streamcraft.dev",
        fullName: "Nexus Gaming",
        password,
        avatar: avatar("nexus"),
        coverImage: cover("nexus"),
    })
    const code = await upsertUser({
        username: "codeaesthetics",
        email: "code@streamcraft.dev",
        fullName: "Code Aesthetics",
        password,
        avatar: avatar("code"),
        coverImage: cover("code"),
    })
    const design = await upsertUser({
        username: "designmaster",
        email: "design@streamcraft.dev",
        fullName: "Design Master",
        password,
        avatar: avatar("design"),
        coverImage: cover("design"),
    })
    const beats = await upsertUser({
        username: "beatsbynight",
        email: "beats@streamcraft.dev",
        fullName: "Beats By Night",
        password,
        avatar: avatar("beats"),
        coverImage: cover("beats"),
    })
    const tech = await upsertUser({
        username: "techvision",
        email: "tech@streamcraft.dev",
        fullName: "Tech Vision",
        password,
        avatar: avatar("tech"),
        coverImage: cover("tech"),
    })

    await Video.insertMany([
        {
            title: "Cyberpunk 2077: Phantom Liberty - Full Playthrough Part 1",
            description: "Gaming • 1080p60 — Opening missions and build setup.",
            videoFile: SAMPLE_VIDEO,
            thumbnail: thumb("dash1"),
            duration: 765,
            views: 45231,
            isPublished: true,
            owner: nexus._id,
        },
        {
            title: "Mastering Tailwind CSS - Advanced Layouts Tutorial",
            description: "Education • 1080p — Grid, container queries, and dark themes.",
            videoFile: SAMPLE_VIDEO,
            thumbnail: thumb("dash3"),
            duration: 1335,
            views: 12890,
            isPublished: true,
            owner: nexus._id,
        },
        {
            title: "The Absolute State of Competitive Play in Season 9",
            description: "Deep dive into the Season 9 meta and ranked comps.",
            videoFile: SAMPLE_VIDEO,
            thumbnail: thumb("dash4"),
            duration: 1455,
            views: 450230,
            isPublished: true,
            owner: nexus._id,
        },
        {
            title: "Building a Scalable Real-time Shader Engine in WebGL",
            description: "Architecture walkthrough for a browser shader engine.",
            videoFile: SAMPLE_VIDEO,
            thumbnail: thumb("vid2"),
            duration: 2700,
            views: 1024593,
            isPublished: true,
            owner: code._id,
        },
        {
            title: "The Future of UI Design in 2025: Trends to Watch",
            description: "Typography, motion, and dark-mode patterns.",
            videoFile: SAMPLE_VIDEO,
            thumbnail: thumb("vid3"),
            duration: 863,
            views: 1200000,
            isPublished: true,
            owner: design._id,
        },
        {
            title: "Synthwave Mix 2024 - Focus & Code",
            description: "A long-form synthwave mix for deep work sessions.",
            videoFile: SAMPLE_VIDEO,
            thumbnail: thumb("vid4"),
            duration: 2710,
            views: 890400,
            isPublished: true,
            owner: beats._id,
        },
        {
            title: "The Phone That Changes Everything",
            description: "Hands-on review of the latest flagship hardware.",
            videoFile: SAMPLE_VIDEO,
            thumbnail: thumb("vid5"),
            duration: 525,
            views: 2100450,
            isPublished: true,
            owner: tech._id,
        },
        {
            title: "Advanced Raymarching Techniques in Three.js",
            description: "Signed distance fields, soft shadows, and camera tricks.",
            videoFile: SAMPLE_VIDEO,
            thumbnail: thumb("vid6"),
            duration: 1450,
            views: 340200,
            isPublished: true,
            owner: code._id,
        },
    ])

    console.log(
        "Public demo videos seeded. Guests can browse without login. Demo login: nexus@streamcraft.dev / Password123!"
    )
}
