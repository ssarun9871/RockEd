const User = require("../models/user");
const Video = require("../models/video");
const View = require("../models/view");

const getContent = async (req, res, next) => {
  try {
    const { email } = req.headers;

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }

    const data = await Video.findAll({
      where: {
        status: "PUBLISHED",
        deleted: false,
      },
      include: [
        {
          model: View,
        },
      ],
    });

    res.status(200).json({ message: "success", data });
  } catch (err) {
    console.error("Error in getContentById: " + err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const watchContent = async (req, res, next) => {
  try {
    const { email } = req.headers;
    const { video_id } = req.params;

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const video = await Video.findOne({
      where: {
        id: video_id,
        status: "PUBLISHED",
        deleted: false,
      },
    });

    if (!video) {
      return res.status(400).json({ message: "Video not found!" });
    }

    await View.create({
      user_id: user.id,
      video_id: video.id,
    });

    video.views = Video.views + 1;
    await video.save();

    res.status(200).json({ message: "success" });
  } catch (err) {
    console.error("Error in getContentById: " + err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getContent,
  watchContent,
};
