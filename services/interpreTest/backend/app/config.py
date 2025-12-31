from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Supabase
    SUPABASE_URL: str
    SUPABASE_SERVICE_ROLE_KEY: str
    
    # AI Keys
    GEMINI_API_KEY: str
    
    # Optional / Defaults
    ENVIRONMENT: str = "development"
    APP_NAME: str = "InterpreTest Backend"

    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"

settings = Settings()
