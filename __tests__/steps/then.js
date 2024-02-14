require("dotenv").config()
const AWS = require("aws-sdk")
const http = require("axios")
const fs = require("fs")

const user_exists_in_UsersTable = async (id) => {
  const DynamoDB = new AWS.DynamoDB.DocumentClient()

  console.log(`looking for user [${id}] in table [${process.env.USERS_TABLE_NAME}]`)
  const resp = await DynamoDB.get({
    TableName: process.env.USERS_TABLE_NAME,
    Key: {
      id
    }
  }).promise()

  expect(resp.Item).toBeTruthy()

  return resp.Item
}

const user_can_upload_image_to_url = async (url, filePath, contentType) => {
  const data = fs.readFileSync(filePath)
  await http({
    method: "put",
    url,
    headers: {
      "Content-Type": contentType
    },
    data
  })
  console.log(`uploaded image to [${url}]`)
}

const user_can_download_image_from = async (url) => {
  const response = await http(url)

  console.log(`downloaded image from [${url}]`)

  return response.data
}

const tweets_exists_in_TweetsTable = async (id) => {
  const DynamoDB = new AWS.DynamoDB.DocumentClient()

  console.log(`looking for tweet [${id}] in table [${process.env.TWEETS_TABLE_NAME}]`)
  const resp = await DynamoDB.get({
    TableName: process.env.TWEETS_TABLE_NAME,
    Key: {
      id
    }
  }).promise()

  expect(resp.Item).toBeTruthy()

  return resp.Item
}

const tweets_exists_in_TimelinesTable = async (userId, tweetId) => {
  const DynamoDB = new AWS.DynamoDB.DocumentClient()

  console.log(`looking for tweet [${tweetId}] for user [${userId}] in table [${process.env.TIMELINES_TABLE_NAME}]`)
  const resp = await DynamoDB.get({
    TableName: process.env.TIMELINES_TABLE_NAME,
    Key: {
      userId,
      tweetId
    }
  }).promise()

  expect(resp.Item).toBeTruthy()

  return resp.Item
}

const tweetsCount_is_updated_in_UsersTable = async (id, newCount) => {
  const DynamoDB = new AWS.DynamoDB.DocumentClient()

  console.log(`looking for for user [${id}] in table [${process.env.USERS_TABLE_NAME}]`)
  const resp = await DynamoDB.get({
    TableName: process.env.USERS_TABLE_NAME,
    Key: {
      id
    }
  }).promise()

  expect(resp.Item).toBeTruthy()
  expect(resp.Item.tweetsCount).toEqual(newCount)

  return resp.Item
}

module.exports = {
  user_exists_in_UsersTable,
  user_can_upload_image_to_url,
  user_can_download_image_from,
  tweets_exists_in_TweetsTable,
  tweets_exists_in_TimelinesTable,
  tweetsCount_is_updated_in_UsersTable,
}