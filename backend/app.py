from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from typing import List
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from config import mongo
import random

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient(mongo.host)
db = client['comments_db']
collection = db['comments']


class Comment(BaseModel):
    username: str
    text: str


@app.get("/comments", response_model=List[Comment])
async def get_comments():
    all_comments = list(collection.find({}, {'_id': 0}))
    if len(all_comments) > 3:
        random_comments = random.sample(all_comments, 3)
    else:
        random_comments = all_comments
    return random_comments


@app.post("/comments")
async def post_comment(comment: Comment):
    collection.insert_one(comment.dict())
    return {"message": "Comment added successfully"}
