const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTag = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(singleTag);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagName = await Tag.update({
      tag_name: req.body.tag_name,
    },
      {
        where: {
          id: req.params.id
        },
      });
    res.status(200).json(tagName);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDelete = await Tag.destroy(
      {
        where: {
          id: req.params.id
        },
      });
    res.status(200).json(tagDelete)
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
