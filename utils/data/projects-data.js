import fs from 'fs';
import path from 'path'; // <-- make sure this is imported

const folders = {
    NatureSpy: './public/projectsimg/NatureSpy',
    ColorSpy: './public/projectsimg/ColorSpy',
    BillWizard: './public/projectsimg/BillWizard',
    SocialSpy: './public/projectsimg/SocialSpy',
    TrendTrace: './public/projectsimg/TrendTrace',
    NeoLight: './public/projectsimg/Neolight',
    ExamSection: './public/projectsimg/ExamSection'
};

let images = {};

Object.keys(folders).forEach(folder => {
    const folderPath = path.resolve(folders[folder]); // Resolve full path
    if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath);
        images[folder] = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
                              .map(file => `/projectsimg/${folder}/${file}`); // Use URL path
    } else {
        console.warn(`Folder not found: ${folderPath}`);
    }
});

export const projectsData = [
    {
        "id": 1,
        "name": "TrendTrace",
        "description": "A comprehensive fashion analysis system that combines computer vision and machine learning to detect clothing patterns and identify suspicious attire. The system uses YOLOv8 for real-time human detection with precise bounding boxes, U²-Net for detailed clothing segmentation (categorizing garments into upper body, lower body, and full body), and Google AI Studio API for extracting detailed attributes like color, pattern, and style. The processed data is stored in a dynamic Google Sheets database for trend analysis and historical tracking, with all operations accessible through a user-friendly KivyMD interface.",
        "tools": ["YOLOv8", "Python", "U²-Net", "Google AI Studio API", "OpenCV", "Gspread", "Kivy", "KivyMD"],
        "role": "Machine Learning Engineer",
        "github": "https://github.com/Og-Strike/TrendTrace",
        "images": images["TrendTrace"],
        "captions": ["Actual Extration View","Home UI", "Menu Bar", "System View", "Trace Result", "Trace UI", "Trend Result", "Trend UI"]
    },
    {
        "id": 2,
        "name": "NeoLight",
        "description": "An intelligent street lighting solution that dynamically adjusts brightness based on environmental conditions and pedestrian activity. The system employs ESP32 microcontrollers connected to PIR motion sensors and LDR light sensors to detect movement and ambient light levels. Lights maintain a base 30% brightness for safety, increasing to 100% when motion is detected. The system incorporates time-based controls and weather condition overrides, with all operations monitored through a cross-platform Flutter application that connects to either Firebase or MongoDB for data logging and remote configuration.",
        "tools": ["ESP32", "PIR Sensors", "LDR Sensor", "Flutter", "Firebase", "MongoDB"],
        "role": "IoT Developer",
        "github": "https://github.com/Og-Strike/NeoLight",
        "images": images["NeoLight"],
        "captions": ["Circuit Diagram", "Database View","Flutter App UI 1", "Flutter App UI 2", "Project Setup"]
    },
    {
        "id": 3,
        "name": "Nature Spy",
        "description": "A sophisticated two-stage biological identification system that first uses ResNet18 to classify objects into general categories (animals, plants, or irrelevant objects), then employs ResNet152 for detailed species identification. The system incorporates Faster R-CNN for precise object localization and bounding box generation. All functionality is integrated into an intuitive Kivy application featuring a conversational AI assistant powered by Botpress and GPT models, enabling users to get detailed information about detected species through natural language queries.",
        "tools": ["ResNet18", "ResNet152", "Faster R-CNN", "Kivy", "Botpress"],
        "role": "AI/ML Engineer",
        "github": "https://github.com/Og-Strike/NatureSpy",
        "images": images["NatureSpy"],
        "captions": ["ROI Selection View", "Home UI", "Detection UI","Menu Bar","Nature Chat Bot","Detected Animals List ","Detected Plants List" ]
    },
    {
        "id": 4,
        "name": "Color Spy",
        "description": "A comprehensive color analysis and manipulation suite that enables designers and developers to work with colors in both practical and creative contexts. The application can extract dominant colors from images, analyze color distributions, generate harmonious palettes, and perform precise pixel-level editing. It features real-time color detection through camera input and advanced mixing algorithms for creating custom colors. The tool supports multiple color spaces and provides detailed color information including HEX, RGB, and HSL values for professional design workflows.",
        "tools": ["Python", "OpenCV", "Pillow", "NumPy", "Matplotlib"],
        "role": "Python Developer",
        "github": "https://github.com/Og-Strike/Colorspy",
        "images": images["ColorSpy"],
        "captions": ["Color Extraction of Whole Image"," Color Mixing View", "Color Palette View 1", "Color Palette View 2", "After Pixel Chnager","Before Pixel Changer", "Color Extraction of Particular Area", "Live Color Detection"]
    },
    {
        "id": 5,
        "name": "Bill Wizard",
        "description": "An automated receipt processing system that transforms video footage of multiple receipts into organized expenditure data. Using OpenCV for frame capture and Tesseract OCR for text extraction, the system identifies store names, items, prices, and dates with high accuracy. Extracted data is stored in CSV format and can be exported to JSON or XML. The application generates comprehensive visualizations including expenditure trends by date, store, and category using Matplotlib, helping users analyze their spending patterns efficiently.",
        "tools": ["OpenCV", "Tesseract OCR", "Python", "Matplotlib", "Pandas"],
        "role": "Python Developer",
        "github": "https://github.com/Og-Strike/Bill-Wizard",
        "images": images["BillWizard"],
        "captions": ["Details Extraction View", "Home UI"]
    },
    {
        "id": 6,
        "name": "SocialSpy",
        "description": "A multi-platform social media data extraction tool offering three distinct interfaces: a feature-rich desktop application built with Custom Tkinter, a web-based Flask application, and a lightweight JavaScript version. The system employs advanced web scraping techniques to collect profile information while maintaining modular architecture with shared core functionality. All versions support configurable scraping parameters and result export options, with the web interface providing real-time progress tracking and the desktop app offering enhanced visualization of collected data.",
        "tools": ["Python", "Tkinter", "Flask", "JavaScript", "Web Scraping"],
        "role": "Full Stack Developer",
        "github": "https://github.com/Og-Strike/public-ver-SocialSpy",
        "images": images["SocialSpy"],
        "captions": ["Web UI","Desktop UI","Nav Menu","Facebook Extraction View","Loading Screen To Enter Credentials"]
    },
    {
    "id": 7,
    "name": "Exam Section",
    "description": "A modern admin dashboard built with Next.js featuring role-based authentication (admin, teacher, student, parents) using Clerk. The project utilizes Prisma for database schema management and migrations, with Docker containerization for development consistency. Includes complete environment configuration and role management through the admin interface.",
    "tools": [
        "TypeScript",
        "Next.js",
        "Prisma",
        "Clerk",
        "Docker",
        "Tailwind CSS"
    ],
    "role": "Full Stack Developer (TypeScript/Next.js)",
    "github": "https://github.com/Og-Strike/PublicExam-Section",
    "images": images["ExamSection"],
    "captions": ["Login Page","Sitting Plan Document","Publishing Setting Plan View","Exam Section View","Exam Section Plan Document","Exam Schedule View","Exam Center Allocation View"]
},
    {
        "id": 8,
        "name": "Security Scripts Collection",
        "description": "A repository of security-oriented automation tools including network reconnaissance utilities, penetration testing aids, and system monitoring scripts. The collection features a socket-based backdoor with customizable C2 functionality, a multi-threaded port scanner with service detection, and an email harvester capable of processing multiple data sources. Additional scripts include network sniffers, vulnerability scanners, and automated reporting tools, all designed with efficiency and stealth in mind for security professionals and ethical hackers.",
        "tools": ["Python", "Bash", "Socket Programming", "SMTP/POP3"],
        "role": "Security Developer",
        "github": "",
        "images": "",
        "captions": ""
    }
];


       