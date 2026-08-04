import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: return channel stats (views, subscribers, videos, likes)
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: return all videos uploaded by the authenticated channel
})

export {
    getChannelStats, 
    getChannelVideos
}
