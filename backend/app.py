from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId
import random


client = MongoClient("mongodb://mongo:27017/")
db = client["comments_db"]
collection = db["comments"]

app = FastAPI()



class Comment(BaseModel):
    username: str
    comment: str


@app.get("/comments")
async def get_comments():
    comments = []
    for item in collection.find():
        comments.append({"username": item["username"], "comment": item["comment"]})
    return comments


@app.get("/comments/random")
async def get_random_comments():
    try:
        random_comments = list(collection.aggregate([{"$sample": {"size": 3}}]))
        return [{"username": item["username"], "comment": item["comment"]} for item in random_comments]
    except Exception as e:
        raise HTTPException(status_code=500, detail="Ошибка при получении случайных отзывов")


@app.post("/comments")
async def add_comment(comment: Comment):
    if collection.find_one({"username": comment.username}):
        raise HTTPException(status_code=400, detail="Пользователь с таким именем уже оставлял комментарий")

    collection.insert_one({"username": comment.username, "comment": comment.comment})
    return {"message": "Комментарий добавлен успешно!"}
