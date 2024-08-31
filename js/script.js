document.addEventListener('DOMContentLoaded', function() {
    // Identifikasi halaman saat ini
    const currentPage = window.location.pathname.split('/').pop();

    // Jalankan fungsi khusus untuk halaman yang relevan
    if (currentPage === 'index.html') {
        handleIndexPage();
    } else if (currentPage === 'profile.html') {
        handleProfilePage();
    } else if (currentPage === 'program.html') {
        handleProgramPage();
    } else if (currentPage === 'signup.html') {
        handleSignupPage();
    } else if (currentPage === 'login.html') {
        handleLoginPage();
    }
});

// Fungsi untuk memeriksa status pendaftaran dan mengatur visibilitas tombol
function checkRegistrationStatus() {
    // Mengambil status pendaftaran dari localStorage
    const isRegistered = localStorage.getItem('isRegistered'); // Ambil dari localStorage
    console.log('Status pendaftaran:', isRegistered);

    // Mendapatkan elemen tombol pendaftaran
    const signupButton = document.getElementById('subutton');
    const pembatas = document.getElementById('pembatas');

    // Menyembunyikan tombol jika pengguna sudah terdaftar
    if (isRegistered === 'true') {
        // Tindakan jika pengguna terdaftar
        console.log('Pengguna sudah terdaftar');
        signupButton.style.display = 'none';
        pembatas.style.display = 'none';
    } else {
        signupButton.style.display = 'block';
        // Tindakan jika pengguna belum terdaftar
        console.log('Pengguna belum terdaftar');
    }
}

function handleIndexPage() {
    // Menjalankan fungsi untuk memeriksa status pendaftaran
    checkRegistrationStatus();

    // Ambil elemen dengan id "logo"
    const logoElement = document.getElementById('logo');

    // Tambahkan event listener untuk klik pada elemen logo
    logoElement.addEventListener('click', function () {
        // Set isRegistered ke false dan simpan di localStorage
        localStorage.setItem('isRegistered', 'false');

        // Hapus data pengguna dari localStorage
        localStorage.removeItem('userData');

        // Opsional: Tampilkan pesan untuk mengonfirmasi tindakan
        alert('Data pendaftaran telah direset.'); 
        
        // Debugging untuk memverifikasi bahwa data telah dihapus
        console.log('isRegistered:', localStorage.getItem('isRegistered'));
        console.log('userData:', localStorage.getItem('userData'));
        window.location.href = "index.html"; 
    });

     // Fungsi untuk memfilter artikel berdasarkan tahun
     function filterArticlesByYear() {
        const selectedYear = document.getElementById('year-filter').value;
        const articles = document.querySelectorAll('#news-articles .article-container');

        articles.forEach(article => {
            const articleDate = article.querySelector('.article p').textContent;
            const articleYear = articleDate.split(' ')[2]; // Mengambil tahun dari tanggal

            if (selectedYear === 'all' || articleYear === selectedYear) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    }

    // Menambahkan event listener untuk dropdown filter
    document.getElementById('year-filter').addEventListener('change', filterArticlesByYear);
}  

document.addEventListener('DOMContentLoaded', function () {
    const slideContainer = document.querySelector('.slide-container');
    const totalContainers = document.querySelectorAll('.container-foto').length;
    const containersPerSlide = 3; // Tiga container per slide
    let currentIndex = 0;

    function slideShow() {
        currentIndex++;
        if (currentIndex >= Math.ceil(totalContainers / containersPerSlide)) {
            currentIndex = 0; // Ulang dari awal jika melebihi jumlah slide
        }
        slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`; // Pindah slide
    }

    setInterval(slideShow, 5000); // Panggil fungsi setiap 5 detik
});

function handleProfilePage() {
    // Menjalankan fungsi untuk memeriksa status pendaftaran
    checkRegistrationStatus();
}

function handleProgramPage() {
    // Tambahkan logika spesifik untuk halaman program di sini
    // Menjalankan fungsi untuk memeriksa status pendaftaran
    checkRegistrationStatus();
}

function handleSignupPage() {
    // Set default isRegistered menjadi 'false' saat halaman registrasi dimuat
    localStorage.setItem('isRegistered', 'false'); // Simpan di localStorage
    console.log('Status pendaftaran: false');

    // Fungsi untuk menyimpan data sementara dan mengindikasikan apakah sudah terdaftar
    function registerUser(event) {
        event.preventDefault(); // Mencegah pengiriman form default

        // Mendapatkan nilai input dari form
        const username = document.getElementById('signup-username-registration').value.trim();
        const email = document.getElementById('signup-email-registration').value.trim();
        const password = document.getElementById('signup-password-registration').value.trim();

        // Validasi input
        if (username === '' || email === '' || password === '') {
            alert('Semua bidang harus diisi!');
            return;
        }

        if (!validateEmail(email)) {
            alert('Email tidak valid!');
            return;
        }

        if (password.length < 6) {
            alert('Password harus minimal 6 karakter!');
            return;
        }

        // Menyimpan data sementara
        const userData = {
            username: username,
            email: email,
            password: password
        };

        // Mengubah status pendaftaran menjadi true dan menyimpannya di localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isRegistered', 'true'); // Simpan di localStorage
        console.log('Data Pengguna Terdaftar:', userData);
        console.log('Status pendaftaran: true');

        // Menampilkan pesan sukses
        alert('Registrasi berhasil!');

        // Reset form setelah sukses
        document.getElementById('registration-form').reset();

        // Mengarahkan ke halaman index.html setelah berhasil registrasi
        window.location.href = "login.html";
    }

    // Fungsi untuk memvalidasi format email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Menambahkan event listener ke tombol dengan ID 'regis_submit'
    document.getElementById('regis_submit').addEventListener('click', registerUser);
}

function handleLoginPage() {
    // Menambahkan event listener ke tombol "Login"
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah pengiriman form default

        // Mendapatkan nilai input dari form
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();

        // Validasi input
        if (username === '' || password === '') {
            alert('Semua bidang harus diisi!');
            return;
        }

        // Ambil data pengguna dari localStorage
        const storedUserData = JSON.parse(localStorage.getItem('userData'));

        // Cek apakah pengguna terdaftar dan passwordnya sesuai
        if (storedUserData && storedUserData.username === username && storedUserData.password === password) {
            // Login berhasil
            alert('Login berhasil! Selamat datang, ' + username);

            // Redirect ke halaman profil atau halaman lain setelah login berhasil
            window.location.href = "../index.html";
        } else {
            // Login gagal
            alert('Username atau password salah. Silakan coba lagi.');
        }
    });
}

// Function to speak the text of a specific element by its ID
function speakText(elementId) {
    // Get the text content from the specified element
    const textToSpeak = document.getElementById(elementId).textContent;

    // Create a new SpeechSynthesisUtterance instance with the text
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Set some optional properties like language and pitch
    utterance.lang = 'id-ID'; // Indonesian language
    utterance.pitch = 1; // Normal pitch
    utterance.rate = 1; // Normal speaking rate

    // Use the speechSynthesis API to speak the text
    window.speechSynthesis.speak(utterance);
}

// Function to stop the ongoing speech
function stopSpeaking() {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
}

