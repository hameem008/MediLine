--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-1.pgdg120+1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: patient; Type: TABLE DATA; Schema: public; Owner: myuser
--

INSERT INTO public.patient VALUES (1, 'hameem@gmail.com', '$2a$10$0i69hPaehmg94zWNmGAU0uJF9HCaSvu7S3Q8gbi8LFQry50qFWqBS', 'Ha', 'Meem', 'Male', '2002-12-08', 'A+', '01944972610', 'Dhaka, Bangladesh', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');
INSERT INTO public.patient VALUES (2, 'islamrafi74@gmail.com', '$2a$10$gcFzuSxTG9CucGxXoSZ1gePBhtNikLEZyvSqhOZ1xX83TPkIvOdAW', 'Md. Rafiul', 'Islam', 'Male', '2002-02-06', 'A+', '01732170161', '275/3, Jafrabad, Mohammadpur, Dhaka
275/3, Jafrabad, Mohammadpur, Dhaka', NULL);


--
-- Data for Name: allergies; Type: TABLE DATA; Schema: public; Owner: myuser
--



--
-- Data for Name: doctor; Type: TABLE DATA; Schema: public; Owner: myuser
--

INSERT INTO public.doctor VALUES (1, 'hameem812@gmail.com', '$2a$10$KOGWZXDJFvjF1GzD7OdkX.EAyJFxOlRg//GgffsrHsxsTtCB/knRC', 'Ha', 'Meem', 'Male', 'Neurology', 'Professor', 'Dhaka Medical College', '01944972611', 'Dhaka, Bangladesh', NULL, NULL);


--
-- Data for Name: medical_center; Type: TABLE DATA; Schema: public; Owner: myuser
--

INSERT INTO public.medical_center VALUES (1, 'dmc@gmail.com', '$2a$10$D5N39QPYgV9LRAKlgTtZUOIa9zhsNxBN9k5aTRaxcNsCQu8RXfwjm', 'Dhaka Medical College', 'Near Buet.', '01944972610', 'Dhaka, Bangladesh', NULL);


--
-- Data for Name: doctor_availability; Type: TABLE DATA; Schema: public; Owner: myuser
--



--
-- Data for Name: appointment; Type: TABLE DATA; Schema: public; Owner: myuser
--



--
-- Data for Name: chronic_condition; Type: TABLE DATA; Schema: public; Owner: myuser
--



--
-- Data for Name: diseases; Type: TABLE DATA; Schema: public; Owner: myuser
--



--
-- Data for Name: prescription; Type: TABLE DATA; Schema: public; Owner: myuser
--



--
-- Data for Name: diagnosed_diseases; Type: TABLE DATA; Schema: public; Owner: myuser
--



--
-- Data for Name: doctor_degree; Type: TABLE DATA; Schema: public; Owner: myuser
--



--
-- Data for Name: doctor_review; Type: TABLE DATA; Schema: public; Owner: myuser
--



--
-- Data for Name: medicines; Type: TABLE DATA; Schema: public; Owner: myuser
--



--
-- Data for Name: tests; Type: TABLE DATA; Schema: public; Owner: myuser
--



--
-- Data for Name: performed_tests; Type: TABLE DATA; Schema: public; Owner: myuser
--



--
-- Data for Name: prescribed_medicine; Type: TABLE DATA; Schema: public; Owner: myuser
--



--
-- Data for Name: prescribed_tests; Type: TABLE DATA; Schema: public; Owner: myuser
--



--
-- Data for Name: refresh_token; Type: TABLE DATA; Schema: public; Owner: myuser
--

INSERT INTO public.refresh_token VALUES ('islamrafi74@gmail.com', 'ROLE_PATIENT', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpc2xhbXJhZmk3NEBnbWFpbC5jb20iLCJqdGkiOiI5ZGUyMGIxNS05MDMyLTQ0NGUtOWRjOC04NmI4NmQzMGFkNzEiLCJyb2xlIjoiUk9MRV9QQVRJRU5UIiwiaWF0IjoxNzQ5NDcwMDE1LCJleHAiOjE3NTAwNzQ4MTV9.IwpFz7VmwRHQiAi7GcY-UAb-CEqPNuKpDXKoZqfiU78', '2025-06-16 11:53:35.437327');


--
-- Data for Name: symptom; Type: TABLE DATA; Schema: public; Owner: myuser
--



--
-- Data for Name: test_params; Type: TABLE DATA; Schema: public; Owner: myuser
--



--
-- Data for Name: test_result_value; Type: TABLE DATA; Schema: public; Owner: myuser
--



--
-- Name: appointment_appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.appointment_appointment_id_seq', 1, false);


--
-- Name: diseases_disease_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.diseases_disease_id_seq', 1, false);


--
-- Name: doctor_availability_slot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.doctor_availability_slot_id_seq', 1, false);


--
-- Name: doctor_doctor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.doctor_doctor_id_seq', 1, true);


--
-- Name: doctor_review_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.doctor_review_review_id_seq', 1, false);


--
-- Name: medical_center_medical_center_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.medical_center_medical_center_id_seq', 1, true);


--
-- Name: medicines_medicine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.medicines_medicine_id_seq', 1, false);


--
-- Name: patient_patient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.patient_patient_id_seq', 2, true);


--
-- Name: performed_tests_performed_test_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.performed_tests_performed_test_id_seq', 1, false);


--
-- Name: prescription_prescription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.prescription_prescription_id_seq', 1, false);


--
-- Name: tests_test_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.tests_test_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

