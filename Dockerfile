# שימוש בתמונת בסיס רשמית של Node.js
FROM node:18-alpine # ניתן לשנות לגרסה אחרת (לדוגמה: node:20-alpine)

# הגדרת תיקיית העבודה בתוך הקונטיינר
WORKDIR /app

# העתקת קבצי הגדרות התלויות (package.json ו-package-lock.json)
COPY package*.json ./

# התקנת התלויות של היישום
RUN npm install --production

# העתקת כל שאר קבצי הקוד של השרת לתיקיית העבודה
COPY . .

# הגדרת משתנה סביבה עבור הפורט שהשרת יקשיב לו
ENV PORT 8080 # חשוב: Cloud Run מצפה שהשרת יאזין לפורט 8080

# חשיפת הפורט (הצהרה בלבד, Cloud Run מטפל בניתוב)
EXPOSE 8080

# פקודת ההפעלה של השרת
CMD ["node", "chatbot.js"] # החלף "server.js" בקובץ הראשי שמפעיל את השרת שלך
