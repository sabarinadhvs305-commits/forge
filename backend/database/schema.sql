CREATE DATABASE IF NOT EXISTS forge
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE forge;

-- Stores registered users.
CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Stores project information owned by users.
CREATE TABLE IF NOT EXISTS projects (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT NULL,
    idea TEXT NOT NULL,
    timeline_weeks INT UNSIGNED NOT NULL,
    status ENUM('planning', 'active', 'completed') NOT NULL DEFAULT 'planning',
    created_by INT UNSIGNED NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_projects_created_by (created_by),
    CONSTRAINT fk_projects_created_by_users
        FOREIGN KEY (created_by)
        REFERENCES users (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Represents users assigned to projects with their skills and roles.
CREATE TABLE IF NOT EXISTS project_members (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    project_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    skills JSON NULL,
    assigned_role VARCHAR(100) NULL,
    joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_project_members_project_user (project_id, user_id),
    KEY idx_project_members_project_id (project_id),
    KEY idx_project_members_user_id (user_id),
    CONSTRAINT fk_project_members_project_id_projects
        FOREIGN KEY (project_id)
        REFERENCES projects (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_project_members_user_id_users
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE,
    CONSTRAINT chk_project_members_skills_json
        CHECK (skills IS NULL OR JSON_VALID(skills))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Stores actionable project tasks and ownership.
CREATE TABLE IF NOT EXISTS tasks (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    project_id INT UNSIGNED NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NULL,
    assigned_to INT UNSIGNED NULL,
    status ENUM('Pending', 'In Progress', 'Completed') NOT NULL DEFAULT 'Pending',
    priority ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Medium',
    due_date DATE NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_tasks_project_id (project_id),
    KEY idx_tasks_assigned_to (assigned_to),
    CONSTRAINT fk_tasks_project_id_projects
        FOREIGN KEY (project_id)
        REFERENCES projects (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_tasks_assigned_to_users
        FOREIGN KEY (assigned_to)
        REFERENCES users (id)
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Stores AI-generated analyses and structured module outputs for projects.
CREATE TABLE IF NOT EXISTS ai_analyses (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    project_id INT UNSIGNED NOT NULL,
    analysis_type ENUM(
        'idea_validation',
        'role_assignment',
        'scope_analysis',
        'roadmap_generation',
        'task_generation',
        'pitch_generation'
    ) NOT NULL,
    input_prompt TEXT NOT NULL,
    result JSON NOT NULL,
    ai_model VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_ai_analyses_project_id (project_id),
    KEY idx_ai_analyses_analysis_type (analysis_type),
    CONSTRAINT fk_ai_analyses_project_id_projects
        FOREIGN KEY (project_id)
        REFERENCES projects (id)
        ON DELETE CASCADE,
    CONSTRAINT chk_ai_analyses_result_json
        CHECK (JSON_VALID(result))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
