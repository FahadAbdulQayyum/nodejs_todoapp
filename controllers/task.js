import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    // const { title, description } = req.body;
    const { name, address, phone, about } = req.body;

    // await Task.create({
    //   title,
    //   description,
    //   user: req.user,
    // });

    await Task.create({
      name,
      address,
      phone,
      about,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  // export const getMyTask = (req, res, next) => {
  // console.log('req', req.body)
  try {
    const userid = req.user._id;

    console.log('userid', req);

    const tasks = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {

  const { name, address, phone, about } = req.body;
  const taskFields = {};

  if (name) taskFields.name = name;
  if (address) taskFields.address = address;
  if (phone) taskFields.phone = phone;
  if (about) taskFields.about = about;

  try {
    // const task = await Task.findById(req.params.id);
    let task = await Task.findById(req.params.id)

    if (!task) return next(new ErrorHandler("Task not found", 404));

    task = await Task.findByIdAndUpdate(req.params.id,
      { $set: taskFields },
      { new: true }
    );

    // res.json(task)
    // // task.updateOne(task['_id'], { $set: eq?.body })
    // task.isCompleted = !task.isCompleted;
    // await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated!",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    console.log('req.params.id', req.params.id)
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task not found", 404));
    await task.deleteOne();

    res.status(200).json({
      message: "Task Deleted!",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
