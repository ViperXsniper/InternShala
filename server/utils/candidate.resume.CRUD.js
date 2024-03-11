const errorHandler = require("../middlewares/errorandler");
const candidateModel = require("../model/candidate.modle");
const { v4: uuidv4 } = require("uuid");


// ADDING DETAILS //
const addDets = (field) => async (req,res) => {

  const candidate = await candidateModel.findById(req.id).exec();

  if (!candidate) {
    return res.status(404).json({ message: 'Candidate not found' });
  }

  // Check if the specified field exists in the resume
  if (!candidate.resume[field]) {
    return res.status(400).json({ message: 'Invalid field specified' });
  }

  if (field === "skills") {
    const data = JSON.parse(req.body.data);

    // Validation
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: 'Invalid data format' });
    }
  
    // Iterate over each item in the array and add it to the resume
    data.forEach(({ name, level }) => {
      if (typeof name === 'string' && ['Beginner', 'Intermediate', 'Advanced'].includes(level)) {
        candidate.resume[field].push({ name, level, id: uuidv4() });
      }
    });
  }
  else {
    candidate.resume[field].push({ ...req.body, id: uuidv4() });
    
  }

  await candidate.save();

  res.json({ message: `${field} added!` });
}

// EDIT DETAILS //
const editDets = (field) => async (req,res) => {
    const candidate = await candidateModel.findById(req.id).exec();
    if (!req.params.uid) {
      next(new errorHandler("Invalid URL please try again",404))
    }
    const eduIndex = candidate.resume[field].findIndex(
      (itm) => itm.id === req.params.uid);
      candidate.resume[field][eduIndex] = {
        ...candidate.resume[field][eduIndex],
        ...req.body,
      };
      await candidate.save();
      res.json({
        message: `${field} Updated !`,
      });
  }

// Delete Details //
  const deleteDets = (field) => async (req,res,next) => {
    const candidate = await candidateModel.findById(req.id).exec();
    const filtered = candidate.resume[field].filter((i)=> {
      if (!req.params.uid) {
        next(new errorHandler("Invalid URL please try again...",404));
      }
      else {
        return i.id !== req.params.uid
      }
    });
    candidate.resume[field] = filtered;
    await candidate.save();
    res.json({
      message: `${field} Deleted !`
    });
  };

module.exports = {
    addDets,
    editDets,
    deleteDets,
}