const Submit = require("../models/submit.model");

createSubmit = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(203).json({
      success: false,
      error: "You must provide a submit",
    });
  }

  const submit = new Submit(body);

  if (!submit) {
    return res.status(203).json({ success: false, error: err });
  }

  submit
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: submit._id,
        message: "Submit created!",
      });
    })
    .catch((error) => {
      return res.status(203).json({
        error,
        message: "Submit not created!",
      });
    });
};

updateSubmit = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(203).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Submit.findOne({ _id: req.params.id }, (err, submit) => {
    if (err) {
      return res.status(203).json({
        err,
        message: "Submit not found!",
      });
    }
    submit.name = body.name;
    submit.email = body.email;
    submit.phone = body.phone;
    submit.status = body.status;
    submit
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: submit._id,
          message: "Submit updated!",
        });
      })
      .catch((error) => {
        return res.status(203).json({
          error,
          message: "Submit not updated!",
        });
      });
  });
};

deleteSubmit = async (req, res) => {
  await Submit.findOneAndDelete({ _id: req.params.id }, (err, submit) => {
    if (err) {
      return res.status(203).json({ success: false, error: err });
    }

    if (!submit) {
      return res
        .status(203)
        .json({ success: false, error: `Submit not found` });
    }

    return res.status(200).json({ success: true, data: submit });
  }).catch((err) => console.log(err));
};

getSubmitById = async (req, res) => {
  await Submit.findOne({ _id: req.params.id }, (err, submit) => {
    if (err) {
      return res.status(203).json({ success: false, error: err });
    }

    if (!submit) {
      return res
        .status(203)
        .json({ success: false, error: `Submit not found` });
    }
    return res.status(200).json({ success: true, data: submit });
  }).catch((err) => console.log(err));
};

getSubmits = async (req, res) => {
  const params = req.params;
  let totalpages = 0;
  const limit = params.limit ? parseInt(params.limit) : 10;
  const page = params.page ? parseInt(params.page) - 1 : 0;
  await Submit.count((error, result) => {
    totalpages = Math.ceil(result / limit);
  });
  await Submit.find({}, (err, submits) => {
    if (err) {
      return res.status(203).json({ success: false, error: err });
    }
    if (!submits.length) {
      return res
        .status(203)
        .json({ success: false, error: `Submit not found!` });
    }
    return res.status(200).json({ success: true, data: submits, totalpages });
  })
    .limit(limit)
    .skip(page * limit)
    .catch((err) => console.log(err));
};

module.exports = {
  createSubmit,
  updateSubmit,
  deleteSubmit,
  getSubmits,
  getSubmitById,
};
