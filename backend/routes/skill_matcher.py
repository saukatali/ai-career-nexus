from fastapi import APIRouter, HTTPException
from models.skill import SkillMatch, SkillGap, Skill
from typing import List
from pydantic import BaseModel

router = APIRouter()

class JobSearchRequest(BaseModel):
    skills: List[str]
    desired_role: str
    location: str = ""

@router.post("/match", response_model=List[SkillMatch])
async def match_skills(request: JobSearchRequest):
    """Match user skills with job opportunities"""
    # Convert user skills to lowercase for case-insensitive matching
    user_skills = [skill.lower() for skill in request.skills]
    
    # All available jobs
    all_jobs = [
        SkillMatch(
            job_title="Senior Frontend Developer",
            company="Google",
            match_percentage=78,
            required_skills=["JavaScript", "React", "TypeScript", "Node.js"],
            matched_skills=["JavaScript", "React"],
            missing_skills=["TypeScript"],
            salary_range="$150k - $200k",
            location="Mountain View, CA"
        ),
        SkillMatch(
            job_title="Full Stack Engineer",
            company="Meta",
            match_percentage=85,
            required_skills=["JavaScript", "React", "Python", "GraphQL"],
            matched_skills=["JavaScript", "React", "Python"],
            missing_skills=["GraphQL"],
            salary_range="$160k - $210k",
            location="Menlo Park, CA"
        ),
        SkillMatch(
            job_title="React Developer",
            company="Amazon",
            match_percentage=92,
            required_skills=["JavaScript", "React", "AWS", "Redux"],
            matched_skills=["JavaScript", "React"],
            missing_skills=["AWS"],
            salary_range="$140k - $190k",
            location="Seattle, WA"
        ),
        SkillMatch(
            job_title="Backend Engineer",
            company="Microsoft",
            match_percentage=88,
            required_skills=["Python", "Django", "PostgreSQL", "Docker"],
            matched_skills=["Python", "Docker"],
            missing_skills=["Django", "PostgreSQL"],
            salary_range="$145k - $195k",
            location="Redmond, WA"
        ),
        SkillMatch(
            job_title="DevOps Engineer",
            company="Netflix",
            match_percentage=75,
            required_skills=["Kubernetes", "Docker", "AWS", "Jenkins", "Terraform"],
            matched_skills=["Docker"],
            missing_skills=["Kubernetes", "AWS", "Jenkins"],
            salary_range="$155k - $205k",
            location="Los Gatos, CA"
        ),
        SkillMatch(
            job_title="Mobile Developer",
            company="Apple",
            match_percentage=82,
            required_skills=["Swift", "iOS", "React Native", "Firebase"],
            matched_skills=["React Native"],
            missing_skills=["Swift", "iOS"],
            salary_range="$165k - $215k",
            location="Cupertino, CA"
        ),
        SkillMatch(
            job_title="Data Engineer",
            company="Airbnb",
            match_percentage=79,
            required_skills=["Python", "Spark", "SQL", "Hadoop", "Kafka"],
            matched_skills=["Python", "SQL"],
            missing_skills=["Spark", "Hadoop"],
            salary_range="$150k - $200k",
            location="San Francisco, CA"
        ),
        SkillMatch(
            job_title="Cloud Architect",
            company="Oracle",
            match_percentage=70,
            required_skills=["AWS", "Azure", "Kubernetes", "Terraform", "Python"],
            matched_skills=["Python"],
            missing_skills=["AWS", "Azure", "Kubernetes"],
            salary_range="$170k - $220k",
            location="Austin, TX"
        ),
        SkillMatch(
            job_title="UI/UX Engineer",
            company="Adobe",
            match_percentage=90,
            required_skills=["JavaScript", "React", "CSS", "Figma", "TypeScript"],
            matched_skills=["JavaScript", "React", "CSS"],
            missing_skills=["Figma"],
            salary_range="$135k - $185k",
            location="San Jose, CA"
        ),
        SkillMatch(
            job_title="Machine Learning Engineer",
            company="Tesla",
            match_percentage=73,
            required_skills=["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Docker"],
            matched_skills=["Python", "Docker"],
            missing_skills=["TensorFlow", "PyTorch"],
            salary_range="$175k - $230k",
            location="Palo Alto, CA"
        ),
        SkillMatch(
            job_title="Software Engineer",
            company="Spotify",
            match_percentage=86,
            required_skills=["Java", "Kotlin", "React", "GraphQL", "Docker"],
            matched_skills=["React", "Docker"],
            missing_skills=["Java", "Kotlin"],
            salary_range="$140k - $190k",
            location="New York, NY"
        ),
        SkillMatch(
            job_title="Frontend Developer",
            company="Uber",
            match_percentage=94,
            required_skills=["JavaScript", "React", "Redux", "CSS"],
            matched_skills=["JavaScript", "React", "Redux", "CSS"],
            missing_skills=[],
            salary_range="$135k - $180k",
            location="San Francisco, CA"
        ),
        SkillMatch(
            job_title="Solutions Architect",
            company="Salesforce",
            match_percentage=77,
            required_skills=["AWS", "Microservices", "Node.js", "Docker", "Kubernetes"],
            matched_skills=["Node.js", "Docker"],
            missing_skills=["AWS", "Microservices"],
            salary_range="$160k - $210k",
            location="San Francisco, CA"
        ),
        SkillMatch(
            job_title="Platform Engineer",
            company="Stripe",
            match_percentage=81,
            required_skills=["Ruby", "Go", "Kubernetes", "Terraform", "AWS"],
            matched_skills=["Kubernetes"],
            missing_skills=["Ruby", "Go", "Terraform"],
            salary_range="$165k - $220k",
            location="San Francisco, CA"
        ),
        SkillMatch(
            job_title="Web Developer",
            company="Shopify",
            match_percentage=89,
            required_skills=["JavaScript", "React", "Node.js", "GraphQL", "MongoDB"],
            matched_skills=["JavaScript", "React", "Node.js"],
            missing_skills=["GraphQL", "MongoDB"],
            salary_range="$130k - $175k",
            location="Remote"
        )
    ]
    
    # Filter and calculate matches
    matched_jobs = []
    for job in all_jobs:
        # Convert job required skills to lowercase
        job_skills_lower = [skill.lower() for skill in job.required_skills]
        
        # Find matched and missing skills
        matched_skills = [skill for skill in job.required_skills 
                         if skill.lower() in user_skills]
        missing_skills = [skill for skill in job.required_skills 
                         if skill.lower() not in user_skills]
        
        # Only include jobs that have at least one matching skill
        if matched_skills:
            # Calculate match percentage
            match_percentage = int((len(matched_skills) / len(job.required_skills)) * 100)
            
            # Create updated job match with calculated values
            matched_job = SkillMatch(
                job_title=job.job_title,
                company=job.company,
                match_percentage=match_percentage,
                required_skills=job.required_skills,
                matched_skills=matched_skills,
                missing_skills=missing_skills,
                salary_range=job.salary_range,
                location=job.location
            )
            matched_jobs.append(matched_job)
    
    # Sort by match percentage (highest first)
    matched_jobs.sort(key=lambda x: x.match_percentage, reverse=True)
    
    return matched_jobs

@router.get("/trending-skills", response_model=List[str])
async def get_trending_skills():
    """Get trending skills in the market"""
    return [
        "TypeScript",
        "Next.js",
        "Docker",
        "Kubernetes",
        "GraphQL",
        "React Native",
        "Tailwind CSS",
        "FastAPI"
    ]
