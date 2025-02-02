
document.getElementById("import-books").addEventListener("click", importBooks);

async function importBooks() {
    console.log("Starting book import...");

    try {
        const response = await fetch('https://frappe.io/api/method/frappe-library?page=2', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data.message && data.message.length > 0) {
            for (const book of data.message) {
                let keys = Object.keys(book);

                let numPagesKey = keys.find(key => key.trim() === "num_pages");

                let numPagesValue = numPagesKey ? book[numPagesKey] : undefined;

                const bookData = {
                    title: book.title,
                    author: book.authors,
                    book_id: book.bookID,
                    isbn: book.isbn,
                    publisher: book.publisher,
                    pages: numPagesValue
                };

                console.log("Sending book data:", bookData);
                
                await sendToDoctype(bookData);
            }
        }
    } catch (error) {
        console.error("Error fetching book data:", error);
    }
}

async function sendToDoctype(bookData) {
    try {
        const frappeResponse = await fetch('http://site1.local:8000/api/resource/Book', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token 67c9301033bb01a:d588893b610e6ed',
            },
            body: JSON.stringify(bookData)
        });

        if (!frappeResponse.ok) {
            throw new Error(`Failed to save book: ${frappeResponse.status}`);
        }

        const result = await frappeResponse.json();
        console.log("Book saved successfully:", result);
    } catch (error) {
        console.error("Error saving book:", error);
    }
}
