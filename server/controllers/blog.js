const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')

const createNewBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body
    if (!title || !description || !category) throw new Error('Missing inputs')
    const response = await Blog.create(req.body)
    return res.json({
        success: response ? true : false,
        createdBlog: response ? response : 'Can not creat new blog'
    })

})
const updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true })
    return res.json({
        success: response ? true : false,
        updatedBlog: response ? response : 'Can not update new blog'
    })

})

const getBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find()
    return res.json({
        success: response ? true : false,
        blogs: response ? response : 'Can not get blog'
    })

})

//LIKE DISLIKE BLOG 
//NEU DISLIKE RỒI MÀ LIKE THÌ BỎ DISLIKE , NẾU LIKE RỒI THÌ CÓ THỂ DISLIKE HOẶC THÊM LIKE

const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error('Missing inputs')
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
    const isLiked = blog?.likes?.find(el => el.toString() === _id)
    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }


})

const dislikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error('Missing inputs')
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
    const isDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if (isDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { dislikes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }

})
const getBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numberViews: 1 } }, { new: true })
        .populate('likes', 'firstname lastname')
        .populate('dislikes', 'firstname lastname')
    return res.json({
        success: blog ? true : false,
        rs: blog
    })
})

const deleteBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const blog = await Blog.findByIdAndDelete(bid)
    return res.json({
        success: blog ? true : false,
        deletedBlog: blog || 'Somthing went wrong'
    })
})

module.exports = {
    createNewBlog,
    updateBlog,
    getBlogs,
    likeBlog,
    dislikeBlog,
    getBlog,
    deleteBlog

}