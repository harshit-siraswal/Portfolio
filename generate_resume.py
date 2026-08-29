import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def create_resume(output_path="public/Harshit_Pal_Resume.pdf"):
    margin = 24
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=20,
        bottomMargin=20
    )

    styles = getSampleStyleSheet()
    PRIMARY_COLOR = colors.HexColor("#0f172a")
    ACCENT_COLOR = colors.HexColor("#0284c7")
    TEXT_COLOR = colors.HexColor("#1e293b")
    MUTED_COLOR = colors.HexColor("#475569")
    LINE_COLOR = colors.HexColor("#cbd5e1")

    title_style = ParagraphStyle('NameTitle', fontName='Helvetica-Bold', fontSize=18, leading=20, alignment=TA_CENTER, textColor=PRIMARY_COLOR)
    subtitle_style = ParagraphStyle('SubTitle', fontName='Helvetica-Bold', fontSize=9.5, leading=11.5, alignment=TA_CENTER, textColor=ACCENT_COLOR)
    contact_style = ParagraphStyle('ContactLine', fontName='Helvetica', fontSize=8.0, leading=10.5, alignment=TA_CENTER, textColor=MUTED_COLOR)
    section_heading = ParagraphStyle('SectionHeading', fontName='Helvetica-Bold', fontSize=9.0, leading=10.5, textColor=PRIMARY_COLOR, spaceAfter=1, spaceBefore=3)
    item_title_bold = ParagraphStyle('ItemTitleBold', fontName='Helvetica-Bold', fontSize=8.5, leading=10.5, textColor=PRIMARY_COLOR)
    item_right_style = ParagraphStyle('ItemRight', fontName='Helvetica', fontSize=8.0, leading=10.5, alignment=TA_RIGHT, textColor=MUTED_COLOR)
    bullet_style = ParagraphStyle('BulletStyle', fontName='Helvetica', fontSize=7.8, leading=9.8, textColor=TEXT_COLOR, leftIndent=6)
    skill_label = ParagraphStyle('SkillLabel', fontName='Helvetica-Bold', fontSize=8.0, leading=10.0, textColor=PRIMARY_COLOR)
    skill_body = ParagraphStyle('SkillBody', fontName='Helvetica', fontSize=7.8, leading=10.0, textColor=TEXT_COLOR)

    story = []
    story.append(Paragraph('HARSHIT PAL', title_style))
    story.append(Spacer(1, 1))
    story.append(Paragraph('Full-Stack Developer & AI / IoT Systems Engineer', subtitle_style))
    story.append(Spacer(1, 2))
    
    contacts = (
        'Ghaziabad, UP, India &nbsp;|&nbsp; '
        'harshit.pal.8.d.sdpsmzn@gmail.com &nbsp;|&nbsp; '
        '<a href="https://harshitpal.in" color="#0284c7"><b>harshitpal.in</b></a> &nbsp;|&nbsp; '
        '<a href="https://github.com/harshit-siraswal" color="#0284c7"><b>GitHub</b></a> &nbsp;|&nbsp; '
        '<a href="https://linkedin.com/in/harshit-pal" color="#0284c7"><b>LinkedIn</b></a> &nbsp;|&nbsp; '
        '<a href="https://instagram.com/harshit_siraswal" color="#0284c7"><b>@harshit_siraswal</b></a>'
    )
    story.append(Paragraph(contacts, contact_style))
    story.append(Spacer(1, 2))
    story.append(HRFlowable(width='100%', thickness=0.8, color=LINE_COLOR, spaceAfter=2))

    def add_section_header(text):
        story.append(Paragraph(f'<b>{text.upper()}</b>', section_heading))
        story.append(HRFlowable(width='100%', thickness=0.5, color=LINE_COLOR, spaceAfter=2))

    # HONORS
    add_section_header('Honors, Certifications & National Qualifications')
    achievements = [
        '<b>2x NDA Qualified & 3x SSB Conference Out:</b> Cleared National Defence Academy entrance exam twice and attended 3 Services Selection Boards (demonstrated national-level leadership, psychological resilience, and crisis decision-making).',
        '<b>IOQM 2022 Qualified:</b> Merit Certificate Holder in Indian Olympiad Qualifier in Mathematics (awarded for top national mathematical problem-solving talent).',
        '<b>AWS Certified AI Practitioner:</b> Industry-recognized certification for generative AI architectures, foundational models, cloud compliance, and ML pipeline development.',
        '<b>Innotech 2025 Hackathon Winner:</b> Awarded First-Year Innovator at KIET Ghaziabad for engineering functional IoT hardware mesh systems.',
        '<b>JEE Main 2025:</b> 89.12 Percentile in national level engineering entrance examination.'
    ]
    for ach in achievements:
        story.append(Paragraph(f'• {ach}', bullet_style))
    story.append(Spacer(1, 2))

    # EDUCATION
    add_section_header('Education')
    edu_table_data = [
        [
            Paragraph('<b>KIET Group of Institutions</b> — <i>B.Tech in CSE (Artificial Intelligence & Machine Learning)</i>', item_title_bold),
            Paragraph('2025 – 2029 | SGPA: <b>7.83</b>', item_right_style)
        ],
        [
            Paragraph('<b>SD Public School</b> — <i>Senior Secondary (Class XII: 81.2%) & High School (Class X: 94.6%)</i>', item_title_bold),
            Paragraph('Muzaffarnagar, UP', item_right_style)
        ]
    ]
    edu_table = Table(edu_table_data, colWidths=[420, 144])
    edu_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu_table)
    story.append(Spacer(1, 2))

    # TECHNICAL PROJECTS
    add_section_header('Technical Projects')

    # Project 1: BIS Recommendation Engine
    p1_header = Table([
        [
            Paragraph('<b>BIS Standards Recommendation Engine</b> | <i>AI / Hybrid RAG Retrieval Engine</i>', item_title_bold),
            Paragraph('<a href="https://bis-standards-recommendation-engine-livid.vercel.app/" color="#0284c7">Live Demo</a> | <a href="https://github.com/harshit-siraswal" color="#0284c7">GitHub</a>', item_right_style)
        ]
    ], colWidths=[420, 144])
    p1_header.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
    story.append(p1_header)
    story.append(Paragraph('• <b>Sub-0.01s Hybrid Search:</b> Engineered deterministic RAG system parsing Bureau of Indian Standards (BIS SP 21) cement/steel specifications for Indian MSEs using dense FAISS vector embeddings and sparse BM25 retrieval.', bullet_style))
    story.append(Paragraph('• <b>Benchmark Precision:</b> Achieved <b>100% Hit Rate @3</b>, <b>MRR @5 of 1.000</b>, and automated validation passing <b>59/59 robustness tests</b> with FastAPI and domain term expansions.', bullet_style))
    story.append(Spacer(1, 1.5))

    # Project 2: StudyShare Platform
    p2_header = Table([
        [
            Paragraph('<b>StudyShare Suite & Ingestion Automation</b> | <i>Next.js, Flutter, NestJS, Neon, Tesseract, n8n</i>', item_title_bold),
            Paragraph('<a href="https://www.studyshare.in/" color="#0284c7">studyshare.in</a> | <a href="https://github.com/harshit-siraswal/studyshare-web" color="#0284c7">GitHub</a>', item_right_style)
        ]
    ], colWidths=[420, 144])
    p2_header.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
    story.append(p2_header)
    story.append(Paragraph('• <b>Campus ERP Ecosystem:</b> Built live campus portal and mobile app deployed on Railway/Neon PostgreSQL serving <b>500+ active users</b> for leave requests, fee verification, and complaint dispatch.', bullet_style))
    story.append(Paragraph('• <b>Automated OCR Ingestion:</b> Shipped an n8n webhook pipeline integrating Tesseract OCR for automated fee receipt parsing (98.4% accuracy, 1.2s latency) and dynamic encrypted QR student gate pass verification.', bullet_style))
    story.append(Spacer(1, 1.5))

    # Project 3: Memori Labs
    p3_header = Table([
        [
            Paragraph('<b>Memori Labs</b> | <i>Agent-Native Memory Infrastructure (SQL + LLM State Layer)</i>', item_title_bold),
            Paragraph('<a href="https://memorilabs.ai" color="#0284c7">memorilabs.ai</a> | <a href="https://github.com/harshit-siraswal/Memori" color="#0284c7">GitHub</a>', item_right_style)
        ]
    ], colWidths=[420, 144])
    p3_header.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
    story.append(p3_header)
    story.append(Paragraph('• <b>State Management for Agents:</b> Architected an LLM-agnostic, SQL-native memory layer capturing agent execution graphs, tool outputs, and user sessions into queryable structured persistent state.', bullet_style))
    story.append(Spacer(1, 1.5))

    # Project 4: ReturnShield AI (Innogeeks Hackathon)
    p4_header = Table([
        [
            Paragraph('<b>ReturnShield AI</b> (Innogeeks Hackathon) | <i>Python, scikit-learn, React 19, Vite, Edge</i>', item_title_bold),
            Paragraph('<a href="https://returnsheild-ai.vercel.app" color="#0284c7">returnsheild-ai.vercel.app</a> | <a href="https://github.com/harshit-siraswal/ReturnsheildAI" color="#0284c7">GitHub</a>', item_right_style)
        ]
    ], colWidths=[420, 144])
    p4_header.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
    story.append(p4_header)
    story.append(Paragraph('• <b>ML Return Risk Classifier:</b> Built an e-commerce fraud and return prevention system at Innogeeks Hackathon using trained scikit-learn classifiers with real-time order risk scoring (95.0% accuracy, 45ms inference) and revenue loss exposure estimation.', bullet_style))
    story.append(Paragraph('• <b>Interactive Merchant Intelligence:</b> Implemented a high-performance React 19 + Geist design dashboard with automated action stacks, 12-week risk trend visualization, and Vercel Edge Copilot.', bullet_style))
    story.append(Spacer(1, 1.5))

    # Project 5: Hardware & IoT Mesh
    p5_header = Table([
        [
            Paragraph('<b>ESP32 Smart Infrastructure & IoT Mesh Networks</b> | <i>C++, ESP-NOW, MQTT, FreeRTOS</i>', item_title_bold),
            Paragraph('<a href="https://wokwi.com/projects/446450435316383745" color="#0284c7">Wokwi Sim</a> | <a href="https://harshitpal.in" color="#0284c7">Demo</a>', item_right_style)
        ]
    ], colWidths=[420, 144])
    p5_header.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
    story.append(p5_header)
    story.append(Paragraph('• <b>Zero-GSM Urban Mesh:</b> Developed low-power municipal manhole monitoring hardware utilizing ESP32, HX711 load cells, and ultrasonic sensors communicating over self-healing ESP-NOW peer-to-peer mesh relays.', bullet_style))
    story.append(Spacer(1, 2))

    # TECHNICAL SKILLS
    add_section_header('Technical Skills & Core Competencies')
    skills_data = [
        [Paragraph('<b>Languages:</b>', skill_label), Paragraph('TypeScript, JavaScript, Python, Dart, C++, C, SQL, HTML5/CSS3', skill_body)],
        [Paragraph('<b>Frontend & Mobile:</b>', skill_label), Paragraph('React, Next.js, Flutter, Tailwind CSS, shadcn/ui, Vite, Framer Motion', skill_body)],
        [Paragraph('<b>Backend & APIs:</b>', skill_label), Paragraph('Node.js, Express, NestJS, FastAPI (Python), Prisma ORM, RESTful APIs, WebSockets', skill_body)],
        [Paragraph('<b>AI, Cloud & Data:</b>', skill_label), Paragraph('FAISS Vector DB, Hybrid RAG, BM25, PostgreSQL, Neon Serverless, Redis, Docker, Vercel, Railway, Cloudflare, Linux, n8n', skill_body)],
        [Paragraph('<b>Hardware & IoT:</b>', skill_label), Paragraph('ESP32, ESP-NOW Mesh Protocol, Arduino, MQTT, FreeRTOS, Sensor Interfacing (PIR, Ultrasonic, Load Cells)', skill_body)]
    ]
    skills_table = Table(skills_data, colWidths=[115, 449])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(skills_table)

    doc.build(story)
    print('Resume generated successfully at:', output_path)

if __name__ == '__main__':
    create_resume()
