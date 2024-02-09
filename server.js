"use strict";
const express = require('express'),
app = new express(),
con = require('dotenv').config(),
router = require('./router'),
error = require('./utils/errors'),
db = require('./db'),
cors = require('cors');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
	// let tabs = await db.query("SELECT `COLUMN_NAME` FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA`='mycarehub' AND `TABLE_NAME`='users'")
	// let tabs1 = await db.query("SELECT table_name FROM information_schema.tables WHERE table_schema='mycarehub'", { type: db.QueryTypes.SELECT }); 
  // console.log(tabs)
  res.status(200).send('ok')
})

app.use('/api/', router)
router.use(error);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});