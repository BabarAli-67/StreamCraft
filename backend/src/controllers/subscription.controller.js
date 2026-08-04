import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: subscribe or unsubscribe the authenticated user to channelId
})

// Returns the subscriber list for a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: return subscribers of channelId
})

// Returns channels the user is subscribed to
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    // TODO: return channels subscribed to by subscriberId
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}
