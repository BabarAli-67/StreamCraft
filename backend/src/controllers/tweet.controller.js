import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    // TODO: create tweet for the authenticated user
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: return tweets for a given user
})

const updateTweet = asyncHandler(async (req, res) => {
    // TODO: update tweet content
})

const deleteTweet = asyncHandler(async (req, res) => {
    // TODO: delete tweet
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
