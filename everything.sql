CREATE DATABASE FinalCaps;

USE FinalCaps;

CREATE TABLE hotels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
  email VARCHAR(25) NOT NULL,
  password VARCHAR(15) NOT NULL,
    location VARCHAR(255),
    price DECIMAL(10,2),
    amenities TEXT
);
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Store hashed passwords
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    hotel_id INT NOT NULL,
    check_in DATE,
    check_out DATE,
    status VARCHAR(50),
    FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Hashed passwords
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE rooms (
    room_id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    type VARCHAR(50) NOT NULL,
    availability BOOLEAN DEFAULT TRUE,
    capacity INT NOT NULL,
    FOREIGN KEY (hotelid) REFERENCES hotels(hotel_id)
);

CREATE TABLE room_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (roomid) REFERENCES rooms(roomid)
);

INSERT INTO hotels (name, email, password, location, price, amenities) VALUES
('Sunrise Resort', 'contact@sunriseresort.com', 'pass1234', 'Goa', 4500.00, 'Pool,WiFi,Restaurant'),
('Mountain View Hotel', 'info@mountainview.com', 'mountain1', 'Manali', 3500.00, 'WiFi,Parking,Bar'),
('City Lights Inn', 'contact@citylights.com', 'citypass', 'Mumbai', 3000.00, 'WiFi,Gym,Restaurant'),
('Seaside Escape', 'info@seasideescape.com', 'sea2025', 'Kerala', 4200.00, 'Pool,WiFi,Beach Access'),
('Grand Palace Hotel', 'grand@palace.com', 'palace123', 'Delhi', 5000.00, 'Gym,Spa,Restaurant'),
('Lakeside Retreat', 'contact@lakeside.com', 'lakepass', 'Udaipur', 4000.00, 'WiFi,Parking,Pool'),
('Desert Oasis', 'info@desertoasis.com', 'desert99', 'Rajasthan', 3800.00, 'WiFi,Bar,Parking'),
('Urban Stay', 'urban@stay.com', 'urban123', 'Bangalore', 3200.00, 'WiFi,Gym,Cafe'),
('Forest Haven', 'forest@haven.com', 'forestpass', 'Coorg', 3600.00, 'WiFi,Parking,Restaurant'),
('Royal Comfort', 'royal@comfort.com', 'royal2025', 'Hyderabad', 4100.00, 'Pool,Spa,WiFi');


INSERT INTO rooms (hotel_id, price, type, availability, capacity) VALUES
-- Hotel 1 rooms
(1, 1500.00, 'Single', TRUE, 1),
(1, 2500.00, 'Double', TRUE, 2),
(1, 4000.00, 'Suite', TRUE, 4),

-- Hotel 2 rooms
(2, 1200.00, 'Single', TRUE, 1),
(2, 2200.00, 'Double', TRUE, 2),
(2, 3500.00, 'Suite', TRUE, 4),

-- Hotel 3 rooms
(3, 1300.00, 'Single', TRUE, 1),
(3, 2300.00, 'Double', TRUE, 2),
(3, 3700.00, 'Suite', TRUE, 4),

-- Hotel 4 rooms
(4, 1600.00, 'Single', TRUE, 1),
(4, 2600.00, 'Double', TRUE, 2),
(4, 4200.00, 'Suite', TRUE, 4),

-- Hotel 5 rooms
(5, 1700.00, 'Single', TRUE, 1),
(5, 2700.00, 'Double', TRUE, 2),
(5, 4500.00, 'Suite', TRUE, 4),

-- Hotel 6 rooms
(6, 1400.00, 'Single', TRUE, 1),
(6, 2400.00, 'Double', TRUE, 2),
(6, 3800.00, 'Suite', TRUE, 4),

-- Hotel 7 rooms
(7, 1250.00, 'Single', TRUE, 1),
(7, 2250.00, 'Double', TRUE, 2),
(7, 3600.00, 'Suite', TRUE, 4),

-- Hotel 8 rooms
(8, 1350.00, 'Single', TRUE, 1),
(8, 2350.00, 'Double', TRUE, 2),
(8, 3900.00, 'Suite', TRUE, 4),

-- Hotel 9 rooms
(9, 1550.00, 'Single', TRUE, 1),
(9, 2550.00, 'Double', TRUE, 2),
(9, 4100.00, 'Suite', TRUE, 4),

-- Hotel 10 rooms
(10, 1650.00, 'Single', TRUE, 1),
(10, 2650.00, 'Double', TRUE, 2),
(10, 4300.00, 'Suite', TRUE, 4);



INSERT INTO room_bookings (room_id, check_in, check_out, status) VALUES
(1, '2025-06-01', '2025-06-05', 'booked'),
(5, '2025-06-10', '2025-06-15', 'completed'),
(9, '2025-07-01', '2025-07-04', 'canceled');
