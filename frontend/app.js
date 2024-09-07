new Vue({
    el: '#app',
    data: {
        name: 'Козлов Владимир',
        profession: 'Python Backend Deceloper',
        aboutMe: 'Меня зовут Козлов Владимир, я профессиональный веб-разработчик со стажем год. Специализируюсь на создании API.',
        skills: ['Python', 'Fastapi', 'Sqlalchemy', 'Redis', 'Docker'],
        email: 'mrlololoshka94@gmail.com',
        phone: '+7 (123) 456-7890',
        githubLink: 'https://github.com/ZhuchkaTriplesix',
        comments: [],
        newUsername: '',
        newComment: ''
    },
    mounted() {
        this.fetchRandomComments();
    },
    methods: {
        async fetchRandomComments() {
            try {
                const response = await axios.get('http://localhost:8000/comments/random');
                this.comments = response.data;
            } catch (error) {
                console.error('Ошибка при получении случайных комментариев:', error);
            }
        },
        async submitComment() {
            try {
                await axios.post('http://localhost:8000/comments', {
                    username: this.newUsername,
                    comment: this.newComment
                });
                this.fetchRandomComments();
                this.newUsername = '';
                this.newComment = '';
            } catch (error) {
                console.error('Ошибка при добавлении комментария:', error);
            }
        }
    }
});
