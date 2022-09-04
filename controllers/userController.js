import { getAll, getOne, create, update, updatePass, remove } from "../services/userService.js"

export const getAllUsers = async (req, res) => {
  try {
    let users = await getAll()
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error })
  }
};

export const getUser = async (req, res) => {
  try {
    let user = await getOne(req.params.id)
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

export const createUser = async (req, res) => {
  try {
    let results = await create(req.body.nombre, req.body.correo, req.body.password)
    res.json({ results })
  } catch (error) {
    res.status(400).send(error)
  }
}

export const updateUser = async (req, res) => {
  try {
    let results = await update(req.body.nombre, req.body.correo, req.params.id);
    res.json({ results })
  } catch (error) {
    res.json({ message: error.message });
  }
}

export const updatePassword = async (req, res) => {
  try {
    let results = await updatePass(req.body.currentPassword, req.body.newPassword, req.params.id);
    res.json({ results })
  } catch (error) {
    res.status(400).send(error)
  }
}

export const deleteUser = async (req, res) => {
  try {
    let results = await remove(req.params.id)
    res.json({ results })

  } catch (error) {
    res.json({ message: error.message });
  }

}





