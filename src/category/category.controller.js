import Category from './category.model.js'

//TEST
export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}


//REGISTER
export const register = async (req, res) => {
    try {
        let data = req.body
        console.log(data)
        let category = new Category(data)
        await category.save()
        return res.send({ message: 'Registered successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Faild add category ' })

    }
}

//GET
export const get = async (req, res) => {
    try {
        const category = await Category.find();
        return res.send(category)
    } catch (err) {
        console.error(err);
        return res.status(404).send({ message: 'error getting category' })
    }
}

//UPDATE
export const update = async (req, res) => {
    try {
        let { id } = req.params;
        let data = req.body;
        let updatedCategory = await Category.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updatedCategory) return res.status(404).send({ message: 'Category not found and not updated' });
        return res.send({ message: 'Category updated', updatedCategory });
    } catch (err) {
        console.error(err);
        if (err.keyValue && err.keyValue.name) return res.status(400).send({ message: `Category ${err.keyValue.name} is already taken` });
        return res.status().send({ message: 'Error updating category' });
    }
}

//DELETE
export const deleteC = async (req, res) => {
    try {
        let { id } = req.params
        let deletedCategory = await Category.findOneAndDelete({ _id: id })
        if (!deletedCategory) return res.status(404).send({ message: 'Category not found and not deleted' })
        return res.send({ message: `Category with name ${deletedCategory.name} deleted successfully` });
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting Category' })
    }
}

//SEARCH
export const search = async (req, res) => {
    try {
        let { search } = req.body
        let category = await Category.find({ name: search })
        if (!category) return res.status(404).send({ message: 'Category not found' })
        return res.send({ message: 'Category found', category })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error searching Category' })
    }
}