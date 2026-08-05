import dotenv from "dotenv";
import connectDB from "../db/index.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";
import { Like } from "../models/like.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Tweet } from "../models/tweet.model.js";
import { Playlist } from "../models/playlist.model.js";

dotenv.config({ path: "./.env" });

const SAMPLE_VIDEO =
  "https://res.cloudinary.com/demo/video/upload/dog.mp4";
const thumb = (seed) =>
  `https://picsum.photos/seed/${seed}/1280/720`;
const avatar = (seed) =>
  `https://picsum.photos/seed/${seed}-avatar/200/200`;
const cover = (seed) =>
  `https://picsum.photos/seed/${seed}-cover/1600/400`;

const seed = async () => {
  await connectDB();

  console.log("Clearing existing collections...");
  await Promise.all([
    User.deleteMany({}),
    Video.deleteMany({}),
    Comment.deleteMany({}),
    Like.deleteMany({}),
    Subscription.deleteMany({}),
    Tweet.deleteMany({}),
    Playlist.deleteMany({}),
  ]);

  console.log("Creating users...");
  const usersData = [
    {
      username: "nexusgaming",
      email: "nexus@streamcraft.dev",
      fullName: "Nexus Gaming",
      password: "Password123!",
      avatar: avatar("nexus"),
      coverImage: cover("nexus"),
    },
    {
      username: "codeaesthetics",
      email: "code@streamcraft.dev",
      fullName: "Code Aesthetics",
      password: "Password123!",
      avatar: avatar("code"),
      coverImage: cover("code"),
    },
    {
      username: "designmaster",
      email: "design@streamcraft.dev",
      fullName: "Design Master",
      password: "Password123!",
      avatar: avatar("design"),
      coverImage: cover("design"),
    },
    {
      username: "beatsbynight",
      email: "beats@streamcraft.dev",
      fullName: "Beats By Night",
      password: "Password123!",
      avatar: avatar("beats"),
      coverImage: cover("beats"),
    },
    {
      username: "techvision",
      email: "tech@streamcraft.dev",
      fullName: "Tech Vision",
      password: "Password123!",
      avatar: avatar("tech"),
      coverImage: cover("tech"),
    },
    {
      username: "viewerone",
      email: "viewer1@streamcraft.dev",
      fullName: "Alex Rivera",
      password: "Password123!",
      avatar: avatar("viewer1"),
      coverImage: cover("viewer1"),
    },
    {
      username: "viewertwo",
      email: "viewer2@streamcraft.dev",
      fullName: "Sam Chen",
      password: "Password123!",
      avatar: avatar("viewer2"),
      coverImage: cover("viewer2"),
    },
    {
      username: "viewerthree",
      email: "viewer3@streamcraft.dev",
      fullName: "Jordan Lee",
      password: "Password123!",
      avatar: avatar("viewer3"),
      coverImage: cover("viewer3"),
    },
  ];

  const users = [];
  for (const data of usersData) {
    users.push(await User.create(data));
  }

  const [nexus, code, design, beats, tech, viewer1, viewer2, viewer3] = users;

  console.log("Creating dashboard-rich videos for Nexus Gaming...");
  const nexusVideos = await Video.insertMany([
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
      title: "The Ultimate Desk Setup 2023 - Minimalist & Productive",
      description: "Tech Review • 4K — Cable management and lighting tips.",
      videoFile: SAMPLE_VIDEO,
      thumbnail: thumb("dash2"),
      duration: 500,
      views: 0,
      isPublished: false,
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
      title: "Breaking Down the New Engine Physics",
      description: "Frame-by-frame analysis of the latest engine patch.",
      videoFile: SAMPLE_VIDEO,
      thumbnail: thumb("dash5"),
      duration: 1112,
      views: 120800,
      isPublished: true,
      owner: nexus._id,
    },
    {
      title: "Grand Finals VOD - World Championship 2024",
      description: "Full VOD review with timestamped callouts.",
      videoFile: SAMPLE_VIDEO,
      thumbnail: thumb("dash6"),
      duration: 6310,
      views: 1100450,
      isPublished: true,
      owner: nexus._id,
    },
    {
      title: "Is the New Setup Worth It? (Honest Review)",
      description: "Hardware review with FPS benchmarks.",
      videoFile: SAMPLE_VIDEO,
      thumbnail: thumb("dash7"),
      duration: 725,
      views: 320400,
      isPublished: true,
      owner: nexus._id,
    },
    {
      title: "Draft: Ranked Climb Tips (Unlisted WIP)",
      description: "Work-in-progress tips video — kept as draft.",
      videoFile: SAMPLE_VIDEO,
      thumbnail: thumb("dash8"),
      duration: 620,
      views: 0,
      isPublished: false,
      owner: nexus._id,
    },
  ]);

  console.log("Creating other channel videos...");
  const otherVideos = await Video.insertMany([
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
  ]);

  const videos = [...nexusVideos, ...otherVideos];

  console.log("Creating comments, likes, subscriptions...");
  await Comment.insertMany([
    {
      content: "Meta is wild right now. Thanks for the breakdown.",
      video: nexusVideos[3]._id,
      owner: tech._id,
    },
    {
      content: "That Phantom Liberty run was insane!",
      video: nexusVideos[0]._id,
      owner: viewer1._id,
    },
    {
      content: "Tailwind section at 12:00 changed how I build layouts.",
      video: nexusVideos[2]._id,
      owner: design._id,
    },
    {
      content: "Playing this on loop while shipping features 🔥",
      video: otherVideos[2]._id,
      owner: code._id,
    },
  ]);

  // Lots of likes on Nexus videos for dashboard totalLikes
  const nexusLikeDocs = [];
  for (const video of nexusVideos) {
    for (const fan of [code, design, beats, tech, viewer1, viewer2, viewer3]) {
      nexusLikeDocs.push({ video: video._id, likedBy: fan._id });
    }
  }
  await Like.insertMany([
    ...nexusLikeDocs,
    { video: otherVideos[0]._id, likedBy: design._id },
    { video: otherVideos[0]._id, likedBy: nexus._id },
    { video: otherVideos[1]._id, likedBy: tech._id },
    { video: otherVideos[3]._id, likedBy: beats._id },
  ]);

  // All other users subscribe to Nexus for dashboard subscriber count
  await Subscription.insertMany([
    { subscriber: code._id, channel: nexus._id },
    { subscriber: design._id, channel: nexus._id },
    { subscriber: beats._id, channel: nexus._id },
    { subscriber: tech._id, channel: nexus._id },
    { subscriber: viewer1._id, channel: nexus._id },
    { subscriber: viewer2._id, channel: nexus._id },
    { subscriber: viewer3._id, channel: nexus._id },
    { subscriber: nexus._id, channel: code._id },
    { subscriber: nexus._id, channel: tech._id },
    { subscriber: tech._id, channel: code._id },
    { subscriber: beats._id, channel: design._id },
  ]);

  await Tweet.insertMany([
    {
      content:
        "Just finished rendering the deep dive on the new patch notes. The meta is about to shift massively. Video goes live at 5PM EST. Be ready. 🚀",
      owner: nexus._id,
    },
    {
      content:
        "Setup is finally clean. Cable management took hours but totally worth it for that minimal theater-mode vibe.",
      owner: nexus._id,
    },
    {
      content: "Dashboard looking healthy this week — thanks for the support!",
      owner: nexus._id,
    },
    {
      content:
        "Shipping a WebGL shader series next week. Drop topics you want covered.",
      owner: code._id,
    },
  ]);

  await Playlist.create({
    name: "Competitive Essentials",
    description: "Must-watch ranked and VOD analysis",
    owner: nexus._id,
    videos: [nexusVideos[3]._id, nexusVideos[4]._id, nexusVideos[5]._id],
  });

  await Playlist.create({
    name: "Creator Studio Picks",
    description: "Uploads featured on the channel dashboard",
    owner: nexus._id,
    videos: [nexusVideos[0]._id, nexusVideos[2]._id, nexusVideos[6]._id],
  });

  await User.findByIdAndUpdate(nexus._id, {
    $set: {
      watchHistory: [
        otherVideos[0]._id,
        otherVideos[1]._id,
        otherVideos[3]._id,
      ],
    },
  });

  const nexusViews = nexusVideos.reduce((sum, v) => sum + (v.views || 0), 0);

  console.log("\nSeed complete.\n");
  console.log("=== Dashboard demo account ===");
  console.log("  Email:    nexus@streamcraft.dev");
  console.log("  Password: Password123!");
  console.log(
    `  Expected dashboard: ${nexusVideos.length} videos, ${nexusViews.toLocaleString()} views, 7 subscribers`
  );
  console.log("\nOther accounts (same password):");
  users.slice(1, 5).forEach((user) => {
    console.log(`  • ${user.email}  (@${user.username})`);
  });
  console.log(`\nTotal videos: ${videos.length} | Users: ${users.length}`);

  process.exit(0);
};

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
