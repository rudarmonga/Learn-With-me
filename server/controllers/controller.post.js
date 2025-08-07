const Post = require('../models/models.post');

exports.create = async (req, res) => {
  const { author, title, content, tags } = req.body;
  const post = await Post.create({ author, title, content, tags });
  res.status(201).json(post);
};

exports.getAll = async (req, res) => {
  const posts = await Post.find().populate('author').sort({ createdAt: -1 });
  res.json(posts);
};

exports.getOne = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author');
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
};

exports.like = async (req, res) => {
  const { userId } = req.body;
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: userId } },
    { new: true }
  );
  res.json(post);
};

exports.comment = async (req, res) => {
  const { userId, text } = req.body;
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: { user: userId, text } } },
    { new: true }
  );
  res.json(post);
};
