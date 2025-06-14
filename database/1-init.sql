-- Refresh Token Table
CREATE TABLE refresh_token (
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    token VARCHAR(512) NOT NULL UNIQUE,
    expiry_date TIMESTAMP NOT NULL,
    PRIMARY KEY (email, role)
);

-- Patient Table
CREATE TABLE patient (
    patient_id SERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    password_hash TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    gender VARCHAR(10),
    date_of_birth DATE,
    blood_group VARCHAR(5),
    phone_number VARCHAR(20) UNIQUE,
    address TEXT,
    profile_photo_url TEXT,
    CONSTRAINT chk_patient_email CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    CONSTRAINT chk_patient_gender CHECK (gender IN ('Male', 'Female', 'Other')),
    CONSTRAINT chk_patient_dob CHECK (date_of_birth <= CURRENT_DATE),
    CONSTRAINT chk_patient_blood_group CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    CONSTRAINT chk_patient_phone_number CHECK (phone_number ~ '^[0-9]{10,15}$')
);


-- Severity Levels Table
CREATE TABLE severity_levels (
    severity_level INT PRIMARY KEY,
    description TEXT UNIQUE
);

-- Mood Options Table
CREATE TABLE mood_options (
    mood_value VARCHAR(20) PRIMARY KEY,
    display_order INT
);

-- Symptom Table
CREATE TABLE symptom (
    patient_id INT REFERENCES patient(patient_id) ON DELETE CASCADE,
    description TEXT,
    date DATE DEFAULT CURRENT_DATE,
    time TIME DEFAULT CURRENT_TIME,
    overall_mood VARCHAR(20),
    severity_level INT,
    PRIMARY KEY (patient_id, date, time),
    FOREIGN KEY (overall_mood) REFERENCES mood_options(mood_value),
    FOREIGN KEY (severity_level) REFERENCES severity_levels(severity_level)
);


-- Doctor Table
CREATE TABLE doctor (
    doctor_id SERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    password_hash TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    gender VARCHAR(10),
    specialization TEXT,
    designation TEXT,
    academic_institution TEXT,
    phone_number VARCHAR(20) UNIQUE,
    bio TEXT,
    profile_photo_url TEXT,
    CONSTRAINT chk_doctor_gender CHECK (gender IN ('Male', 'Female', 'Other')),
    CONSTRAINT chk_doctor_phone_number CHECK (phone_number ~ '^[0-9]{10,15}$'),
    CONSTRAINT chk_doctor_email CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
);

-- Doctor Degree Table
CREATE TABLE doctor_degree (
    doctor_id INT REFERENCES doctor(doctor_id) ON DELETE CASCADE,
    degree_name TEXT,
    institution TEXT,
    passing_year INT,
    PRIMARY KEY (doctor_id, degree_name)
);

-- Medical Center Table
CREATE TABLE medical_center (
    medical_center_id SERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    phone_number VARCHAR(20) UNIQUE,
    address TEXT,
    profile_photo_url TEXT
);

-- Prescription Table
CREATE TABLE prescription (
    prescription_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patient(patient_id) ON DELETE CASCADE,
    doctor_id INT REFERENCES doctor(doctor_id) ON DELETE CASCADE,
    medical_center_id INT REFERENCES medical_center(medical_center_id),
    summary TEXT,
    prescribed_date DATE DEFAULT CURRENT_DATE,
    symptoms TEXT,
    weight NUMERIC CHECK (weight > 0),
    blood_pressure VARCHAR(20),
    heart_rate INT CHECK (heart_rate > 0 AND heart_rate < 250),
    notes TEXT,
    next_appointment_date DATE,
    CONSTRAINT chk_prescription_dates CHECK (
      prescribed_date <= CURRENT_DATE AND
          (next_appointment_date IS NULL OR next_appointment_date >= prescribed_date))
);

-- Diseases Table
CREATE TABLE diseases (
    disease_id SERIAL PRIMARY KEY,
    disease_name TEXT,
    description TEXT
);

-- Diagnosed Diseases Table
CREATE TABLE diagnosed_diseases (
    prescription_id INT REFERENCES prescription(prescription_id) ON DELETE CASCADE,
    disease_id INT REFERENCES diseases(disease_id),
    PRIMARY KEY (prescription_id, disease_id)
);

-- Medicines Table
CREATE TABLE medicines (
    medicine_id SERIAL PRIMARY KEY,
    medicine_name TEXT,
    description TEXT
);

-- Prescribed Medicine Table
CREATE TABLE prescribed_medicine (
    prescription_id INT REFERENCES prescription(prescription_id) ON DELETE CASCADE,
    medicine_id INT REFERENCES medicines(medicine_id),
    dosage TEXT,
    frequency TEXT,
    duration TEXT,
    instruction TEXT,
    PRIMARY KEY (prescription_id, medicine_id)
);

-- Tests Table
CREATE TABLE tests (
    test_id SERIAL PRIMARY KEY,
    test_name TEXT,
    description TEXT,
    type VARCHAR(20),
    CONSTRAINT chk_test_type CHECK (type IN ('Pathology', 'Imaging'))
);

-- Test Params Table
CREATE TABLE test_params (
    test_id INT REFERENCES tests(test_id),
    parameter_name TEXT,
    unit TEXT,
    ideal_male_range TEXT,
    ideal_female_range TEXT,
    ideal_children_range TEXT,
    PRIMARY KEY (test_id, parameter_name)
);

-- Prescribed Tests Table
CREATE TABLE prescribed_tests (
    prescription_id INT REFERENCES prescription(prescription_id) ON DELETE CASCADE,
    test_id INT REFERENCES tests(test_id),
    PRIMARY KEY (prescription_id, test_id)
);

-- Performed Tests Table
CREATE TABLE performed_tests (
    performed_test_id SERIAL PRIMARY KEY,
    test_id INT REFERENCES tests(test_id),
    prescription_id INT REFERENCES prescription(prescription_id) ON DELETE CASCADE,
    test_date DATE DEFAULT CURRENT_DATE,
    note TEXT,
    performed_by_doctor_id INT REFERENCES doctor(doctor_id) ON DELETE SET NULL,
    reviewed_by_doctor_id INT REFERENCES doctor(doctor_id) ON DELETE SET NULL,
    medical_center_id INT REFERENCES medical_center(medical_center_id),
    pdf_url TEXT
);

-- Test Result Value Table
CREATE TABLE test_result_value (
    performed_test_id INT REFERENCES performed_tests(performed_test_id) ON DELETE CASCADE,
    parameter_name TEXT,
    result_value TEXT,
    PRIMARY KEY (performed_test_id, parameter_name)
);

-- Doctor Availability Table
CREATE TABLE doctor_availability (
    slot_id SERIAL PRIMARY KEY,
    doctor_id INT REFERENCES doctor(doctor_id) ON DELETE CASCADE,
    medical_center_id INT REFERENCES medical_center(medical_center_id),
    start_time TIME,
    end_time TIME,
    week_day VARCHAR(10),
    duration INT CHECK (duration > 0),
    fee INT CHECK (fee >= 0),
    visit_capacity INT CHECK (visit_capacity > 0),
    chamber TEXT,
    CONSTRAINT chk_availability_week_day CHECK (week_day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'))
);

-- Appointment Table
CREATE TABLE appointment (
    appointment_id SERIAL PRIMARY KEY,
    doctor_id INT REFERENCES doctor(doctor_id) ON DELETE CASCADE,
    patient_id INT REFERENCES patient(patient_id) ON DELETE CASCADE,
    date DATE CHECK (date >= CURRENT_DATE),
    time TIME,
    slot_id INT REFERENCES doctor_availability(slot_id),
    serial_number INT,
    CONSTRAINT unq_appointment_slot_serial UNIQUE (slot_id, serial_number)
);

-- Doctor Review Table
CREATE TABLE doctor_review (
    review_id SERIAL PRIMARY KEY,
    doctor_id INT REFERENCES doctor(doctor_id) ON DELETE CASCADE,
    patient_id INT REFERENCES patient(patient_id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    description TEXT,
    date DATE DEFAULT CURRENT_DATE
);

-- Hospital Test Availability Table
CREATE TABLE hospital_test_availability (
    medical_center_id INT REFERENCES medical_center(medical_center_id) ON DELETE CASCADE,
    test_id INT REFERENCES tests(test_id) ON DELETE CASCADE,
    cost NUMERIC CHECK (cost >= 0),
    estimated_report_time INTERVAL,  -- e.g., '2 days'
    PRIMARY KEY (medical_center_id, test_id)
);


-- Test Request Table
CREATE TABLE test_request (
    request_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patient(patient_id) ON DELETE CASCADE,
    test_id INT REFERENCES tests(test_id),
    medical_center_id INT REFERENCES medical_center(medical_center_id),
    requested_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(10) CHECK (status IN ('Pending', 'Accepted', 'Rejected', 'Sample Collected')),
    prescription_id INT REFERENCES prescription(prescription_id) ON DELETE CASCADE,
    notes TEXT
);


-- Notification Table
CREATE TABLE notification (
    notification_id SERIAL PRIMARY KEY,
    recipient_id INT NOT NULL,
    recipient_type VARCHAR(20) CHECK (recipient_type IN ('Patient', 'Doctor', 'Hospital')),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);



