async function searchItems() {
    const searchInput = document.getElementById('searchInput').value.trim();
    const info = document.getElementById('info');
    info.style.display = 'none';
    info.innerHTML = '';

    if (!searchInput) {
        info.style.display = 'none';
        return;
    }

    const apiUrl = `http://site1.local:8000/api/v2/document/Book?fields=["title","author","publisher"]`;

    try {

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token 67c9301033bb01a:d588893b610e6ed',
    },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        const books = result.data;

        info.style.display = 'block';

        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            book.author.toLowerCase().includes(searchInput.toLowerCase())
        );

        if (filteredBooks.length === 0) {
            info.innerHTML = `<p>No results found for "${searchInput}".</p>`;
        } else {
            filteredBooks.forEach(book => {
                const bookCard = `
                    <div class="book-card">
                        <h3>${book.title}</h3>
                        <p>Author: ${book.author}</p>
                        <p>Publisher: ${book.publisher}</p>
                    </div>
                `;
                info.innerHTML += bookCard;
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        info.style.display = 'block';
        info.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    }
}