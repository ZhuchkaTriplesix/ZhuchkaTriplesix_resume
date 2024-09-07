from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from typing import List
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешаем запросы от всех доменов
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все HTTP методы
    allow_headers=["*"],  # Разрешаем все заголовки
)

# Настройка подключения к MongoDB
client = MongoClient('mongodb://mongo:27017/')
db = client['comments_db']
collection = db['comments']

class Comment(BaseModel):
    username: str
    text: str

@app.get("/comments", response_model=List[Comment])
async def get_comments():
    all_comments = list(collection.find({}, {'_id': 0}))  # Получаем все комментарии
    if len(all_comments) > 3:
        random_comments = random.sample(all_comments, 3)  # Выбираем случайные 3 комментария
    else:
        random_comments = all_comments  # Если меньше 3, возвращаем все

    return random_comments

@app.post("/comments")
async def post_comment(comment: Comment):
    collection.insert_one(comment.dict())
    return {"message": "Comment added successfully"}
