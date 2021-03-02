const Action = require("../models/action.model");

createAction = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(203).json({
      success: false,
      error: "You must provide a action",
    });
  }

  const action = new Action(body);

  if (!action) {
    return res.status(203).json({ success: false, error: err });
  }

  action
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: action._id,
        message: "Action created!",
      });
    })
    .catch((error) => {
      return res.status(203).json({
        error,
        message: "Action not created!",
      });
    });
};

updateAction = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(203).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Action.findOne({ _id: req.params.id }, (err, action) => {
    if (err) {
      return res.status(203).json({
        err,
        message: "Action not found!",
      });
    }
    action.code = body.code;
    action.name = body.name;
    action.description = body.description;
    action.status = body.status;
    action
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: action._id,
          message: "Action updated!",
        });
      })
      .catch((error) => {
        return res.status(203).json({
          error,
          message: "Action not updated!",
        });
      });
  });
};

deleteAction = async (req, res) => {
  await Action.findOneAndDelete({ _id: req.params.id }, (err, action) => {
    if (err) {
      return res.status(203).json({ success: false, error: err });
    }

    if (!action) {
      return res
        .status(203)
        .json({ success: false, error: `Action not found` });
    }

    return res.status(200).json({ success: true, data: action });
  }).catch((err) => console.log(err));
};

getActionById = async (req, res) => {
  await Action.findOne({ _id: req.params.id }, (err, action) => {
    if (err) {
      return res.status(203).json({ success: false, error: err });
    }

    if (!action) {
      return res
        .status(203)
        .json({ success: false, error: `Action not found` });
    }
    return res.status(200).json({ success: true, data: action });
  }).catch((err) => console.log(err));
};

getActions = async (req, res) => {
  const params = req.params;
  let totalpages = 0;
  const limit = params.limit ? parseInt(params.limit) : 10;
  const page = params.page ? parseInt(params.page) - 1 : 0;
  await Action.count((error, result) => {
    totalpages = Math.ceil(result / limit);
  });
  await Action.find({}, (err, actions) => {
    if (err) {
      return res.status(203).json({ success: false, error: err });
    }
    if (!actions.length) {
      return res
        .status(203)
        .json({ success: false, error: `Action not found!` });
    }
    return res.status(200).json({ success: true, data: actions, totalpages });
  })
    .limit(limit)
    .skip(page * limit)
    .catch((err) => console.log(err));
};

module.exports = {
  createAction,
  updateAction,
  deleteAction,
  getActions,
  getActionById,
};
