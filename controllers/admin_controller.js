const Video = require("../models/video");
const { Op } = require("sequelize");

const addContent = async (req, res, next) => {
  try {
    const { title, url, description, publish_date, thumbnail, status, tags } =
      req.body;

    await Video.create({
      title,
      url,
      description,
      publish_date,
      thumbnail,
      status,
      tags,
      views: 0,
    });

    res.status(201).json({ message: "success" });
  } catch (err) {
    console.error("Error in addContent: " + err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const editContent = async (req, res, next) => {
  try {
    const {id} = req.params;
    const { title, url, description, publish_date, thumbnail, status, tags } =
      req.body;

    await Video.update(
      { title, url, description, publish_date, thumbnail, status, tags },
      { where: { id: id } }
    );
    res.status(201).json({ message: "success" });
  } catch (err) {
    console.error("Error in editContent: " + err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getContentList = async (req, res, next) => {
  try {
    const { order_by, status, start_date, end_date, index, page_size } =
      req.query;

    const video_filters = {};
    let order;
    let limit;
    let offset;

    if (!id) {
    }
    if (index && page_size) {
      (limit = parseInt(page_size)), (offset = (parseInt(index) - 1) * limit);
    }

    if (order_by) {
      if (
        order_by != "title" &&
        order_by != "views" &&
        order_by != "publish_date"
      ) {
        return res
          .status(400)
          .json({ message: "order_by param is incorrect!" });
      }
      order = [[order_by, "DESC"]];
    }

    if (status) {
      if (status != "draft" && status != "published") {
        return res.status(400).json({ message: "status param is incorrect!" });
      }
      video_filters.status = status;
    }

    if (start_date && end_date) {
      (video_filters.publish_date = { [Op.gte]: start_date }),
        (video_filters.publish_date = { [Op.lt]: end_date });
    }

    const { count, rows } = await Video.findAndCountAll({
      where: video_filters,
      order: order,
      limit: limit,
      offset: offset,
    });

    res
      .status(200)
      .json({ message: "success", data: rows, totalRecords: count });
  } catch (err) {
    console.error("Error in getContestList : " + err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getContentById = async (req, res, next) => {
  try {
    const { id } = req.query;

    const data = await Video.findOne({ where: { id: id } });

    res.status(200).json({ message: "success", data });
  } catch (err) {
    console.error("Error in getContentById: " + err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addContent,
  editContent,
  getContentList,
  getContentById,
};
