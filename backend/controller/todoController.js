import Todo from "../models/Todo.js";


export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;

    const todo = await Todo.create({
      title,
      user: req.user._id,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc Get user todos
// @route GET /api/todos
// @access Private
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc Update todo
// @route PUT /api/todos/:id
// @access Private
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Ownership check
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    todo.title = req.body.title || todo.title;
    todo.completed =
      req.body.completed !== undefined
        ? req.body.completed
        : todo.completed;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc Delete todo
// @route DELETE /api/todos/:id
// @access Private
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Ownership check
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await todo.deleteOne();
    res.json({ message: "Todo removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
