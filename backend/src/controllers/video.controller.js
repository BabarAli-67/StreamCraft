import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    // TODO: implement query, sort, and pagination for video listing
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: upload video to Cloudinary and create video document
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    // TODO: fetch video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    // TODO: update title, description, and/or thumbnail
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    // TODO: delete video document and associated Cloudinary assets
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    // TODO: toggle isPublished flag
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
