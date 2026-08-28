
        // Sample Movie Data matching your MySQL Schema
        const movies = [
            { id: 101, title: "Avatar: The Way of Water", genre: "Sci-Fi / Action", language: "English", duration: "192 min", rating: "PG-13", price: 250 },
            { id: 102, title: "Interstellar", genre: "Sci-Fi / Drama", language: "English", duration: "169 min", rating: "PG-13", price: 200 },
            { id: 103, title: "Kantara", genre: "Action / Thriller", language: "Malayalam", duration: "148 min", rating: "UA", price: 180 },
            { id: 104, title: "spiderman:no way",genre: "Action", language: "English", duration: "163 min", rating: "A", price: 230}
        ];

        let selectedMovie = null;
        let selectedSeats = [];

        // Load Movies into UI
        function loadMovies() {
            const grid = document.getElementById('movieGrid');
            grid.innerHTML = movies.map(movie => `
                <div class="movie-card">
                    <div>
                        <div class="movie-title">${movie.title}</div>
                        <div class="movie-info">
                            <span class="badge">${movie.genre}</span><br><br>
                            🌐 ${movie.language} | ⏱️ ${movie.duration}<br>
                            ⭐ Rating: ${movie.rating}
                        </div>
                    </div>
                    <div>
                        <div style="font-weight: bold; margin-bottom: 8px;">₹${movie.price}</div>
                        <button class="btn" onclick="selectMovie(${movie.id})">Book Now</button>
                    </div>
                </div>
            `).join('');
        }

        // Handle Movie Selection
        function selectMovie(movieId) {
            selectedMovie = movies.find(m => m.id === movieId);
            document.getElementById('selectedMovieTitle').innerText = `Book Tickets for ${selectedMovie.title}`;
            document.getElementById('ticketPrice').innerText = selectedMovie.price;
            
            document.getElementById('movie-section').style.display = 'none';
            document.getElementById('booking-section').style.display = 'block';
            
            generateSeats();
            updateSummary();
        }

        // Generate Seat Grid (16 seats)
        function generateSeats() {
            const grid = document.getElementById('seatsGrid');
            grid.innerHTML = '';
            selectedSeats = [];

            // Mock booked seats (e.g., seat 3 and 7 are already booked in DB)
            const bookedSeats = [3, 7, 12, 13, 29];

            for (let i = 1; i <= 32; i++) {
                const isBooked = bookedSeats.includes(i);
                const seat = document.createElement('div');
                seat.className = `seat ${isBooked ? 'booked' : ''}`;
                seat.innerText = i;

                if (!isBooked) {
                    seat.onclick = () => toggleSeat(i, seat);
                }

                grid.appendChild(seat);
            }
        }

        // Toggle Seat Selection
        function toggleSeat(seatNum, element) {
            if (selectedSeats.includes(seatNum)) {
                selectedSeats = selectedSeats.filter(s => s !== seatNum);
                element.classList.remove('selected');
            } else {
                selectedSeats.push(seatNum);
                element.classList.add('selected');
            }
            updateSummary();
        }

        // Update Total Price and Selected Seat Display
        function updateSummary() {
            document.getElementById('selectedSeatsText').innerText = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None';
            const total = selectedSeats.length * (selectedMovie ? selectedMovie.price : 0);
            document.getElementById('totalAmount').innerText = total;
        }

        // Confirm Booking Action
        function confirmBooking() {
            const name = document.getElementById('custName').value;
            const phone = document.getElementById('custPhone').value;
            const email = document.getElementById('custEmail').value;

            if (!name || !phone || !email) {
                alert("Please fill in all customer details.");
                return;
            }

            if (selectedSeats.length === 0) {
                alert("Please select at least one seat.");
                return;
            }

            // Simulated SQL Integration Response
            alert(`🎉 Booking Successful!\n\nCustomer: ${name}\nMovie: ${selectedMovie.title}\nSeats: ${selectedSeats.join(', ')}\nTotal Paid: ₹${document.getElementById('totalAmount').innerText}\n\n(Data ready to INSERT into database tables: Customers, Bookings, Payments)`);
            
            cancelBooking();
        }
        

        function cancelBooking() {
            document.getElementById('booking-section').style.display = 'none';
            document.getElementById('movie-section').style.display = 'block';
        }

        // Initial Load
        loadMovies();
    