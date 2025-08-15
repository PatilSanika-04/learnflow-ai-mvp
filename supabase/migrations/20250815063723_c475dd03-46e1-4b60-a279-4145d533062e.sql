-- Insert sample language learning courses
INSERT INTO public.courses (title, description, category, level, duration_hours, price, is_published, instructor_id) VALUES
('Spanish for Beginners', 'Learn basic Spanish vocabulary, grammar, and conversation skills. Perfect for complete beginners who want to start their Spanish learning journey.', 'language', 'beginner', 20, 49.99, true, (SELECT id FROM auth.users LIMIT 1)),
('French Conversation Mastery', 'Improve your French speaking skills through interactive conversations and practical exercises. Focus on real-world communication.', 'language', 'intermediate', 30, 79.99, true, (SELECT id FROM auth.users LIMIT 1)),
('German Grammar Fundamentals', 'Master German grammar rules, sentence structure, and common expressions. Essential foundation for German language learning.', 'language', 'beginner', 25, 59.99, true, (SELECT id FROM auth.users LIMIT 1)),
('Italian Culture & Language', 'Learn Italian while exploring Italian culture, traditions, and customs. Language learning through cultural immersion.', 'language', 'intermediate', 35, 89.99, true, (SELECT id FROM auth.users LIMIT 1)),
('Japanese Kanji Writing', 'Learn to read and write Japanese Kanji characters. Systematic approach to mastering essential Japanese writing system.', 'language', 'advanced', 40, 99.99, true, (SELECT id FROM auth.users LIMIT 1));

-- Insert sample lessons for Spanish course
INSERT INTO public.lessons (course_id, title, content, duration_minutes, order_index, is_published) VALUES
((SELECT id FROM public.courses WHERE title = 'Spanish for Beginners' LIMIT 1), 'Introduction to Spanish', 'Welcome to Spanish! Learn basic greetings and introductions.', 15, 1, true),
((SELECT id FROM public.courses WHERE title = 'Spanish for Beginners' LIMIT 1), 'Spanish Alphabet', 'Master the Spanish alphabet and pronunciation rules.', 20, 2, true),
((SELECT id FROM public.courses WHERE title = 'Spanish for Beginners' LIMIT 1), 'Numbers 1-100', 'Learn to count and use numbers in Spanish.', 25, 3, true),
((SELECT id FROM public.courses WHERE title = 'Spanish for Beginners' LIMIT 1), 'Family Members', 'Vocabulary for family relationships and descriptions.', 20, 4, true);

-- Insert sample lessons for French course
INSERT INTO public.lessons (course_id, title, content, duration_minutes, order_index, is_published) VALUES
((SELECT id FROM public.courses WHERE title = 'French Conversation Mastery' LIMIT 1), 'Restaurant Conversations', 'Practice ordering food and drinks in French restaurants.', 30, 1, true),
((SELECT id FROM public.courses WHERE title = 'French Conversation Mastery' LIMIT 1), 'Shopping & Bargaining', 'Learn to shop and negotiate prices in French.', 25, 2, true),
((SELECT id FROM public.courses WHERE title = 'French Conversation Mastery' LIMIT 1), 'Travel & Transportation', 'Navigate transportation and ask for directions in French.', 35, 3, true);

-- Insert sample quizzes
INSERT INTO public.quizzes (course_id, title, description, total_questions, passing_score) VALUES
((SELECT id FROM public.courses WHERE title = 'Spanish for Beginners' LIMIT 1), 'Spanish Basics Quiz', 'Test your knowledge of basic Spanish vocabulary and grammar.', 5, 70),
((SELECT id FROM public.courses WHERE title = 'French Conversation Mastery' LIMIT 1), 'French Conversation Quiz', 'Practice your French conversation skills with this interactive quiz.', 4, 75);

-- Insert sample quiz questions for Spanish quiz
INSERT INTO public.quiz_questions (quiz_id, question_text, question_type, options, correct_answer, points, order_index) VALUES
((SELECT id FROM public.quizzes WHERE title = 'Spanish Basics Quiz' LIMIT 1), 'How do you say "Hello" in Spanish?', 'multiple_choice', '["Hola", "Adiós", "Gracias", "Por favor"]', 'Hola', 1, 1),
((SELECT id FROM public.quizzes WHERE title = 'Spanish Basics Quiz' LIMIT 1), 'What is the Spanish word for "water"?', 'multiple_choice', '["Agua", "Leche", "Café", "Jugo"]', 'Agua', 1, 2),
((SELECT id FROM public.quizzes WHERE title = 'Spanish Basics Quiz' LIMIT 1), 'How do you say "Thank you" in Spanish?', 'multiple_choice', '["De nada", "Hola", "Gracias", "Adiós"]', 'Gracias', 1, 3),
((SELECT id FROM public.quizzes WHERE title = 'Spanish Basics Quiz' LIMIT 1), 'What number is "cinco" in English?', 'multiple_choice', '["Three", "Four", "Five", "Six"]', 'Five', 1, 4),
((SELECT id FROM public.quizzes WHERE title = 'Spanish Basics Quiz' LIMIT 1), 'How do you say "Good morning" in Spanish?', 'multiple_choice', '["Buenas noches", "Buenas tardes", "Buenos días", "Hasta luego"]', 'Buenos días', 1, 5);

-- Insert sample quiz questions for French quiz
INSERT INTO public.quiz_questions (quiz_id, question_text, question_type, options, correct_answer, points, order_index) VALUES
((SELECT id FROM public.quizzes WHERE title = 'French Conversation Quiz' LIMIT 1), 'How do you say "Excuse me" in French?', 'multiple_choice', '["Excusez-moi", "Merci", "Bonjour", "Au revoir"]', 'Excusez-moi', 1, 1),
((SELECT id FROM public.quizzes WHERE title = 'French Conversation Quiz' LIMIT 1), 'What does "L''addition, s''il vous plaît" mean?', 'multiple_choice', '["Good morning", "The bill, please", "How much is it?", "Where is the bathroom?"]', 'The bill, please', 1, 2),
((SELECT id FROM public.quizzes WHERE title = 'French Conversation Quiz' LIMIT 1), 'How do you ask "Where is..." in French?', 'multiple_choice', '["Qu''est-ce que c''est?", "Où est...?", "Comment allez-vous?", "Combien ça coûte?"]', 'Où est...?', 1, 3),
((SELECT id FROM public.quizzes WHERE title = 'French Conversation Quiz' LIMIT 1), 'What is the polite way to say "please" in French?', 'multiple_choice', '["Merci", "De rien", "S''il vous plaît", "Pardon"]', 'S''il vous plaît', 1, 4);