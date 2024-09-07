import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Подключение стилей

const App = () => {
    const [comments, setComments] = useState([]);
    const [username, setUsername] = useState('');
    const [commentText, setCommentText] = useState('');

    // Функция для получения отзывов с сервера
    const fetchComments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/comments'); // Убедитесь, что URL соответствует вашему серверу
            setComments(response.data); // Отображаем комментарии
        } catch (error) {
            console.error('Ошибка при загрузке отзывов:', error);
        }
    };

    // Функция для обработки отправки формы отзыва
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8000/comments', {
                username,
                text: commentText
            });

            setUsername('');
            setCommentText('');
            fetchComments(); // Обновляем отзывы после отправки
        } catch (error) {
            console.error('Ошибка при отправке отзыва:', error);
        }
    };

    // Загружаем отзывы при инициализации компонента
    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <div className="App">
            <header>
                <div className="container">
                    <h1>Козлов Владимир</h1>
                    <p>Backend Developer</p>
                </div>
            </header>

            <main>
                <section className="about">
                    <div className="container">
                        <h2>Обо мне:</h2>
                        <p>Меня зовут Козлов Владимир, я профессиональный веб-разработчик. Специализируюсь на создании API.</p>
                    </div>
                </section>

                <section className="skills">
                    <div className="container">
                        <h2>Мои навыки:</h2>
                        <ul>
                            <li>Python</li>
                            <li>FastAPI</li>
                            <li>Docker</li>
                            <li>Postgresql</li>
                            <li>MongoDB</li>
                        </ul>
                    </div>
                </section>

                <section className="contact">
                    <div className="container">
                        <h2>Контакты:</h2>
                        <p>Email: <a href="mailto:mrlololoshka94@gmail.com">mrlololoshka94@gmail.com</a></p>
                        <p>Телефон: +7 (123) 456-7890</p>
                        <p>LinkedIn: <a href="https://linkedin.com/in/ivan-ivanov" target="_blank" rel="noopener noreferrer">А вот не скажу</a></p>
                        <a href="https://github.com/ZhuchkaTriplesix" target="_blank" rel="noopener noreferrer" className="btn-github">Перейти на GitHub</a>
                    </div>
                </section>

                <section className="comments">
                    <div className="container">
                        <h3>Отзывы:</h3>
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <div key={index} className="comment">
                                    <p><strong>{comment.username}:</strong> {comment.text}</p>
                                </div>
                            ))
                        ) : (
                            <p>Отзывов пока нет.</p>
                        )}
                    </div>
                </section>

                <section className="comment-form">
                    <div className="container">
                        <h3>Оставить отзыв:</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Ваше имя"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <textarea
                                placeholder="Ваш отзыв"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                required
                            ></textarea>
                            <button type="submit">Отправить отзыв</button>
                        </form>
                    </div>
                </section>
            </main>

            <footer>
                <div className="container">
                    <p>&copy; 2024 ZhuchkaTriplesix</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
